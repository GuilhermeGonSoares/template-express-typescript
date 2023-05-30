import 'dotenv/config';
import App from './app';
import UserController from './controllers/user-controller';
import UserService from './services/user-service';

const userService = new UserService();

const app = new App([new UserController(userService)]);
app.listen();
