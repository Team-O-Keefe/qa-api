CREATE TABLE answers (
  id SERIAL,
  question_id INT,
  body TEXT,
  date_written VARCHAR(15),
  answerer_name VARCHAR(40),
  answerer_email VARCHAR(40),
  reported INT,
  helpful INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
)
-- copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
-- FROM '/home/downsauce/hackreactor/SDC/qa-api/answers.csv'
-- DELIMITER ','
-- CSV HEADER;
-- sudo -u postgres psql < server/answers.sql