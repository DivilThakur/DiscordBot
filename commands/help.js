const { SlashCommandBuilder } = require("discord.js");
const projects = require("../data/projects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help on how to use the bot commands"),

  async execute(interaction) {
    const projectList = projects.map((p) => `• \`${p.name}\``).join("\n");

    const helpText = `
**🤖 Bot Command Help**

📌 **/project** — Shows List of the projects.
➡️ Example: \`/project \`

📌 **/desc** — Get a detailed description of a specific project.
➡️ Example: \`/desc name:ChatApp\`

📌 **/live** — Get the live demo link for a project.
➡️ Example: \`/live name:ChatApp\`

🗂 **Available Projects:**
${projectList}

✨ You can use auto-complete to pick project names easily.
    `;

    await interaction.reply({
      content: helpText,
      ephemeral: true, // Only visible to the user who used the command
    });
  },
};
