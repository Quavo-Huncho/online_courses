"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/lib/useAuthGuard";

export default function DashboardPage() {
  useAuthGuard();
  const router = useRouter();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthAndFetchProgress = async () => {
      // 🔐 AUTH CHECK
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      setUser(userData.user);

      // 📊 FETCH RESULTS WITH JOINS
      const { data, error } = await supabase
        .from("lesson_results")
        .select(`
          id,
          score,
          total,
          created_at,
          lessons (
            lesson_title,
            sub_courses (
              title,
              courses (
                title
              )
            )
          )
        `)
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching progress:", error);
      } else {
        setResults(data);
      }

      setLoading(false);
    };

    checkAuthAndFetchProgress();
  }, [router]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-3"></div>
          <p className="text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalLessons = results.length;
  const averageScore = totalLessons > 0 
    ? Math.round(results.reduce((acc, result) => acc + (result.score / result.total) * 100, 0) / totalLessons)
    : 0;
  const bestScore = totalLessons > 0
    ? Math.max(...results.map(result => (result.score / result.total) * 100))
    : 0;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1 className="display-5 fw-bold mb-2">
                <i className="bi bi-speedometer2 me-2"></i>
                My Learning Progress
              </h1>
              <p className="text-muted">
                Welcome back, <span className="fw-semibold">{user?.email}</span>
              </p>
            </div>
            <div className="mt-3 mt-md-0">
              <Link href="/courses" className="btn btn-primary">
                <i className="bi bi-book me-2"></i>
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6 className="text-muted mb-2">Total Lessons</h6>
                  <h3 className="mb-0">{totalLessons}</h3>
                </div>
                <div className="text-primary">
                  <i className="bi bi-book display-6 opacity-25"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6 className="text-muted mb-2">Average Score</h6>
                  <h3 className="mb-0">{averageScore}%</h3>
                </div>
                <div className="text-success">
                  <i className="bi bi-graph-up display-6 opacity-25"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6 className="text-muted mb-2">Best Score</h6>
                  <h3 className="mb-0">{Math.round(bestScore)}%</h3>
                </div>
                <div className="text-warning">
                  <i className="bi bi-trophy display-6 opacity-25"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Table */}
      <div className="card border-0">
        <div className="card-header bg-transparent border-bottom">
          <h5 className="mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Recent Lesson Results
          </h5>
        </div>
        <div className="card-body">
          {results.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-book display-1 text-muted"></i>
              </div>
              <h3 className="h4 mb-2">No lessons completed yet</h3>
              <p className="text-muted mb-4">
                Start learning by browsing our available courses
              </p>
              <Link href="/courses" className="btn btn-primary">
                <i className="bi bi-play-circle me-2"></i>
                Start Learning
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Sub-Course</th>
                    <th>Lesson</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => {
                    const percentage = Math.round((result.score / result.total) * 100);
                    return (
                      <tr key={result.id}>
                        <td>
                          <span className="fw-semibold">
                            {result.lessons?.sub_courses?.courses?.title || 'N/A'}
                          </span>
                        </td>
                        <td>
                          {result.lessons?.sub_courses?.title || 'N/A'}
                        </td>
                        <td>
                          {result.lessons?.lesson_title || 'N/A'}
                        </td>
                        <td>
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {result.score} / {result.total}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress flex-grow-1" style={{ height: '6px' }}>
                              <div 
                                className={`progress-bar ${percentage >= 80 ? 'bg-success' : percentage >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-muted small">{percentage}%</span>
                          </div>
                        </td>
                        <td>
                          <small className="text-muted">
                            {new Date(result.created_at).toLocaleDateString()}
                          </small>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Back to Courses */}
      <div className="text-center mt-5">
        <Link href="/courses" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Courses
        </Link>
      </div>
    </div>
  );
}
