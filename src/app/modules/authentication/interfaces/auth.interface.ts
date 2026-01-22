export interface loginUser {
    user_name: string;
    pass?: string;

}


export interface user {
    id: number;
    user_name: string;
    fullName: string;
    roles: string[];
    rolesIds: number[];


}
