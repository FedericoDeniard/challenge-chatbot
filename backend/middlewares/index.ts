import { NextFunction, Request, Response } from "express";

export interface CustomError extends Error {
    status?: number;
    details?: string;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        error: message,
        details: err.details || null,
    });
}
