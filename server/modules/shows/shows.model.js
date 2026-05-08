const  pool  = require("../../config/db");

const findAll = async ({ city, genre, page, limit,category,language }) => {
  const offset = (page - 1) * limit;

  let query = `SELECT * FROM shows WHERE 1=1 `; // Base query

  const values = [];
  let count = 1;

  // FILTER: city
  if (city) {
    query += ` AND city = $${count}`;
    values.push(city);
    count++;
  }

  // FILTER: genre
  if (genre) {
    query += ` AND $${count} = ANY(genre)`;
    values.push(genre);
    count++;
  }

  // FILTER: language
  if (language) {
    query += ` AND language = $${count}`;
    values.push(language);
    count++;
  }

  // FILTER: category
  if (category) {
    query += ` AND category = $${count}`;
    values.push(category);
    count++;
  }

  // PAGINATION
  query += ` LIMIT $${count} OFFSET $${count + 1} `;

  values.push(limit, offset);
  console.log(query,values);
  
  const result = await pool.query(query, values);


  return result.rows;
};

const findById = async (id) => {
  const query = "SELECT * FROM shows WHERE id=$1";
  const result = await pool.query(query, [id]);
  return result.rows;
};

const findShowTimesById = async (show_id) => {
  const query = "SELECT show.title,show.poster_url,show.language,show.rating,show_times.start_time,show_times.end_time FROM show_times JOIN shows ON show_times.show_id = shows.id WHERE show_times.show_id=$1";
  const result = await pool.query(query, [show_id]);
  return result.rows;
};
//create a new show
const create = async ({
  title,
  description,
  genre,
  duration_minutes,
  language,
  poster_url,
  trailer_url,
  rating,
  release_date,
  category,
  city
}) => {
   
  if (
    !title ||
    !description ||
    !genre ||
    !duration_minutes ||
    !language ||
    !poster_url ||
    !trailer_url ||
    !rating ||
    !release_date ||
    !category ||
    !city
  ) {
    throw new Error("Missing required fields");
  }

  const query = `
    INSERT INTO shows (
      title,
      description,
      genre,
      duration_minutes,
      language,
      poster_url,
      trailer_url,
      rating,
      release_date,
      category,
      city
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *
  `;

  const values = [
    title,
    description,
    genre,
    duration_minutes,
    language,
    poster_url,
    trailer_url,
    rating,
    release_date,
    category,
    city
  ];


  const result = await pool.query(query, values);

  
  return result.rows;
};

const update = async (id, { 
  title,
  description,
  duration_minutes,
  language,
  genre,
  rating,
  poster_url,
  trailer_url,  
  category,
  city
}) => {
  const query =
    "UPDATE shows SET title=$1,description=$2,duration_minutes=$3,language=$4,genre=$5,rating=$6,poster_url=$7,trailer_url=$8,category=$9,city=$10 WHERE id=$11 RETURNING *";
  const result = await pool.query(query, [
    title,
    description,
    duration_minutes,
    language,
    genre,
    rating,
    poster_url,
    trailer_url,
    category,
    city,
    id,
  ]);
  return result.rows;
};

const remove = async (id) => {
  const query = "DELETE FROM shows WHERE id=$1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows;
};
module.exports = {
  findAll,
  findById,
  findShowTimesById,
  create,
  update,
  remove,
};
