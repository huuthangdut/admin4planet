export interface AuthenticateResponse {
    access_token: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    roles: any,
    permissions: any;
}