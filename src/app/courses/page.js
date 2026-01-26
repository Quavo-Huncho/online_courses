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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Courses</h1>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.summary}</p>
            <Link href={`/courses/${course.id}`}>
              View Sub-Courses
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
      >
        Logout
      </button>

      <br />
      <Link href="/">Back to Home</Link>
    </div>
  );
}
