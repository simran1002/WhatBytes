import { IsString, IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsUUID()
  projectId: string;

  @IsUUID()
  assignedUserId: string;
}
