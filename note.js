const Note = {
    // счетчик для Id заметок
    idCounter: 8,
    // элемент который перетаскиваем
    dragged: null,

    // функция принимает в качестве аргумента заметку и вешает на нее событие, позволяющее редактировать эту заметку
    process (noteElement) {
            noteElement.addEventListener('dblclick', function (event) {
            noteElement.setAttribute('contenteditable', 'true')
            noteElement.removeAttribute('draggable')
            noteElement.closest('.column').removeAttribute('draggable')
            noteElement.focus()
        })
            // после того как фокус покидает элемент - удаляем атрибут
            // а если в заметке нет текста - удалем заметку
            noteElement.addEventListener('blur', function (event) {
            noteElement.removeAttribute('contenteditable')
            noteElement.setAttribute('draggable', 'true')
            noteElement.closest('.column').setAttribute('draggable', 'true')

            // noteElement.textContent = noteElement.textContent.trim()
            if (!noteElement.textContent.trim().length) {
                noteElement.remove()
            }
        })
    
        noteElement.addEventListener('dragstart', Note.dragstart)
        noteElement.addEventListener('dragend', Note.dragend)
        noteElement.addEventListener('dragenter', Note.dragenter)
        noteElement.addEventListener('dragover', Note.dragover)
        noteElement.addEventListener('dragleave', Note.dragleave)
        noteElement.addEventListener('drop', Note.drop)
    },
    // СОЗДАТЬ ЗАМЕТКУ
    create () {
        const noteElement = document.createElement('div')
                noteElement.classList.add('note')
                noteElement.setAttribute('draggable', 'true')
                noteElement.setAttribute('data-note-id', Note.idCounter)

                Note.idCounter++
                this.process(noteElement)
                console.log('create')
                return noteElement
    },

     dragstart (event) {
        Note.dragged = this
        this.classList.add('dragged')
    
        event.stopPropagation()
    }, 
    
     dragend (event) {
        Note.dragged = null
        this.classList.remove('dragged')
    
        document
            .querySelectorAll('.note')
            .forEach(x => x.classList.remove('under'))

            // event.stopPropagation()
    },
    
     dragenter (event) {

        if (this === Note.dragged) {
            return
        }
        this.classList.add('under')
    },
    
     dragover (event) {
        event.preventDefault()
    
        if (this === Note.dragged) {
            return
        }
    },
    
     dragleave (event) {

        if (this === Note.dragged) {
            return
        }
        this.classList.remove('under')
    },
    
     drop (event) {
        event.stopPropagation()

        if (!Note.dragged || this === Note.dragged) {
            return
        }
    
        if (this.parentElement === Note.dragged.parentElement) {
            
            const note = Array.from(this.parentElement.querySelectorAll('.note'))
            const indexA = note.indexOf(this)
            const indexB = note.indexOf(Note.dragged)
    
            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this)
            } 
            // else if (this.parentElement === Note.dragged.parentElement) {
            //     this.parentElement.insertBefore(Note.dragged, this)
            // }

            else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
            }

        }
        else {
            this.parentElement.insertBefore(Note.dragged, this)
            console.log('drop')
        }
        
        
    }
}




