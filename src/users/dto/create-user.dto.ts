import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @IsEmail()
  email: string;
}
