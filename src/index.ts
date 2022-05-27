import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express";
const app = express();
import connectDB                                    from "./loaders/db";
import message                                      from "./modules/responseMessage";
import routes                                       from './routes';
import ResponseWrapper                              from "./utils/ResponseWrapper";
require('dotenv').config();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);   //라우터 
// error handler

interface ErrorType {
  message: string;
  status: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: ErrorType = {
    message: `${req.method} ${req.url} 라우터가 없습니다.`,
    status: 404
  }
  next(error);
});

app.use(function (err: ErrorType, req: Request, res: Response) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500)
      .send(ResponseWrapper.failureOf(err.status || 500, message.INTERNAL_SERVER_ERROR));
});

app
  .listen(process.env.PORT, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });