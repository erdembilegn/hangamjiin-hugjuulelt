import { GenericError } from '../main.interface';
//Tsol uuseg, avah huselted hariu uguh heseg
export interface ResponseCreateAward {
  error?: GenericError;
  data?: {
    id: string;
  };
}
export interface ResponseGetAward {
  error?: GenericError;
  data?: {
    id: string;
    name: string;
    minNumber : number;
    maxNumber : number;
    createdUser: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
