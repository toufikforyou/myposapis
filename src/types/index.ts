export interface ApiErrorResponse {
  status: number;
  success: boolean;
  message: string;
  errors: any | null;
}

export interface ApiSuccessResponse<T = any> {
  status: number;
  success: boolean;
  message: string;
  data: T;
} 