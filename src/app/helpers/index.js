
export default {
  text: word => word
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
};
