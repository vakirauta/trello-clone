const Column = {
    idCounter: 4,
    dragged: null,

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

        columnElement.addEventListener('dragover', function (event) {
            event.preventDefault()
        })

        columnElement.addEventListener('drop', function (event) {
            if (Note.dragged) {
               return  columnElement.querySelector('[data-notes]').append(Note.dragged)
            }
        })

            columnElement.addEventListener('dragstart', Column.dragstart)
            columnElement.addEventListener('dragend', Column.dragend)
            columnElement.addEventListener('dragenter', Column.dragenter)
            columnElement.addEventListener('dragover', Column.dragover)
            columnElement.addEventListener('dragleave', Column.dragleave)
            columnElement.addEventListener('drop', Column.drop)
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

    },
             

    dragstart (event) {
        Column.dragged = this
        this.classList.add('dragged')
    
        event.stopPropagation()
    }, 
    
     dragend (event) {
        Column.dragged = null
        this.classList.remove('dragged')
    
        // document
        //     .querySelectorAll('.note')
        //     .forEach(x => x.classList.remove('under'))
    },
    
     dragenter (event) {
        if (this === Column.dragged) {
            return
        }
           this.classList.add('under')
    },
    
     dragover (event) {
        event.preventDefault()
    
        if (this === Column.dragged) {
            return
        }
    },
    
     dragleave (event) {
        if (this === Column.dragged) {
            return
        }
        this.classList.remove('under')
    },
    
     drop (event) {
        event.stopPropagation()
    
        if (!Column.dragged || this === Column.dragged) {
            return
        } 
            const col = Array.from(document.querySelectorAll('.column'))
            const indexA = col.indexOf(this)
            const indexB = col.indexOf(Column.dragged)
    
            if(indexA < indexB) {
                this.parentElement.insertBefore(Column.dragged, this)
            }
            else {
                this.parentElement.insertBefore(Column.dragged, this.nextElementSibling)
            }
         console.log(col)
    }
}

// const note = document.querySelectorAll('.note')
// console.log(note);