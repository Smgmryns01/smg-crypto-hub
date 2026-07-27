import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";

module {
  public type Role = {
    #guest;
    #user;
    #admin;
  };

  public type User = {
    principal : Principal.Principal;
    username : Text;
    email : Text;
    role : Role;
    createdAt : Int;
    updatedAt : Int;
    emailVerified : Bool;
  };

  public type UserResult<T> = Result.Result<T, Text>;

  public func registerUser(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    usernameIndex : TrieMap.TrieMap<Text, Principal.Principal>,
    caller : Principal.Principal,
    username : Text,
    email : Text,
    now : Int,
  ) : UserResult<User> {
    if (Text.size(username) == 0) {
      return #err("Username cannot be empty");
    };

    if (Text.size(email) == 0) {
      return #err("Email cannot be empty");
    };

    switch (users.get(caller)) {
      case (?_) {
        return #err("User already registered");
      };
      case null {};
    };

    switch (usernameIndex.get(username)) {
      case (?_) {
        return #err("Username already taken");
      };
      case null {};
    };

    for ((_, existingUser) in users.entries()) {
      if (Text.equal(existingUser.email, email)) {
        return #err("Email already registered");
      };
    };

    let user : User = {
      principal = caller;
      username = username;
      email = email;
      role = #user;
      createdAt = now;
      updatedAt = now;
      emailVerified = false;
    };

    users.put(caller, user);
    usernameIndex.put(username, caller);
    #ok(user)
  };

  public func getMyProfile(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    caller : Principal.Principal,
  ) : UserResult<User> {
    switch (users.get(caller)) {
      case (?user) { #ok(user) };
      case null { #err("Profile not found") };
    }
  };

  public func updateProfile(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    usernameIndex : TrieMap.TrieMap<Text, Principal.Principal>,
    caller : Principal.Principal,
    username : Text,
    now : Int,
  ) : UserResult<User> {
    if (Text.size(username) == 0) {
      return #err("Username cannot be empty");
    };

    switch (users.get(caller)) {
      case null {
        #err("Profile not found")
      };
      case (?existingUser) {
        switch (usernameIndex.get(username)) {
          case (?currentOwner) {
            if (Principal.equal(currentOwner, caller)) {
              let updatedUser : User = {
                existingUser with username = username;
                updatedAt = now;
              };
              users.put(caller, updatedUser);
              usernameIndex.put(username, caller);
              #ok(updatedUser)
            } else {
              #err("Username already taken")
            }
          };
          case null {
            usernameIndex.delete(existingUser.username);
            let updatedUser : User = {
              existingUser with username = username;
              updatedAt = now;
            };
            users.put(caller, updatedUser);
            usernameIndex.put(username, caller);
            #ok(updatedUser)
          };
        }
      };
    }
  };

  public func verifyEmail(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    caller : Principal.Principal,
    now : Int,
  ) : UserResult<User> {
    switch (users.get(caller)) {
      case null {
        #err("Profile not found")
      };
      case (?existingUser) {
        let updatedUser : User = {
          existingUser with emailVerified = true;
          updatedAt = now;
        };
        users.put(caller, updatedUser);
        #ok(updatedUser)
      };
    }
  };

  public func userExists(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    caller : Principal.Principal,
  ) : Bool {
    switch (users.get(caller)) {
      case (?_) { true };
      case null { false };
    }
  };
}
