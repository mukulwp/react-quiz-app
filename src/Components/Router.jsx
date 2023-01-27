import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Layout/Layout';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import QuizPage from './Pages/QuizPage';
import ResultPage from './Pages/ResultPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/quiz/:id"
              element={
                <PrivateRoute>
                  <QuizPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/result/:id"
              element={
                <PrivateRoute>
                  <ResultPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}
