export interface CreateUserDTO {
    edv: number;
    name: string;
    birthdate: Date;
    password: string
}

export interface UpdateUserDTO {
    name?: string;
    birthdate?: Date;
    role?: string
}

export type UserResponseDTO = {
    edv: number;
    name: string;
    isActive: boolean;
}

export type LoginDTO = {
    edv: number
    password: string
}

