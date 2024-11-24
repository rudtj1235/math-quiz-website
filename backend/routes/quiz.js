const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 랜덤 수학 문제 생성
router.get('/problem', (req, res) => {
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  
  let answer;
  switch(operator) {
    case '+': answer = num1 + num2; break;
    case '-': answer = num1 - num2; break;
    case '*': answer = num1 * num2; break;
  }

  res.json({
    question: `${num1} ${operator} ${num2} = ?`,
    answer: answer
  });
});

// 답안 체크
router.post('/check', async (req, res) => {
  const { userAnswer, correctAnswer } = req.body;
  const isCorrect = parseInt(userAnswer) === correctAnswer;
  
  res.json({
    correct: isCorrect,
    message: isCorrect ? '정답입니다!' : '틀렸습니다. 다시 시도해보세요.'
  });
});

module.exports = router;