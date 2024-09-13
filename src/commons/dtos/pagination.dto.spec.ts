import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {
  it('应该通过验证当提供有效的page和pageSize', async () => {
    const dto = plainToInstance(PaginationDto, { page: 1, pageSize: 10 });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('应该在page小于1时失败验证', async () => {
    const dto = plainToInstance(PaginationDto, { page: 0, pageSize: 10 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('应该在pageSize小于5时失败验证', async () => {
    const dto = plainToInstance(PaginationDto, { page: 1, pageSize: 4 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('应该在pageSize大于100时失败验证', async () => {
    const dto = plainToInstance(PaginationDto, { page: 1, pageSize: 101 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('max');
  });
});
