import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { RolesGuard } from 'src/shared/guard/roles.guard'
import { PaginationQuery } from 'src/shared/pagination.query'
import { User } from '../user/user.entity'
import { CreateLectureDto } from './dto/create-lecture.dto'
import { LectureService } from './lecture.service'
import { EnrollParam } from './params/enroll-param'
import { LectureIdParam, UserIdParam } from './params/user-id-param'

@Controller('lectures')
@ApiTags('lecture')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Get()
  @ApiOperation({
    summary: '열려있는 수업 리스트 조회',
    description: '수강신청을 할 때 필요한 리스트',
  })
  @UseGuards(AuthGuard('jwt'))
  async getLectures(@Req() req: Request, @Query() queries: PaginationQuery) {
    const lectures = await this.lectureService.getRecentLectures(queries)
    return lectures.map((x) => x.toDto())
  }

  @Get('/:lectureId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: '수업 정보 조회',
    description: '수업 정보, 학생 리스트 및 attendance 정보 불러옴',
  })
  async getOneLecture(@Req() req: Request, @Param() param: LectureIdParam) {
    return await this.lectureService.getLectureById(param.lectureId)
  }

  @Patch('/:lectureId')
  @ApiOperation({
    summary: '수강신청',
  })
  @UseGuards(AuthGuard('jwt'))
  async enroll(@Param() params: EnrollParam, @Req() req: Request) {
    const user = req.user as User
    console.log('<lecture id>', +params.lectureId)
    console.log('<type of lecture id>', typeof +params.lectureId)
    const created = await this.lectureService.register(user, params.lectureId)
    return created
  }

  @Get('/users/:userId')
  @ApiOperation({
    summary: '학생/선생의 수업 리스트 조회',
  })
  @UseGuards(AuthGuard('jwt'))
  async getUserLectures(
    @Req() req: Request,
    @Query() query: PaginationQuery,
    @Param() { userId }: UserIdParam,
  ) {
    const user = req.user as User
    const lectures = await this.lectureService.getLecturesByUserId(
      userId,
      query,
    )
    return lectures.map((x) => x.toDto())
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({
    summary: '[선생님 ONLY] Lecture 생성',
  })
  async createLecture(
    @Req() req: Request,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    const user = req.user as User

    return await this.lectureService.create(user, createLectureDto)
  }
}
