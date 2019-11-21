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
            
                event.stopPropagation()

                document
                    .querySelectorAll('.note')
                    .forEach(noteElement => noteElement.removeAttribute('draggable'))
            }, 
            
             dragend (event) {
                Column.dragged.classList.remove('dragged')
                Column.dragged = null

                document
                    .querySelectorAll('.note')
                    .forEach(noteElement => noteElement.setAttribute('draggable', true))
                
            
                // document
                //     .querySelectorAll('.note')
                //     .forEach(x => x.classList.remove('under'))
            },

            dragenter (event) {
                if (!Column.dragged || Column.dragged === this) {
                    return
                }
                this.classList.add('under')
                console.log(this)
            },

            dragleave (event) {
                if (!Column.dragged || Column.dragged === this) {
                    return
                }
                this.classList.remove('under')
            },

             dragover (event) {
                event.preventDefault()
            
                if (!Column.dragged || Column.dragged === this) {
                    return
                }
                // this.classList.remove('under')
            },
            
            drop (event) {
                event.stopPropagation()

                if (!Column.dragged || Column.dragged === this) {
                    return
                }
            
                if (this.parentElement === Column.dragged.parentElement) {
                    const children = Array.from(document.querySelector('.columns').children)
                    const indexA = children.indexOf(this)
                    const indexB = children.indexOf(Column.dragged)
            
                    if(indexA < indexB) {
                        document.querySelector('.columns').insertBefore(Column.dragged, this)
                    }
                    else {
                        document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
                    }
                }
                else {
                    this.parentElement.insertBefore(Column.dragged, this)
                }
            }
    }

// const note = document.querySelectorAll('.note')
// console.log(note);