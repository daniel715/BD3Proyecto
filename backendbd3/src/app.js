const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const indexRoutes = require('./routes/index');
const conexion = require('./database');
const ejs = require('ejs');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // se usa path para que no haya conflicto en sistemas operativos
app.set('view engine', 'ejs');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // este modulo permite entender los datos enviados desde un formulario y sirve para guardar datos, es extended false porque no se enviara imagene ni archuivos muy grandes
app.use(morgan('dev'));

//routes
app.use('/', indexRoutes);

//server
app.listen(app.get('port'), () => {
    console.log('server listening on port 3000');
});