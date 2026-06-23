export interface CreateUserDTO {
    userId: number;
    userEdv: number;
    name: string;
    birthdate: Date;
}

export interface UpdateUserDTO {
    name: string;
    birthdate: Date;
}

export type UserResponseDTO = {
    userEdv: number;
    name: string;
    isActive: boolean;
}