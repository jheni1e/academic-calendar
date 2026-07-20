export interface CreateClassDTO {
    name: string;
    isActive?: boolean;
}

export interface UpdateClassDTO {
    name?: string;
    isActive?: boolean;
}