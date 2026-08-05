import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";

import Types "./types";

module {

  private func enrollmentKey(
    student : Principal.Principal,
    courseId : Text,
  ) : Text {
    Principal.toText(student) # ":" # courseId
  };

  public func enroll(
    enrollments : TrieMap.TrieMap<Text, Types.Enrollment>,
    student : Principal.Principal,
    courseId : Text,
  ) : Types.EnrollmentResult<Types.Enrollment> {

    let id = enrollmentKey(student, courseId);

    switch (enrollments.get(id)) {
      case (?_) {
        #err("You are already enrolled in this course.")
      };

      case null {

        let enrollment : Types.Enrollment = {
          student = student;
          courseId = courseId;

          enrolledAt = Time.now();
          updatedAt = Time.now();

          progress = 0;

          completedLessons = [];
          lastLesson = null;

          completed = false;
          completedAt = null;
        };

        enrollments.put(id, enrollment);
        #ok(enrollment);
      };
    };
  };

  public func getMyEnrollments(
    enrollments : TrieMap.TrieMap<Text, Types.Enrollment>,
    student : Principal.Principal,
  ) : [Types.Enrollment] {

    Array.filter<Types.Enrollment>(
      Iter.toArray(enrollments.vals()),
      func(e) { e.student == student }
    )
  };

  public func isEnrolled(
    enrollments : TrieMap.TrieMap<Text, Types.Enrollment>,
    student : Principal.Principal,
    courseId : Text,
  ) : Bool {

    switch (enrollments.get(enrollmentKey(student, courseId))) {
      case (?_) true;
      case null false;
    }
  };

  public func completeLesson(
    enrollments : TrieMap.TrieMap<Text, Types.Enrollment>,
    student : Principal.Principal,
    courseId : Text,
    lessonId : Text,
    totalLessons : Nat,
  ) : Types.EnrollmentResult<Types.Enrollment> {

    let id = enrollmentKey(student, courseId);

    switch (enrollments.get(id)) {

      case null {
        #err("You are not enrolled in this course.")
      };

      case (?enrollment) {

        if (
          Array.find<Text>(
            enrollment.completedLessons,
            func(l) { l == lessonId }
          ) != null
        ) {
          return #ok(enrollment);
        };

        let lessons =
          Array.append<Text>(enrollment.completedLessons, [lessonId]);

        let progress =
          (lessons.size() * 100) / totalLessons;

        let updated : Types.Enrollment = {
          student = enrollment.student;
          courseId = enrollment.courseId;

          enrolledAt = enrollment.enrolledAt;
          updatedAt = Time.now();

          progress = progress;

          completedLessons = lessons;
          lastLesson = ?lessonId;

          completed = progress >= 100;
          completedAt =
            if (progress >= 100) ?Time.now() else null;
        };

        enrollments.put(id, updated);
        #ok(updated);
      };
    };
  };

  public func getProgress(
    enrollments : TrieMap.TrieMap<Text, Types.Enrollment>,
    student : Principal.Principal,
    courseId : Text,
  ) : ?Types.Enrollment {

    enrollments.get(enrollmentKey(student, courseId))
  };

}