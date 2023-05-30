import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller-interface';
import UserService from '../services/user-service';
import { CreateUserDto } from '../dtos/create-user-dto';
import { validationDto } from '../middlewares/validation-dto';
import { UpdatedUserDto } from '../dtos/updated-user-dto';

export default class UserController implements Controller {
  public path = '/user';
  public router = Router();

  constructor(private readonly userService: UserService) {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.index.bind(this));
    this.router.post(
      `${this.path}`,
      validationDto(CreateUserDto),
      this.create.bind(this)
    );
    this.router.put(
      `${this.path}/:id`,
      validationDto(UpdatedUserDto),
      this.updated.bind(this)
    );
    this.router.delete(`${this.path}/:id`, this.delete.bind(this));
  }

  private async index(req: Request, res: Response) {
    const user = await this.userService.findAll();
    return res.json(user);
  }

  private async create(req: Request, res: Response) {
    const userDto: CreateUserDto = req.body;
    const newUser = await this.userService.create(userDto);

    return res.status(201).json(newUser);
  }

  private async updated(req: Request, res: Response) {
    const { id } = req.params;
    const userDto: UpdatedUserDto = req.body;
    const updatedUser = await this.userService.updated(+id, userDto);

    return res.status(200).json(updatedUser);
  }

  private async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deletedUser = await this.userService.delete(+id);
    return res.status(200).json(deletedUser);
  }
}
