//eslint-disable-next-line
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class HQCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      aliases: ['addbot'],
      group: 'support',
      memberName: 'invite',
      description: 'Sends an invite for the bot',
      details: oneLine `
        sends an invite for the bot
			`,
      examples: ['invite'],
      guarded: true
    })
  }

  //eslint-disable-next-line class-methods-use-this
  async run(message) {
    message.channel.send('https://discordapp.com/oauth2/authorize?permissions=104197193&scope=bot&client_id=322882931746013185')
  }
};
