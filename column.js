const Column = {
	idCounter: 4,
    dragged: null,
    dropped: null,

	process (columnElement) {
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
        
        const headerElement = columnElement.querySelector('.column-header')

        headerElement.addEventListener('dblclick', function (event) {
            columnElement.removeAttribute('draggable')
            headerElement.setAttribute('contenteditable', true)
            headerElement.focus()
            
        })

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable', true)
            columnElement.setAttribute('draggable', 'true')
            Application.save()
        })

        columnElement.addEventListener('drop', function(event){
			if (Note.dragged) {
				return columnElement.querySelector('[data-notes]').append(Note.dragged)
			}
		})
        columnElement.addEventListener('dragstart', Column.dragstart)
        columnElement.addEventListener('dragend', Column.dragend)
        // columnElement.addEventListener('dragenter', Column.dragenter)
        columnElement.addEventListener('dragover', Column.dragover)
        // columnElement.addEventListener('dragleave', Column.dragleave)
        columnElement.addEventListener('drop', Column.drop)
        },
        
        

        create (id = null) {

            const columnElement = document.createElement('div')
                
            
            columnElement.classList.add('column')
            columnElement.setAttribute('draggable', 'true')

            if (id) {
                columnElement.setAttribute('data-column-id', id)
            }

            else {
                columnElement.setAttribute('data-column-id', Column.idCounter)
                Column.idCounter++
            }
    
            columnElement.innerHTML = 
            `<p class="column-header">В плане</p>
            <div data-notes></div>
            <p class="column-footer">
                <span data-action-addNote class="action">+ Добавить карточку</span>
            </p>`
            // обрабатываем новую колонку, чтобы в ней можно было Доавлять новые заметки
            Column.process (columnElement)

            return columnElement
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
                Column.dragged = null
                Column.dropped = null
                this.classList.remove('dragged')

                document
                    .querySelectorAll('.note')
                    .forEach(noteElement => noteElement.setAttribute('draggable', true))
                
                    Application.save()
                // document
                //     .querySelectorAll('.note')
                //     .forEach(x => x.classList.remove('under'))
            },

            // dragenter (event) {
            //     if (!Column.dragged || this === Column.dragged) {
            //         return
            //     }
            //     this.classList.add('under')
            //     // document
            //     //     .querySelectorAll('.note')
            //     //     .forEach(x => x.classList.remove('under'))
            // },

            // dragleave (event) {
            //     if (!Column.dragged || this === Column.dragged) {
            //         return
            //     }
            //     this.classList.remove('under')
            // },

             dragover (event) {
                 event.preventDefault()
                 event.stopPropagation()

                 if (Column.dragged === this) {
                     if (Column.dropped) {
                        Column.dropped.classList.remove('under')
                     }
                     Column.dropped = null
                 }
                 
                 if (!Column.dragged || this === Column.dragged) {
                     return
                    }
                Column.dropped = this

                document
                    .querySelectorAll('.column')
                    .forEach(columnElement => columnElement.classList.remove('under'))

                this.classList.add('under')
            },
            
            drop (event) {
                event.stopPropagation()
                if (!Column.dragged || this === Column.dragged) {
                    return
                }


                // if (Note.dragged) {
                //     return columnElement.querySelector('[data-notes]').append(Note.dragged),
                //     console.log(Note.dragged)
                // }
            
                else if (this.parentElement === Column.dragged.parentElement) {
                    const children = Array.from(document.querySelector('.columns').children)
                    const indexA = children.indexOf(this)
                    const indexB = children.indexOf(Column.dragged)
            
                    if(indexA < indexB) {
                        // Вставляем переносимый элемент перед которым делаем дроп
                        // this - элемент над которым дропаем(срабатывает, в данном случае колонка)
                        document.querySelector('.columns').insertBefore(Column.dragged, this)
                    }
                    else {
                        // Вставляем переносимый элемент перед которым делаем дроп
                        document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
                    } 
                }
                else {
                    this.parentElement.insertBefore(Column.dragged, this) 
                }  
                document
                    .querySelectorAll('.column')
                    .forEach(columnElement => columnElement.classList.remove('under'))
            }
    }

// const note = document.querySelectorAll('.note')
// console.log(note);