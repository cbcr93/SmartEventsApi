export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    username: string;
    isSeller: boolean;
}

export interface ILoginUser{
    login: string;
    password: string;
}

export interface IUpdateUser{
    id: string;
    name?: string;
    email?: string;
    password?: string;
    username?: string;
}

export interface IReturnUser {
    id: string;
    name: string;
    username: string;
    email: string;
    isSeller: boolean;
};
