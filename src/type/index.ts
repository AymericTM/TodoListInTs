// TaskI
export interface ITask {
    name: string;
    done: boolean;
}

export interface TodoI {
    _id: string;
    title: string;
    done: boolean;
    created: Date;
}

export interface FormRegisterI {
    name: string;
    surname: string;
    email: string;
    password: string;
    passwordConfirm: string;
    tos: boolean;
}
export interface FormLoginI {
    email: string;
    password: string;
    remember: boolean;
}
