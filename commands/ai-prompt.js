const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("genieprompt")
    .setDescription("Ask the AI a question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question you want to ask the AI")
        .setRequired(true)
    ),

  async execute(interaction) {
    const prompt = interaction.options.getString("question");
    await interaction.deferReply();

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-70b-8192",
            max_tokens: 150,
            temperature: 1.5,
            top_p: 0.9,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        return interaction.editReply(
          "❌ No response from AI. Please try again."
        );
      }

      const reply = data.choices[0].message.content;
      await interaction.editReply(reply.slice(0, 2000));
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return interaction.editReply(
        "❌ Error fetching AI response. Please try again later."
      );
    }
  },
};
