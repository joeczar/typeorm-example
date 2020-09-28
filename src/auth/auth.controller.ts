import { Body, Req, Controller, HttpCode, Post, UseGuards, Get } from '@nestjs/common';
import { Response } from 'express'
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import { RegisterDTO } from './dto/register.dto';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDTO) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const user = request.user;
    console.log(user);

    const cookie = this.authService.getCookieWithJwtToken(user.id);
    console.log(cookie);

    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.json(user);;
  }
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}