export const getLatestCourses = (courses) => {
  const tmpCourses = [...courses];
  const top3 = tmpCourses.sort((a, b) => Number(b.start) - Number(a.start)).slice(0, 3);
  return top3;
}

export const courseTest = () => {

}