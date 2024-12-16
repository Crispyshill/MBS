import { Request, Response } from "express";

const getExample = (req: Request, res: Response) => {
  res.json({ message: "This is an example endpoint!" });
};

export default { getExample };
