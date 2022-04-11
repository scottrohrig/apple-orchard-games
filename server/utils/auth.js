// require jwt
const jwt = require('jsonwebtoken');

// create secret and expiration
const secret = 'HowBoutThemApples';
const expiration = '2h';

// modularize with middleware functions
module.exports = {
    // signToken with user information
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret);
    },

    // set up authMiddleware function
    authMiddleware: function({ req }) {
        // allow token to be sent via req.body, req.query, or req.headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // remove "Bearer" in authorization header
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // if no token, return req object
        if (!token) {
            return req;
        }

        try {
            // destructure data, store in req object
            // check that secret matches jwt.sign() token
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return updated req object
        return req;
    }
};
