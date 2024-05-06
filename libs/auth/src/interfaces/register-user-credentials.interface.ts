export interface IRegisterUserCredentials {
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
  information?: string;
}

export interface IRegisterWorkerUserCredentials {
  user: IRegisterUserCredentials;
  permissions?: [];
}
