"use client";

import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/useAuthGuard";

export default function CoursesPage() {
  useAuthGuard();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const checkUserAndFetchCourses = async () => {
      // 1️⃣ Check authentication
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      // 2️⃣ Fetch courses
      const { data, error } = await supabase
        .from("courses")
        .select("*");

      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data);
      }

      setLoading(false);
    };

    checkUserAndFetchCourses();
  }, [router]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-3"></div>
          <p className="text-muted">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1 className="display-5 fw-bold mb-2">Available Courses</h1>
              <p className="text-muted">
                Discover courses to advance your skills and career
              </p>
            </div>
            <div className="mt-3 mt-md-0">
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/login");
                }}
                className="btn btn-outline-danger"
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design</option>
          </select>
        </div>
      </div>

      {/* Course Stats */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-primary">
              <i className="bi bi-book me-1"></i>
              {filteredCourses.length} Courses
            </span>
            {searchTerm && (
              <span className="badge bg-secondary">
                <i className="bi bi-funnel me-1"></i>
                Filtered
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="row g-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="col-md-6 col-lg-4">
              <div className="card course-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="flex-grow-1">
                      <h5 className="card-title fw-bold">{course.title}</h5>
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {course.category || 'General'}
                      </span>
                    </div>
                    <div className="text-end">
                      <i className="bi bi-book display-6 text-primary opacity-25"></i>
                    </div>
                  </div>
                  
                  <p className="card-text text-muted mb-4">
                    {course.summary || 'No description available'}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock text-muted"></i>
                      <small className="text-muted">
                        {course.duration || 'Self-paced'}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-bar-chart text-muted"></i>
                      <small className="text-muted">
                        {course.level || 'All levels'}
                      </small>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <Link 
                      href={`/courses/${course.id}`}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-play-circle me-2"></i>
                      View Course
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
            <i className="bi bi-search display-1 text-muted"></i>
          </div>
          <h3 className="h4 mb-2">No courses found</h3>
          <p className="text-muted mb-4">
            {searchTerm 
              ? `No courses match "${searchTerm}". Try different keywords.`
              : "No courses available at the moment."
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="btn btn-outline-primary"
            >
              <i className="bi bi-x-circle me-2"></i>
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Back to Home */}
      <div className="text-center mt-5">
        <Link href="/" className="btn btn-outline-secondary">
          <i className="bi bi-house me-2"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
