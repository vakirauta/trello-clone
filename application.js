const Application = {
    save () {
        const object = {
            columns: {
                idCounter: 1,
                items: []
            },
            notes: {
                idCounter: 1,
                items: []
            }
        }

        document
            .querySelectorAll('.column')
            .forEach(columnElement => {
                const column = {
                    id: parseInt(columnElement.getAttribute('data-column-id')),
                    noteIds: []
                }
                columnElement
                    .querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                        object.notes.items.push(this)
                    })

                object.columns.items.push(column)
                
            })

            return object

    },

    load () {

    }
}