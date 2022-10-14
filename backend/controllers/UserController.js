// Model
const User = require("../models/User");

// Bcrypt
const bcrypt = require('bcryptjs');
const jwtSecret = process.env.SECRET_TOKEN;
const jwt = require('jsonwebtoken');

// Helpers
const getUserByToken = require("../helpers/getUserByToken");
const getToken = require("../helpers/getToken");
const generateToken = require("../helpers/generateToken");
const Publi = require("../models/Publi");

const UserController = {
    async register(req,res){

        const { name, email, password, confirmPassword } = req.body;
        
        if(!name){
            return res.status(422).json({ error: 'O nome é obrigatório!' })
        }
        if(!email){
            return res.status(422).json({ error: 'O email é obrigatório!' })
        }
        if(!password){
            return res.status(422).json({ error: 'A senha é obrigatória!' })
        }
        if(!confirmPassword){
            return res.status(422).json({ error: 'A confirmação de senha é obrigatória!' })
        }
    
        if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
            return res.status(422).json({ error: 'O email é inválido!' })
        }

        if(password.length < 6){
            return res.status(422).json({ error: 'A senha deve conter pelo menos 6 caracteres!' })
        }
    
        if(password !== confirmPassword){
            return res.status(422).json({ error: 'As senhas devem ser iguais!' })
        }


        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(422).json({ error: 'Usuário já existente!' })
        }

        const salt = bcrypt.genSaltSync(14);
        const passwordHash = bcrypt.hashSync(password, salt);

        const user = new User({
            name, email, password: passwordHash
        })

        if(!user){
            return res.status(422).json({ error: 'Falha na criação de usuário!' })
        }

        try {
            const newUser = await user.save();
            const token = await generateToken(newUser);

            return res.status(201).json({
                success: 'Usuário criado com sucesso!',
                _id: newUser._id,
                token 
            })
        } catch (error) {
            return res.status(500).json({
                error: 'Erro ao criar um usuário!'
            })
        }

    },

    async login(req, res){
        const { email, password } = req.body;

        if(!email){
            return res.status(422).json({ error: 'O email é obrigatório!' })
        }
        if(!password){
            return res.status(422).json({ error: 'A senha é obrigatória!' })
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({ error: 'Autenticação inválida!' })
        }

        const verifyPass = bcrypt.compareSync(password, user.password);

        if(!verifyPass){
            return res.status(422).json({ error: 'Autenticação inválida!' })
        }

        const token = await generateToken(user);

        res.status(201).json({
            success: 'Usuário autenticado com sucesso!', 
            _id: user._id, 
            token 
        })

    },

    async getUserToken(req,res){
        if(req.headers.authorization){
            const token = await getToken(req);

            const verifyToken = jwt.verify(token, jwtSecret);

            if(!verifyToken){
                return res.status(422).json({ error: 'Usuário incorreto!' })
            }
 
            const user = await User.findById(verifyToken.userId).select('-password');

            res.json(user)

        }
        
    },

    async getUserById(req,res){
        const { id } = req.params;

        if(!id.match(/^[0-9A-f]{24}$/)){
            return res.status(422).json({ error: 'Id inválido!' })
        }

        const user = await User.findById(id).select('-password');

        if(!user){
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        res.json({
            user
        })
    },

    async update(req,res){
        const token = await getToken(req);
        const userByToken = await getUserByToken(token);
        const user = await User.findById(userByToken._id);

        const { name, password, description } = req.body; 
 
        if(!name){
            return res.status(422).json({ error: 'O nome é obrigatório!' })
        }
 
        if(name){
            user.name = name
        }
        if(req.file){
            user.image = req.file.filename;
        }
        if(password){
            if(password.length < 6){
                return res.status(422).json({ error: 'A senha deve conter pelo menos seis caracteres!' })
            }
            const salt = bcrypt.genSaltSync(14);
            const passwordHash = bcrypt.hashSync(password, salt);
            user.password = passwordHash
        }
        if(description){ 
            user.description = description;
        }

        try {
            await user.save();
            await Publi.updateMany({userId: user._id }, { userImage: user.image })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o usuário!' })
        }

        res.status(200).json({ success: 'Usuário atualizado com sucesso!', user });

    }
}

module.exports = UserController