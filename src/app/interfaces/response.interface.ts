import { HttpErrorResponse } from "@angular/common/http";

export interface IHttpResponse<T> {
    message: string;
    error: string | null;
    statusCode: number;
    data: T
}


//Explicacion especificamos que ucnado haya un error 
//!desde el back mandamos un null en la data por lo tanto 
//cuando haya error pues no se debe enviar un objeto en si 
export interface IHttpResponseError extends HttpErrorResponse {
    error: IHttpResponse<null>;
}

export interface AuthResponse {

    access_token: string;
    first_login: boolean;
    user: UserInfo

}

export interface RecoveryResponse{
    recoveryToken: string;


}




export interface UserInfo {
    id: number;
    user_name: string;
}
