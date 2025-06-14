const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Get a random trivia question!"),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const res = await axios.get(
        "https://opentdb.com/api.php?amount=1&type=multiple"
      );
      const data = res.data.results[0];

      const question = decodeURIComponent(data.question);
      const correctAnswer = decodeURIComponent(data.correct_answer);
      const allAnswers = [
        correctAnswer,
        ...data.incorrect_answers.map(decodeURIComponent),
      ];

      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      const row = new ActionRowBuilder();
      shuffledAnswers.forEach((answer, index) => {
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(`trivia_${index}`)
            .setLabel(answer)
            .setStyle(ButtonStyle.Primary)
        );
      });

      
      const correctIndex = shuffledAnswers.indexOf(correctAnswer);

      const embed = new EmbedBuilder()
        .setTitle("🧠 Trivia Time!")
        .setDescription(`**${question}**`)
        .setFooter({ text: "Click the correct answer below!" });

      await interaction.editReply({ embeds: [embed], components: [row] });

     
      const collector = interaction.channel.createMessageComponentCollector({
        time: 15000,
        max: 1,
        filter: (btnInt) => btnInt.user.id === interaction.user.id,
      });

      collector.on("collect", async (btnInt) => {
        const selectedAnswer = btnInt.component.label;

        const isCorrect = selectedAnswer === correctAnswer;
        await btnInt.reply({
          content: isCorrect
            ? `✅ Correct! **${correctAnswer}** was the right answer.`
            : `❌ Incorrect! The correct answer was **${correctAnswer}**.`,
          ephemeral: true,
        });
      });

      collector.on("end", (collected) => {
        if (collected.size === 0) {
          interaction.followUp({
            content: "⏰ Time's up! You didn’t answer in time.",
            ephemeral: true,
          });
        }
      });
    } catch (error) {
      console.error("Trivia Error:", error);
      await interaction.editReply(
        "❌ Failed to fetch a trivia question. Please try again."
      );
    }
  },
};
