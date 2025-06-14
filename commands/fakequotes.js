const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fakequote")
    .setDescription("Get a random fake inspirational quote (from DummyJSON)."),

  async execute(interaction) {
    try {
      const response = await fetch("https://dummyjson.com/quotes");
      const data = await response.json();

      const quotes = data.quotes;

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      await interaction.reply(
        `💡 **"${randomQuote.quote}"**\n— *${randomQuote.author}*`
      );
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      await interaction.reply(
        "❌ Could not generate a fake quote. Try again later."
      );
    }
  },
};
