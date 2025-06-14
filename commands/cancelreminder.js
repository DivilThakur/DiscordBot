const { SlashCommandBuilder } = require("@discordjs/builders");
const reminders = require("../data/reminders.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cancelreminder")
    .setDescription("Cancel your current reminder"),

  async execute(interaction) {
    const userId = interaction.user.id;
    const reminder = reminders.get(userId);

    if (!reminder) {
      return interaction.reply({
        content: "⚠️ You have no active reminders to cancel.",
        ephemeral: true,
      });
    }

    clearTimeout(reminder.timeoutId);
    reminders.delete(userId);

    await interaction.reply("❌ Your reminder has been canceled.");
  },
};
