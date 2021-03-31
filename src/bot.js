require("dotenv").config();

const {Client, Message, TextChannel} = require('discord.js');
const listOfAudio = require('../audList');
const ref_controller = require('./commands');

const bot = new Client();

bot.on('ready',() => {
    console.log('Ref_bot online!!');
});

bot.on('message', async (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith('$')){
        const [ cmd , ...args ] = message.content
        .trim()
        .substring(1)
        .split(/\s+/);
        if(cmd == 'r'){
            ref_controller(message,args,bot);
        } 
    }
});


bot.login(process.env.BOT_TOKEN);