
function parseCustomDate(dateString) {
  // Example format: "19062024T070711"
  const year = dateString.substring(4, 8);
  const month = parseInt(dateString.substring(2, 4)) - 1;
  const day = dateString.substring(0, 2);
  const hours = dateString.substring(9, 11);
  const minutes = dateString.substring(11, 13);
  const seconds = dateString.substring(13, 15);

  return new Date(year, month, day, hours, minutes, seconds).getTime();
}
export function sortProjectsByDate(projects, sortOrder) {
  const sortedProjects = projects.slice();
  let  newsortedProject; 

  newsortedProject= sortedProjects.sort((a, b) => {
    const dateA = parseCustomDate(a.created_at);
    const dateB = parseCustomDate(b.created_at);
    console.log('dateA',dateA,a)
    console.log('dateB',dateB)

    if (sortOrder === 0) {
      // Ascending order
      return dateA - dateB;
    } else if (sortOrder === 1) {
      // Descending order
      return dateB - dateA;
    } else {
      throw new Error("Invalid sortOrder parameter. Use 0 for ascending and 1 for descending.");
    }
  });

  return newsortedProject;
}