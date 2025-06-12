const { SlashCommandBuilder } = require("discord.js");
const projects = require("../data/projects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("desc")
    .setDescription("Get project description")
    .addStringOption((option) =>
      option
        .setName("project")
        .setDescription("Select a project")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const focused = interaction.options.getFocused().toLowerCase();
    const choices = Object.entries(projects).map(([key, value]) => ({
      name: value.name, // shown to user
      value: key, // actual internal value used for lookup
    }));

    const filtered = choices.filter((choice) =>
      choice.name.toLowerCase().includes(focused)
    );

    await interaction.respond(filtered.slice(0, 25));
  },

  async execute(interaction) {
    const key = interaction.options.getString("project"); // this is the object key now
    const project = projects[key];

    if (!project) {
      return interaction.reply({
        content: `❌ Project not found.`,
        ephemeral: true,
      });
    }

    return interaction.reply({
      content: `📝 **${project.name}**\n${project.desc}`,
      ephemeral: false,
    });
  },
};
