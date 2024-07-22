import { Request, Response } from 'express';

export default (_req: Request, res: Response) =>
  res.status(404).send({ status: 404, message: 'Resource not found' });
