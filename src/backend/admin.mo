import Principal "mo:base/Principal";
import Config "./config";
import Types "./types";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";

module {

  // ==================================================
  // Founder
  // ==================================================

  public func isFounder(
    caller : Principal.Principal
  ) : Bool {

    caller == Principal.fromText(
      Config.FOUNDER_PRINCIPAL
    )

  };

  // ==================================================
  // Admin
  // ==================================================

  public func isAdmin(
  admins : TrieMap.TrieMap<Principal.Principal, Bool>,
  caller : Principal.Principal,
  user : ?Types.User
) : Bool {

  if (isFounder(caller)) {
    return true;
  };

  switch (admins.get(caller)) {
    case (?_) {
      return true;
    };
    case null {};
  };

  switch (user) {
    case (?u) { u.role == #Admin };
    case null { false };
   }
  };

  public func addAdmin(
  admins : TrieMap.TrieMap<Principal.Principal, Bool>,
  principal : Principal.Principal
) {
  admins.put(principal, true);
};

public func removeAdmin(
  admins : TrieMap.TrieMap<Principal.Principal, Bool>,
  principal : Principal.Principal
) {
  admins.delete(principal);
};

public func listAdmins(
  admins : TrieMap.TrieMap<Principal.Principal, Bool>
) : [Principal.Principal] {

  Iter.toArray(admins.keys())

};

}