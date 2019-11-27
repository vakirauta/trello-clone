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
        const del = document.querySelector('.del').addEventListener('click', function (){
            console.log('click')
        })      
// редактирование заметок при двойном клике
// // находим все заметки

document
.querySelectorAll('.note')
// вешаем на каждую заметку функцию,которая позволяет их редактировать
.forEach.bind(new Note)




    


    