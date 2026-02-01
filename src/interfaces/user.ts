export interface IUser {
    id: string;
    username: string;
    pwd: string;
}

export interface IUserAuth {
    username: string;
    pwd: string;
}

export interface IUserModel {
    register: ({ username, pwd }: IUserAuth) => Promise<IUser["id"]>;
    login: ({ username, pwd }: IUserAuth) => Promise<Omit<IUser, "pwd">>;
}
