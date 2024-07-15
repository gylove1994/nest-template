import { User as _User } from './user';
import { Profile as _Profile } from './profile';
import { Session as _Session } from './session';
import { Role as _Role } from './role';
import { Permission as _Permission } from './permission';
import { PermissionGroup as _PermissionGroup } from './permission_group';
import { ApiPermission as _ApiPermission } from './api_permission';
import { ApiPermissionGroup as _ApiPermissionGroup } from './api_permission_group';
import { OperationLog as _OperationLog } from './operation_log';

export namespace PrismaModel {
  export class User extends _User {}
  export class Profile extends _Profile {}
  export class Session extends _Session {}
  export class Role extends _Role {}
  export class Permission extends _Permission {}
  export class PermissionGroup extends _PermissionGroup {}
  export class ApiPermission extends _ApiPermission {}
  export class ApiPermissionGroup extends _ApiPermissionGroup {}
  export class OperationLog extends _OperationLog {}

  export const extraModels = [
    User,
    Profile,
    Session,
    Role,
    Permission,
    PermissionGroup,
    ApiPermission,
    ApiPermissionGroup,
    OperationLog,
  ];
}
