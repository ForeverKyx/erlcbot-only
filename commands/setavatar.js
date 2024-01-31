// commands/setavatar.js
module.exports = {
  name: 'setavatar',
  description: 'Change the bot\'s avatar.',
  execute(message, args, client) {
    // Check if the user has the 'ADMINISTRATOR' permission
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      message.reply('You don\'t have permission to change the bot\'s avatar.');
      return;
    }

    // Check if the bot has the 'CHANGE_AVATAR' permission
    if (!message.guild.me.permissions.has('CHANGE_NICKNAME')) {
      message.reply('I don\'t have permission to change my avatar in this server.');
      return;
    }

    // Get the URL of the new avatar from the command arguments
    const newAvatarUrl = args[0];
    if (!newAvatarUrl) {
      message.reply('Please provide a valid URL for the new avatar.');
      return;
    }

    // Change the bot's avatar
    client.user.setAvatar(newAvatarUrl)
      .then(user => {
        console.log(`Bot's avatar changed to: ${user.displayAvatarURL()}`);
        message.reply('My avatar has been changed.');
      })
      .catch(error => {
        console.error('Error changing avatar:', error);
        message.reply(`There was an error changing my avatar: ${error.message}`);
      });
  },
};
