/**
 * Says hey back
 * @param {object} message 
 */
function hey(message){
    return message.reply('Hey, you!')
        .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        .catch(console.error);
}

module.exports = hey;