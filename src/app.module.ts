import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/Users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import config from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }
