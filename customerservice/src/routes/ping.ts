import express from "express";

const pingRouter = express.Router();
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
pingRouter.get('/', (_req: any, res: { send: (arg0: string) => void; }) => { 
  res.send('pong');
});

export default pingRouter;    