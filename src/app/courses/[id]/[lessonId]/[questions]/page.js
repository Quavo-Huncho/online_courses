"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/lib/useAuthGuard";

export default function QuestionsPage() {
  useAuthGuard();
  const { id, questions, lessonId } = useParams();
  const router = useRouter();

  const [questionss, setQuestionss] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      // 🔐 1️⃣ AUTH CHECK
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      setUser(userData.user);

      // 📘 2️⃣ FETCH COURSE TITLE
      const { data: courseData, error: courseError } =
        await supabase
          .from("courses")
          .select("title")
          .eq("id", id)
          .single();

      if (courseError) console.error(courseError);
      if (courseData) setCourseTitle(courseData.title);

      // ❓ 3️⃣ FETCH QUESTIONS
      const { data: questionsData, error: questionsError } =
        await supabase
          .from("lesson_questions")
          .select("*")
          .eq("lesson_id", questions);

      if (questionsError) console.error(questionsError);
      if (questionsData) setQuestionss(questionsData);

      setLoading(false);
    };

    checkAuthAndFetchData();
  }, [id, questions, router]);

  // 🧮 CALCULATE SCORE
  const score = questionss.reduce((total, question) => {
    if (selectedAnswer[question.id] === question.correct_answers) {
      return total + 1;
    }
    return total;
  }, 0);

  // 💾 SAVE SCORE (WITH USER)
  const saveScore = async () => {
    const totalQuestions = questionss.length;

    const { error } = await supabase
      .from("lesson_results")
      .insert([
        {
          user_id: user.id,
          lesson_id: questions,
          score,
          total: totalQuestions,
        },
      ]);

    if (error) {
      console.error("Error saving score:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Questions for {courseTitle}</h1>

      <ul>
        {questionss.map((question) => (
          <li key={question.id} style={{ marginBottom: "20px" }}>
            <h3>{question.questions}</h3>

            <ul>
              {question.answers?.map((option) => {
                const [key, value] = Object.entries(option)[0];
                return (
                  <li key={key}>
                    <label style={{ cursor: "pointer" }}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={value}
                        checked={selectedAnswer[question.id] === value}
                        onChange={() =>
                          setSelectedAnswer((prev) => ({
                            ...prev,
                            [question.id]: value,
                          }))
                        }
                        disabled={submitted}
                      />
                      {key}. {value}
                    </label>
                  </li>
                );
              })}
            </ul>

            {submitted && (
              <p>
                {selectedAnswer[question.id] === question.correct_answers
                  ? "✅ Correct"
                  : "❌ Wrong"}
              </p>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          setSubmitted(true);
          saveScore();
        }}
        style={{ marginTop: "20px" }}
      >
        Submit Answers
      </button>

      {submitted && (
        <>
          <h3>
            Your Score: {score} / {questionss.length} (
            {Math.round((score / questionss.length) * 100)}%)
          </h3>
          <p>Results have been saved!</p>
        </>
      )}

      <Link
        href={`/courses/${id}/${questions}`}
        style={{ display: "block", marginTop: "20px" }}
      >
        Back to Lesson
      </Link>
    </div>
  );
}
