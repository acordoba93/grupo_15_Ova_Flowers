let admins = ['Lucas', 'Andres', 'Emilio', 'Juan'];

function admin(req, res, next){
    let user = req.query.user;
    if (user) {
        admins.forEach(function (admin) {
            if (user == admin) {
                next();
            }
        });
        res.send("No tiene los privilegios para ingresar a este sitio");
    } else{
        res.send("No se encontró el usuario");
    }
}

module.exports = admin;