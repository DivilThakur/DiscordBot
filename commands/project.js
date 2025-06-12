const { SlashCommandBuilder } = require("discord.js");
const projects = require("../data/projects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("project")
    .setDescription("List all available projects"),
  async execute(interaction) {
    const names = Object.values(projects)
      .map((p) => `🔹 **${p.name}**`)
      .join("\n");

    await interaction.reply({
      content: `Here are the available projects:\n\n${names}`,
      ephemeral: true,
    });
  },
};
