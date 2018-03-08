// Hash a string to a 32-bit integer
export default function hash(str) {
  return str.split('').reduce((num, c) => {
    const updated = ((num<<5) - num) + c.charCodeAt(0);
    return updated & updated;
  }, 0);
}