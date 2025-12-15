// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   login(@Body() body: { name: string; password: string }) {
//     return this.authService.login(body.name, body.password);
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString } from 'class-validator';
import { ApiTags } from '@nestjs/swagger';

class LoginDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.name, loginDto.password);
  }
}
