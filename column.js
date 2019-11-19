const Column = {
    idCounter: 4,
    dragged: null,

    process (columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')

        spanAction_addNote.addEventListener('click', function (event) {
                const noteElement = Note.create()

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
        columnElement.addEventListener('dragenter', Column.dragenter)
        columnElement.addEventListener('dragover', Column.dragover)
        columnElement.addEventListener('dragleave', Column.dragleave)
        columnElement.addEventListener('drop', Column.drop)
        },

        
            dragstart (event) {
                Column.dragged = this
                Column.dragged.classList.add('dragged')
            
                // event.stopPropagation()
            }, 
            
             dragend (event) {
                Column.dragged.classList.remove('dragged')
                Column.dragged = null
                
            
                // document
                //     .querySelectorAll('.note')
                //     .forEach(x => x.classList.remove('under'))
            },

            dragenter (event) {
                if (!Column.dragged || Column.dragged === this) {
                    return
                }
            },
            dragover (event) {
                if (!Column.dragged || Column.dragged === this) {
                    return
                }
            },
            dragleave (event) {
                if (!Column.dragged || Column.dragged === this) {
                    return
                }
            },
             dragover (event) {
                event.preventDefault()
            
                if (!Column.dragged || this === Column.dragged) {
                    return
                }
            },
            
            drop () {
                event.stopPropagation()
    
                if (!Column.dragged || this === Column.dragged) {
                    return
                }
            
                if (this.parentElement === Column.dragged.parentElement) {
                    const note = Array.from(this.parentElement.querySelectorAll('.note'))
                    const indexA = note.indexOf(this)
                    const indexB = note.indexOf(Column.dragged)
            
                    if(indexA < indexB) {
                        this.parentElement.insertBefore(Column.dragged, this)
                    }
                    else {
                        this.parentElement.insertBefore(Column.dragged, this.nextElementSibling)
                    }
                }
                else {
                    this.parentElement.insertBefore(Column.dragged, this)
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