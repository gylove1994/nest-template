import { TestHelper } from '@/helpers/test-helper';

describe('User Controller', () => {
  const testHelper = new TestHelper();
  it('create user', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: 'Abc123456',
    });
    testHelper.cleanUpCallbacks.push(async () => {
      await testHelper.prismaClient.user.delete({
        where: {
          id: res.body.id,
        },
      });
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
  });

  it('create user with existed email', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '12345678',
    });
    const res2 = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '123456789',
    });
    testHelper.cleanUpCallbacks.push(async () => {
      await testHelper.prismaClient.user.delete({
        where: {
          email: '123@qq.com',
        },
      });
    });
    expect(res2.status).toBe(400);
  });

  it('create user without permission', async () => {
    const token = await testHelper.genToken('user');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '12345678',
    });
    expect(res.status).toBe(403);
  });

  it('create user without token', async () => {
    const req = testHelper.request;
    const res = await req.post('/user').send({
      email: '123@qq.com',
      password: '12345678',
    });
    expect(res.status).toBe(401);
  });

  it('create user with invalid token', async () => {
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', 'asdf').send({
      email: '123@qq.com',
      password: '12345678',
    });
    expect(res.status).toBe(401);
  });

  it('create user with invalid email', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123',
      password: '12345678',
    });
    console.log(res.body);
    expect(res.status).toBe(400);
  });

  it('create user with invalid password', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '123',
    });
    console.log(res.body);
    expect(res.status).toBe(400);
  });
});
