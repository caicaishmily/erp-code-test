import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { hash } from "src/utils/crypto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(createTodoDto: CreateUserDto) {
    const { email, password } = createTodoDto;
    const hashedPass = await hash(password);
    return await this.usersRepository.save({
      email,
      password: hashedPass,
    });
  }
}
