CREATE TABLE answers (
  id SERIAL,
  question_id INT,
  body TEXT,
  date_written VARCHAR(15),
  answerer_name VARCHAR(40),
  answerer_email VARCHAR(40),
  reported INT,
  helpful INT
)
-- copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
-- FROM '/home/downsauce/hackreactor/SDC/qa-api/answers.csv'
-- DELIMITER ','
-- CSV HEADER;