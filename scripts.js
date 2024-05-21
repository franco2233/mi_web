document.addEventListener('DOMContentLoaded', (event) => {
    // Cargar los comentarios guardados
    loadComments();
});

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    
    // Obtener la fecha y hora actual
    const now = new Date();
    const dateTime = now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Crear un nuevo comentario
    const commentData = {
        name: name,
        comment: comment,
        dateTime: dateTime
    };
    
    // Guardar el comentario en localStorage
    saveComment(commentData);
    
    // Mostrar el comentario en la lista
    addCommentToList(commentData);
    
    // Limpiar el formulario
    document.getElementById('comment-form').reset();
});

document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Cambiar el texto del botón dependiendo del modo
    if (document.body.classList.contains('dark-mode')) {
        this.textContent = 'Modo Claro';
    } else {
        this.textContent = 'Modo Oscuro';
    }
});

function saveComment(commentData) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(commentData);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(addCommentToList);
}

function addCommentToList(commentData) {
    const commentItem = document.createElement('li');
    commentItem.innerHTML = `<strong>${commentData.name}</strong>: ${commentData.comment}<br><span class="comment-time">${commentData.dateTime}</span>`;
    document.getElementById('comments-list').appendChild(commentItem);
}
