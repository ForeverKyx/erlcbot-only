// commands/ban.js
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a user and log to the audit log.',
  execute(message, args) {
    // Check if the user has the 'BAN_MEMBERS' permission
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      message.reply('You don\'t have permission to ban members.');
      return;
    }

    // Check if the bot has the 'BAN_MEMBERS' permission
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      message.reply('I don\'t have permission to ban members in this server.');
      return;
    }

    // Parse the user mention or ID from the command arguments
    const userToBan = message.mentions.users.first() || args[0];
    if (!userToBan) {
      message.reply('Please mention a user to ban or provide their ID.');
      return;
    }

    // Fetch the member to get the user object
    const memberToBan = message.guild.members.cache.get(userToBan.id) || userToBan;
    if (!memberToBan) {
      message.reply('User not found. Make sure the user is in the server.');
      return;
    }

    // Ban the user
    memberToBan.ban({ reason: 'Banned by command' })
      .then(bannedUser => {
        // Log to the audit log
        logToAuditLog(message.guild, bannedUser);

        // Optionally, kick the user before banning
        // Uncomment the following line if you want to kick the user before banning
        // memberToBan.kick('Kicked before banning by command');

        // Optionally, mute the user before banning
        // Uncomment the following line if you want to mute the user before banning
        // memberToBan.roles.add('YOUR_MUTE_ROLE_ID').catch(console.error);

        message.reply(`User ${bannedUser.tag} has been banned.`);
      })
      .catch(error => {
        console.error('Error banning user:', error);
        message.reply(`There was an error banning the user: ${error.message}`);
      });
  },
};

// Helper function to log to the audit log
function logToAuditLog(guild, bannedUser) {
  const auditLogChannel = guild.channels.cache.find(channel => channel.name === 'audit-log');

  if (!auditLogChannel) {
    console.error('Audit log channel not found. Please configure one.');
    return;
  }

  const embed = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle('User Banned')
    .setDescription(`User: ${bannedUser.tag} (${bannedUser.id})`)
    .setTimestamp();

  auditLogChannel.send({ embeds: [embed] });
}
