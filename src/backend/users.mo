import Principal "mo:base/Principal";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Types "types";
import Utils "utils";

module {
  public type User = Types.User;
  public type Role = Types.Role;
  public type UserResult<T> = Types.UserResult<T>;

  public func registerUser(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    usernameIndex : TrieMap.TrieMap<Text, Principal.Principal>,
    caller : Principal.Principal,
    username : Text,
    email : Text,
    now : Int,
  ) : UserResult<User> {
    let normalizedUsername = Utils.normalizeUsername(username);
    let normalizedEmail = Utils.normalizeEmail(email);

    if (Text.size(normalizedUsername) == 0) {
      return #err("Username cannot be empty")
    };

    if (Text.size(normalizedEmail) == 0) {
      return #err("Email cannot be empty")
    };

    switch (users.get(caller)) {
      case (?_) { return #err("Principal already registered") };
      case null {}
    };

    switch (usernameIndex.get(normalizedUsername)) {
      case (?_) { return #err("Username already taken") };
      case null {}
    };

    for ((_, existingUser) in users.entries()) {
      if (Text.equal(existingUser.email, normalizedEmail)) {
        return #err("Email already registered")
      }
    };

    let user = Utils.buildUser(caller, normalizedUsername, normalizedEmail, #Student, now);
    users.put(caller, user);
    usernameIndex.put(normalizedUsername, caller);
    #ok(user)
  };

  public func getMyProfile(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    caller : Principal.Principal,
  ) : UserResult<User> {
    switch (users.get(caller)) {
      case (?user) { #ok(user) };
      case null { #err("Profile not found") }
    }
  };

  public func updateProfile(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    usernameIndex : TrieMap.TrieMap<Text, Principal.Principal>,
    caller : Principal.Principal,
    username : Text,
    now : Int,
  ) : UserResult<User> {
    let normalizedUsername = Utils.normalizeUsername(username);

    if (Text.size(normalizedUsername) == 0) {
      return #err("Username cannot be empty")
    };

    switch (users.get(caller)) {
      case null { #err("Profile not found") };
      case (?existingUser) {
        switch (usernameIndex.get(normalizedUsername)) {
          case (?currentOwner) {
            if (Principal.equal(currentOwner, caller)) {
              let updatedUser = {
                existingUser with username = normalizedUsername;
                updatedAt = now;
              };
              users.put(caller, updatedUser);
              usernameIndex.put(normalizedUsername, caller);
              #ok(updatedUser)
            } else {
              #err("Username already taken")
            }
          };
          case null {
            usernameIndex.delete(existingUser.username);
            let updatedUser = {
              existingUser with username = normalizedUsername;
              updatedAt = now;
            };
            users.put(caller, updatedUser);
            usernameIndex.put(normalizedUsername, caller);
            #ok(updatedUser)
          };
        }
      };
    }
  };

  public func userExists(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    caller : Principal.Principal,
  ) : Bool {
    switch (users.get(caller)) {
      case (?_) { true };
      case null { false }
    }
  };

  public func verifyEmail(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    caller : Principal.Principal,
    now : Int,
  ) : UserResult<User> {
    switch (users.get(caller)) {
      case null { #err("Profile not found") };
      case (?existingUser) {
        let updatedUser = {
          existingUser with emailVerified = true;
          updatedAt = now;
        };
        users.put(caller, updatedUser);
        #ok(updatedUser)
      };
    }
  };

  public func listUsers(
    users : TrieMap.TrieMap<Principal.Principal, User>,
  ) : [User] {
    Iter.toArray(users.vals())
  };

  public func getUser(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    target : Principal.Principal,
  ) : UserResult<User> {
    switch (users.get(target)) {
      case (?user) { #ok(user) };
      case null { #err("User not found") }
    }
  };

  public func changeUserRole(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    target : Principal.Principal,
    role : Role,
    now : Int,
  ) : UserResult<User> {
    switch (users.get(target)) {
      case null { #err("User not found") };
      case (?existingUser) {
        let updatedUser = {
          existingUser with role = role;
          updatedAt = now;
        };
        users.put(target, updatedUser);
        #ok(updatedUser)
      };
    }
  };

  public func deleteUser(
    users : TrieMap.TrieMap<Principal.Principal, User>,
    usernameIndex : TrieMap.TrieMap<Text, Principal.Principal>,
    target : Principal.Principal,
  ) : UserResult<User> {
    switch (users.get(target)) {
      case null { #err("User not found") };
      case (?existingUser) {
        users.delete(target);
        usernameIndex.delete(existingUser.username);
        #ok(existingUser)
      };
    }
  };
}
