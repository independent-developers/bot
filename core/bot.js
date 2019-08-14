const Discord = require('discord.js')
const config = require('../config.js')

const bot = new Discord.Client({
  disableEveryone: true
})

// bot login
bot.login(config.token)
  .then(() => console.log(`${bot.user.username} logged in`))

// Create RichEmbed
const embed = new Discord.RichEmbed()
const createRichEmbed = (dataToEmbed) => {
  return new Discord.RichEmbed(dataToEmbed)
}

module.exports = {
  bot,
  config,
  createRichEmbed
}
