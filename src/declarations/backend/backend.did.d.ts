import type { Principal } from '@icp-sdk/core/principal';
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export interface Certificate {
  'id' : string,
  'completedAt' : bigint,
  'verified' : boolean,
  'issuer' : string,
  'student' : Principal,
  'issuedAt' : bigint,
  'courseTitle' : string,
  'courseId' : string,
}
export type CertificateResult = { 'ok' : Certificate } |
  { 'err' : string };
export interface Course {
  'id' : string,
  'title' : string,
  'featured' : boolean,
  'duration' : bigint,
  'thumbnail' : string,
  'instructor' : string,
  'published' : boolean,
  'createdAt' : bigint,
  'description' : string,
  'lessons' : bigint,
  'level' : CourseLevel,
  'updatedAt' : bigint,
  'category' : CourseCategory,
}
export type CourseCategory = { 'NFT' : null } |
  { 'DeFi' : null } |
  { 'Security' : null } |
  { 'Web3' : null } |
  { 'CryptoBasics' : null } |
  { 'Blockchain' : null } |
  { 'ICPDevelopment' : null };
export type CourseLevel = { 'Beginner' : null } |
  { 'Advanced' : null } |
  { 'Intermediate' : null };
export interface DashboardStats {
  'totalEnrollments' : bigint,
  'pendingMentors' : bigint,
  'totalMentors' : bigint,
  'totalUsers' : bigint,
  'totalCourses' : bigint,
  'totalCertificates' : bigint,
}
export interface Enrollment {
  'completedAt' : [] | [bigint],
  'completed' : boolean,
  'lastLesson' : [] | [string],
  'updatedAt' : bigint,
  'progress' : bigint,
  'completedLessons' : Array<string>,
  'enrolledAt' : bigint,
  'student' : Principal,
  'courseId' : string,
}
export type EnrollmentResult = { 'ok' : Enrollment } |
  { 'err' : string };
export interface Mentor {
  'bio' : string,
  'status' : MentorStatus,
  'principal' : Principal,
  'username' : string,
  'createdAt' : bigint,
  'updatedAt' : bigint,
  'expertise' : string,
}
export type MentorResult = { 'ok' : Mentor } |
  { 'err' : string };
export type MentorStatus = { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
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
  'addAdmin' : ActorMethod<[Principal], boolean>,
  'approveMentor' : ActorMethod<[Principal], MentorResult>,
  'becomeMentor' : ActorMethod<[string, string], MentorResult>,
  'changeUserRole' : ActorMethod<[Principal, Role], UserResult>,
  'completeLesson' : ActorMethod<[string, string, bigint], EnrollmentResult>,
  'deleteUser' : ActorMethod<[Principal], UserResult>,
  'getCourse' : ActorMethod<[string], [] | [Course]>,
  'getCourses' : ActorMethod<[], Array<Course>>,
  'getDashboardStats' : ActorMethod<[], DashboardStats>,
  'getFeaturedCourses' : ActorMethod<[], Array<Course>>,
  'getMyProfile' : ActorMethod<[], UserResult>,
  'getMyProgress' : ActorMethod<[string], [] | [Enrollment]>,
  'getUser' : ActorMethod<[Principal], UserResult>,
  'health' : ActorMethod<[], string>,
  'issueCertificate' : ActorMethod<[string], CertificateResult>,
  'listAdmins' : ActorMethod<[], Array<Principal>>,
  'listMentors' : ActorMethod<[], Array<Mentor>>,
  'listPendingMentors' : ActorMethod<[], Array<Mentor>>,
  'listUsers' : ActorMethod<[], Array<User>>,
  'myMentorProfile' : ActorMethod<[], [] | [Mentor]>,
  'registerUser' : ActorMethod<[string, string], UserResult>,
  'rejectMentor' : ActorMethod<[Principal], MentorResult>,
  'removeAdmin' : ActorMethod<[Principal], boolean>,
  'updateProfile' : ActorMethod<[string], UserResult>,
  'userExists' : ActorMethod<[], boolean>,
  'verifyCertificate' : ActorMethod<[string], boolean>,
  'verifyEmail' : ActorMethod<[], UserResult>,
  'version' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
