const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('howtoplay')
		.setDescription('How to start & play a quiz game.'),
	async execute(interaction) {
		await interaction.reply(`To start a music trivia game, use the /question command to start prompting a series of questions. To answer, click on the button with the the letter of the answer you think is correct.\n\nIf your answer is correct, the next question will be printed for you to answer. Otherwise, you will be prompted to try again.`);
	},
};