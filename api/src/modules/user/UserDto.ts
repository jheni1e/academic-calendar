export interface CreateUserDTO {
    edv: number;
    name: string;
    birthdate: Date;
    password: string
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

export type LoginDTO = {
    edv: number
    password: string
}

