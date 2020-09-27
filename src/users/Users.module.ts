import { Module } from '@nestjs/common';
import { User } from './Users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {

}