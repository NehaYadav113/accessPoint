var config = {}

config.service = 'Gmail'
config.username = process.env.username;
config.password = process.env.password;
config.sendAddr = process.env.sendAddr;
config.mongoURI = process.env.mongoURI;
module.exports = config;

