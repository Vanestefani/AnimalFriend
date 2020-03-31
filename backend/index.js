require('dotenv').config();
const app =require('./app');
const database =require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.log('server en el puerto '+app.get('port'));
}
main();