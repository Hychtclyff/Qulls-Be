import { AppError } from "./AppError.js";

export class Error400 extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class Error401 extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class Error403 extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class Error404 extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class Error500 extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}
