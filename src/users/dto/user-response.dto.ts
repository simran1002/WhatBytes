export class UserResponseDto {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  }

export interface UserResponse {
  message: string;
  success: string;
}
  