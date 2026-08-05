export const idlFactory = ({ IDL }) => {
  const Principal = IDL.Principal;
  const MentorStatus = IDL.Variant({
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Mentor = IDL.Record({
    'bio' : IDL.Text,
    'status' : MentorStatus,
    'principal' : Principal,
    'username' : IDL.Text,
    'createdAt' : IDL.Int,
    'updatedAt' : IDL.Int,
    'expertise' : IDL.Text,
  });
  const MentorResult = IDL.Variant({ 'ok' : Mentor, 'err' : IDL.Text });
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
  const Enrollment = IDL.Record({
    'completedAt' : IDL.Opt(IDL.Int),
    'completed' : IDL.Bool,
    'lastLesson' : IDL.Opt(IDL.Text),
    'updatedAt' : IDL.Int,
    'progress' : IDL.Nat,
    'completedLessons' : IDL.Vec(IDL.Text),
    'enrolledAt' : IDL.Int,
    'student' : Principal,
    'courseId' : IDL.Text,
  });
  const EnrollmentResult = IDL.Variant({ 'ok' : Enrollment, 'err' : IDL.Text });
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
  const DashboardStats = IDL.Record({
    'totalEnrollments' : IDL.Nat,
    'pendingMentors' : IDL.Nat,
    'totalMentors' : IDL.Nat,
    'totalUsers' : IDL.Nat,
    'totalCourses' : IDL.Nat,
    'totalCertificates' : IDL.Nat,
  });
  const Certificate = IDL.Record({
    'id' : IDL.Text,
    'completedAt' : IDL.Int,
    'verified' : IDL.Bool,
    'issuer' : IDL.Text,
    'student' : Principal,
    'issuedAt' : IDL.Int,
    'courseTitle' : IDL.Text,
    'courseId' : IDL.Text,
  });
  const CertificateResult = IDL.Variant({
    'ok' : Certificate,
    'err' : IDL.Text,
  });
  return IDL.Service({
    'addAdmin' : IDL.Func([Principal], [IDL.Bool], []),
    'approveMentor' : IDL.Func([Principal], [MentorResult], []),
    'becomeMentor' : IDL.Func([IDL.Text, IDL.Text], [MentorResult], []),
    'changeUserRole' : IDL.Func([Principal, Role], [UserResult], []),
    'completeLesson' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat],
        [EnrollmentResult],
        [],
      ),
    'deleteUser' : IDL.Func([Principal], [UserResult], []),
    'getCourse' : IDL.Func([IDL.Text], [IDL.Opt(Course)], ['query']),
    'getCourses' : IDL.Func([], [IDL.Vec(Course)], ['query']),
    'getDashboardStats' : IDL.Func([], [DashboardStats], ['query']),
    'getFeaturedCourses' : IDL.Func([], [IDL.Vec(Course)], ['query']),
    'getMyProfile' : IDL.Func([], [UserResult], ['query']),
    'getMyProgress' : IDL.Func([IDL.Text], [IDL.Opt(Enrollment)], ['query']),
    'getUser' : IDL.Func([Principal], [UserResult], []),
    'health' : IDL.Func([], [IDL.Text], ['query']),
    'issueCertificate' : IDL.Func([IDL.Text], [CertificateResult], []),
    'listAdmins' : IDL.Func([], [IDL.Vec(Principal)], ['query']),
    'listMentors' : IDL.Func([], [IDL.Vec(Mentor)], ['query']),
    'listPendingMentors' : IDL.Func([], [IDL.Vec(Mentor)], []),
    'listUsers' : IDL.Func([], [IDL.Vec(User)], []),
    'myMentorProfile' : IDL.Func([], [IDL.Opt(Mentor)], ['query']),
    'registerUser' : IDL.Func([IDL.Text, IDL.Text], [UserResult], []),
    'rejectMentor' : IDL.Func([Principal], [MentorResult], []),
    'removeAdmin' : IDL.Func([Principal], [IDL.Bool], []),
    'updateProfile' : IDL.Func([IDL.Text], [UserResult], []),
    'userExists' : IDL.Func([], [IDL.Bool], ['query']),
    'verifyCertificate' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'verifyEmail' : IDL.Func([], [UserResult], []),
    'version' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
