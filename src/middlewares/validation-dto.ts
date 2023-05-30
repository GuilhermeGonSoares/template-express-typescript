import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { classToPlain, plainToInstance } from 'class-transformer';

export function validationDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body, {
      excludeExtraneousValues: true,
    });

    for (const key in dtoInstance) {
      if (dtoInstance[key] === undefined) {
        delete dtoInstance[key];
      }
    }

    console.log(dtoInstance);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return res.status(400).json({
        errors: errors.map((error) => {
          const { property } = error;
          const message = Object.values(error.constraints as {});
          return { [property]: message };
        }),
      });
    }

    req.body = dtoInstance;

    next();
  };
}
