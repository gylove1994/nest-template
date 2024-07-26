import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { isArray } from 'lodash';
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
          try {
            const count = await (prisma[entityName] as any).count({
              where: {
                id: {
                  ...(isArray(value) ? { in: value } : { value }),
                },
              },
            });
            return count === value.length;
          } catch (e) {
            Logger.error(`IsUUIDsALLInDataBase query error`, e);
            return false;
          }
        },
        defaultMessage() {
          return `Some of the ${entityName} entity not found in database`;
        },
      },
    });
  };
}
