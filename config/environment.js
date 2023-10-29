const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory
})


const development = {
    name : 'development',
    asset_path : './assets',
    db : 'mongodb+srv://smghulamghausfaiyaz19:Ghul%40m29091993gh%40u%24@habbit-tracker.8klhauo.mongodb.net/?retryWrites=true&w=majority',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogStream}
    }
}


const production = {
    name : 'production',
    asset_path : process.env.HABBIT_ASSET_PATH,
    db : process.env.HABBIT_DB,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogStream}
    }
}

// module.exports = development;

module.exports = eval(process.env.HABBIT_ENVIRONMENT) == undefined ? development : eval(process.env.HABBIT_ENVIRONMENT);

