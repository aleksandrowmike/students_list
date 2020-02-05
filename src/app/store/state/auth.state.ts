export interface IAuthState {
  token: string;
  isLogged: boolean;
}
export const initialAuthState: IAuthState = {
  token: null,
  isLogged: false
};
