// commands/roles.js
module.exports = {
  name: 'roles',
  description: 'Add or delete roles for a user.',
  execute(message, args) {
    // Check if the user has the 'MANAGE_ROLES' permission
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply('You don\'t have permission to manage roles.');
      return;
    }

    // Parse the user mention or ID from the command arguments
    const user = message.mentions.users.first() || args[0];
    if (!user) {
      message.reply('Please mention a user or provide their ID.');
      return;
    }

    // Fetch the member to get the user object
    const member = message.guild.members.cache.get(user.id) || user;
    if (!member) {
      message.reply('User not found. Make sure the user is in the server.');
      return;
    }

    // Parse the role mention or ID from the command arguments
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!role) {
      message.reply('Please mention a role or provide its ID.');
      return;
    }

    // Check if the bot has the 'MANAGE_ROLES' permission
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
      message.reply('I don\'t have permission to manage roles in this server.');
      return;
    }

    // Check if the bot can manage the specified role
    if (!role.editable) {
      message.reply('I don\'t have permission to manage the specified role.');
      return;
    }

    // Check if the user already has the role
    if (member.roles.cache.has(role.id)) {
      // User has the role, delete it
      member.roles.remove(role)
        .then(() => message.reply(`Role ${role.name} removed from ${member.user.tag}.`))
        .catch(error => {
          console.error('Error removing role:', error);
          message.reply(`There was an error removing the role: ${error.message}`);
        });
    } else {
      // User doesn't have the role, add it
      member.roles.add(role)
        .then(() => message.reply(`Role ${role.name} added to ${member.user.tag}.`))
        .catch(error => {
          console.error('Error adding role:', error);
          message.reply(`There was an error adding the role: ${error.message}`);
        });
    }
  },
};
