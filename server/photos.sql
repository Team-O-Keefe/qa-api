CREATE TABLE photos (
  id SERIAL,
  answer_id INT,
  url VARCHAR (255),
  PRIMARY KEY (id)
)
-- copy photos(id, answer_id, url)
-- FROM '/home/downsauce/hackreactor/SDC/qa-api/answers_photos.csv'
-- DELIMITER ','
-- CSV HEADER;
-- sudo -u postgres psql < server/answers_photos.sql