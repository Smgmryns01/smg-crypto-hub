import Courses "./courses";
import Admin "./admin";
import Certificates "./certificates";
import Enrollment "./enrollments";
import Mentors "./mentors";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";
import Users "users";
import Utils "utils";
import Dashboard "./dashboard";

persistent actor Backend {
  type User = Types.User;
  type StableUser = Types.StableUser;
  type Role = Types.Role;
  type UserResult<T> = Types.UserResult<T>;

  stable var usersEntries : [(Principal.Principal, StableUser)] = [];
  stable var usernameEntries : [(Text, Principal.Principal)] = [];
  stable var adminEntries : [Principal.Principal] = [];

  transient var users =
  TrieMap.TrieMap<Principal.Principal, User>(
    Principal.equal,
    Principal.hash
  );

transient var usernameIndex =
  TrieMap.TrieMap<Text, Principal.Principal>(
    Text.equal,
    Text.hash
  );

transient var enrollments =
  TrieMap.TrieMap<Text, Types.Enrollment>(
    Text.equal,
    Text.hash
  );

transient var certificates =
  TrieMap.TrieMap<Text, Types.Certificate>(
    Text.equal,
    Text.hash
  );

transient var mentors =
  TrieMap.TrieMap<Principal.Principal, Types.Mentor>(
    Principal.equal,
    Principal.hash
  );

transient var admins =
  TrieMap.TrieMap<Principal.Principal, Bool>(
    Principal.equal,
    Principal.hash
  );

  system func preupgrade() {
    let buffer = Buffer.Buffer<(Principal.Principal, StableUser)>(users.size());
    for ((principal, user) in users.entries()) {
      buffer.add((principal, Types.toStableUser(user)));
    };
    usersEntries := Buffer.toArray(buffer);
    usernameEntries := Iter.toArray(usernameIndex.entries());
    adminEntries := Iter.toArray(admins.keys());
  };

  system func postupgrade() {

  users := TrieMap.TrieMap<Principal.Principal, User>(
    Principal.equal,
    Principal.hash
  );

  usernameIndex := TrieMap.TrieMap<Text, Principal.Principal>(
    Text.equal,
    Text.hash
  );

  enrollments := TrieMap.TrieMap<Text, Types.Enrollment>(
    Text.equal,
    Text.hash
  );

  certificates := TrieMap.TrieMap<Text, Types.Certificate>(
    Text.equal,
    Text.hash
  );

  mentors := TrieMap.TrieMap<Principal.Principal, Types.Mentor>(
    Principal.equal,
    Principal.hash
  );

  admins := TrieMap.TrieMap<Principal.Principal, Bool>(
    Principal.equal,
    Principal.hash
  );

  for (principal in adminEntries.vals()) {
    admins.put(principal, true);
  };

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
        if (Admin.isAdmin(admins, caller, ?user)) {
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
        if (Admin.isAdmin(admins, caller, ?user)) {
          Users.getUser(users, principal)
        } else {
          #err("Admin access required")
        }
      };
      case (#err(_)) { #err("Admin access required") }
    }
  };

  public shared ({ caller }) func changeUserRole(
  principal : Principal.Principal,
  role : Role
) : async UserResult<User> {

  switch (Users.getMyProfile(users, caller)) {

    case (#ok(user)) {

      if (Admin.isAdmin(admins, caller, ?user)) {
        Users.changeUserRole(users, principal, role, Time.now())
      } else {
        #err("Admin access required")
      };

    };

    case (#err(_)) {
      #err("Admin access required")
    };

  }

  };

  public shared ({ caller }) func deleteUser(principal : Principal.Principal) : async UserResult<User> {
    switch (Users.getMyProfile(users, caller)) {
      case (#ok(user)) {
        if (Admin.isAdmin(admins, caller, ?user)) {
          Users.deleteUser(users, usernameIndex, principal)
        } else {
          #err("Admin access required")
        }
      };
      case (#err(_)) { #err("Admin access required") }
    }

     };

     public shared ({ caller }) func addAdmin(
  principal : Principal.Principal
) : async Bool {

  if (not Admin.isFounder(caller)) {
    return false;
  };

  Admin.addAdmin(admins, principal);

  true
};

public shared ({ caller }) func removeAdmin(
  principal : Principal.Principal
) : async Bool {

  if (not Admin.isFounder(caller)) {
    return false;
  };

  Admin.removeAdmin(admins, principal);

  true
};

public shared query ({ caller }) func listAdmins()
  : async [Principal.Principal] {

  if (not Admin.isAdmin(admins, caller, Users.findUser(users, caller))) {
    return [];
  };

  Admin.listAdmins(admins)
};

  public query func getCourses() : async [Types.Course] {
    Courses.getCourses()
  };

  public query func getCourse(id : Text) : async ?Types.Course {
    Courses.getCourse(id)
  };

  public query func getFeaturedCourses() : async [Types.Course] {
    Courses.getFeaturedCourses()
  };

  public shared ({ caller }) func completeLesson(
  courseId : Text,
  lessonId : Text,
  totalLessons : Nat
) : async Types.EnrollmentResult<Types.Enrollment> {

  Enrollment.completeLesson(
  enrollments,
  caller,
  courseId,
  lessonId,
  totalLessons
)
};

public shared query ({ caller }) func getMyProgress(
  courseId : Text
) : async ?Types.Enrollment {

  Enrollment.getProgress(
  enrollments,
  caller,
  courseId
)

};

  // ==========================
  // Certificate APIs
  // ==========================

  public shared ({ caller }) func issueCertificate(
    courseId : Text
  ) : async Types.CertificateResult<Types.Certificate> {

    switch (Enrollment.getProgress(enrollments, caller, courseId)) {

      case null {
        #err("You are not enrolled in this course.")
      };

      case (?progress) {

        if (not progress.completed) {
          return #err("Course is not completed yet.");
        };

        
 return Certificates.claimCertificate(
  certificates,
  progress,
  courseId,
  "SMG Crypto Hub"
);
  };

   };
  };
  
public query func verifyCertificate(
  certificateId : Text
) : async Bool {

  Certificates.verifyCertificate(
    certificates,
    certificateId
  )
};

// ==========================
// Mentor APIs
// ==========================

public shared ({ caller }) func becomeMentor(
  bio : Text,
  expertise : Text
) : async Types.MentorResult<Types.Mentor> {

  switch (Users.getMyProfile(users, caller)) {

    case (#err(msg)) {
      #err(msg)
    };

    case (#ok(user)) {
      Mentors.becomeMentor(
        mentors,
        caller,
        user.username,
        bio,
        expertise
      )
    };
  }
};

public shared query ({ caller }) func myMentorProfile()
  : async ?Types.Mentor {

  Mentors.getMyMentorProfile(
    mentors,
    caller
  )
};

public query func listMentors()
  : async [Types.Mentor] {

  Mentors.listMentors(
    mentors
  )
};

public shared ({ caller }) func listPendingMentors()
  : async [Types.Mentor] {

  switch (Users.getMyProfile(users, caller)) {

    case (#ok(user)) {

      if (Admin.isAdmin(admins, caller, ?user)) {
        Mentors.listPendingMentors(mentors)
      } else {
        []
      }

    };

    case (#err(_)) {
      []
    };
  }
};


public shared ({ caller }) func approveMentor(
  principal : Principal.Principal
) : async Types.MentorResult<Types.Mentor> {

  switch (Users.getMyProfile(users, caller)) {

    case (#ok(user)) {

      if (Admin.isAdmin(admins, caller, ?user)) {

        Mentors.approveMentor(
          mentors,
          principal
        )

      } else {

        #err("Admin access required")

      };

    };

    case (#err(_)) {

      #err("Admin access required")

    };
  }
};

public shared ({ caller }) func rejectMentor(
  principal : Principal.Principal
) : async Types.MentorResult<Types.Mentor> {

  switch (Users.getMyProfile(users, caller)) {

    case (#ok(user)) {

      if (Admin.isAdmin(admins, caller, ?user)) {

        Mentors.rejectMentor(
          mentors,
          principal
        )

      } else {

        #err("Admin access required")

      };

    };

    case (#err(_)) {

      #err("Admin access required")

    };
  }
};

public shared query ({ caller }) func getDashboardStats()
  : async Types.DashboardStats {

  switch (Users.getMyProfile(users, caller)) {

    case (#ok(user)) {

      if (Admin.isAdmin(admins, caller, ?user)) {

        Dashboard.getDashboardStats(
          users,
          mentors,
          enrollments,
          certificates
        )

      } else {

        {
          totalUsers = 0;
          totalCourses = 0;
          totalMentors = 0;
          pendingMentors = 0;
          totalCertificates = 0;
          totalEnrollments = 0;
        }

      }

    };

    case (#err(_)) {

      {
        totalUsers = 0;
        totalCourses = 0;
        totalMentors = 0;
        pendingMentors = 0;
        totalCertificates = 0;
        totalEnrollments = 0;
      }

    };

  }

};

}
