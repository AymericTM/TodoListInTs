// TaskI
export interface ITask {
  name: string;
  done: boolean;
}
export interface TodoI {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  created: Date;
}

export interface FormRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  tos: boolean;
}

export interface FormLogin {
  email: string;
  password: string;
  remember: boolean;
}
