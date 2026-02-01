export interface CreateUserDto {
    name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    birth_date: string;
}

//todo logica de primera contraseña  como respuesta 
export interface UserResponse {
    id: string;
    name: string;
    email: string;
}

//Separar que dto usars para cada cosa
//todo create, visualizar get by id 

export interface IUser {
    id: number;
    user_name: string;
    name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    status: string;

    persons?: {
        name: string | null;
        last_name: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
    } | null;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    showing: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationInfo;
}