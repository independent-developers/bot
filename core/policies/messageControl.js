const config = require('../../config')
/**
 * Check Autor Message
 * @description Check if the message sender is the user
 * @param {Object} message The message from the user
 */
const checkAuthorMessage = message => new Promise((resolve, reject) => {
  if(message.author.bot){
    console.log('bot message', { bot: message.author.bot });
    console.error('Oops, seems to be a bot talk. Not allowed !')
    reject(message);
  }
  console.log('Seems not to be a bot message');
  return resolve(message);
})

/**
 * Check Direct Message
 * @description Check if this is a direct message wich is not allowed
 * @param {object} message 
 */
const checkIfDirectMessage = message => new Promise((resolve, reject) => {
  if (message.channel.type === 'dm') {
    console.log('DM message');
    const error = new Error('Oops, seems to be a direct message. Not allowed !')
    error.code = "DIRECT_MESSAGE_CODE_NOT_PERMITTED"
    return reject(error);
  }
  console.log('Not a DM message');
  return resolve(message);
})

/**
 * Data Formater
 * @description The data formatter to give a simpler interface of data
 * @param {object} message 
 */
const dataFormater = message => new Promise((resolve, reject) => {
  console.log('Formatting data..')
      
  let order = message.content.split(' ')
  console.log('The full command', order);
  
  const command = order[0];
  console.log('The command is :', command);
  
  const prefix = command.charAt(0);
  console.log('The prefix is :', prefix);
  if(prefix !== config.prefix) {
    console.log('Not the expected prefix, sorry')
    return reject(prefix)
  }
  const cleanedCommand = command.replace(config.prefix, "");
  console.log('The cleaned command is :', cleanedCommand);
  
  // return resolve(message)
  return resolve({
      options: {
          controls: true,
          content: message.content,
          command: cleanedCommand,
          prefix: prefix || '',
          id: message.id
      },
      controlledMessage: message
  })
})


/**
 * Message Control
 * This function is a process to analyse any message who come in a public
 * channel to respect policies and code of conduct for bots.
 * @param  {object} message the message sent by a user
 * @return {object} formattedData The message analysed, untouched.
 */
function messageControl(message){
  console.log('Controlling message :');
  return checkAuthorMessage(message)
    .then(messageFromAUser => checkIfDirectMessage(messageFromAUser))
    .then(notADirectMessage => dataFormater(notADirectMessage))
    .catch(err => console.error(err))
}

module.exports = messageControl;
