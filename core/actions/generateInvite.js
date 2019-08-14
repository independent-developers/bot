/**
 * [generateInvite description]
 * @param  {[type]} bot  The actual discord client
 * @param  {array} role  An array of roles you want to pass
 * @return {[type]}      [description]
 */
async function generateInvite(bot, roles){
  const generatedInvite = await bot.generateInvite(roles);
  return generateInvite;
}
module.exports = generateInvite;
