require("dotenv").config();

const {Client, Message, TextChannel, Guild} = require('discord.js');
const listOfAudio = require('../audList');
const ref_controller = require('./commands');

const bot = new Client();

const tag_replies=["Don't disturb me from my slumber for this pls :confounded:","Damn nibba leave me alone","What the hell do you want","Don't tag me fucker","Get a life, leave me alone"]
const Welcome = `Hi I'm Ref_bot, My master's name is BLNDLYBLV

You can use my references using \`\`$r <ref_tag>\`\`

I also have a help function, \`\`$r help\`\` and it gets you to my DMs😘

To add more fun audios fill this google form: https://forms.gle/td9xDeuKCv2mArbj7

To add me to other servers use this link: https://discord.com/oauth2/authorize?client_id=826563255748263947&scope=bot

Have fun!!

Yours sadly,
Ref_bot
`

// const newcmds = `My master added 5 new audio tags
// - \`\`enna_enna\`\`
// - \`\`kadal_neerum\`\`
// - \`\`kurukka_indha\`\`
// - \`\`nenachen_da\`\`
// - \`\`en_neram\`\`
// You can always get every tags with the \`\`help\`\` tag
// Orz master blndlyblv
// `

bot.on('ready',() => {
    console.log('Ref_bot online!!');
    bot.user.setStatus('dnd');
    bot.user.setActivity('Game');
    bot.user.setPresence({
        game: {
            name: 'with depression',
            type: "STREAMING",
            url: "https://www.twitch.tv/monstercat"
        }
    });
    // bot.guilds.cache.forEach((guild)=>{
    //     var f=0;
    //     guild.channels.cache.forEach((channel)=>{
    //         if(channel.guild.name==guild.name && channel.type=='text'){
    //             if(f!=1){
    //                 channel.send(newcmds);
    //                 f=1;
    //             }
    //         }
    //     });
    // });

    // console.log();
});
bot.on('guildCreate',(guild)=>{
    var f=0;
    console.log((guild.channels.cache.forEach((channel)=>{
        if(channel.guild.name==guild.name && channel.type=='text'){
            if(f!=1){
                channel.send(Welcome);
                f=1;
            }
        }
    })));
})
bot.on('message', async (message) => {
    if(message.author.bot) return;
    if(message.mentions.users.find(user => user.id==bot.user.id)){
        message.reply(tag_replies[Math.floor(Math.random()*tag_replies.length)]);
    }
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