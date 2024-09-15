import {
  type ValidationOptions,
  registerDecorator,
  type ValidationArguments,
} from 'class-validator';
import { prismaSubject } from '../../utils/prismaSubject';
import { InternalServerErrorException } from '@nestjs/common';

export function IsExistInDataBase<T>(
  entity: {
    new (...args: any[]): T;
    name: string;
  },
  key: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, key], // 将参数作为约束传入
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [entity, key] = args.constraints;
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          const entityName =
            entity.name.charAt(0).toLowerCase() + entity.name.slice(1);
          try {
            const prisma = prismaSubject.getValue();
            if (prisma == null) {
              throw new InternalServerErrorException('数据库未初始化');
            }
            const count = await (prisma[entityName] as any).findUnique({
              where: {
                [key]: value,
              },
            });
            return count !== null;
          } catch (e) {
            // throw new BadRequestException(
            //   `数据库查询错误,可能为非法数据形式（实体名:${String(entityName)} 键:${String(key)}）`
            // )
            return false;
          }
        },
        defaultMessage() {
          return `实体不存在, ${key} 不存在`;
        },
      },
    });
  };
}
