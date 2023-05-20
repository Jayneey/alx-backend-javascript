const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Jane Affamuefuna <https://github.com/Jayneey>
 */

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      throw new Error('Cannot load the database');
    }

    const headers = lines[0].split(',');
    const fields = headers.slice(1);
    const students = lines.slice(1);

    console.log(`Number of students: ${students.length}`);

    fields.forEach((field, index) => {
      const studentsInField = students.filter(student => student.split(',')[index + 1] !== '');
      const studentNames = studentsInField.map(student => student.split(',')[0]);

      console.log(`Number of students in ${field}: ${studentsInField.length}. List: ${studentNames.join(', ')}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Usage example
countStudents('database.csv');
