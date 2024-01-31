// commands/announce.js
const { createAnnouncementEmbed } = require('../utils/embeds');

module.exports = {
  name: 'announce',
  description: 'Send an embedded announcement.',
  execute(message, args) {
    try {
      // Check if the bot has the 'SEND_MESSAGES' permission
      if (!message.guild.me.permissions.has('SEND_MESSAGES')) {
        console.log('Bot does not have permission to send messages.');
        return;
      }

      // Check if the bot has the 'EMBED_LINKS' permission for sending embeds
      if (!message.guild.me.permissions.has('EMBED_LINKS')) {
        console.log('Bot does not have permission to send embeds.');
        return;
      }

      // Check if title, description, and color are provided
      if (args.length < 3) {
        throw new Error('Usage: !announce <title> <description> <color>');
      }

      const title = args[0];
      const description = args.slice(1, -1).join(' '); // Adjusted to handle multiple words in the description
      const color = args[args.length - 1].toLowerCase(); // Color is now the last argument in lowercase

      const announcement = createAnnouncementEmbed(title, description, color);
      message.channel.send({ embeds: [announcement] });
    } catch (error) {
      console.error('Error executing announce command:', error);
      message.reply('There was an error executing the command. Check the console for details.');
    }
  },
};
