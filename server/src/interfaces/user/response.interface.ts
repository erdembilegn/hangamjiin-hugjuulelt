import { GenericError } from '../main.interface';
//Hereglegchiig avah, uusgeh, id aar avah, buh hereglegchiig avah huselted hariu uguh code
export interface ResponseCreateUser {
  error?: GenericError;
  data?: {
    id: string;
  };
}
export interface ResponseGetUser {
  error?: GenericError;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: number | null;
    award : string | null;
    role: string;
  };
}
export interface ResponseGetUserById {
  error?: GenericError;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: number | null;
    award : string | null;
    role: string;
  };
}
export interface ResponseGetAllUser {
  error?: GenericError;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: number | null;
    award? : string | null | undefined;
    role: string;
  }[];
}
