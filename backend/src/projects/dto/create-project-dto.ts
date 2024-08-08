import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsString()
  @IsNotEmpty()
  readonly image_name: string;
  @IsString()
  @IsNotEmpty()
  readonly link: string;
  @IsString()
  @IsNotEmpty()
  readonly status: boolean;
}
