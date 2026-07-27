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
}
