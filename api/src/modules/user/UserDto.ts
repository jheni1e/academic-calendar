export interface CreateUserDTO {
    edv: number;
    name: string;
    birthdate: Date;
    password: string
}

export interface UpdateUserDTO {
    name?: string;
    birthdate?: Date;
<<<<<<< HEAD
    roleToAdd?: string
    roleToRemove?: string
=======
>>>>>>> 49699ec (feat: update access control through JWT)
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

