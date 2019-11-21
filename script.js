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
            // создаем колонку
                const columnElement = document.createElement('div')
                
                    columnElement.classList.add('column')
                    columnElement.setAttribute('draggable', 'true')
                    columnElement.setAttribute('data-column-id', Column.idCounter)
            
                    columnElement.innerHTML = 
                    `<p class="column-header">В плане</p>
                    <div data-notes></div>
                    <p class="column-footer">
                        <span data-action-addNote class="action">+ Добавить карточку</span>
                    </p>`
            
                    Column.idCounter++
                    // вставляем новую колонку
                    document.querySelector('.columns').append(columnElement)
                    // обрабатываем новую колонку, чтобы в ней можно было боавлять новые заметки
                    Column.process (columnElement)
             }
        )
// редактирование заметок при двойном клике
// находим все заметки
    document
        .querySelectorAll('.note')
        // вешаем на каждую заметку функцию,которая позволяет их редактировать
        .forEach(Note.process)




    


    