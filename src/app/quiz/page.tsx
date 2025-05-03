"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Option {
  text: string;
  personalityTrait: string;
  score: number;
}

interface Question {
  _id: string;
  question: string;
  options: Option[];
}

const QuizPage = () => {
  const [Questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: Option }>({});
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUserId = async () => {
      
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        console.log(data.data._id);
  
        setUserId(data.data._id);
        if (userId) {
          console.log("Updated userId:", userId);
        }
        
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [userId]);

  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
       
        const res = await fetch("/api/users/quiz");
        const data = await res.json();
        console.log(data);
        setQuestions(data || []);

       
        
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);
 
  const handleOptionChange = (questionId: string, option: Option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(answers);
      console.log(userId);
      console.log(Object.keys(answers));
      for (const questionId of Object.keys(answers)) {
        const selectedOption = answers[questionId];
        console.log("Submitting:", { userId, questionId, selectedOption });
        await fetch("/api/users/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            questionId,
            selectedOption,
          }),
        });
      }

      // Calculate and navigate to result page
      await fetch("/api/users/calculate", {
        method: "POST",

        
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      router.push(`/result/${userId}`);
    } catch (error) {
      console.error("Error submitting responses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Personality Test</h1>

      {Questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <form className="space-y-6">
          {Questions.map((q) => (
            <div key={q._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{q.question}</h2>
              <div className="mt-2 space-y-2">
                {q.options.map((option, index) => (
                  <label key={index} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={option.text}
                      checked={answers[q._id]?.text === option.text}
                      onChange={() => handleOptionChange(q._id, option)}
                      className="mr-2"
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Finish Test"}
          </button>
        </form>
      )}
    </div>
  );
};

export default QuizPage;
