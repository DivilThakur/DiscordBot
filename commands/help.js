const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help on how to use the bot commands"),

  async execute(interaction) {
    const helpText = `
**🤖 Bot Command Help**

🎉 **/meme** — Sends a random meme from Reddit.

📏 **/ai-prompt** — Generates an AI-based creative writing or idea prompt.

📚 **/trivia** — Start a trivia quiz and test your knowledge.

⏰ **/remindme** — Set a personal reminder.
➡️ Example: \`/remindme time:5m message:Drink Water\`

💬 **/fakequote** — Get a fake inspirational quote.

🤔 **/facts** — Get real facts .

🔥 **/roastme** — Get a savage roast (for fun only!).

😂 **/dadjoke** — Get a random dad joke.

🎞 **/gif** — Search and send a GIF using a keyword.
➡️ Example: \`/gif query:"dancing cat"\`


📜 Use \`/\` to start typing any command and see available options with autocomplete.
    `;

    await interaction.reply({
      content: helpText,
      ephemeral: true,
    });
  },
};
