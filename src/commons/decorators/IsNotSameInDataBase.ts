import { type Prisma } from '@prisma/client';
import {
  type ValidationArguments,
  registerDecorator,
  type ValidationOptions,
} from 'class-validator';
import { prismaSubject } from '../../utils/prismaSubject';
import { InternalServerErrorException } from '@nestjs/common';

export function IsNotSameInDataBase<
  K extends Record<string, any> = Record<string, any>,
>(
  entityName: Prisma.TypeMap['meta']['modelProps'],
  key: string,
  validationOptions?: ValidationOptions & { extraWhere?: K },
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityName, key],
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [entityName, key] = args.constraints;
          const object = args.object as any;
          const id = object.id;
          try {
            const prisma = prismaSubject.getValue();
            if (prisma == null) {
              throw new InternalServerErrorException('数据库未初始化');
            }
            const count = await (prisma[entityName] as any).count({
              where: {
                [key]: value,
                id: { not: id }, // 排除当前实体
                ...validationOptions?.extraWhere,
              },
            });
            return count === 0;
          } catch (e) {
            // throw new BadRequestException(
            //   `数据库查询错误,可能为非法数据形式（实体名:${String(entityName)} 键:${String(key)}）`
            // )
            return false;
          }
        },
        defaultMessage() {
          return `实体冲突, ${key} 已存在`;
        },
      },
    });
  };
}
