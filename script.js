
    document
        .querySelectorAll('.column')
        .forEach(Column.process)

    document
        .querySelector('[data-action-addColumn]')
        .addEventListener ('click', Column.columnCreate)

    document
        .querySelectorAll('.note')
        .forEach(Note.process)




    


    