import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async login(name: string, password: string) {
//     const user = await this.usersService.findByEmail(name);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new UnauthorizedException();
//     }

//     const payload = { sub: user.id, role: user.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//       user,
//     };
//   }
// }

// src/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(name: string, password: string) {
    const user = await this.usersService.findByName(name);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
