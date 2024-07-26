const socket = io();
let userName;

const chatbox = document.getElementById('chatbox')
const msgLogs = document.getElementById('message-logs')

Swal.fire({
    title: 'Inicia',
    icon: 'info',
    text: 'Para poder utilizar nuestro chat, necesitamos que te identifiques',
    input: 'text',
    inputLabel: "Nombre de usuario",
    inputPlaceholder: "Ingresa tu nombre de usuario",
    inputValidator: (value) => {
        if(!value) {
            return 'Debes iniciar sesión para poder acceder'
        } else {
            socket.emit('userConection', value)
        }
    },
    confirmButtonText: 'Ingresar',
    allowOutsideClick : false
  }).then(result => {
        userName = result.value
        const userNameElement = document.getElementById('username');
        userNameElement.innerHTML = userName;
  })


chatbox.addEventListener('keyup', event => {

    if(event.key === 'Enter') {
        if(chatbox.value.trim().length > 0) {
            socket.emit('message', {user : userName, message: chatbox.value});
            chatbox.value = '';
        }
        else {
            Swal.fire({
                title: "Tu mensaje está vacío",
                icon: "info"
              });
        }
    }
})

socket.on('messagelog', data => {
    let messages = ''
    data.forEach(log => {
        messages += `<b>${log.user}:</b> ${log.message}<br/>`
    });

    msgLogs.innerHTML = messages;
})

socket.on('alertConection', data => {
    console.log('alguien se conecta')
    Swal.fire({
        position: "top-end",
        icon: "info",
        title: `${data} se ha conectado!`,
        showConfirmButton: false,
        timer: 1500
      });
})