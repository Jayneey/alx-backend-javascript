export default function createIteratorObject(report) {
  // Use a generator function to create an iterator that
  // yields each employee name
  function* employeeIterator() {
    for (let dept in report.allEmployees) {
      let employees = report.allEmployees[dept];
      for (let i = 0; i < employees.length; i++) {
        yield employees[i];
      }
    }
  }

  // Return the iterator object
  return {
    [Symbol.iterator]: employeeIterator,
  };
}

