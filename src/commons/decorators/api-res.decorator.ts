import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export const ApiResponse = <TModel extends Type<any>>(_model: TModel) => {
  return applyDecorators(ApiOkResponse({}));
};
