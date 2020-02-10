import { IUser } from "../../models/user.interface";

export interface IAuthState {
  user: IUser;
  email?: string;
  token: string;
  isLogged: boolean;
}
export const initialAuthState: IAuthState = {
  user: null,
  token: null,
  isLogged: false
};
