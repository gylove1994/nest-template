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

  it('应该正确计算skip和take值', () => {
    const dto = plainToInstance(PaginationDto, { page: 2, pageSize: 15 });
    const result = dto.toSkipAndTake();
    expect(result).toEqual({ skip: 15, take: 15 });
  });

  it('应该正确构建where条件', () => {
    class TestDto extends PaginationDto {
      name?: string;
      status?: string;
    }
    const dto = plainToInstance(TestDto, {
      page: 1,
      pageSize: 10,
      name: 'test',
      status: 'active',
    });
    const where = dto.buildWhere({
      props: {
        name: { type: 'contains', mode: 'and' },
        status: { type: 'eq', mode: 'or' },
      },
    });
    expect(where).toEqual({
      OR: [{ status: 'active' }],
      name: { contains: 'test' },
    });
  });

  it('应该正确构建响应', () => {
    const dto = plainToInstance(PaginationDto, { page: 2, pageSize: 10 });
    const data = [{ id: 1 }, { id: 2 }];
    const total = 25;
    const response = dto.buildResponse(data, total);
    expect(response).toEqual({
      data,
      total,
      page: 2,
      pageSize: 10,
    });
  });

  it('应该正确构建包含多个条件的where条件', () => {
    class TestDto extends PaginationDto {
      name?: string;
      age?: number;
      isActive?: boolean;
    }
    const dto = plainToInstance(TestDto, {
      page: 1,
      pageSize: 10,
      name: 'test',
      age: 25,
      isActive: true,
    });
    const where = dto.buildWhere({
      props: {
        name: { type: 'contains', mode: 'and' },
        age: { type: 'gte', mode: 'and' },
        isActive: { type: 'eq', mode: 'and' },
      },
    });
    expect(where).toEqual({
      name: { contains: 'test' },
      age: { gte: 25 },
      isActive: true,
    });
  });

  it('应该正确处理OR条件', () => {
    class TestDto extends PaginationDto {
      status?: string;
      category?: string;
    }
    const dto = plainToInstance(TestDto, {
      page: 1,
      pageSize: 10,
      status: 'active',
      category: 'electronics',
    });
    const where = dto.buildWhere({
      props: {
        status: { type: 'eq', mode: 'or' },
        category: { type: 'eq', mode: 'or' },
      },
    });
    expect(where).toEqual({
      OR: [{ status: 'active' }, { category: 'electronics' }],
    });
  });

  it('应该正确处理混合AND和OR条件', () => {
    class TestDto extends PaginationDto {
      name?: string;
      age?: number;
      status?: string;
    }
    const dto = plainToInstance(TestDto, {
      page: 1,
      pageSize: 10,
      name: 'test',
      age: 30,
      status: 'active',
    });
    const where = dto.buildWhere({
      props: {
        name: { type: 'contains', mode: 'and' },
        age: { type: 'gte', mode: 'and' },
        status: { type: 'eq', mode: 'or' },
      },
    });
    expect(where).toEqual({
      name: { contains: 'test' },
      age: { gte: 30 },
      OR: [{ status: 'active' }],
    });
  });

  it('应该正确处理IN条件', () => {
    class TestDto extends PaginationDto {
      categories?: string[];
    }
    const dto = plainToInstance(TestDto, {
      page: 1,
      pageSize: 10,
      categories: ['electronics', 'books'],
    });
    const where = dto.buildWhere({
      props: {
        categories: { type: 'in', mode: 'and' },
      },
    });
    expect(where).toEqual({
      categories: { in: ['electronics', 'books'] },
    });
  });

  it('应该忽略未定义的值', () => {
    class TestDto extends PaginationDto {
      name?: string;
      age?: number;
    }
    const dto = plainToInstance(TestDto, {
      page: 1,
      pageSize: 10,
      name: 'test',
    });
    const where = dto.buildWhere({
      props: {
        name: { type: 'contains', mode: 'and' },
        age: { type: 'gte', mode: 'and' },
      },
    });
    expect(where).toEqual({
      name: { contains: 'test' },
    });
  });
});
