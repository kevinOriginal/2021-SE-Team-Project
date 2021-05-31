import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator'
import { UserRole } from 'src/shared/constants/constants'

export class CreateUserDto {
  @ApiProperty({
    example: 'STUDENT',
  })
  @IsEnum(UserRole)
  readonly role: UserRole

  @ApiProperty({
    example: 'test@cau.ac.kr',
  })
  @IsEmail()
  readonly email: string

  @ApiProperty({
    example: '1234qwer',
  })
  @IsString()
  @Length(1, 50)
  readonly password: string

  @ApiProperty({
    example: '김학생',
  })
  @IsString()
  readonly fullName: string

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  readonly grade: number

  @ApiPropertyOptional({
    example: 5,
  })
  @IsOptional()
  @Min(1)
  readonly classNumber: number

  @ApiPropertyOptional({
    example: 25,
  })
  @IsOptional()
  @Min(1)
  readonly studentNumber: number

  @ApiPropertyOptional({
    example: '01012341234',
  })
  @IsOptional()
  @IsPhoneNumber('KR')
  readonly phone: string
}
