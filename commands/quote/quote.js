const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

module.exports = class QuoteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'quote',
      group: 'quote',
      memberName: 'quote',
      description: 'Quotes a specified user.',
      details: oneLine `
        Did your friend just say something outragous that should be preserved forever?
        Is he lying about the fact that he said it?
        Well now you can prove to him that he did, in fact, say it!
			`,
      examples: ['quote @Bob#1234'],
      args: [{
        key: 'user',
        label: 'user',
        prompt: 'What user would you like to quote? Please specify one only.',
        type: 'member',
        infinite: false
      }],
      guildOnly: true,
      guarded: true
    })
  }

  async run(message, args) {
    let quoteUser = args.user.user
    message.channel.fetchMessages({
      limit: 100
    }).then(messages => {
      messages = messages.filterArray(function(message) {
        return message.author.id === args.user.id
      })
      messages = messages.map(m => m.content)
      const embed = new Discord.RichEmbed()
        .setTitle(`**Quotes**`)
        .setAuthor(quoteUser.username, quoteUser.avatarURL)
        .setColor(0xFF0000)
        .setDescription(`1: \`${messages[0]}\`
2: \`${messages[1]}\`
3: \`${messages[2]}\`
4: \`${messages[3]}\`
5: \`${messages[4]}\`
6: \`${messages[5]}\`
7: \`${messages[6]}\`
8: \`${messages[7]}\`
9: \`${messages[8]}\`
10: \`${messages[9]}\``)
        .setFooter("QBot")
        .setTimestamp()
      message.channel.send("The last 10 messages of the user are below.")
      message.channel.send("The message can be picked by doing \`option <number>\` for the quote you want. Say \`cancel\` to cancel this command. This prompt times out in 30 seconds.")
      message.channel.send({
        embed: embed
      })
      const collector = message.channel.createCollector(msg => msg.author === message.author, {
        time: 30000
      })
      collector.on("message", (msg) => {
        if (msg.content === "cancel") collector.stop("aborted")
        if (msg.content.startsWith("option")) collector.stop("success")
      })
      collector.on("end", (collected, reason) => {
        if (reason === "time") return message.channel.send("The command timed out.")
        if (reason === "aborted") {
          message.reply("Command canceled.")
        }
        if (reason === "success") {
          let quote = collected.last().content.split(" ").slice(1)
          quote = parseInt(quote)
          quote = quote - 1
          let toQuote = messages[`${quote}`]
          message.channel.send(`"${toQuote}"
-${quoteUser.username}, 2K17`)
        }
      })
    })
  }
};
