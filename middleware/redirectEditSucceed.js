const redirectEditSucceed = (req, res) => {
  const categories = res.locals.categories
  const record = res.locals.record
  const editSucceed = res.locals.editSucceed
  const validate = res.locals.validate

  res.render('edit', { categories, record, editSucceed, validate })
}

module.exports = redirectEditSucceed