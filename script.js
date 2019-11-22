//Реализуем добавление заметок в колонки
//находим все колонки
document
.querySelectorAll('.column')
//добавляем функцию, которая позволяет добавлять заметки в колонку
.forEach(Column.process)

// Создание новой колонки
// находим кнопку для добавления колонки
    document
        .querySelector('[data-action-addColumn]')
        // вешаем событие
        .addEventListener ('click', function (event) {
                    const columnElement = Column.create()
                    // вставляем новую колонку
                    document.querySelector('.columns').append(columnElement)
                    columnElement.querySelector('.column-header').setAttribute('contenteditable', true)
		            columnElement.querySelector('.column-header').focus()
             }
        )
// редактирование заметок при двойном клике
// находим все заметки
    document
        .querySelectorAll('.note')
        // вешаем на каждую заметку функцию,которая позволяет их редактировать
        .forEach(Note.process)

        document.querySelector('.columns').addEventListener('dragover', function (event) {
			event.preventDefault()
		})       


    


    