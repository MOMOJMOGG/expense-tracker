module.exports = (str, maxLength) => {
  if (str.length > maxLength) {
    return true
  } else {
    return false
  }
}