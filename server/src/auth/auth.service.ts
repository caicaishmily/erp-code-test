import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { compare } from "src/utils/crypto";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: SignUpDto): Promise<any> {
    const { email, password } = signInDto;
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException("user is not exist", 401);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new HttpException("password is wrong", 401);
    }

    delete user.password;
    const payload = { ...user };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    // 账号密码注册
    const { email } = signUpDto;
    const user = await this.usersService.findOne(email);

    if (user) {
      throw new HttpException("user already exist", 401);
    } else {
      const result = await this.usersService.create(signUpDto);
      delete result.password;
      return result;
    }
  }
}
