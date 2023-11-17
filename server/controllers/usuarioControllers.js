import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';

const registrar = async (req, res) => {

    try {
        //verificamos si existe el usuario
        const usuario = await Usuario.findOne({
            where: {
                user: req.body.user
            }
        })

        if (!usuario) {
            const user = await Usuario.create({
                user: req.body.user,
                password: bcrypt.hashSync(req.body.password, 10),
                token: req.body.token,
                eliminado: 0
                
            })

            res.json({
                user
            })
        }
        
    } catch (error) {
        console.log(error)       
    }
}

const autenticar = async (req, res) => {
    const { user, password } = req.body;

    const usuario = await Usuario.findOne({
        where: {
            user
        }
    })

    //comprobar si el usuario existe
    if (!usuario) {
        return res.status(404).json({
            msg: 'El usuario no existe'
        })
    }

    //comprobar la contraseña
    const passwordValido = bcrypt.compareSync(password, usuario.password);

    if (!passwordValido) {
        return res.status(401).json({
            msg: 'Contraseña incorrecta'
        })
    }

    //enviar respuesta de confirmacion a FRONTEND
    res.json({
        user,
        password,
        token: usuario.token
    })
}

const listar = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json({
        usuarios
    })
}

export {
    registrar,
    autenticar,
    listar
}