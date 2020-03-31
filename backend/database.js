const mongoose=require('mongoose');
const uri=process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/AnimalFriend'  ;

mongoose.connect(uri,{
    useNewUrlParser:true,
    useCreateIndex:true
});
const coneccion=mongoose.connection;
coneccion.once("open",()=>
    {
console.log("Base de datos conectada");
    }
);