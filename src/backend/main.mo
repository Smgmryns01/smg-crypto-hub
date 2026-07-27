import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";
import Users "users";
import Utils "utils";

persistent actor Backend {
  type User = Types.User;
  type StableUser = Types.StableUser;
  type Role = Types.Role;
  type UserResult<T> = Types.UserResult<T>;

  stable var usersEntries : [(Principal.Principal, StableUser)] = [];
  stable var usernameEntries : [(Text, Principal.Principal)] = [];

  transient var users = TrieMap.TrieMap<Principal.Principal, User>(Principal.equal, Principal.hash);
  transient var usernameIndex = TrieMap.TrieMap<Text, Principal.Principal>(Text.equal, Text.hash);

  system func preupgrade() {
    let buffer = Buffer.Buffer<(Principal.Principal, StableUser)>(users.size());
    for ((principal, user) in users.entries()) {
      buffer.add((principal, Types.toStableUser(user)));
    };
    usersEntries := Buffer.toArray(buffer);
    usernameEntries := Iter.toArray(usernameIndex.entries());
  };

  system func postupgrade() {
    users := TrieMap.TrieMap<Principal.Principal, User>(Principal.equal, Principal.hash);
    usernameIndex := TrieMap.TrieMap<Text, Principal.Principal>(Text.equal, Text.hash);

    for ((principal, user) in usersEntries.vals()) {
      users.put(principal, Types.fromStableUser(user));
    };

    for ((username, principal) in usernameEntries.vals()) {
      usernameIndex.put(username, principal);
    };
  };

  public query func health() : async Text {
    "SMG Crypto Hub backend is ready";
  };

  public query func version() : async Text {
    "0.1.0";
  };

  public shared ({ caller }) func registerUser(username : Text, email : Text) : async UserResult<User> {
    Users.registerUser(users, usernameIndex, caller, username, email, Time.now())
  };

  public shared query ({ caller }) func getMyProfile() : async UserResult<User> {
    Users.getMyProfile(users, caller)
  };

  public shared ({ caller }) func updateProfile(username : Text) : async UserResult<User> {
    Users.updateProfile(users, usernameIndex, caller, username, Time.now())
  };

  public shared query ({ caller }) func userExists() : async Bool {
    Users.userExists(users, caller)
  };

  public shared ({ caller }) func verifyEmail() : async UserResult<User> {
    Users.verifyEmail(users, caller, Time.now())
  };

  public shared ({ caller }) func listUsers() : async [User] {
    switch (Users.getMyProfile(users, caller)) {
      case (#ok(user)) {
        if (Utils.isAdmin(caller, ?user)) {
          Users.listUsers(users)
        } else {
          []
        }
      };
      case (#err(_)) { [] }
    }
  };

  public shared ({ caller }) func getUser(principal : Principal.Principal) : async UserResult<User> {
    switch (Users.getMyProfile(users, caller)) {
      case (#ok(user)) {
        if (Utils.isAdmin(caller, ?user)) {
          Users.getUser(users, principal)
        } else {
          #err("Admin access required")
        }
      };
      case (#err(_)) { #err("Admin access required") }
    }
  };

  public shared ({ caller }) func changeUserRole(principal : Principal.Principal, role : Role) : async UserResult<User> {
    switch (Users.getMyProfile(users, caller)) {
      case (#ok(user)) {
        if (Utils.isAdmin(caller, ?user)) {
          Users.changeUserRole(users, principal, role, Time.now())
        } else {
          #err("Admin access required")
        }
      };
      case (#err(_)) { #err("Admin access required") }
    }
  };

  public shared ({ caller }) func deleteUser(principal : Principal.Principal) : async UserResult<User> {
    switch (Users.getMyProfile(users, caller)) {
      case (#ok(user)) {
        if (Utils.isAdmin(caller, ?user)) {
          Users.deleteUser(users, usernameIndex, principal)
        } else {
          #err("Admin access required")
        }
      };
      case (#err(_)) { #err("Admin access required") }
    }
  };
}
