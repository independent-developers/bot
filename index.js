// ENV
require('dotenv').config()
console.log(process.env.NODE_ENV === 'production' ? 'PROD mod' : 'DEV mod');
console.log(process.env.DISCORD_TOKEN ? 'The TOKEN has been set correctly' : 'No TOKEN set up');

// CORE
const { bot, config } = require('./core/bot')
const messageControl = require('./core/policies/messageControl')
const processMessage = require('./core/processMessage')
const setPresence = require('./core/actions/setPresence')

// Set avatar when ready
bot.on('ready', async () => {
  console.log(`${bot.user.username} ready !`);
  setPresence(bot, 'Developing 👨‍💻')
  // generateInvite(bot, ['ADMINISTRATOR'])
})

// When receive a message
bot.on('message', async (message) => {
  try {
    const { controlledMessage, options } = await messageControl(message);
    console.log('options', options)
    console.log('controlledMessage', controlledMessage)
    if (options && options.controls) {
      console.log('Message controlled okay', controlledMessage)
      return processMessage(controlledMessage, options)
    }
  } catch (e){
    console.log('Youps', e.stack || e)
    throw new Error('Can not process the message')
  }
})

// Say hi to new comers
bot.on('guildMemberAdd', (newMember) => {
  console.log('New Member', newMember)
  return newMember.createDM()
        .then((channel) => channel.send(`Bienvenue sur le serveur ${newMember.displayName}!`))
        .catch(console.error)
})