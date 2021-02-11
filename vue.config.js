/*
const fs = require('fs')

module.exports = {
    devServer: {
        https: {
            key: fs.readFileSync('./certs/example.com+5-key.pem'),
            cert: fs.readFileSync('./certs/example.com+5.pem'),
        },
        public: 'https://localhost:8080/'
    }
}
 */


module.exports = {
    devServer: {
        https: false,
    },
    watchOptions: {
        ignored: /node_modules/
    }
}