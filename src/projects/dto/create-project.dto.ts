import { IsString, IsEnum } from 'class-validator';
import {ProjectStatus} from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  userId: string;
}
