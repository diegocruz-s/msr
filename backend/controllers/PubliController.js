// Models
const Publi = require('../models/Publi');

// Helpers
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

const skipLimitReturn = (req)=>{
    let skip = req.query.skip ? req.query.skip : '0';
    let limit = req.query.limit ? req.query.limit : '10';

    if(!skip.match(/^[0-9]+$/) || !limit.match(/^[0-9]+$/)){
        return res.status(422).json({ error: 'Valores incorretos para a busca!' })
    } 

    return { skip, limit }
}

const validateId = (id)=>{
    if(!id.match(/^[0-9A-f]{24}$/)){
        return false;
    }

    return true;
}

const PubliController = {

    async create(req,res){
        const { title, description } = req.body;
        const token = await getToken(req);
        const user = await getUserByToken(token);
            
        // if(req.files.length === 0){
        //     return res.status(422).json({ error: 'Uma foto pelo menos é obrigatório para criar um post!' })
        // }   

        if(!req.file){
            return res.status(422).json({ error: 'Uma foto pelo menos é obrigatório para criar um post!' })
        }  

        if(!user){
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        if(!title){
            return res.status(422).json({ error: 'O título é obrigatório!' })
        }

        if(!description){
            return res.status(422).json({ error: 'A descrição é obrigatória!' })
        }

        // const images = [];

        // const imagesUpload = req.files;

        // imagesUpload.map((image)=>{
        //     images.push(image.filename);
        // })    
        const image = req.file.filename;

        const newPubliObj = {
            title, 
            description,
            image,
            userId: user._id,
            userName: user.name,
        } 
        if(user.image){
            newPubliObj.userImage = user.image;
        }

        try {
            const newPubli = new Publi(newPubliObj);

            newPubli.save();

            res.status(201).json({
                success: 'Post criado com sucesso!',
                publi: newPubli
            });

        } catch (error) {
            return res.status(500).json({ error: 'Erro na criação de usuário!', err: error })
        }


    },

    async delete(req,res){
        const { id } = req.params;

        const checkId = validateId(id);
        if(!checkId){
            return res.status(422).json({ error: 'Id inválido!' })
        }

        const publi = await Publi.findById(id);
        const token = await getToken(req);
        const user = await getUserByToken(token);

        if(!user){
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        if(!publi){
            return res.status(404).json({ error: 'Publicação não encontrado!' })
        }

        if(publi.userId.toString() !== user._id.toString()){
            return res.status(404).json({ error: 'Você só pode deletar os seus posts!' })
        }

        try {
            await Publi.findByIdAndDelete(publi._id);

            res.status(201).json({ success: 'Publicação deletada!', publi })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar!' })
        }

    },

    async getAllPublis(req,res){
        const { skip, limit } = await skipLimitReturn(req);

        const posts = await Publi.find({}).skip(Number(skip)).limit(Number(limit)).sort([['createdAt', -1]]).exec();

        res.json({ posts, lengthRes: posts.length })
    },

    async getPubliId(req,res){
        const { id } = req.params;

        const checkId = validateId(id);
        if(!checkId){
            return res.status(422).json({ error: 'Id inválido!' })
        }

        const publi = await Publi.findById(id);

        res.json({publi})

    },

    async getPubliUser(req,res){
        const token = await getToken(req);
        const user = await getUserByToken(token);

        const { skip, limit } = await skipLimitReturn(req);

        const publisUser = await Publi.find({ userId: user._id })
                                      .limit(Number(limit))
                                      .skip(Number(skip))
                                      .sort({createdAt: -1})
                                      .exec();

        res.json(publisUser);

    },

    async getPubliUserId(req,res){
        const { id } = req.params;

        const publisUser = await Publi.find({ userId: id })
                                      .sort({createdAt: -1})
                                      .exec();

        res.json(publisUser);

    },

    async countPublis(req,res){
        const { allPublis } = req.query;

        let countRegistersPubli;
        if(allPublis === 'true'){
            countRegistersPubli = await Publi.find({}).count();

        }else {
            const token = await getToken(req);
            const user = await getUserByToken(token);                
    
            countRegistersPubli = await Publi.find({ userId: user._id }).count();
        }
        
        res.json({count: countRegistersPubli});
    }, 

    async update(req,res){
        const { id } = req.params;
        const { title, description } = req.body;

        if(!title){
            return res.status(422).json({ error: 'O título é obrigatório!' })
        }

        if(!description){
            return res.status(422).json({ error: 'A descrição é obrigatória!' })
        }

        const checkId = validateId(id);
        if(!checkId){
            return res.status(422).json({ error: 'Id inválido!' })
        }
        const token = await getToken(req);
        const user = await getUserByToken(token); 
        const publi = await Publi.findById(id);

        if(!publi){
            return res.status(422).json({ error: 'Publicação não encontrada!' })
        }

        if(publi.userId.toString() !== user._id.toString()){
            return res.status(422).json({ error: 'Você só atualizar publicações que você criou!' })
        }

        if(title){
           publi.title = title;
        }
        if(description){
            publi.description = description;
        }

        try {
            await Publi.findByIdAndUpdate(publi._id, publi);
            res.status(201).json({
                success: 'Atualização realizada com sucesso!',
                publi
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar a publicação!' })
        }

    },

    async likePubli(req,res){
        const { id } = req.params;

        const checkId = validateId(id);
        if(!checkId){
            return res.status(422).json({ error: 'Token inválido!' })
        }

        const token = await getToken(req);

        const user = await getUserByToken(token);
        const publi = await Publi.findById(id);

        if(!publi){
            return res.status(422).json({
                error: 'Publicação não encontrada!'
            })
        }

        if(publi.likes.includes(user._id)){
            return res.status(422).json({
                error: 'Você já curtiu essa foto!'
            })
        }

        try {
            publi.likes.unshift(user._id);
            
            await publi.save();

            res.status(201).json({
                photoId: id,
                userId: user._id,
                success: 'Like adicionado!'
            })
            
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao dar like na publicação!' });
        } 

    },

    async commentPubli(req,res){
        const { id } = req.params;
        const { comment } = req.body;

        if(!comment){
            return res.status(422).json({ error: 'O comentário é obrigatório!' });
        }

        const checkId = validateId(id);
        if(!checkId){
            return res.status(422).json({ error: 'Token inválido!' })
        }
        
        const publi = await Publi.findById(id);

        if(!publi){
            return res.status(422).json({ error: 'Publicação não encontrada!' })
        }

        const token = await getToken(req);
        const user = await getUserByToken(token);

        const newComment = {
            comment,
            userId: user._id,
            userName: user.name,
        }

        if(user.image){
            newComment.image = user.image;
        }

        try {

            await publi.comments.push(newComment);
            await publi.save();

            res.status(201).json({
                success: 'Comentário adicionado com sucesso!',
                comment: newComment
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao adicionar um comentário!' })
        }

    },

    async search(req,res){
        let { q } = req.query;

        const { skip, limit } = await skipLimitReturn(req);

        const publis = await Publi.find({ title: new RegExp(q, 'i') }).skip(Number(skip)).limit(Number(limit)).exec();
        
        res.json({ publis, publisLength: publis.length });
    }

}
//shgW%"(1UawQvdX

module.exports = PubliController;