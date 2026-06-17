const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// 프론트엔드 정적 파일 서빙 (CORS 문제 방지)
app.use(express.static(path.join(__dirname, '../todo-firebase')));

const todoRouter = require('./routes/todos');

app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend is running!' });
});

app.use('/api/todos', todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err.message);
  });
