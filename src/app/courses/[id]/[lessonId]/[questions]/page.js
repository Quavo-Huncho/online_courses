"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function QuestionsPage() {
  const { id, questions, lessonId } = useParams();
  const [questionss, setQuestionss] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch course title
  const fetchCourseTitle = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("title")
      .eq("id", id)
      .single();
    if (error) console.error(error);
    if (data) setCourseTitle(data.title);
  };

  // Fetch questions
  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from("lesson_questions")
      .select("*")
      .eq("lesson_id", questions); // make sure lessonId is correct
    if (error) console.error(error);
    if (data) setQuestionss(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourseTitle();
    fetchQuestions();
  }, [id, questions]);

  // Calculate score dynamically
  const score = questionss.reduce((total, question) => {
    if (selectedAnswer[question.id] === question.correct_answers) {
      return total + 1;
    }
    return total;
  }, 0);

  // Save score to Supabase
  const saveScore = async () => {
    const totalQuestions = questionss.length;

    console.log({
      lesson_id: questions,
      score,
      total: totalQuestions,
    });

    const { data, error } = await supabase
      .from("lesson_results")
      .insert([
        {
          lesson_id: questions,
          score,
          total: totalQuestions,
        },
      ]);

    if (error) {
      console.error("Error saving score:", error);
    } else {
      console.log("Score saved successfully:", data);
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
                        disabled={submitted} // lock after submit
                        style={{ cursor: "pointer" }}
                      />
                      {key}. {value}
                    </label>
                  </li>
                );
              })}
            </ul>

            {/* Show feedback only after submit */}
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
          setSubmitted(true); // show feedback
          saveScore(); // save to Supabase
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

      <Link href={`/courses/${id}/${questions}`} style={{ display: "block", marginTop: "20px" }}>
        Back to Lesson
      </Link>
    </div>
  );
}
