import { IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  public email: string;

  @IsString()
  public name?: string;

  @IsString()
  public password: string;
}

export default RegisterDTO;