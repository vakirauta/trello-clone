const Column = {
    idCounter: 4,
    dragged: null,

    process (columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')

        spanAction_addNote.addEventListener('click', function (event) {
                const noteELement = Note.create()

                columnElement.querySelector('[data-notes]').append(noteElement)
                
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

        columnElement.addEventListener('dragstart', Column.dragstart)
        columnElement.addEventListener('dragend', Column.dragend)
        columnElement.addEventListener('dragover', Column.dragover)
        columnElement.addEventListener('drop', Column.drop)
        },

        
            dragstart (event) {
                Column.dragged = this
                this.classList.add('dragged')
            
                event.stopPropagation()
            }, 
            
             dragend (event) {
                Column.dragged = null
                this.classList.remove('dragged')
            
                document
                    .querySelectorAll('.note')
                    .forEach(x => x.classList.remove('under'))
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