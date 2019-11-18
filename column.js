const Column = {
    idCounter: 4,

    process (columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')

        spanAction_addNote.addEventListener('click', function (event) {
                const noteElement = document.createElement('div')
                noteElement.classList.add('note')
                noteElement.setAttribute('draggable', 'true')
                noteElement.setAttribute('data-note-id', Note.idCounter)

                Note.idCounter++

                columnElement.querySelector('[data-notes]').append(noteElement)
                Note.process(noteElement);
                
                noteElement.setAttribute('contenteditable', 'true')
                noteElement.focus()

        })

        const headerElement = columnElement.querySelector('.column-header')

        headerElement.addEventListener('dblclick', function (event) {
            headerElement.setAttribute('contenteditable', true)
            headerElement.focus()
        })

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable', true)
        })

        columnElement.addEventListener('dragover', Column.dragover)
        columnElement.addEventListener('drop', Column.drop)
        },

        dragover (event) {
            event.preventDefault()
        },

        drop () {
            if (!Note.dragged) {
               return  this.querySelector('[data-notes]').append(Note.dragged)
             }
            },
        
    


    columnCreate (event) {
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

        document.querySelector('.columns').append(columnElement)

        Column.process (columnElement)
 }
}

// const note = document.querySelectorAll('.note')
// console.log(note);