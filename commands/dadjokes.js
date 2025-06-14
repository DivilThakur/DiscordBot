const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Get a random dad joke to make you laugh or cringe!"),

  async execute(interaction) {
    try {
      const response = await fetch("https://icanhazdadjoke.com/slack", {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();
      const joke = data.attachments?.[0]?.text || "No joke found!";

      await interaction.reply(`🤣 **Dad Joke:** ${joke}`);
    } catch (error) {
      console.error("Failed to fetch dad joke:", error);
      await interaction.reply("❌ Couldn't fetch a dad joke. Try again later.");
    }
  },
};
