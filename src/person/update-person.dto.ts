// src/person/dtos/update-person.dto.ts
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePersonDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  tag?: string[];

  @IsString()
  @IsOptional()
  gender?: 'man' | 'woman';

  @IsBoolean()
  @IsOptional()
  favorite?: boolean;
}
