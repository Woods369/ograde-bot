import { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  // Handle slash command
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'ogtrade') {
      const action = interaction.options.getString('action');
      const resource = interaction.options.getString('resource');
      const price = interaction.options.getString('price');

      // Create bid button
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('bid')
            .setLabel('Bid')
            .setStyle(ButtonStyle.Primary)
        );

      // Send trade message
      await interaction.reply({
        content: `**${action.toUpperCase()}** ${resource} for ${price}\nPosted by <@${interaction.user.id}>`,
        components: [row]
      });
    }
  }

  // Handle button click
  if (interaction.isButton()) {
    if (interaction.customId === 'bid') {
      // Respond with emoji only
      await interaction.reply({
        content: '✅',
        ephemeral: false
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
