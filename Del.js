class Del  {
    constructor() {
   const del = document.querySelector('.del').addEventListener('click', function (){
       console.log('click')
   })
// вешаем событие
   
del.addEventListener('dragstart', dragstart())
del.addEventListener('dragend', dragend())

del.addEventListener ('dragenter', dragenter())
del.addEventListener ('dragleave', dragleave())
del.addEventListener ('dragover', dragover())
del.addEventListener ('drop', drop())


function dragstart(event) {
   console.log('hi')
}

function dragend(event) {
   console.log('hi')
}

function dragenter (event) {
   const column = new Column
   if (column.element === del) {
       console.log('hi')
   }
}

function dragleave (event) {
   const column = new Column
   if (column.element) {
       console.log('hi')
   }
}

function dragover (event) {
   const column = new Column
   if (column.element) {
       console.log('hi')
   }
}

function drop (event) {
   const column = new Column
   if (column.element) {
       console.log('hi')
   }
}
}
}