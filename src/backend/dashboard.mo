import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Types "./types";

module {

    public func getDashboardStats(

  users : TrieMap.TrieMap<Principal.Principal, Types.User>,

  mentors : TrieMap.TrieMap<Principal.Principal, Types.Mentor>,

  enrollments : TrieMap.TrieMap<Text, Types.Enrollment>,

  certificates : TrieMap.TrieMap<Text, Types.Certificate>

) : Types.DashboardStats {

  var totalMentors : Nat = 0;
  var pendingMentors : Nat = 0;

  for ((_, mentor) in mentors.entries()) {
    totalMentors += 1;
switch (mentor.status) {
  case (#Pending) {
    pendingMentors += 1;
  };
  case (_) {};
};
  };

  {
    totalUsers = users.size();

    totalCourses = 0; // za mu haɗa da courses.mo a mataki na gaba

    totalMentors = totalMentors;

    pendingMentors = pendingMentors;

    totalCertificates = certificates.size();

    totalEnrollments = enrollments.size();
  }

};

}