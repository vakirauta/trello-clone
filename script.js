//Реализуем добавление заметок в колонки
//находим все колонки
// document
// .querySelectorAll('.column')
//добавляем функцию, которая позволяет добавлять заметки в колонку
// .forEach(Column.process)

// Создание новой колонки
// находим кнопку для добавления колонки

Application.load() 

    document
        .querySelector('[data-action-addColumn]')
        // вешаем событие
        .addEventListener ('click', function (event) {
                    const column = new Column
                    // вставляем новую колонку
                    document.querySelector('.columns').append(column.element)
                    column.element.querySelector('.column-header').setAttribute('contenteditable', true)
                    column.element.querySelector('.column-header').focus()
                    
                    Application.save()
             }
        )
             

             
        const del = document.querySelector('[data-action-delElem]')
        // вешаем событие

        del.addEventListener('dragstart', dragstart())
        del.addEventListener('dragend', dragend())

        del.addEventListener ('dragenter', dragenter())
        del.addEventListener ('dragleave', dragleave())
        del.addEventListener ('dragover', dragover())
        del.addEventListener ('drop', drop())


        function dragenter (event) {
            const column = new Column
            if (column.element === del) {
                console.log('hi')
            }
        }

        function dragleave (event) {
            const column = new Column
            if (column.element) {
                console.log('hi')
            }
        }

        function dragover (event) {
            const column = new Column
            if (column.element) {
                console.log('hi')
            }
        }

        function drop (event) {
            const column = new Column
            if (column.element) {
                console.log('hi')
            }
        }
             
    
        
// редактирование заметок при двойном клике
// // находим все заметки

document
.querySelectorAll('.note')
// вешаем на каждую заметку функцию,которая позволяет их редактировать
.forEach.bind(new Note)




    


    