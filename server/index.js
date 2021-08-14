const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.set('port', 3333);
const db = require('../db/index.js');


app.get('/', (req, res) => {
  res.send('Hello from the server!');

})

app.get('/answers', async (req, res) => {
  console.log(req.query)
  let response = {question: req.query.question_id}
  response.results = await db.query(`SELECT answers.id, answers.body, answers.date_written as date, answers.answerer_name, answers.helpful as helpfulness, json_agg(photos.url) AS photos FROM answers LEFT JOIN photos
  ON photos.answer_id = answers.id
  WHERE question_id = ${req.query.question_id}
  GROUP BY answers.id`)
  res.send(response)
})

app.get('/questions', async (req, res) => {
  // req.params.question_id
  console.log(req.query, req.params)
  let response = { product_id: req.query.product_id }

  // `select * from questions where id = ${req.params.question_id} Limit 100`
  response.results = await db.query(`SELECT id as question_id, body as question_body, date_written as question_date, asker_name, helpful as question_helpfulness, reported FROM questions WHERE product_id = ${req.query.product_id} LIMIT 50`)

  const eachQuestion = async (qs) => {
    for (let q of qs.results) {
      // console.log(q)
      q.answers = {};
      let answers = await db.query(`SELECT answers.id, answers.body, answers.date_written as date, answers.answerer_name, answers.helpful as helpfulness, json_agg(photos.url) AS photos FROM answers LEFT JOIN photos
      ON photos.answer_id = answers.id
      WHERE question_id = ${q.question_id}
      GROUP BY answers.id`)

      for (let answer of answers) {
        // console.log(answer.question_id, answer.id)
        q.answers[JSON.stringify(answer.id)] = answer
      }
    }
    // console.log(qs)
    res.send(qs);

  }
  eachQuestion(response)

})

app.listen(app.get('port'));
console.log('listening on', app.get('port'));