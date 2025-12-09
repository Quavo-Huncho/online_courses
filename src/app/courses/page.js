"use client"
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.summary}</p>
            <Link href={`/courses/${course.id}`}>View Sub-Courses</Link>
          </li>
        ))}
      </ul>

      <Link href="/">Back to Home</Link>
    </div>
  );
}
