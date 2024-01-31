// utils/embeds.js
const { MessageEmbed } = require('discord.js');

function createAnnouncementEmbed(title, description, color) {
  let colorCode;

  // Check if a color name is provided
  if (color) {
    colorCode = resolveColorCode(color.toLowerCase());
  } else {
    // Default to a blue color if no color is specified
    colorCode = '#0099ff';
  }

  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(colorCode);

  return embed;
}

// Helper function to resolve color names to hex codes
function resolveColorCode(color) {
  switch (color) {
    case 'red':
      return '#ff0000';
    case 'orange':
      return '#ffa500';
    case 'yellow':
      return '#ffff00';
    case 'green':
      return '#00ff00';
    case 'blue':
      return '#0000ff';
    case 'purple':
      return '#800080';
    case 'pink':
      return '#ff69b4';
    case 'brown':
      return '#8b4513';
    case 'grey':
      return '#808080';
    case 'black':
      return '#000000';
    case 'white':
      return '#ffffff';
    // Add more color cases as needed
    default:
      return '#0099ff'; // Default to blue if the provided color is not recognized
  }
}

module.exports = {
  createAnnouncementEmbed,
};
