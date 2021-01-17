const jwt = require('jsonwebtoken')

const generalToken = (id , name) => {

    try {
        
        return new Promise((resolve , reject) => {

            const payload = {id , name}

            jwt.sign(payload , process.env.JWT_KEY , {
                expiresIn : '200d'

            },(err , token) => {
                if(err) {
                    console.log(err);
                    reject(err)
                }
                resolve(token)
            })

        })

    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    generalToken
}