import React, { useReducer, useState, useEffect } from "react";
import Answers from "../Answers/Answers";
import ProgressBar from "../ProgressBar/ProgressBar";
import MiniPlayer from "../MiniPlayer/MiniPlayer";
import useQuestions from "../../Hooks/useQuestions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import {useAuth} from "../../Context/AuthContext";
import { getDatabase, ref, set } from "firebase/database";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

const QuizPage = () => {
  const location = useLocation();
  const title = location.state.title;
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { isLoading, error, questions } = useQuestions(id);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const {currentUser} = useAuth()

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  //Handle Next Question Button

  const nextQuestion = () => {
    if (currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrentQ) => prevCurrentQ + 1);
    }
  };

  //Handle Previous Question Button

  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrentQ) => prevCurrentQ - 1);
    }
  };

  //Handle Submit Quiz
  const navigate = useNavigate();
  const submitQuiz = async() => {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, {
      state: {
        qna,
      }
    });
  }

  //Calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <p className="error">Loading...</p>}
      {!isLoading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
            submit={submitQuiz}
          />
          <MiniPlayer videoID={id} videoTitle={title} />
        </>
      )}
    </>
  );
};

export default QuizPage;
