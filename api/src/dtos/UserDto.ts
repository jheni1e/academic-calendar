export interface CreateUserDTO {
    edv: number;
    name: string;
    birthdate: Date;
    password: string
    role : string
}

export interface UpdateUserDTO {
    name?: string;
    birthdate?: Date;
    role?: String
}

export interface UserResponseDTO {
    id: number,
    edv: number;
    name: string;
    isActive: boolean;
    role: string
}

export type LoginDTO = {
    edv: number
    password: string
}


