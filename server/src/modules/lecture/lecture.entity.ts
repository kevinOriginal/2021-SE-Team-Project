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
import { LectureTime } from './dto/lecture-time.entity'
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

  @OneToMany(() => LectureTime, (lectuerTime) => lectuerTime.lecture)
  lectureTime: LectureTime[]

  @OneToMany(() => Attendance, (attendance) => attendance.lecture)
  attendance: Attendance[]

  @ManyToMany(() => User, (user) => user.lectures)
  users: User[]

  dtoClass = LectureDto
}
