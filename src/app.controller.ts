// import { Controller, Get, Render } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   @Render('index')
//   getHello(): { [key: string]: string; } {
//     return { message: this.appService.getHello() };
//   }
// }

import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}