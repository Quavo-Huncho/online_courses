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

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 My Learning Progress</h1>
      <p>Welcome, {user.email}</p>

      {results.length === 0 ? (
        <p>You haven’t completed any lessons yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
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
            {results.map((result) => (
              <tr key={result.id}>
                <td>
                  {result.lessons?.sub_courses?.courses?.title}
                </td>
                <td>
                  {result.lessons?.sub_courses?.title}
                </td>
                <td>
                  {result.lessons?.lesson_title}
                </td>
                <td>
                  {result.score} / {result.total}
                </td>
                <td>
                  {Math.round(
                    (result.score / result.total) * 100
                  )}%
                </td>
                <td>
                  {new Date(result.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link href="/courses">← Back to Courses</Link>
      </div>
    </div>
  );
}
