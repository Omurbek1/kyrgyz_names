// src/person/dtos/create-person.dto.ts
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Tag is required.' })
  tag: string[];

  @IsString()
  @IsNotEmpty({ message: 'Gender is required.' })
  gender: 'man' | 'woman';

  @IsBoolean()
  @IsOptional()
  favorite: boolean;
}
