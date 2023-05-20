const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Jane Affamuefuna <https://github.com/Jayneey>
 */
const countStudents = async (dataPath) => {
  const fileLines = await fs.readFile(dataPath, 'utf-8');
  const studentGroups = {};
  const dbFieldNames = fileLines.split('\n')[0].split(',');
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  for (const line of fileLines.slice(1)) {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];
    if (!studentGroups.hasOwnProperty(field)) {
      studentGroups[field] = [];
    }
    const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
    studentGroups[field].push(Object.fromEntries(studentEntries));
  }

  const totalStudents = Object.values(studentGroups).reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, group] of Object.entries(studentGroups)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }

  return totalStudents;
};

if (require.main === module) {
  const dataPath = 'students.csv';
  const totalStudents = await countStudents(dataPath);

  console.log(f'Number of students: {totalStudents}')
}

