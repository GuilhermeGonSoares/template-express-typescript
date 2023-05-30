import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import Controller from './interfaces/controller-interface';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dataSource } from './db/data-source';
import erroMiddleware from './middlewares/error-middleware';

class App {
  private app: Application;
  private port: Number = 3000;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initialiseMiddleware();
    this.initializeControllers(controllers);
    this.initialiseErrorMiddleware();
  }

  private async initialiseDatabase(): Promise<void> {
    try {
      await dataSource.initialize();
      console.log('Could connect with database');
    } catch (error) {
      console.log('Could not connect to database', error);
    }
  }

  private initialiseErrorMiddleware(): void {
    this.app.use(erroMiddleware);
  }

  private initialiseMiddleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public async listen() {
    await this.initialiseDatabase();
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
