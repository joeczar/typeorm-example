import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import crypto from 'crypto';

//pass the name of table inside @Entity() i.e "users", if you don't pass table name it will create "users_entity" table by default
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: true
  })
  name?: string;

  @Column({
    nullable: true
  })
  email: string;

  // @BeforeInsert()
  // hashPassword() {
  //   this.password = crypto.createHmac('sha256', this.password).digest('hex');
  // }
  @Column()
  password: string;
}