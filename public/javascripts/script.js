const recCategory = document.getElementById('rec-category')

if (recCategory != null) {
  recCategory.addEventListener('change', event => {
    const selectedTarget = event.target.value
    console.log('ss')
    const selector = document.getElementById('category-selector')
    selector.action = `/expense/select/${selectedTarget}`
    selector.method = "GET"
    selector.submit()
  })
}