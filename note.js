class Note {
    constructor (id = null, content = '') {

        const del = document.querySelector('.img1')
        del.addEventListener('dragover', function() {
            event.preventDefault()
        })
        del.addEventListener('drop', function () {
            if (Note.dragged) {
                Note.dragged.remove()
            }
        })

            const element = this.element = document.createElement('div')
			element.classList.add('note')
            element.setAttribute('draggable', 'true')
            element.textContent = content
            
        if (id) {
            element.setAttribute('data-note-id', id)
        }

        else {
			element.setAttribute('data-note-id', Note.idCounter)
            Note.idCounter++
        }
        element.addEventListener('dblclick', function (event) {
            element.setAttribute('contenteditable', 'true')
            element.removeAttribute('draggable')
            element.closest('.column').removeAttribute('draggable')
            element.focus()
        })
        
        element.addEventListener('blur', function (event) {
            element.removeAttribute('contenteditable')
            element.setAttribute('draggable', 'true')
            element.closest('.column').setAttribute('draggable', 'true')
    
            if (!element.textContent.trim().length) {
                element.remove()
            }
            Application.save()
        })

        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))
        element.addEventListener('dragenter', this.dragenter.bind(this))
        element.addEventListener('dragover', this.dragover.bind(this))
        element.addEventListener('dragleave', this.dragleave.bind(this))
        element.addEventListener('drop', this.drop.bind(this))

        }

    get column() {
        return this.element.closest('.column')
    }

    dragstart (event) {
        event.stopPropagation()

        Note.dragged = this.element
        this.element.classList.add('dragged')
    }
    
    dragend (event) {
        event.stopPropagation()

        Note.dragged = null
        this.element.classList.remove('dragged')

        document
            .querySelectorAll('.note')
            .forEach(x => x.classList.remove('under'))
    
            Application.save()
    }
    
    dragenter (event) {
        // event.preventDefault()
        
        if (!Note.dragged || this.element === Note.dragged) {
            return
        }
        this.element.classList.add('under')
    }
    
    dragover (event) {
        
        event.preventDefault()
        if (!Note.dragged || this.element === Note.dragged) {
            return
        }
        
        // this.element.elementclassList.remove('under')
    }
    
    dragleave (event) {
        
        event.stopPropagation()

        if (!Note.dragged || this.element === Note.dragged) {
            return
        }
        this.element.classList.remove('under')
    }
    
    drop (event) {
        event.stopPropagation()

        if(!Note.dragged || this.element === Note.dragged) {
            return
        }
    
        else if (this.element.parentElement === Note.dragged.parentElement) {
            const note = Array.from(this.element.parentElement.querySelectorAll('.note'))
            const indexA = note.indexOf(this.element)
            const indexB = note.indexOf(Note.dragged)

            if (indexA < indexB) {
                this.element.parentElement.insertBefore(Note.dragged, this.element)
                console.log('вставляю выше')
            }
            
            else {
                this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling)
                console.log('вставляю ниже')
            }
        }
    
        else {
            this.element.parentElement.insertBefore(Note.dragged, this.element)
            console.log('вставляю в соседний столбец')
          }

        //   if (!this.element.parentElement.children.length) {
        //       console.log(this.element.parentElement.children.length)
        //   }
          
      }
      
}

        

Note.idCounter = 8
Note.dragged = null




