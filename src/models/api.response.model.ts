import { ApiErrorResponse, ApiSuccessResponse } from '../types';

export default class ApiResponse {
  status: number;
  success: boolean;
  message: string;

  constructor(statusCode: number, success: boolean, message: string) {
    this.status = statusCode;
    this.success = success;
    this.message = message;
  }

  static Success = class <T = any> extends ApiResponse implements ApiSuccessResponse<T> {
    data: T;

    constructor(statusCode: number, message: string = "Success", data: T) {
      super(statusCode, statusCode < 400, message);
      this.data = data;
    }
  };

  static Error = class extends ApiResponse implements ApiErrorResponse {
    errors: any | null;

    constructor(statusCode: number, message: string = "Something went wrong!", errors: any = null) {
      super(statusCode, false, message);
      this.errors = errors;
    }
  };
} 