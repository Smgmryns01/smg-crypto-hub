import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";

import Types "./types";

module {

  public func becomeMentor(
    mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,
    caller : Principal.Principal,
    username : Text,
    bio : Text,
    expertise : Text,
  ) : Types.MentorResult<Types.Mentor> {

    switch (mentors.get(caller)) {

      case (?mentor) {
        #ok(mentor)
      };

      case null {

        let mentor : Types.Mentor = {
          principal = caller;
          username = username;

          bio = bio;
          expertise = expertise;

          status = #Pending;

          createdAt = Time.now();
          updatedAt = Time.now();
        };

        mentors.put(caller, mentor);

        #ok(mentor)
      };
    }
  };

  public func getMyMentorProfile(
    mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,
    caller : Principal.Principal,
  ) : ?Types.Mentor {

    mentors.get(caller)
  };

  public func listMentors(
    mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,
  ) : [Types.Mentor] {

    Iter.toArray(mentors.vals())
  };

  public func listPendingMentors(
  mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,
) : [Types.Mentor] {

  Array.filter<Types.Mentor>(
    Iter.toArray(mentors.vals()),
    func(m) {
      switch (m.status) {
        case (#Pending) { true };
        case (_) { false };
      }
    }
  )
  
  };

  public func approveMentor(
    mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,
    principal : Principal.Principal,
  ) : Types.MentorResult<Types.Mentor> {

    switch (mentors.get(principal)) {

      case null {
        #err("Mentor not found.")
      };

      case (?mentor) {

        let updated : Types.Mentor = {
          principal = mentor.principal;
          username = mentor.username;

          bio = mentor.bio;
          expertise = mentor.expertise;

          status = #Approved;

          createdAt = mentor.createdAt;
          updatedAt = Time.now();
        };

        mentors.put(principal, updated);

        #ok(updated)
      };
    }
  };

  public func rejectMentor(
    mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,
    principal : Principal.Principal,
  ) : Types.MentorResult<Types.Mentor> {

    switch (mentors.get(principal)) {

      case null {
        #err("Mentor not found.")
      };

      case (?mentor) {

        let updated : Types.Mentor = {
          principal = mentor.principal;
          username = mentor.username;

          bio = mentor.bio;
          expertise = mentor.expertise;

          status = #Rejected;

          createdAt = mentor.createdAt;
          updatedAt = Time.now();
        };

        mentors.put(principal, updated);

        #ok(updated)
      };
    }
  };

public func getApprovedMentors(
  mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>
) : [Types.Mentor] {

  Array.filter<Types.Mentor>(
    Iter.toArray(mentors.vals()),
    func(m) {
      m.status == #Approved
    }
  )
};

public func isMentor(
  mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,
  principal : Principal.Principal
) : Bool {

  switch (mentors.get(principal)) {
    case (?mentor) {
      mentor.status == #Approved
    };
    case null {
      false
    };
  }
};

public func mentorStats(
  mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>
) : Nat {

  Array.filter<Types.Mentor>(
    Iter.toArray(mentors.vals()),
    func(m) {
      m.status == #Approved
    }
  ).size()
};

}