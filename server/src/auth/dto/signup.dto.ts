import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignUpDto {
  @ApiProperty({ description: "email" })
  @IsNotEmpty({ message: "email is required" })
  readonly email: string;

  @ApiProperty({ description: "password" })
  @IsNotEmpty({ message: "password is required" })
  readonly password: string;
}
