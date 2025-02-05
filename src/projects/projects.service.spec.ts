// src/projects/projects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // Create a new project
  async create(createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.create({
      data: createProjectDto,
    });
    return project;
  }

  // Get all projects
  async findAll(): Promise<ProjectResponseDto[]> {
    return await this.prisma.project.findMany();
  }

  // Get a single project by ID
  async findOne(id: string): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // Update project details
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });

    return project;
  }

  // Delete a project
  async remove(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
