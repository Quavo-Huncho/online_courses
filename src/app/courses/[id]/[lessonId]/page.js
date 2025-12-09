"use client";

import { supabase } from "../../../../lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LessonPage() {
  const { id, lessonId } = useParams(); 
  // id = courseId
  // lessonId = subcourseId

  const [lessons, setLessons] = useState([]);
  const [subCourseTitle, setSubCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCourseTitle = async () => {
      const { data, error } = await supabase
        .from("sub_courses")
        .select("title")
        .eq("id", lessonId)  // FIXED
        .single();

      if (data) {
        setSubCourseTitle(data.title);
      }
    };

    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("subcourse_id", lessonId); // FIXED

      if (data) {
        setLessons(data);
      }

      setLoading(false);
    };

    fetchSubCourseTitle();
    fetchLessons();
  }, [id, lessonId]); // FIXED

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

            {/* Go to lesson details */}
            <Link href={`/courses/${id}/${lesson.id}`}>
              View Lesson
            </Link>
          </li>
        ))}
      </ul>

      {/* Back Button */}
      <Link href={`/courses/${id}`}>Back to Sub-Courses</Link>
    </div>
  );
}
