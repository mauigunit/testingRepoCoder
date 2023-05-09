
const authMiddleware = (req, res, next) =>{
    if(req.session.user){
        next()
    } else {
        res.redirect('/login');
    }
}

const sessionValidation = (req, res, next) =>{
    if(!req.session?.user){
        next()
    } else {
        res.redirect('/api/products');
    }
}

export {authMiddleware,sessionValidation}

