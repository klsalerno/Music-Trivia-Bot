const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('question')
		.setDescription('Starts a quiz of music related questions.'),
	async execute(interaction) {
        await interaction.reply({ content: content_str1, components: [row]});
    },
};