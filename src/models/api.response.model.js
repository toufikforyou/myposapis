export default class ApiResponse {
  constructor(statusCode, success, message) {
    this.status = statusCode;
    this.success = success;
    this.message = message;
  }

  static Success = class extends ApiResponse {
    constructor(statusCode, message = "Success", data) {
      super(statusCode, statusCode < 400, message);
      this.data = data;
    }
  };

  static Error = class extends ApiResponse {
    constructor(statusCode, message = "Something went wrong!", errors = null) {
      super(statusCode, false, message);
      this.errors = errors;
    }
  };
}
