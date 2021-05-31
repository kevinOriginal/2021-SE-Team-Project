import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UseGuards,
} from '@nestjs/common'
import { Attendance } from './attendance.entity'
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AttendanceService } from './attendance.service'
import { AttendanceDto } from './dto/attendance.dto'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from 'src/shared/guard/roles.guard'
import { CreateAttendanceDto } from './dto/create-attendance.dto'

@Controller('attendance')
@ApiTags('attendance')
export class AttendanceController {
  constructor(private attendService: AttendanceService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '[선생님 ONLY] 출석체크 진행',
    description: '교수가 학생의 출석체크를 진행한다 ',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: '출석체크 완료', type: Attendance })
  async attendcheck(@Body() attendanceDto: CreateAttendanceDto) {
    const attendcheck = await this.attendService.create(attendanceDto)
    //return `This will return one movie with the id: ${AttendCheckDto}`;
    return attendcheck
  }
}
