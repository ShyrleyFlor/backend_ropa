import Usuario from "../models/Usuario.js"

const checkUserDuplicado = async (req, res, next) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                user: req.body.user
            }
        })

        if (usuario) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            })
        }

        next();
    } catch (error) {
        console.log(error)
        
    }
}

export {checkUserDuplicado}