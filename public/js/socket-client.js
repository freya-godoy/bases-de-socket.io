
//Referencias del html 
const lblOnline = document.querySelector('#lblOnline'); //Usamos JQuery manual sin instalar. 
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


const socket = io(); // mantiene el estado de la comunicacion con el servidor 

// detectar cambios de coneccion cuando estamos en el cliente o el servidor 

socket.on('connect', () => {
    //   console.log('Conectado');

    lblOffline.style.display = 'none'; //Mostramos el servidor ONLINE (ocultando lblOffline / lblOnline)
    lblOnline.style.display = '';

});


socket.on('disconnect', () => { //"ON" escucha un evento
    //console.log('Desconectado del servidor');

    lblOnline.style.display = 'none'; // Mismo proceso para mostrar el servidor cuando se desconecta
    lblOffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123BCA',
        fecha: new Date().getTime()
    }
    // Mandamos informacion al servidor 
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    });//"EMIT" emite un evento 

});