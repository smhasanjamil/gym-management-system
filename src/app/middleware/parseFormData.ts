import { Request, Response, NextFunction } from "express";


export const parseFormData = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.body?.data) {
    try {
      req.body = JSON.parse(req.body.data);
    } catch (error) {
      console.error("Failed to parse form-data 'data' field", error);
    }
  }
  next(); 
};
