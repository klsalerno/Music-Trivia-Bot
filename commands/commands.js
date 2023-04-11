const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Gives list of bot commands.'),
	async execute(interaction) {
		await interaction.reply(`/ping => Replies with Pong!
/server => This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.
/user => This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.
/commands => Gives list of bot commands.
/help => Provides info about the bot.
/question => Gives a question (old, delete later).
/random => Gives a randomized question.`);
	},
};