const express = require('express');
const app = express();
const morgan = require('morgan');
const indexRoutes = require('./routes/index');
const conexion = require('./database');
const cors = require('cors');
//settings
app.set('port', 3105);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // este modulo permite entender los datos enviados desde un formulario y sirve para guardar datos, es extended false porque no se enviara imagene ni archuivos muy grandes
app.use(morgan('dev'));

//routes
app.use(indexRoutes);

//server
app.listen(app.get('port'), () => {
    console.log('server listening on port ' + app.get('port'));
});