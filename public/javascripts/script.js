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

const tape = document.querySelector('.tape')

if (tape != null) {
  tape.addEventListener('click', event => {
    if (event.target.classList.contains('del-btn')) {
      const targetId = event.target.dataset.id

      $('#del-btn-link').attr("action", `/expense/${targetId}?_method=DELETE`)
      $('#del-btn-link').attr("method", "POST")
      $('#deleteWarningModal').modal('show')
    }
  })
}