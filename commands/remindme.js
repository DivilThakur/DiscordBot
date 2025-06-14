const { SlashCommandBuilder } = require("@discordjs/builders");
const reminders = require("../data/reminders.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remindme")
    .setDescription("Set a reminder")
    .addIntegerOption((option) =>
      option
        .setName("minutes")
        .setDescription("Time in minutes")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Reminder message")
        .setRequired(true)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const minutes = interaction.options.getInteger("minutes");
    const message = interaction.options.getString("message");

    if (reminders.has(userId)) {
      return interaction.reply({
        content:
          "⏳ You already have a reminder set. Use `/cancelreminder` first.",
        ephemeral: true,
      });
    }

    const endTime = Date.now() + minutes * 60 * 1000;

    const timeoutId = setTimeout(async () => {
      try {
        await interaction.user.send(`⏰ Reminder: ${message}`);
      } catch (err) {
        console.error("Failed to send DM:", err);
      }
      reminders.delete(userId);
    }, minutes * 60 * 1000);

    reminders.set(userId, { timeoutId, endTime, message });

    await interaction.reply(
      `✅ Reminder set for **${minutes} minutes** from now.\n📌 Message: "${message}"`
    );
  },
};
