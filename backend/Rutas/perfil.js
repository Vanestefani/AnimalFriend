const {Router} =require('express');
const router=Router();
router.route('/')
.get((req,res)=>res.send('perfil'))
//.post();

//router.route('/:id')
//.put()
//.delete();

module.exports =router;