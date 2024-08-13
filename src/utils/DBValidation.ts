import {
  type ArgumentMetadata,
  BadRequestException,
  Body,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  Param,
  type PipeTransform,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type PrismaClient } from '@prisma/client';
import { isEmpty, isNil } from 'lodash';

const BEFORE_ALL_DB_VALIDATION_KEY = 'beforeAllDBValidation';

const VALIDATE_IN_DB_KEY = 'validateInDB';

const VALIDATE_IN_DB_OPTIONS_KEY = 'validateInDBOptions';

type Constructor<T> = new (...args: any[]) => T;

type ValidateFunc<T> = (
  data: T,
  prisma: PrismaClient,
) => Promise<boolean> | boolean;

type BeforeAllDBValidationFunc<T> = (
  dto: T,
  prisma: PrismaClient,
) => Promise<any>;

interface ValidateInDBOptions {
  message: string;
}

// 验证完的数据格式，不过似乎会丢失类型，尝试使用 ReturnType<typeof func> 代替？
export interface ValidateInDBResult<T, K> {
  dto: T;
  dbData: K;
}

export function BeforeAllDBValidation<T>(func: BeforeAllDBValidationFunc<T>) {
  // 将 func 函数绑定到对象的元数据 BEFORE_ALL_DB_VALIDATION_KEY 上
  return SetMetadata(BEFORE_ALL_DB_VALIDATION_KEY, func);
}

export function ValidateInDBByPipe<T>(
  validateFunc: ValidateFunc<T>,
  validationOptions: ValidateInDBOptions,
) {
  return function (object: object, propertyName: string) {
    // 将 validateFunc 函数绑定到对象的元数据 VALIDATE_IN_DB_KEY 上
    Reflect.defineMetadata(
      VALIDATE_IN_DB_KEY,
      validateFunc,
      object.constructor,
      propertyName,
    );
    // 将 validationOptions 绑定到对象的元数据 VALIDATE_IN_DB_OPTIONS_KEY 上
    Reflect.defineMetadata(
      VALIDATE_IN_DB_OPTIONS_KEY,
      validationOptions,
      object.constructor,
      propertyName,
    );
  };
}

@Injectable()
export class DBValidationPipe implements PipeTransform {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly reflector: Reflector,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // 获取对象的元数据 BEFORE_ALL_DB_VALIDATION_KEY
    const beforeAllFunc = this.reflector.get<ValidateFunc<any> | undefined>(
      BEFORE_ALL_DB_VALIDATION_KEY,
      metadata.metatype ?? Object,
    );
    // 如果存在 BEFORE_ALL_DB_VALIDATION_KEY 元数据，则执行该函数
    if (!isNil(beforeAllFunc)) {
      // 将 value 和 prisma 作为参数传入 BEFORE_ALL_DB_VALIDATION_KEY 函数
      const data = await beforeAllFunc(value, this.prisma);
      // 获取对象的所有属性中带有元数据 VALIDATE_IN_DB_KEY 的属性
      const vP = Object.keys(value).map(async (key) => {
        const func = this.reflector.get<ValidateFunc<any> | undefined>(
          VALIDATE_IN_DB_KEY,
          (metadata.metatype as Constructor<any>)[key],
        );
        // 如果存在 VALIDATE_IN_DB_KEY 元数据，则执行该函数进行验证
        if (!isNil(func)) {
          const res = await func(data, this.prisma);
          return { [key]: res };
        }
        // 如果不存在 VALIDATE_IN_DB_KEY 元数据，则返回 true
        return { [key]: true };
      });
      // 等待所有属性的验证结果
      const v = await Promise.all(vP);
      // 将验证结果转换为 Map 对象
      const resMap = new Map(
        v.map((item) => [Object.keys(item)[0], Object.values(item)[0]]),
      );
      // 如果所有属性的验证结果都为 true，则返回 value
      const isValid = [...resMap.values()].every((item) => item);
      // 如果有属性的验证结果为 false，则抛出 BadRequestException 异常
      if (!isValid) {
        const errorMessages = [...resMap.entries()]
          .map(([key, value]) => {
            if (!value) {
              const options = this.reflector.get<
                ValidateInDBOptions | undefined
              >(
                VALIDATE_IN_DB_OPTIONS_KEY,
                (metadata.metatype as Constructor<any>)[key],
              );
              return options?.message ?? `数据库验证失败 ${key}`;
            }
            return '';
          })
          .filter((item) => !isEmpty(item));
        throw new BadRequestException(errorMessages);
      }
      // 返回 dto 与 数据库查询结果
      return { dto: value, dbData: data } satisfies ValidateInDBResult<
        any,
        any
      >;
    }
    // 如果不存在 BEFORE_ALL_DB_VALIDATION_KEY 元数据，则直接返回 value，dbData 为 null
    return { dto: value, dbData: null } satisfies ValidateInDBResult<any, any>;
  }
}

export const DBValidationBody = createParamDecorator(
  (_data: unknown, _ctx: ExecutionContext) => {
    return Body(DBValidationPipe);
  },
);

export const DBValidationParam = createParamDecorator(
  (_data: unknown, _ctx: ExecutionContext) => {
    return Param(DBValidationPipe);
  },
);

export const DBValidationQuery = createParamDecorator(
  (_data: unknown, _ctx: ExecutionContext) => {
    return Query(DBValidationPipe);
  },
);
