const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();

var token = ""; //you discord bot token

client.on('ready', () => {
    console.log("Logged in.");
});

client.on('message', msg => {

    if (msg.content.startsWith("?")) //command prefix
    {
        let textFull = msg.content.substr(1);
        let textCommand = textFull.split(" ");
        let command = textCommand[0];
        let text = textCommand.splice(1).join(" ");

        if (command == "aes") //command name
        {
            axios({
                url: "https://api.nitestats.com/v1/aes", //gets the aes key and version
                params: { displayName: text },
                method: "GET",
                responsType: "json"
            }).then(data => {
                var aspect = data.data;
                let embed = new Discord.RichEmbed()
                .setColor("#0xff0000)")
                .addField("Game Version:", aspect.data.version) //version
                .addField("MainKey:", aspect.data.aes) //aes key               				
                return msg.channel.send(embed); //sends the embed
            });
        }
    }
});

client.login(token); //starts the client