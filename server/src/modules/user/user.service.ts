import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { UtilsService } from 'src/providers/utils.service'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { EmailVerification } from './email-verification.entity'
import { User } from './user.entity'
import { random } from 'lodash'
import { AwsService } from '../aws/aws.service'
import { SERVICE_NAME } from 'src/shared/constants/constants'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(EmailVerification)
    private readonly emailVerficationRepository: Repository<EmailVerification>,
    private readonly awsServce: AwsService,
  ) {}

  async checkDuplicate(email: string): Promise<boolean> {
    try {
      const isEmailDupliated = await this.userRepository.findOne({
        where: {
          email,
          deletedAt: null,
        },
      })
      return !!isEmailDupliated
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  async findOneByUserId(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id,
        deletedAt: null,
      },
      relations: ['lectures', 'attendances'],
    })

    return user
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        deletedAt: null,
      },
      // relations: ['lecture', 'attendance', ''],
    })

    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 이메일 중복체크
      const isEmailDuplicated = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
          deletedAt: null,
        },
        order: {
          id: 'DESC',
        },
      })

      if (isEmailDuplicated) {
        throw new BadRequestException('EMAIL_DUPLICATED')
      }

      if (!createUserDto.password) {
        throw new BadRequestException('MISSING_PASSWORD')
      }

      // 이메일이 인증받을 메일인지 확인
      const emailVerification = await this.emailVerficationRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      })

      if (!emailVerification.isVerified) {
        throw new UnauthorizedException('EMAIL_NOT_VERIFIED')
      }

      const hashed = UtilsService.generateHash(createUserDto.password)

      const created = await this.userRepository.save({
        role: createUserDto.role,
        email: createUserDto.email,
        password: hashed,
        fullName: createUserDto.fullName,
        grade: createUserDto.grade,
        classNumber: createUserDto.classNumber,
        studentNumber: createUserDto.studentNumber,
        phone: createUserDto.phone,
      })

      const result = this.userRepository.findOneOrFail({
        where: {
          id: created.id,
        },
      })

      return result
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  async unregister({ user }: { user: User }) {
    const matchedUser = await this.userRepository.findOneOrFail(user.id)
    matchedUser.deletedAt = new Date()
    await this.userRepository.save(matchedUser)
  }

  async sendVerificationCode(email: string) {
    // TODO: 테스트를 위해 잠시 random code 는 000000으로 통일
    // const randomCode = random(110000, 999999, false) + ''
    // 실제 이메일을 전송하는 AWS 연계를 하기 위해선 CI/CD 및 로컬 환경 실행을 위해선 PRIVATE_KEY 환경 세팅이 어렵기 때문에 임시적으로 코드는 000000 으로 대체 합니다.
    const randomCode = '000000'
    await this.emailVerficationRepository.save({
      email,
      verificationCode: randomCode,
    })

    // TODO: 실제 이메일을 보내는 과정은 잠시 제외시켜놓음
    await this.awsServce.sendEmail({
      toEmail: email,
      title: `[${SERVICE_NAME}] 가입을 위한 인증번호`,
      body: `<div>${SERVICE_NAME}에 가입 하기 위한 6자리 인증번호는 다음과 같습니다: <b>${randomCode}</b></div>`,
    })
  }

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const matchedEmail = await this.emailVerficationRepository.findOne({
      where: {
        email,
      },
    })

    if (!matchedEmail) {
      throw new NotFoundException('Email not found')
    }

    // 10 min expiration time
    const expireDate = moment(matchedEmail.createdAt).add(10, 'minute')
    if (moment().isBefore(expireDate)) {
      matchedEmail.isVerified = code === matchedEmail.verificationCode

      await this.emailVerficationRepository.save(matchedEmail)

      return matchedEmail.isVerified
    } else {
      throw new ForbiddenException('expired')
    }
  }
}
