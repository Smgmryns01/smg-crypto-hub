import Text "mo:base/Text";
import Time "mo:base/Time";
import Config "config";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Types "types";

module {



  public type User = Types.User;
  public type Role = Types.Role;
  public type UserResult<T> = Types.UserResult<T>;

  public func now() : Int {
    Time.now()
  };

 public func isAdmin(
  caller : Principal.Principal,
  user : ?Types.User
) : Bool {

  if (Principal.toText(caller) == Config.FOUNDER_PRINCIPAL) {
    return true;
  };

  switch (user) {
    case (?u) {
      u.role == #Admin
    };

    case null {
      false
    };
  }
};

  public func normalizeUsername(username : Text) : Text {
    username
  };

  public func normalizeEmail(email : Text) : Text {
    email
  };

  public func buildUser(
    caller : Principal.Principal,
    username : Text,
    email : Text,
    role : Role,
    now : Int,
  ) : User {
    {
      principal = caller;
      username = username;
      email = email;
      role = role;
      emailVerified = false;
      createdAt = now;
      updatedAt = now;
    }
  };

  public func serializeUsers(users : TrieMap.TrieMap<Principal.Principal, User>) : [(Principal.Principal, User)] {
    Iter.toArray(users.entries())
  };

  public func deserializeUsers(entries : [(Principal.Principal, User)], users : TrieMap.TrieMap<Principal.Principal, User>) : () {
    for ((principal, user) in entries.vals()) {
      users.put(principal, user)
    }
  };
}
