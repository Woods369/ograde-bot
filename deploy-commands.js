import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('ogtrade')
    .setDescription('Post a trade offer for resources')
    .addStringOption(option =>
      option.setName('action')
        .setDescription('Buy or sell')
        .setRequired(true)
        .addChoices(
          { name: 'buy', value: 'buy' },
          { name: 'sell', value: 'sell' }
        ))
    .addStringOption(option =>
      option.setName('resource')
        .setDescription('Resource type')
        .setRequired(true)
        .addChoices(
          { name: 'metal', value: 'metal' },
          { name: 'crystal', value: 'crystal' },
          { name: 'deut', value: 'deut' }
        ))
    .addStringOption(option =>
      option.setName('price')
        .setDescription('Price (e.g., 10kk, 300k)')
        .setRequired(true))
].map(command => command.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
