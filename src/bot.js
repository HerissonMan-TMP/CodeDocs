const Discord = require('discord.js')
require('dotenv').config()
const fs = require('fs')
const doc = require('./docs/doc')
const botInfo = require('./bot_info')

const prefix = "docs!"

const client = new Discord.Client()
client.login(process.env.BOT_TOKEN)

//Keep bot alive
var http = require('http'); //importing http
function startKeepAlive() {
    setInterval(function() {
        var options = {
            host: 'https://code-docs.herokuapp.com/',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 30000); // load every 20 minutes
}
startKeepAlive();


client.on('message', function(message) {
    
    //Check if the bot needs to deal with the message.
    if (!message.content.startsWith(prefix)) return

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()

    switch (command) {
        //Help command
        case 'help':
            var embed = new Discord.MessageEmbed()
                .addField('docs!help', 'Displays what you are reading.')
                .addField('docs!contact', 'Displays Bot author\'s contact information.')
                .addField('docs![language]', 'Displays information & documentation about the specified language.')
                .setColor(0x000000)
                .setFooter('By ' + botInfo.authorName, botInfo.authorLogo)
            message.channel.send(embed)
            break

        //Contact command
        case 'contact':
            var embed = new Discord.MessageEmbed()
                .setTitle('Contact the Bot author:')
                .setDescription(botInfo.authorContact)
                .setColor(0x000000)
                .setFooter('By ' + botInfo.authorName, botInfo.authorLogo)
            message.channel.send(embed)
            break
            
        //Get the required documentation and send it.
        default:
            fs.access('./src/docs/doc_' + command + '.js', (err) => {
                if (err) {
                    message.channel.send(doc.createEmbedDocError())
                } else {
                    var docArgs = require('./docs/doc_' + command)
                    var embed = doc.createEmbedDoc(
                        docArgs.languageName,
                        docArgs.color,
                        docArgs.thumbnail,
                        docArgs.docLink,
                        docArgs.learningVideoURL
                        )
                    message.channel.send(embed)
                }

            })
            break
    }

})