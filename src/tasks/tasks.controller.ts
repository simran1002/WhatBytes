import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<TaskResponseDto[]> {
    return this.tasksService.findAll();
  }

  @Get('project/:projectId')
  async findByProject(@Param('projectId') projectId: string): Promise<TaskResponseDto[]> {
    return this.tasksService.findByProject(projectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Get('filter')
  async filter(
    @Query('status') status: string,
    @Query('assignedUserId') assignedUserId: string,
  ): Promise<TaskResponseDto[]> {
    const where = {} as any;

    if (status) {
      where.status = status;
    }

    if (assignedUserId) {
      where.assignedUserId = assignedUserId;
    }

    return this.prisma.task.findMany({
      where,
    });
  }
}
