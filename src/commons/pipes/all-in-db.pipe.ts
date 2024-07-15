import { PrismaClient } from '@prisma/client';
import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
const prisma = new PrismaClient();

export function IsUUIDsALLInDataBase(
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
          const count = await (prisma[entityName] as any).count({
            where: {
              id: {
                in: value,
              },
            },
          });
          return count === value.length;
        },
        defaultMessage() {
          return `Some of the ${entityName} entity not found in database`;
        },
      },
    });
  };
}
