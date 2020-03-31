const express =require('express');
const cors=require('cors');
const app =express();
//puerto
app.set('port',process.env.PORT ? process.env.PORT : "4000");
//middleware
app.use(cors());
app.use(express.json());
//rutas
///app.use('/api/users',require('./routes/usuarios'));
//app.use('/api/notes', require('./routes/notas'));

module.exports=app;