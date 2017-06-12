const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');
function randomtext()
{
    let text = "";
    let possible = "@#%>?";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = class SuggestCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'qtext',
      group: 'fun',
      memberName: 'qtext',
      description: 'random qbert text!',
      details: oneLine `
        qbert like text!
			`,
      examples: ['qtext'],
      args: [{
        key: 'toQtext',
        label: 'qtext',
        prompt: 'Random Text',
        type: 'string',
        infinite: false
      }],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message, args) {
    let qbert = randomtext()
    message.reply(qbert * message.content.length)
  }
};
