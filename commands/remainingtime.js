const { SlashCommandBuilder } = require('@discordjs/builders');
const reminders = require('../data/reminders.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remainingtime')
    .setDescription('Check remaining time for your reminder'),

  async execute(interaction) {
    const userId = interaction.user.id;
    const reminder = reminders.get(userId);

    if (!reminder) {
      return interaction.reply({
        content: '🕐 No active reminder found.',
        ephemeral: true,
      });
    }

    const msLeft = reminder.endTime - Date.now();
    if (msLeft <= 0) {
      reminders.delete(userId);
      return interaction.reply("⏱ Your reminder is about to go off!");
    }

    const minutes = Math.floor(msLeft / 60000);
    const seconds = Math.floor((msLeft % 60000) / 1000);

    await interaction.reply(
      `🕒 Time left: **${minutes}m ${seconds}s**\n📌 Reminder: "${reminder.message}"`
    );
  },
};
