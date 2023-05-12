import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Public } from "src/utils/public";
import { ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "./dto/signup.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signIn(@Body() signInDto: SignUpDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
