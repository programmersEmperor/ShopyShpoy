export class AppError extends Error {
    public readonly statusCode: number
    public readonly isOperational: boolean;
    public readonly details: any;
    
    constructor(message: string, statusCode: number, isOperational: boolean = true, details?: any){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;

        Error.captureStackTrace(this);
    }
}

// Not Found Error
export class NotFoundError extends AppError {
    constructor(message: string = 'Resources not found'){
        super(message, 404)
    }
}

// Validation Error
export class ValidationError extends AppError {
    constructor(message: string = 'Invalid request data', details?: any){
        super(message, 400, true, details);
    }
}

// Authendication Error
export class AuthError extends AppError {
    constructor(message: string = 'Unauthorized'){
        super(message, 401);
    }
}

// Forbidden Error (Insufficient Permissions)
export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden access'){
        super(message, 403);
    }
}

// Database Error (MongoDB / PostgreSQL Error)
export class DatabaseError extends AppError {
    constructor(message: string = 'Database Error', details?: any){
        super(message, 500, true, details);
    }
}

// Rate Limit Error (when user execeeds API limits) 
export class RateLimitError extends AppError {
    constructor(message: string = 'Too many requests, please try again later!'){
        super(message, 429);
    }
}