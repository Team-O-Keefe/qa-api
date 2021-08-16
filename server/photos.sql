CREATE TABLE photos (
  id SERIAL,
  answer_id INT,
  url VARCHAR (255),
  PRIMARY KEY (id),
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(id)
);
copy photos(id, answer_id, url)
FROM '/home/downsauce/hackreactor/SDC/qa-api/answers_photos.csv'
DELIMITER ','
CSV HEADER;

copy photos(id, answer_id, url)
FROM '/home/ubuntu/qa/csv-full/answers_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX answer_idx ON photos (answer_id);
-- sudo -u postgres psql < server/answers_photos.sql