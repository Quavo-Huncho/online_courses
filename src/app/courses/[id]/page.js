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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>The Sub-Courses for {courseTitle}</h1>

      <ul>
        {subCourses.map((subCourse) => (
          <li key={subCourse.id}>
            <h3>{subCourse.title}</h3>
            <p>{subCourse.contents}</p>
            <Link href={`/courses/${id}/${subCourse.id}`}>
              View Lesson
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/courses">Back to Courses</Link>
    </div>
  );
}
