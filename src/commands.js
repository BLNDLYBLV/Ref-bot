const {Client, Message, TextChannel} = require('discord.js');
const listOfAudio = require('../audList');

// `this is the of the list of dialogues:`
var helpContent=`This is the of the list of dialogues available:\n`;

for(var i=0;i<listOfAudio.length;i++){
    helpContent+=`  ${i+1}: \`\`${listOfAudio[i].tag}\`\` by ${listOfAudio[i].author} \n`
}

helpContent+='\nYou can also use the \`\`pause\`\` , \`\`play\`\` and \`\`stop\`\` commands to their respective tasks'

module.exports =  ref_controller = async (message, args, bot) => {
    if(args[0]){
        if(args[0]=='help'){
            message.author.send(helpContent);
            return;
        }
        if(message.member.voice.channel){
            var exist=false;
            var dispatcher;
            for(var i=0;i<listOfAudio.length;i++){
                if(listOfAudio[i].tag==args[0]){
                    exist=true;
                    message.react('👍');
                    const connection = await message.member.voice.channel.join();
                    dispatcher = await connection.play('./audio/'+listOfAudio[i].path);
                    dispatcher.setVolume(1);
                    dispatcher.on('finish',()=>{
                        connection.disconnect();
                    })
                }
            }

            if(args[0]=='pause'){
                message.react('👍');
                const connection = await message.member.voice.channel.join();
                connection.dispatcher.pause();
            } 
            else if(args[0]=='stop'){
                message.react('😔');
                message.react('👍');
                message.member.voice.channel.leave();
            }
            else if(args[0]=='play'){
                message.react('👍');
                const connection = await message.member.voice.channel.join();
                connection.dispatcher.resume();
            }
            else if(!exist){
                message.react('😒');
                message.reply("The tag does not exist!");
            }
        }
        else{
            if(args[0]!='help'){
                message.react('👎');
                message.reply("You must be in a voice channel to call the command!");
            }
        }
    }
    else{
        message.reply("Enter proper command!");
    }
}