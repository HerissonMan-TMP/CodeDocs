const botInfo = require('../bot_info')
const { MessageEmbed } = require('discord.js')

var createEmbedDoc = function(languageName, color, thumbnail, docLink, learningVideoURL) {

    return new MessageEmbed()
        .setTitle(languageName)
        .setColor(color)
        .setDescription('Information & Docs for ' + languageName)
        .addField('Documentation: ', (typeof docLink === 'undefined') ? '*Not provided*' : '[Click here](' +  docLink + ')')
        .addField('Getting Started: ', (typeof learningVideoURL === 'undefined') ? '*Not provided*' : learningVideoURL)
        .setThumbnail(thumbnail)
        .setFooter('By ' + botInfo.authorName, botInfo.authorLogo)

}

var createEmbedDocError = function() {

    return new MessageEmbed()
        .setTitle('Not found')
        .setColor(0x000000)
        .setDescription('Unfortunately, this language is not listed.\nPlease contact the bot author if you want to suggest a language.')
        .setFooter('By ' + botInfo.authorName, botInfo.authorLogo)

}

module.exports = {
    createEmbedDoc: createEmbedDoc,
    createEmbedDocError: createEmbedDocError
}