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
    const res1 = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '12345678',
    });
    const res2 = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '123456789',
    });
    testHelper.cleanUpCallbacks.push(async () => {
      if (res2.body.id || res1.body.id) {
        await testHelper.prismaClient.user.delete({
          where: {
            email: '123@qq.com',
          },
        });
      }
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
    testHelper.cleanUpCallbacks.push(async () => {
      if (res.body.id) {
        await testHelper.prismaClient.user.delete({
          where: {
            id: res.body.id,
          },
        });
      }
    });
    expect(res.status).toBe(400);
  });

  it('create user with invalid password', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '123',
    });
    testHelper.cleanUpCallbacks.push(async () => {
      if (res.body.id) {
        await testHelper.prismaClient.user.delete({
          where: {
            id: res.body.id,
          },
        });
      }
    });
    expect(res.status).toBe(400);
  });

  it('create user with invalid role', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '123456578',
      roleId: 'invalid',
    });
    testHelper.cleanUpCallbacks.push(async () => {
      if (res.body.id) {
        await testHelper.prismaClient.user.delete({
          where: {
            id: res.body.id,
          },
        });
      }
    });
    expect(res.status).toBe(400);
  });

  it('create user with profile', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '12345678',
      phone: '18986272222',
    });
    testHelper.cleanUpCallbacks.push(async () => {
      if (res.body.id) {
        await testHelper.prismaClient.user.delete({
          where: {
            id: res.body.id,
          },
        });
      }
    });
    expect(res.status).toBe(201);
  });

  it('create user with invalid profile', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.post('/user').set('Authorization', `${token}`).send({
      email: '123@qq.com',
      password: '12345678',
      phone: '12345678901',
    });
    testHelper.cleanUpCallbacks.push(async () => {
      if (res.body.id) {
        await testHelper.prismaClient.user.delete({
          where: {
            id: res.body.id,
          },
        });
      }
    });
  });

  it('get user list', async () => {
    const token = await testHelper.genToken('admin');
    const req = testHelper.request;
    const res = await req.get('/user').set('Authorization', `${token}`).send({
      page: 1,
      pageSize: 10,
    });
    expect(res.status).toBe(200);
  });

  it('get user list without permission', async () => {
    const token = await testHelper.genToken('user');
    const req = testHelper.request;
    const res = await req.get('/user').set('Authorization', `${token}`);
    expect(res.status).toBe(403);
  });

  it('get user list without token', async () => {
    const req = testHelper.request;
    const res = await req.get('/user');
    expect(res.status).toBe(401);
  });

  it('get user list with invalid token', async () => {
    const req = testHelper.request;
    const res = await req.get('/user').set('Authorization', 'asdf');
    expect(res.status).toBe(401);
  });

  it('get user by id', async () => {
    const token = await testHelper.genToken('admin');
    const user = await testHelper.genUser({
      email: '123@qq.com',
      pass: '12345678',
      role: 'user',
    });
    const req = testHelper.request;
    const res = await req
      .get(`/user/${user.id}`)
      .set('Authorization', `${token}`);
    testHelper.cleanUpCallbacks.push(async () => {
      await testHelper.prismaClient.user.delete({
        where: {
          id: user.id,
        },
      });
    });
    expect(res.status).toBe(200);
  });

  it('get user by id without permission', async () => {
    const token = await testHelper.genToken('user');
    const user = await testHelper.genUser({
      email: '123@qq.com',
      pass: '12345678',
      role: 'user',
    });
    const req = testHelper.request;
    const res = await req
      .get(`/user/${user.id}`)
      .set('Authorization', `${token}`);
    testHelper.cleanUpCallbacks.push(async () => {
      if (user.id) {
        await testHelper.prismaClient.user.delete({
          where: {
            id: user.id,
          },
        });
      }
    });
    expect(res.status).toBe(403);
  });
});
