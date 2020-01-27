import { IRecordBook } from "./recordbook.interface";

export interface IStudent {
  id?: number;
  _id?: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  sex: string;
  grade: number;
  country: string;
  city: string;
  about: string;
  birth: Date;
  recordBook: [IRecordBook];
  __v?: number;
}
