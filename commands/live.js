const { SlashCommandBuilder } = require("discord.js");
const projects = require("../data/projects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("live")
    .setDescription("Get live demo link for a project")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Project name")
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async autocomplete(interaction) {
    const focused = interaction.options.getFocused();
    const filtered = projects
      .filter((p) => p.name.toLowerCase().startsWith(focused.toLowerCase()))
      .slice(0, 25);
    await interaction.respond(
      filtered.map((p) => ({ name: p.name, value: p.name }))
    );
  },

  async execute(interaction) {
    const name = interaction.options.getString("name");
    const project = projects.find((p) => p.name === name);
    if (!project) {
      return await interaction.reply({
        content: "Project not found",
        ephemeral: true,
      });
    }
    await interaction.reply(
      `🌐 **Live Demo for ${project.name}**: ${project.live}`
    );
  },
};
