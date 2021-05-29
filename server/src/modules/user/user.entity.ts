import { ApiProperty } from '@nestjs/swagger'
import { AbstractEntity } from 'src/shared/abstract.entity'
import { UserRole } from 'src/shared/constants/constants'
import { Entity, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { UserDto } from './dto/user.dto'

@Entity()
export class User extends AbstractEntity<UserDto> {
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole

  @Column({
    unique: true,
  })
  email: string

  @Column({
    select: false,
  })
  password: string

  @Column({})
  fullName: string

  // 선생님의 경우 없음
  @Column({
    nullable: true,
  })
  grade: number

  // 선생님의 경우 없음
  @Column({
    nullable: true,
  })
  classNumber: number

  @Column({
    nullable: true,
  })
  phone: string

  @Column({
    nullable: true,
  })
  deletedAt: Date

  dtoClass = UserDto
}
