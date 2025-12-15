"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function QuestionsPage() {
  const { id, questions, lessonId } = useParams();
  console.log("Course ID:", id,"subcourse id", questions, "Lesson ID:", lessonId);
  const [questionss, setQuestionss] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCourseTitle = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("title")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      if (data) setCourseTitle(data.title);
    };

    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("lesson_questions")
        .select("*")
        .eq("lesson_id", questions);

        console.log("Fetched Questions Data:", data);

      if (error) console.error(error);
      if (data) setQuestionss(data);

      setLoading(false);
    };

  useEffect(() => {
    fetchCourseTitle();
    fetchQuestions();
  }, [id, questions]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Questions for {courseTitle}</h1>

      <ul>
        {questionss.map((question) => (
          <li key={question.id}>
            <h3>{question.questions}</h3>

            <ul>
              {question.answers?.map((option) => {
                const [key, value] = Object.entries(option)[0];
                return (
                  <li key={key}>
                    {key}. {value}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      <Link href={`/courses/${id}/${lessonId}`}>Back to Lesson</Link>
    </div>
  );
}
