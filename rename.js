// commands/rename.js
module.exports = {
  name: 'rename',
  description: 'Change the bot\'s nickname in the server.',
  execute(message, args, client) {
    const newNickname = args.join(' ');
    if (!newNickname) {
      message.reply('Please provide a new nickname.');
      return;
    }

    // Check if the bot has the 'MANAGE_NICKNAMES' permission
    if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
      message.reply('I don\'t have permission to manage nicknames in this server.');
      return;
    }

    // Change the bot's nickname in the server
    message.guild.me.setNickname(newNickname)
      .then(updatedGuildMember => {
        console.log(`Bot's nickname changed to: ${updatedGuildMember.nickname}`);
        message.reply(`My nickname in this server has been changed to ${updatedGuildMember.nickname}.`);
      })
      .catch(error => {
        console.error('Error changing nickname:', error);
        message.reply('There was an error changing my nickname.');
      });
  },
};
