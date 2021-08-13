const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.set('port', 3000);
const db = require('../db/index.js');


app.get('/', (req, res) => {
  res.send('Hello from the server!');
})

app.get('/questions', async (req, res) => {
  // req.params.question_id
  console.log(req.query, req.params)


  // `select * from questions where id = ${req.params.question_id} Limit 100`
  let questions = await db.query(`SELECT * FROM questions WHERE product_id = ${req.query.product_id} LIMIT 50`)
  // questions.forEach(async (q) => {
  //   let answers = await db.query(`SELECT * FROM answers WHERE question_id = ${q.id}`)
  //   for (let answer of answers) {
  //     question.answers[answer.id] = answer
  //   }

  // })

  res.send(questions);
})

app.listen(app.get('port'));
console.log('listening on', app.get('port'));