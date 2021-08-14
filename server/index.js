const express = require('express');

const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.set('port', 3333);

const db = require('../db/index');

app.post('/questions', async (req, res) => {
  console.log(req.body);
  const {
    body, name, email, productId
  } = req.body;
  const id = await db.query('SELECT MAX(id) from questions');
  db.none('INSERT INTO questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [id[0].max + 1, productId, body, Date.now(), name, email, false, 0])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.post('/answers', async (req, res) => {
  const questionId = req.query.question_id;
  const {
    body, name, email, photos
  } = req.body;
  console.log(questionId, req.body);
  const id = await db.query('SELECT MAX(id) from answers');
  console.log(id);
  db.none('INSERT INTO answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [id[0].max + 1, questionId, body, Date.now(), name, email, false, 0])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.put('/answerReport', async (req, res) => {
  const answerId = req.query.answer_id;
  console.log(answer_id);
});

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.get('/answers', async (req, res) => {
  // console.log(req.query)
  const response = { question_id: req.query.question_id };
  response.results = await db.query(`SELECT answers.id, answers.body, to_timestamp(answers.date_written/1000) as date, answers.answerer_name, answers.helpful as helpfulness, json_agg(json_build_object('id', photos.id, 'url', photos.url)) AS photos FROM answers LEFT JOIN photos ON photos.answer_id = answers.id WHERE question_id = ${req.query.question_id} GROUP BY answers.id`);
  res.send(response);
});

app.get('/questions', async (req, res) => {
  // req.params.question_id
  // console.log(req.query, req.params);
  const response = { product_id: req.query.product_id };

  // `select * from questions where id = ${req.params.question_id} Limit 100`
  response.results = await db.query(`SELECT id as question_id, body as question_body,
  to_timestamp(date_written/1000) as question_date, asker_name, helpful as question_helpfulness,
   reported FROM questions WHERE product_id = ${req.query.product_id} LIMIT 50`);

  const eachQuestion = async (qs) => {
    for (let q of qs.results) {
      q.answers = {};
      let answers = await db.query(`SELECT answers.id, answers.body, to_timestamp(answers.date_written/1000) as date,
      answers.answerer_name, answers.helpful as helpfulness, json_agg(photos.url) AS photos
      FROM answers LEFT JOIN photos ON photos.answer_id = answers.id
      WHERE question_id = ${q.question_id} GROUP BY answers.id`);
      for (let answer of answers) {
        // console.log(answer.question_id, answer.id)
        q.answers[JSON.stringify(answer.id)] = answer
      }
    }
    res.send(qs);
  };
  eachQuestion(response);
});

app.listen(app.get('port'));
console.log('listening on', app.get('port'));
