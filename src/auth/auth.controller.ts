import { Body, Req, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import { RegisterDTO } from './dto/register.dto';

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
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}