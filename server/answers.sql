CREATE TABLE answers (
  id SERIAL,
  question_id INT,
  body TEXT,
  date_written BIGINT,
  answerer_name VARCHAR(40),
  answerer_email VARCHAR(40),
  reported BOOLEAN,
  helpful INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);
copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/home/downsauce/hackreactor/SDC/qa-api/answers.csv'
DELIMITER ','
CSV HEADER;
copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/home/ubuntu/qa/csv-full/answers.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX question_idx ON answers (question_id);
-- sudo -u postgres psql < server/answers.sql