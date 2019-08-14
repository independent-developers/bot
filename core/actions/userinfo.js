const { embed } = require('./bot')

/**
 * Give all informations on the user
 * @param {object} message 
 */
function userInfo(message){
    // #98BAD7 light blue
    embed
      .setAuthor(message.author.username)
      .setDescription('A super user')
      .setColor("#9B59B6")
      .addField('Full Username', fullAuthorName)
      .addField('Id User', `${message.author.id}`)
      .addField('Created at', `${message.author.createdAt}`)
      return message.channel.send(embed);
}
module.exports = userInfo;