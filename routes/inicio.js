const {Router} =require('express');
const router=Router();
router.route('/')
.get((req,res)=>res.send('Prueba'))
//.post();

//router.route('/:id')
//.put()
//.delete();

module.exports =router;