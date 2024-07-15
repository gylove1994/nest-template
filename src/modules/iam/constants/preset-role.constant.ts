import { Role } from '@prisma/client';

export const PRESET_ROLE = [
  {
    name: 'admin',
    description: '系统内置角色，不可删除',
    deletable: false,
    status: 'ACTIVE' as Role['status'],
  },
  {
    name: 'user',
    description: '系统内置角色，不可删除',
    deletable: false,
    status: 'ACTIVE' as Role['status'],
  },
  {
    name: 'guest',
    description: '系统内置角色，不可删除',
    deletable: false,
    status: 'ACTIVE' as Role['status'],
  },
];
