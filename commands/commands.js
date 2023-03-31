const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Gives list of bot commands.'),
	async execute(interaction) {
		await interaction.reply(`/ping => Replies with Pong!\n/server => This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.\n/user => This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};