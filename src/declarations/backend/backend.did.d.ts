import type { Principal } from '@icp-sdk/core/principal';
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export type Principal = Principal;
export type Role = { 'Mentor' : null } |
  { 'Student' : null } |
  { 'Admin' : null };
export interface User {
  'principal' : Principal,
  'emailVerified' : boolean,
  'username' : string,
  'createdAt' : bigint,
  'role' : Role,
  'email' : string,
  'updatedAt' : bigint,
}
export type UserResult = { 'ok' : User } |
  { 'err' : string };
export interface _SERVICE {
  'changeUserRole' : ActorMethod<[Principal, Role], UserResult>,
  'deleteUser' : ActorMethod<[Principal], UserResult>,
  'getMyProfile' : ActorMethod<[], UserResult>,
  'getUser' : ActorMethod<[Principal], UserResult>,
  'health' : ActorMethod<[], string>,
  'listUsers' : ActorMethod<[], Array<User>>,
  'registerUser' : ActorMethod<[string, string], UserResult>,
  'updateProfile' : ActorMethod<[string], UserResult>,
  'userExists' : ActorMethod<[], boolean>,
  'verifyEmail' : ActorMethod<[], UserResult>,
  'version' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
