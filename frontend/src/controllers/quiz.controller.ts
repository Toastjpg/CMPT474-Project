import { Quiz } from "../models/quiz";

const gatewayURL = import.meta.env.VITE_GATEWAY_URL;

export const createQuiz = async (quiz: Quiz) => {
  return await fetch(`${gatewayURL}/quizzes`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(quiz),
  });
};

export const getAllQuizzes = async () => {
  return await fetch(`${gatewayURL}/quizzes`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
};

export const getQuiz = async (quizId: string) => {
  return await fetch(`${gatewayURL}/quizzes/${quizId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
};
