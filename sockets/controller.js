const socketsController = (socket) => {

    console.log('cliente-connectado', socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 123456;
        callback(id);

        socket.broadcast.emit('enviar-mensaje', payload); //socket.emit = solo manda mensaje al cliente. 
        // socket.broadcast emite el mensaje para todos los clientes conectados
    })
}

export { socketsController }