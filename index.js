const { Client, Intents } = require('discord.js');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { createAnnouncementEmbed } = require('./utils/embeds');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

const PREFIX = '!';

client.commands = new Map();

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Set up Express server
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});

client.on('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
    command.execute(message, args, client, createAnnouncementEmbed);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing the command.');
  }
});

const BOT_TOKEN = 'MTIwMTg5MzcyNDA4MzQ3MDMzNw.G8rXdi.YYrf8fbIHCuP9UcGyq7vg7e4qBkrC4IsrM7C4Q';
client.login(BOT_TOKEN);
