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
            .forEach(columnElement => {
                const column = {
                    title: '',
                    id: parseInt(columnElement.getAttribute('data-column-id')),
                    noteIds: []
                }
                // Отыскиваем заметки и вынимаем id и пушим в объект с колонками
                columnElement
                    .querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                        // object.notes.items.push(this)
                    })
                    // Отыскиваем ЗАГОЛОВКИ колонок и передаем в объект column.title
                columnElement
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
            const json = JSON.stringify(object)
            localStorage.setItem('trello', json)

    },

         load () {
        if (!localStorage.getItem('trello')) {
            return
        }

        const mountePoint = document.querySelector('.columns')
        mountePoint.innerHTML = ''

        const object = JSON.parse(localStorage.getItem('trello'))
        const getNoteById = id => object.notes.items.find(note => note.id === id)


        for (const column of object.columns.items) {
            // const titleElement = Column.headerElement
            const columnElement = Column.create(column.id, column.title)
            // Вытаскиваем(загружаем) сохраненные в save() заголовки из column.title
            columnElement.querySelector('.column-header').textContent = column.title

            mountePoint.append(columnElement)
            

            for (const noteId of column.noteIds) {
                const note = getNoteById(noteId)

                const noteElement = Note.create(note.id, note.content)
                columnElement.querySelector('[data-notes]').append(noteElement)
            }
        }

    }
}