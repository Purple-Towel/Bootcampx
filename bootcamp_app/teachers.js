const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${process.argv[2]}'
GROUP BY teacher, cohort
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(assistance_request => {
    console.log(`${assistance_request.cohort}: ${assistance_request.teacher}`);
  })
});