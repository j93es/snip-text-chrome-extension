export type MessageSource = "CONTENT" | "BACKGROUND" | "POPUP";
export type MessageMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "NOTIFY"
  | "ERROR";
export type StatusCode = 200 | 400 | 401 | 403 | 404 | 419 | 500;

export interface MessageResponse {
  statusCode: StatusCode;
  data: object;
}

export interface MessageRequest {
  src: MessageSource;
  dst: MessageSource;
  path: string;
  method: MessageMethod;
  data: any;
}
