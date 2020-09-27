import { IsString } from 'class-validator';

export class LogInDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default LogInDto;