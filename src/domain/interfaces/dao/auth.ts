import { PromiseData } from "./helper";

// define for type validation checking and for input type interface
export enum AuthType {
  Local = "local",
  Google = "google",
}

// Usercases Contract to extend to classes
export interface AuthUsecase {
  authenticate(payload: AuthenticationInput): PromiseData<AuthenticationOutput>;
  authorization(payload: AuthenticationInput): PromiseData<string>;
  // resetPassword()
}

// INPUT PAYLOAD

export interface AuthenticationInput extends Partial<AuthGoogle>, Partial<AuthLocal> {
  authType: AuthType;
}

export interface AuthGoogle {
  token: string;
}

export interface AuthLocal {
  username: string;
  password: string;
}

export interface AuthoriationInput {}

export interface ResetPassInput {}

// OUTPUT RESULT

export interface AuthenticationOutput {
  token: string;
  expired: string;
}

export interface AuthorizationOutput {
  permissions: string[];
}
