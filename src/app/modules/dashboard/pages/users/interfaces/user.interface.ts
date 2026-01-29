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

export interface IUser {
    id: number;
    user_name: string | null;
    persons: {
        name: string | null;
        last_name: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
    } | null
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