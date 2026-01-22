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