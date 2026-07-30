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
  const CourseLevel = IDL.Variant({
    'Beginner' : IDL.Null,
    'Advanced' : IDL.Null,
    'Intermediate' : IDL.Null,
  });
  const CourseCategory = IDL.Variant({
    'NFT' : IDL.Null,
    'DeFi' : IDL.Null,
    'Security' : IDL.Null,
    'Web3' : IDL.Null,
    'CryptoBasics' : IDL.Null,
    'Blockchain' : IDL.Null,
    'ICPDevelopment' : IDL.Null,
  });
  const Course = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'featured' : IDL.Bool,
    'duration' : IDL.Nat,
    'thumbnail' : IDL.Text,
    'instructor' : IDL.Text,
    'published' : IDL.Bool,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'lessons' : IDL.Nat,
    'level' : CourseLevel,
    'updatedAt' : IDL.Int,
    'category' : CourseCategory,
  });
  return IDL.Service({
    'changeUserRole' : IDL.Func([Principal, Role], [UserResult], []),
    'deleteUser' : IDL.Func([Principal], [UserResult], []),
    'getCourse' : IDL.Func([IDL.Text], [IDL.Opt(Course)], ['query']),
    'getCourses' : IDL.Func([], [IDL.Vec(Course)], ['query']),
    'getFeaturedCourses' : IDL.Func([], [IDL.Vec(Course)], ['query']),
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
