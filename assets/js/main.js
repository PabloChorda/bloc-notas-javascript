window.addEventListener("load", (event) => {

    let btn = document.querySelector(".main__btn");
    let notes = document.querySelector(".main__notes");

    btn.addEventListener("click", (e) => {
        // Agregar nota cuando doy click al boton
        createNote("", "", true);
    });

    let createNote = (body = "", title = "", transition = true) => {
        // Creando el html de la nota
        let note = document.createElement('article');
        note.classList.add("notes__note");

        note.innerHTML += `
        <header class="note__header">
            <input type="text" class="header__input" value="${title}" placeholder="Título">
            <i class="note__icon fa-solid fa-trash"></i>
        </header>

        <textarea class="note__body" name="body" placeholder="Escribe aquí">${body}</textarea>
        `;

        // Elementos del DOM a utilizar
        let input = note.querySelector(".header__input");
        let textarea = note.querySelector(".note__body");
        let trash = note.querySelector(".note__icon");

        //Guardar datos de mi nota
        input.addEventListener("input", () => {
            update();
        });

        textarea.addEventListener("input", () => {
            update();
        });

        // Eliminar notas de la lista
        trash.addEventListener("click", () => {
            note.classList.remove("note--visible-no-transition");
            note.classList.remove("note--visible"); 

            setTimeout(() => {
                note.remove();
                update();
            }, 310);
        });

        // Agrego nota al contenedor de notas
        notes.appendChild(note);

        if (transition) {
            setTimeout(() => {
                note.classList.add("note--visible");            
            }, 10);            
        } else {
            note.classList.add("note--visible-no-transition"); 
        }
    }

    let update = () => {
        notesArray = [];
        let notesDom = document.querySelectorAll(".notes__note");

        notesDom.forEach(noteDom => {
            let noteInput = noteDom.querySelector(".header__input");
            let noteTextarea = noteDom.querySelector(".note__body");

            let note = { 
                "body": noteTextarea.value, 
                "title": noteInput.value
            };

            if (note.body.trim() != "" || note.title.trim() != "") {
                notesArray.push(note);                
            }
        });

        // Persistir notas
        localStorage.setItem("notes", JSON.stringify(notesArray));
    }

    // Función para que se listen las notas de nuevo
    let getNotes = () => {
        let notesStorage = JSON.parse(localStorage.getItem("notes"));

        if (notesStorage) {
            notesStorage.forEach(note => {
                createNote(note.body, note.title, false);
            });
        }
    }

    getNotes();
});
