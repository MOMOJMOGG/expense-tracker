const recCategory = document.getElementById('rec-category')

if (recCategory != null) {
  $('#rec-category').change(function () {
    const id = $(this).val()
    const options = $('#rec-subcategory').children()
    options.each(function (idx, option) {
      if (option.dataset.name === id) {
        option.removeAttribute("hidden")
      } else {
        option.setAttribute("hidden", "")
      }
    })
    $('#rec-subcategory').html(options)
  })
}