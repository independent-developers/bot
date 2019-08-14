function setPresence(bot, content){
  let presence = { game: { name: content } }
  console.log('Presence set at: ', content);
  return bot.user.setPresence(presence)
}

module.exports = setPresence;
