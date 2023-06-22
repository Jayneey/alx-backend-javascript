const express = require('express');
const fs = require('fs');
const { countStudents, readDatabase } = require('./3-read_file_async');

const app = express();
const port = 1245;

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Students endpoint
app.get('/students', async (req, res) => {
  const database = process.argv[2];

  try {
    const data = await readDatabase(database);
    const { students, csStudents, sweStudents } = countStudents(data);

    const response = `This is the list of our students
Number of students: ${students.length}
Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}
Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}`;

    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
