const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 기본 라우트 추가
app.get('/', (req, res) => {
  res.json({ message: "서버가 정상적으로 실행중입니다." });
});

// 미들웨어 설정
app.use(cors());
app.use(express.json());

console.log('MongoDB 연결 시도중...');

// MongoDB 연결 (deprecated 옵션 제거)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공!');
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });

// 라우터 설정
const quizRouter = require('./routes/quiz');
app.use('/api/quiz', quizRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행중입니다.`);
  console.log(`http://localhost:${PORT} 으로 접속할 수 있습니다.`);
});