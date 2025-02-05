// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });
    return task;
  }

  // Get all tasks
  async findAll(): Promise<TaskResponseDto[]> {
    return await this.prisma.task.findMany();
  }

  async findByProject(projectId: string): Promise<TaskResponseDto[]> {
    return await this.prisma.task.findMany({
      where: { projectId },
    });
  }

  async findOne(id: string): Promise<TaskResponseDto> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    return task;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
