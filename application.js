const Application = {
    save () {
        const object = {

            columns: {
                idCounter: Column.idCounter,
                items: []
            },

            notes: {
                idCounter: Note.idCounter,
                items: []
            }
        }
        // Создаем объект с колонками, в который вставляем найденные id колонок и записок
        document
            .querySelectorAll('.column')
            .forEach(element => {
                const column = {
                    title: '',
                    id: parseInt(element.getAttribute('data-column-id')),
                    noteIds: []
                }
                // Отыскиваем заметки и вынимаем id и пушим в объект с колонками
                element
                    .querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                        // object.notes.items.push(this)
                    })
                    // Отыскиваем ЗАГОЛОВКИ колонок и передаем в объект column.title
                element
                    .querySelectorAll('.column-header')
                    .forEach(titleElement => {
                        let header = {
                            title: titleElement.textContent
                        }
                        column.title = header.title
                    })
                    
                    
                // Пушим Id колонок в объект Object.columns.item
                object.columns.items.push(column)
            })
                // Находим,а затем обходим все заметки
            document
                .querySelectorAll('.note')
                .forEach(noteElement => {
                    const note = {
                        id: parseInt(noteElement.getAttribute('data-note-id')),
                        content: noteElement.textContent
                    }
                    object.notes.items.push(note)
            })
            // Сериализация object т.е. перевод в формат json
            const json = JSON.stringify(object)

            localStorage.setItem('trello', json)
    },

         load () {
        if (!localStorage.getItem('trello')) {
            return
        }

        const mountePoint = document.querySelector('.columns')
        mountePoint.innerHTML = ''
        //Десериализовали object  т.е. восстановление первоначального состояния.
        const object = JSON.parse(localStorage.getItem('trello'))
        // 
        const getNoteById = id => object.notes.items.find(note => note.id === id)


        for (const {id, title, noteIds} of object.columns.items) {

            const column = new Column(id)
            // Вытаскиваем(загружаем) сохраненные в save() заголовки из column.title
            column.element.querySelector('.column-header').textContent = title
            mountePoint.append(column.element)
            for (const noteId of noteIds) {
                const {id, content} = getNoteById(noteId)

                const note = new Note(id, content)
                column.element.querySelector('[data-notes]').append(note.element)
            }
        }

    }
}