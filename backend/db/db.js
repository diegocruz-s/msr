const mongoose = require('mongoose');

const optionsConn = {

    async connection(){
        mongoose.connect('mongodb://localhost:27017/msrdb', function(error){
            if(!error){
                return
            }
            console.log('Falha na conexão!', error);
        })
        const connection = mongoose.connection;
        connection.once('open', () => console.log('Database rodando!!')); 
         
    },

}

optionsConn.connection().catch((error) => {
    console.log('ErrorDB', error);
})

const dbOptions = {
    mongoose,
    optionsConn
}

module.exports = dbOptions;



