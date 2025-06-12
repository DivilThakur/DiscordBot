const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

async function fetchMeme() {
  const response = await fetch("https://meme-api.com/gimme");
  const data = await response.json();
  return {
    title: data.title,
    url: data.url,
    postLink: data.postLink,
  };
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Fetches a random meme from Reddit"),
  async execute(interaction) {
    const meme = await fetchMeme();

    const nextButton = new ButtonBuilder()
      .setCustomId("next_meme")
      .setLabel("Next Meme")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(nextButton);

    await interaction.reply({
      content: `**${meme.title}**\n${meme.url}`,
      components: [row],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      time: 60000, // 1 minute
      filter: (i) =>
        i.customId === "next_meme" && i.user.id === interaction.user.id,
    });

    collector.on("collect", async (btnInteraction) => {
      await btnInteraction.deferUpdate();

      const newMeme = await fetchMeme();
      await interaction.editReply({
        content: `**${newMeme.title}**\n${newMeme.url}`,
        components: [row],
      });
    });

    collector.on("end", () => {
      nextButton.setDisabled(true);
      interaction.editReply({
        components: [new ActionRowBuilder().addComponents(nextButton)],
      });
    });
  },
};
