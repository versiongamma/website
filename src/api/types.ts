export enum Status {
  Success = "SUCCESS",
  Error = "ERROR",
}

export type ErrorResponse = {
  status: Status.Error;
  message: string;
};
