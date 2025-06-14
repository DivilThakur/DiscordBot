const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("facts")
    .setDescription("Get a random interesting fact"),

  async execute(interaction) {
    const url = "https://api.api-ninjas.com/v1/facts";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": "MbsrM7K1uI12XjRWv+mCLA==95XKkxZOfQftJnmS",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const [fact] = await response.json();

      await interaction.reply(`🧠 **Fact:** ${fact.fact}`);
    } catch (err) {
      console.error("Error fetching fact:", err);
      await interaction.reply("❌ Failed to fetch a fact. Try again later.");
    }
  },
};
