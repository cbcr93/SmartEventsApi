export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    username: string;
    age: number;
    isSeller: boolean;
  }

export interface ILoginUser{
  login: string;
  password: string;
}
