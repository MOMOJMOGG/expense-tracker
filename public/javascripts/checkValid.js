function checkValid(option) {
  let err = 0
  const validate = {
    nameIsValid: true,
    categoryIsValid: true,
    subcategoryIsValid: true,
    dateIsValid: true,
    amountIsValid: true,
    locationIsValid: true,
    receiptIsValid: true,
    err: 0
  }

  if (option === 'Initial') {
    return validate
  } else {
    if (!('name' in option)) {
      validate.nameIsValid = false
      err += 1
    } else if (option.name === "") {
      validate.nameIsValid = false
      err += 1
    }

    if (!('category' in option)) {
      validate.categoryIsValid = false
      err += 1
    } else if (option.category === "default") {
      validate.categoryIsValid = false
      err += 1
    }

    if (!('subcategory' in option)) {
      validate.subcategoryIsValid = false
      err += 1
    } else if (option.subcategory === "default") {
      validate.subcategoryIsValid = false
      err += 1
    }

    if (!('date' in option)) {
      validate.dateIsValid = false
      err += 1
    } else if (option.date === "") {
      validate.dateIsValid = false
      err += 1
    }

    if (!('amount' in option)) {
      validate.amountIsValid = false
      err += 1
    } else if (option.amount === '' || option.amount < 0) {
      validate.amountIsValid = false
      err += 1
    }

    validate.err = err

    return validate
  }
}

module.exports = checkValid