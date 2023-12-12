import { IsString } from 'class-validator';

export class createCategoriesDto {
  @IsString()
  readonly category: string;
}
