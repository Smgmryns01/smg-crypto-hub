import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

module {
  public type Role = {
    #Student;
    #Mentor;
    #Admin;
  };

  public type LegacyRole = {
    #guest;
    #user;
    #admin;
  };

  public type User = {
    principal : Principal.Principal;
    username : Text;
    email : Text;
    role : Role;
    emailVerified : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type StableUser = {
    principal : Principal.Principal;
    username : Text;
    email : Text;
    role : LegacyRole;
    emailVerified : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type UserResult<T> = Result.Result<T, Text>;

  public func toStableUser(user : User) : StableUser {
    {
      principal = user.principal;
      username = user.username;
      email = user.email;
      role = switch (user.role) {
        case (#Admin) #admin;
        case (#Mentor) #user;
        case (#Student) #user;
      };
      emailVerified = user.emailVerified;
      createdAt = user.createdAt;
      updatedAt = user.updatedAt;
    }
  };

  public func fromStableUser(user : StableUser) : User {
    {
      principal = user.principal;
      username = user.username;
      email = user.email;
      role = switch (user.role) {
        case (#admin) #Admin;
        case (#user) #Student;
        case (#guest) #Student;
      };
      emailVerified = user.emailVerified;
      createdAt = user.createdAt;
      updatedAt = user.updatedAt;
    }
  }; 

 public type CourseLevel = {
    #Beginner;
    #Intermediate;
    #Advanced;
  };

  public type CourseCategory = {
    #CryptoBasics;
    #Blockchain;
    #ICPDevelopment;
    #DeFi;
    #NFT;
    #Security;
    #Web3;
  };

public type Course = {
  id : Text;
  title : Text;
  description : Text;
  instructor : Text;
  thumbnail : Text;
  duration : Nat;
  lessons : Nat;
  featured : Bool;
  published : Bool;
  level : CourseLevel;
  category : CourseCategory;
  createdAt : Int;
  updatedAt : Int;
};

public type Enrollment = {
  student : Principal.Principal;
  courseId : Text;

  enrolledAt : Int;
  updatedAt : Int;

  progress : Nat;

  completedLessons : [Text];
  lastLesson : ?Text;

  completed : Bool;
  completedAt : ?Int;
};

public type EnrollmentResult<T> = Result.Result<T, Text>;

  // =========================
  // Certificate System
  // =========================

  public type Certificate = {
    id : Text;
    student : Principal.Principal;
    courseId : Text;
    courseTitle : Text;

    issuedAt : Int;
    completedAt : Int;

    issuer : Text;
    verified : Bool;
  };

  public type StableCertificate = Certificate;

  public type CertificateResult<T> = Result.Result<T, Text>;

  // =========================
  // Mentor System
  // =========================

  public type MentorStatus = {
    #Pending;
    #Approved;
    #Rejected;
  };

  public type Mentor = {
    principal : Principal.Principal;
    username : Text;

    bio : Text;
    expertise : Text;

    status : MentorStatus;

    createdAt : Int;
    updatedAt : Int;
  };

  public type StableMentor = Mentor;

  public type MentorResult<T> = Result.Result<T, Text>;

  public type DashboardStats = {
  totalUsers : Nat;
  totalCourses : Nat;
  totalMentors : Nat;
  pendingMentors : Nat;
  totalCertificates : Nat;
  totalEnrollments : Nat;
};

}