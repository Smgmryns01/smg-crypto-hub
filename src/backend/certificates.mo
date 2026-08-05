import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Text "mo:base/Text";

import Types "./types";

module {

  private func certificateId(
    student : Principal.Principal,
    courseId : Text,
  ) : Text {
    Principal.toText(student) # "-" # courseId
  };

  public func claimCertificate(
    certificates : TrieMap.TrieMap<Text, Types.Certificate>,
    enrollment : Types.Enrollment,
    courseTitle : Text,
    issuer : Text,
  ) : Types.CertificateResult<Types.Certificate> {

    if (not enrollment.completed) {
      return #err("Course has not been completed.");
    };

    let id = certificateId(
      enrollment.student,
      enrollment.courseId,
    );

    switch (certificates.get(id)) {
      case (?certificate) {
        #ok(certificate)
      };

      case null {

    let completedAt = switch (enrollment.completedAt) {
  case (?time) time;
  case null {
    return #err("Completion time not found.");
  };
};

let certificate : Types.Certificate = {
  id = id;
  student = enrollment.student;
  courseId = enrollment.courseId;
  courseTitle = courseTitle;

  issuedAt = completedAt;
  completedAt = completedAt;

  issuer = issuer;
  verified = true;
};    

        certificates.put(id, certificate);

        #ok(certificate)
      };
    };
  };

  public func getCertificate(
    certificates : TrieMap.TrieMap<Text, Types.Certificate>,
    id : Text,
  ) : ?Types.Certificate {

    certificates.get(id)
  };

  public func getMyCertificates(
    certificates : TrieMap.TrieMap<Text, Types.Certificate>,
    student : Principal.Principal,
  ) : [Types.Certificate] {

    Array.filter<Types.Certificate>(
      Iter.toArray(certificates.vals()),
      func(c) {
        c.student == student
      },
    )
  };

  public func verifyCertificate(
    certificates : TrieMap.TrieMap<Text, Types.Certificate>,
    id : Text,
  ) : Bool {

    switch (certificates.get(id)) {
      case (?certificate) {
        certificate.verified
      };

      case null {
        false
      };
    }
  };

}