import { resultError, resultSuccess } from '../_util';
import Mock from 'mockjs';
function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realName: 'Vben Admin',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      desc: 'tester',
      token: 'fakeToken2',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakeCodeList = {
  1: ['1000', '3000', '5000'],

  2: ['2000', '4000', '6000'],
};

Mock.mock('http://test.com/test/login', 'post', ({ body }) => {
  const { username, password } = JSON.parse(body);
  console.log(username, password);
  const checkUser = createFakeUserList().find(
    (item) => item.username === username && password === item.password
  );
  if (!checkUser) {
    return resultError('Incorrect account or password！');
  }
  const { userId, username: _username, token, realName, desc, roles } = checkUser;
  return resultSuccess({
    roles,
    userId,
    username: _username,
    token,
    realName,
    desc,
  });
});
Mock.mock('http://test.com/test/getUserInfoById', 'post', ({ body }) => {
  const { userId } = JSON.parse(body);
  console.log(userId);
  const checkUser = createFakeUserList().find((item) => item.userId === userId);
  if (!checkUser) {
    return resultError('The corresponding user information was not obtained!');
  }
  return resultSuccess(checkUser);
});
Mock.mock('http://test.com/test/getPermCodeByUserId', 'post', ({ body }) => {
  const { userId } = JSON.parse(body);
  if (!userId) {
    return resultError('userId is not null!');
  }
  const codeList = fakeCodeList[userId];

  return resultSuccess(codeList);
});
