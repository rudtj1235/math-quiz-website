import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  const fetchProblem = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quiz/problem');
      setProblem(response.data);
      setMessage('');
    } catch (error) {
      console.error('문제 가져오기 실패:', error);
      setMessage('문제를 가져오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userAnswer) {
      setMessage('답을 입력해주세요!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/quiz/check', {
        userAnswer: parseInt(userAnswer),
        correctAnswer: problem.answer
      });

      setMessage(response.data.message);
      if (response.data.correct) {
        setScore(prevScore => prevScore + 10);
        setTimeout(() => {
          fetchProblem();
          setUserAnswer('');
        }, 1500);
      }
    } catch (error) {
      console.error('답안 제출 실패:', error);
      setMessage('답안 제출에 실패했습니다.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>수학 퀴즈</h1>
        <div className="score">현재 점수: {score}점</div>
      </header>

      <main className="quiz-container">
        {problem ? (
          <div className="problem-container">
            <h2 className="problem">{problem.question}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="답을 입력하세요"
                className="answer-input"
              />
              <button type="submit" className="submit-btn">
                제출
              </button>
            </form>
          </div>
        ) : (
          <p>문제를 불러오는 중...</p>
        )}

        {message && (
          <div className={`message ${message.includes('정답') ? 'correct' : 'incorrect'}`}>
            {message}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;  // export default는 파일 끝에 한 번만 사용