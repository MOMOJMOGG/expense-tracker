const recCategory = document.getElementById('rec-category')

if (recCategory !== null) {
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

if (tape !== null) {
  tape.addEventListener('click', event => {
    if (event.target.classList.contains('del-btn')) {
      const targetId = event.target.dataset.id

      $('#del-btn-link').attr("action", `/expense/${targetId}?_method=DELETE`)
      $('#del-btn-link').attr("method", "POST")
      $('#deleteWarningModal').modal('show')
    }
  })
}

const newForm = document.querySelector('.new-form')
const createBtn = document.getElementById('create-btn')
if (newForm !== null) {
  if (createBtn !== null) {
    createBtn.addEventListener('click', function onCreateBtnClicked(event) {
      newForm.classList.add('was-validated')
    })
  }

  newForm.addEventListener('submit', function onFormSubmit(event) {
    if (!newForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
  })
}

const editForm = document.querySelector('.edit-form')
const editBtn = document.getElementById('edit-btn')

if (editForm !== null) {
  if (editBtn !== null) {
    editBtn.addEventListener('click', function onEditBtnClicked(event) {
      editForm.classList.add('was-validated')
    })
  }

  editForm.addEventListener('submit', function onFormSubmit(event) {
    if (!editForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
  })
}