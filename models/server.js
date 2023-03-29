import express from 'express'
import cors from 'cors'
import { Server as SocketIoServer } from "socket.io";
import { createServer } from "http";
import { socketsController } from '../sockets/controller.js';
// import { router as routerUsuarios } from '../routes/usuarios.js';
// import { router as routerAuth } from '../routes/auth.js';
// import { router as routerCategorias } from '../routes/categorias.js';
// import { router as routerProductos } from '../routes/productos.js';
// import { router as routerBuscar } from '../routes/buscar.js';
// import { router as routerUploads } from '../routes/uploads.js';




class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //this.server = require('http').createServer(this.app); libreria
        this.httpServer = createServer(this.app);
        //this.io = require('socket.io')(this.server); libreria
        this.io = new SocketIoServer(this.httpServer); // hace referencia al servidor 

        this.paths = {};

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

        //Sockets
        this.sockets();
    }


    middlewares() {
        //CORS
        this.app.use(cors())


        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        //this.app.use(this.paths.buscar, routerBuscar);
    }

    sockets() {

        this.io.on('connection', socketsController);


    }

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


export { Server }