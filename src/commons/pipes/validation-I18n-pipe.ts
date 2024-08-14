/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ValidationI18nPipe implements PipeTransform<any> {
  constructor(private readonly i18n: I18nService) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const messages = await Promise.all(
        errors.map(async (error) => {
          const constraints = Object.values(error.constraints);
          return await Promise.all(
            constraints.map(async (constraint) => {
              return this.i18n.translate(`validation.${constraint}`, {
                args: {
                  property: error.property,
                },
              });
            }),
          );
        }),
      );
      throw new BadRequestException(messages.flat());
    }
    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
