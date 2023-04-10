import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
   return jwt.sign(user, 'thisismysecret', { expiresIn: '7d' })
}

//token v
export const tokenVerify = (req, res, next) => {
    const { authorization = '' } = req.headers;
    jwt.verify(authorization.replace('Bearer ', ''), 'thisismysecret', (err, data) => { 
        if (err) {
            return res.status(401).json({"message":'unautherized'})
        }
        req.user=data
        next();
    })
}