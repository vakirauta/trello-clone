class Column {
    constructor (id = null) {
        const element = this.elementdocument.createElement('div')
            element.classList.add('column')
            element.setAttribute('draggable', 'true')

            if (id) {
                element.setAttribute('data-column-id', id)
            }

            else {
                element.setAttribute('data-column-id', Column.idCounter)
                Column.idCounter++
            }
    
            element.innerHTML = 
            `<p class="column-header">В плане</p>
            <div data-notes></div>
            <p class="column-footer">
                <span data-action-addNote class="action">+ Добавить карточку</span>
            </p>`

            const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')
        // КНОПКА ДОБАВИТЬ КАРТОЧКУ
		spanAction_addNote.addEventListener('click', function (event) {

            // СОЗДАТЬ КАРТОЧКУ
            const noteElement = Note.create()
			
			columnElement.querySelector('[data-notes]').append(noteElement)

			noteElement.setAttribute('contenteditable', 'true')
            noteElement.focus()
            
		})
        // ЗАГОЛОВОК
        
        const headerElement = element.querySelector('.column-header')

        headerElement.addEventListener('dblclick', function (event) {
            element.removeAttribute('draggable')
            headerElement.setAttribute('contenteditable', true)
            headerElement.focus()
            
        })

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable', true)
            element.setAttribute('draggable', 'true')
            if (!headerElement.textContent) {
                headerElement.innerHTML = "В плане"
            }
            Application.save()
        })

        element.addEventListener('drop', function(event){
			if (Note.dragged) {
				return element.querySelector('[data-notes]').append(Note.dragged)
			}
		})
        element.addEventListener('dragstart', Column.dragstart.bind(this))
        element.addEventListener('dragend', Column.dragend.bind(this))
        // columnElement.addEventListener('dragenter', Column.dragenter)
        element.addEventListener('dragover', Column.dragover.bind(this))
        // columnElement.addEventListener('dragleave', Column.dragleave)
        element.addEventListener('drop', Column.drop.bind(this))
            // обрабатываем новую колонку, чтобы в ней можно было Доавлять новые заметки
    }

    dragstart (event) {
        Column.dragged = this
        Column.dragged.classList.add('dragged')
    
        event.stopPropagation()

        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
    }
    
    dragend (event) {
        Column.dragged = null
        Column.dropped = null
        this.element.classList.remove('dragged')
    
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', true))
        
            Application.save()
        // document
        //     .querySelectorAll('.note')
        //     .forEach(x => x.classList.remove('under'))
    }
    
    // dragenter (event) {
    //     if (!Column.dragged || this.element === Column.dragged) {
    //         return
    //     }
    //     this.element.classList.add('under')
    //     // document
    //     //     .querySelectorAll('.note')
    //     //     .forEach(x => x.classList.remove('under'))
    // },
    
    // dragleave (event) {
    //     if (!Column.dragged || this.element === Column.dragged) {
    //         return
    //     }
    //     this.element.classList.remove('under')
    // },
    
     dragover (event) {
         event.preventDefault()
         event.stopPropagation()
    
         if (Column.dragged === this.element) {
             if (Column.dropped) {
                Column.dropped.classList.remove('under')
             }
             Column.dropped = null
         }
         
         if (!Column.dragged || this.element === Column.dragged) {
             return
            }
        Column.dropped = this.element
    
        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
    
        this.element.classList.add('under')
    }
    
    drop (event) {
        event.stopPropagation()
        if (!Column.dragged || this.element === Column.dragged) {
            return
        }
    
    
        // if (Note.dragged) {
        //     return columnElement.querySelector('[data-notes]').append(Note.dragged),
        //     console.log(Note.dragged)
        // }
    
        else if (this.element.parentElement === Column.dragged.parentElement) {
            const children = Array.from(document.querySelector('.columns').children)
            const indexA = children.indexOf(this.element)
            const indexB = children.indexOf(Column.dragged)
    
            if(indexA < indexB) {
                // Вставляем переносимый элемент перед которым делаем дроп
                // this.element - элемент над которым дропаем(срабатывает, в данном случае колонка)
                document.querySelector('.columns').insertBefore(Column.dragged, this.element)
            }
            else {
                // Вставляем переносимый элемент перед которым делаем дроп
                document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling)
            } 
        }
        else {
            this.element.parentElement.insertBefore(Column.dragged, this.element) 
        }  
        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
    }
}

Column.idCounter = 4
Column.dragged = null
Column.dropped = null

// const note = document.querySelectorAll('.note')
// console.log(note);