module.exports = regularExpressResult = {
  matchReceipt: (receipt) => {
    if (receipt === '') {
      return true
    }
    const result = receipt.match(/^[a-zA-Z]{2}-[0-9]{8}$/i)
    if (!result || result[0] !== receipt) {
      return false
    } else {
      return true
    }
  }
}