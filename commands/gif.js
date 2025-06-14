const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const TENOR_API_KEY = process.env.TENOR_API_KEY; // Replace this with your actual Tenor API key

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Get a GIF based on a keyword")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("Search term for the GIF")
        .setRequired(true)
    ),

  async execute(interaction) {
    const searchTerm = interaction.options.getString("search");

    try {
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
          searchTerm
        )}&key=${TENOR_API_KEY}&limit=10`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        await interaction.reply("❌ No GIFs found for that term!");
        return;
      }

      const gif =
        data.results[Math.floor(Math.random() * data.results.length)]
          .media_formats.gif.url;

      await interaction.reply(gif);
    } catch (error) {
      console.error("Error fetching GIF:", error);
      await interaction.reply("❌ Failed to fetch a GIF. Try again later.");
    }
  },
};
