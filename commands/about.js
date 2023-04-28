const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Provides info about the bot.'),
	async execute(interaction) {
		await interaction.reply('This bot is used for playing music themed trivia in a server.\nUse /commands to see the list of bot commands!');
	},
};