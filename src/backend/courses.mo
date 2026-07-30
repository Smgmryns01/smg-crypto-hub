import Array "mo:base/Array";
import Text "mo:base/Text";
import Types "./types";

module {

  public type Course = Types.Course;

  private let courses : [Course] = [
    {
      id = "1";
      title = "Blockchain Basics";
      description = "Learn how blockchain works from scratch.";
      instructor = "SMG Crypto";
      thumbnail = "/images/courses/blockchain.jpg";
      duration = 120;
      lessons = 10;
      featured = true;
      published = true;
      level = #Beginner;
      category = #Blockchain;
      createdAt = 0;
      updatedAt = 0;
    },
    {
      id = "2";
      title = "Crypto Basics";
      description = "Understand cryptocurrencies and digital assets.";
      instructor = "SMG Crypto";
      thumbnail = "/images/courses/crypto.jpg";
      duration = 180;
      lessons = 15;
      featured = true;
      published = true;
      level = #Beginner;
      category = #CryptoBasics;
      createdAt = 0;
      updatedAt = 0;
    },
    {
      id = "3";
      title = "ICP Development";
      description = "Build modern decentralized applications on ICP.";
      instructor = "SMG Crypto";
      thumbnail = "/images/courses/icp.jpg";
      duration = 300;
      lessons = 24;
      featured = true;
      published = true;
      level = #Intermediate;
      category = #ICPDevelopment;
      createdAt = 0;
      updatedAt = 0;
    }
  ];

  public func getCourses() : [Course] {
    courses
  };

  public func getCourse(id : Text) : ?Course {
    Array.find<Course>(
      courses,
      func(course : Course) : Bool {
        course.id == id
      }
    )
  };

  public func getFeaturedCourses() : [Course] {
    Array.filter<Course>(
      courses,
      func(course : Course) : Bool {
        course.featured
      }
    )
  };

}