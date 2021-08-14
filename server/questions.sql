CREATE TABLE questions (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  body TEXT,
  date_written BIGINT,
  asker_name VARCHAR (40),
  asker_email VARCHAR (40),
  reported BOOLEAN,
  helpful INT,
  PRIMARY KEY (id)
);

copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/home/downsauce/hackreactor/SDC/qa-api/questions.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX product_idx on questions (product_id);

-- sudo -u postgres psql < server/questions.sql
