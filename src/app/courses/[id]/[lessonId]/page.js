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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Subcourse Title */}
      <h1>{subCourseTitle}</h1>

      {/* Lessons */}
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <h3>{lesson.lesson_title}</h3>
            <p>{lesson.lesson_content}</p>

            <Link href={`/courses/${id}/${lessonId}/${lesson.id}`}>
              View Questions
            </Link>
          </li>
        ))}
      </ul>

      {/* Back Button */}
      <Link href={`/courses/${id}`}>Back to Sub-Courses</Link>
    </div>
  );
}
