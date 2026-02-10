"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/useAuthGuard";

export default function LessonPage() {
  useAuthGuard();
  const { id, lessonId } = useParams();
  const router = useRouter();

  // id = courseId
  // lessonId = subcourseId

  const [lessons, setLessons] = useState([]);
  const [subCourseTitle, setSubCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      // 🔐 1️⃣ AUTH CHECK
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      // 📘 2️⃣ FETCH SUB-COURSE TITLE
      const { data: titleData, error: titleError } =
        await supabase
          .from("sub_courses")
          .select("title")
          .eq("id", lessonId)
          .single();

      if (titleError) {
        console.error("Error fetching sub-course title:", titleError);
      } else {
        setSubCourseTitle(titleData.title);
      }

      // 📚 3️⃣ FETCH LESSONS
      const { data: lessonsData, error: lessonsError } =
        await supabase
          .from("lessons")
          .select("*")
          .eq("subcourse_id", lessonId);

      if (lessonsError) {
        console.error("Error fetching lessons:", lessonsError);
      } else {
        setLessons(lessonsData);
      }

      setLoading(false);
    };

    checkAuthAndFetchData();
  }, [id, lessonId, router]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-3"></div>
          <p className="text-muted">Loading lessons...</p>
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
                  <li className="breadcrumb-item">
                    <Link href={`/courses/${id}`} className="text-decoration-none">
                      <i className="bi bi-collection me-1"></i>
                      Sub-Courses
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {subCourseTitle}
                  </li>
                </ol>
              </nav>
              <h1 className="display-5 fw-bold mb-2">
                <i className="bi bi-journal-bookmark me-3 text-primary"></i>
                {subCourseTitle}
              </h1>
              <p className="text-muted">
                {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <div className="mt-3 mt-md-0">
              <Link href={`/courses/${id}`} className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Back to Sub-Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      {lessons.length > 0 ? (
        <div className="row g-4">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="col-md-6 col-lg-4">
              <div className="card course-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="flex-grow-1">
                      <h5 className="card-title fw-bold">
                        <span className="badge bg-success bg-opacity-10 text-success me-2">
                          Lesson {index + 1}
                        </span>
                        {lesson.lesson_title}
                      </h5>
                    </div>
                    <div className="text-end">
                      <i className="bi bi-file-text display-6 text-success opacity-25"></i>
                    </div>
                  </div>
                  
                  <p className="card-text mb-4">
                    {lesson.lesson_content 
                      ? lesson.lesson_content.length > 150 
                        ? `${lesson.lesson_content.substring(0, 150)}...`
                        : lesson.lesson_content
                      : 'No content available'
                    }
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-clock text-muted"></i>
                      <small className="text-muted">
                        {Math.floor(Math.random() * 30) + 10} min
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-bar-chart text-muted"></i>
                      <small className="text-muted">
                        {index < lessons.length / 2 ? 'Beginner' : 'Intermediate'}
                      </small>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <Link 
                      href={`/courses/${id}/${lessonId}/${lesson.id}`}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-play-circle me-2"></i>
                      Start Lesson
                    </Link>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-bookmark me-1"></i>
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-file-x display-1 text-muted"></i>
          </div>
          <h3 className="h4 mb-2">No lessons available</h3>
          <p className="text-muted mb-4">
            This sub-course doesn't have any lessons yet.
          </p>
          <Link href={`/courses/${id}`} className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Sub-Courses
          </Link>
        </div>
      )}

      {/* Progress Section */}
      {lessons.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 bg-success bg-opacity-10">
              <div className="card-body text-center">
                <h5 className="mb-3">
                  <i className="bi bi-trophy me-2"></i>
                  Your Learning Journey
                </h5>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <h6 className="text-muted">Total Lessons</h6>
                      <h3 className="mb-0">{lessons.length}</h3>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <h6 className="text-muted">Est. Time</h6>
                      <h3 className="mb-0">{lessons.length * 20}min</h3>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <h6 className="text-muted">Completion</h6>
                      <h3 className="mb-0">0%</h3>
                    </div>
                  </div>
                </div>
                <div className="progress mt-3" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-success"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
