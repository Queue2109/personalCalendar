export function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

export function reformatDate(date) {
    // Parse the input date string into a Date object
  const dateParts = date.split('-');
  console.log(dateParts);
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JavaScript
  const day = parseInt(dateParts[2]);

  console.log(year);
  console.log(month);
  console.log(day);


  const inputDateObj = new Date(year, month, day);

  // Format the date components
  const formattedDay = String(inputDateObj.getDate()).padStart(2, '0');
  const formattedMonth = String(inputDateObj.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's 0-indexed
  const formattedYear = String(inputDateObj.getFullYear());

  // Combine the formatted components into the desired format
  const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`;
    console.log( "hello",formattedDate);

  return formattedDate;
}