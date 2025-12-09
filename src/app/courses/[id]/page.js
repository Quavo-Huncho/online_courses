"use client";
import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SubCoursesPage() {
  const { id } = useParams();
  const [subCourses, setSubCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseTitle = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("title")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching course title:", error);
      } else {
        setCourseTitle(data.title);
      }
    };
    fetchCourseTitle();

    const fetchSubCourses = async () => {
      const { data, error } = await supabase
        .from("sub_courses")
        .select("*")
        .eq("course_id", id);
      if (error) {
        console.error("Error fetching sub-courses:", error);
      } else {
        setSubCourses(data);
      }
      setLoading(false);
    };
    fetchSubCourses();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>The Sub-Courses for {courseTitle} </h1>
      <ul>
        {subCourses.map((subCourse) => (
          <li key={subCourse.id}>
            <h3>{subCourse.title}</h3>
            <p>{subCourse.contents}</p>
            <Link href={`/courses/${id}/${subCourse.id}`}>View Lesson</Link>
          </li>
        ))}
      </ul>
      <Link href="/courses">Back to Courses</Link>
    </div>
  );
}