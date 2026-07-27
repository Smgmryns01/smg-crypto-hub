export const idlFactory = ({ IDL }) => {
  const Principal = IDL.Principal;
  const Role = IDL.Variant({
    'Mentor' : IDL.Null,
    'Student' : IDL.Null,
    'Admin' : IDL.Null,
  });
  const User = IDL.Record({
    'principal' : Principal,
    'emailVerified' : IDL.Bool,
    'username' : IDL.Text,
    'createdAt' : IDL.Int,
    'role' : Role,
    'email' : IDL.Text,
    'updatedAt' : IDL.Int,
  });
  const UserResult = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  return IDL.Service({
    'changeUserRole' : IDL.Func([Principal, Role], [UserResult], []),
    'deleteUser' : IDL.Func([Principal], [UserResult], []),
    'getMyProfile' : IDL.Func([], [UserResult], ['query']),
    'getUser' : IDL.Func([Principal], [UserResult], []),
    'health' : IDL.Func([], [IDL.Text], ['query']),
    'listUsers' : IDL.Func([], [IDL.Vec(User)], []),
    'registerUser' : IDL.Func([IDL.Text, IDL.Text], [UserResult], []),
    'updateProfile' : IDL.Func([IDL.Text], [UserResult], []),
    'userExists' : IDL.Func([], [IDL.Bool], ['query']),
    'verifyEmail' : IDL.Func([], [UserResult], []),
    'version' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
