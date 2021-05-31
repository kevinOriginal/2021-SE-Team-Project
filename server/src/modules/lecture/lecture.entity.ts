import { AbstractEntity } from 'src/shared/abstract.entity'
import { UserRole } from 'src/shared/constants/constants'
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
} from 'typeorm'
import { Attendance } from '../attendance/attendance.entity'
import { User } from '../user/user.entity'
import { LectureTime } from './lecture-time.entity'
import { LectureDto } from './dto/lecture.dto'

@Entity()
export class Lecture extends AbstractEntity<LectureDto> {
  @Column()
  lectureName: string

  @Column()
  grade: number

  @Column()
  classNumber: number

  @Column()
  lectureCode: string

  @OneToMany(() => LectureTime, (LectureTime) => LectureTime.lecture)
  lectureTime: LectureTime[]

  @OneToMany(() => Attendance, (attendance) => attendance.lecture)
  attendances: Attendance[]

  @ManyToMany(() => User, (user) => user.lectures)
  users: User[]

  dtoClass = LectureDto
}
