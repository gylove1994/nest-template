import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
const prisma = new PrismaClient();

export function IsNotSameNameInDataBase(
  entityName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityName], // 将参数作为约束传入
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [entityName] = args.constraints;
          try {
            const count = await (prisma[entityName] as any).count({
              where: {
                name: value,
              },
            });
            return count === 0;
          } catch (e) {
            Logger.error(`IsNotSameInDataBase query error`, e);
            return false;
          }
        },
        defaultMessage() {
          return `Some name ${entityName} entity is in the database`;
        },
      },
    });
  };
}
