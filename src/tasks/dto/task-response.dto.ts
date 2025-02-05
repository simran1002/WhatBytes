// src/tasks/dto/task-response.dto.ts
export class TaskResponseDto {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt?: Date;
    projectId: string;
    assignedUserId: string;
  }
  