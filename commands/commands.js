const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Gives list of bot commands.'),
	async execute(interaction) {
		await interaction.reply(`/commands => Gives list of bot commands.
/about => Provides info about the bot.
/howtoplay => How to start & play a quiz game.
/question => Starts a quiz of music related questions.
/random => Gives a randomized question (doesn\'t work correctly).`);
	},
};