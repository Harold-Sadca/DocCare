export function calculateAge(dateOfBirth: string) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

//for splicing the ilnesses
export function toFirstLetterUpperCase(word: string) {
  return word.charAt(1).toUpperCase();
}

export function futureDate(date: string) {
  const now = new Date();
  const inputStartDate = new Date(date);
  if (inputStartDate < now) return true;
}
