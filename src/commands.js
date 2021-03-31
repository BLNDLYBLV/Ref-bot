const {Client, Message, TextChannel} = require('discord.js');
const listOfAudio = require('../audList');

module.exports =  ref_controller = async (message, args, bot) => {
    if(args[0]){
        if(message.member.voice.channel){
            var dispatcher;
            for(var i=0;i<listOfAudio.length;i++){
                if(listOfAudio[i].tag==args[0]){
                    const connection = await message.member.voice.channel.join();
                    dispatcher = await connection.play('./audio/'+listOfAudio[i].path);
                    dispatcher.setVolume(1);
                    dispatcher.on('finish',()=>{
                        connection.disconnect();
                    })
                }
            }

            if(args[0]=='pause'){
                console.log('se');
                dispatcher.pause();
            } 
            else if(args[0]=='stop'){
                message.member.voice.channel.leave();
            }
            else if(args[0]=='play'){
                console.log('ay');
                dispatcher.resume();
            }
            else if(args[0]=='help'){
                console.log('help');
            }
        }
        else{
            message.reply("You must be in a voice channel to call the command!");
        }
    }
    else{
        message.reply("Enter proper command!");
    }
}