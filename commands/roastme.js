const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roastme")
    .setDescription("Get roasted! (Warning: it's brutal 🔥)"),

  async execute(interaction) {
    try {
      const response = await fetch(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json"
      );
      const data = await response.json();

      const insult = data.insult || "You're awesome... wait, wrong API!";

      await interaction.reply(`🔥 **Roast incoming:** ${insult}`);
    } catch (error) {
      console.error("Failed to fetch roast:", error);
      await interaction.reply("❌ Couldn't fetch a roast. Try again later.");
    }
  },
};
