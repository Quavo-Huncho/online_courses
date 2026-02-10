"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/useAuthGuard";

export default function SubCoursesPage() {
  useAuthGuard();
  const { id } = useParams();
  const router = useRouter();

  const [subCourses, setSubCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      // 🔐 1️⃣ CHECK AUTHENTICATION
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      // 📘 2️⃣ FETCH COURSE TITLE
      const { data: courseData, error: courseError } =
        await supabase
          .from("courses")
          .select("title")
          .eq("id", id)
          .single();

      if (courseError) {
        console.error("Error fetching course title:", courseError);
      } else {
        setCourseTitle(courseData.title);
      }

      // 📚 3️⃣ FETCH SUB-COURSES
      const { data: subData, error: subError } =
        await supabase
          .from("sub_courses")
          .select("*")
          .eq("course_id", id);

      if (subError) {
        console.error("Error fetching sub-courses:", subError);
      } else {
        setSubCourses(subData);
      }

      setLoading(false);
    };

    checkAuthAndFetchData();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-3"></div>
          <p className="text-muted">Loading sub-courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/courses" className="text-decoration-none">
                      <i className="bi bi-book me-1"></i>
                      Courses
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {courseTitle}
                  </li>
                </ol>
              </nav>
              <h1 className="display-5 fw-bold mb-2">
                <i className="bi bi-collection me-3 text-primary"></i>
                {courseTitle}
              </h1>
              <p className="text-muted">
                Choose a sub-course to start learning
              </p>
            </div>
            <div className="mt-3 mt-md-0">
              <Link href="/courses" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Courses Grid */}
      {subCourses.length > 0 ? (
        <div className="row g-4">
          {subCourses.map((subCourse, index) => (
            <div key={subCourse.id} className="col-md-6 col-lg-4">
              <div className="card course-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="flex-grow-1">
                      <h5 className="card-title fw-bold">
                        <span className="badge bg-primary bg-opacity-10 text-primary me-2">
                          {index + 1}
                        </span>
                        {subCourse.title}
                      </h5>
                    </div>
                    <div className="text-end">
                      <i className="bi bi-folder-open display-6 text-primary opacity-25"></i>
                    </div>
                  </div>
                  
                  <p className="card-text mb-4">
                    {subCourse.contents || 'No description available'}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock text-muted"></i>
                      <small className="text-muted">
                        Self-paced
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-bar-chart text-muted"></i>
                      <small className="text-muted">
                        All levels
                      </small>
                    </div>
                  </div>

                  <div className="d-grid">
                    <Link 
                      href={`/courses/${id}/${subCourse.id}`}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-play-circle me-2"></i>
                      View Lessons
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-folder-x display-1 text-muted"></i>
          </div>
          <h3 className="h4 mb-2">No sub-courses available</h3>
          <p className="text-muted mb-4">
            This course doesn't have any sub-courses yet.
          </p>
          <Link href="/courses" className="btn btn-primary">
            <i className="bi bi-book me-2"></i>
            Browse Other Courses
          </Link>
        </div>
      )}

      {/* Stats Section */}
      {subCourses.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 bg-primary bg-opacity-10">
              <div className="card-body text-center">
                <h5 className="mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Course Progress
                </h5>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <h6 className="text-muted">Total Sub-Courses</h6>
                      <h3 className="mb-0">{subCourses.length}</h3>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <h6 className="text-muted">Estimated Duration</h6>
                      <h3 className="mb-0">{subCourses.length * 2}h</h3>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <h6 className="text-muted">Difficulty Level</h6>
                      <h3 className="mb-0">Mixed</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
