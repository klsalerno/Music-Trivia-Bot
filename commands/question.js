const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

exQ = JSON.parse(fs.readFileSync("question1.json"));
answers_arr = exQ.answers;
answers_str = "";

for (i = 0; i < answers_arr.length; i++) {
    answers_str += "\n\t" + answers_arr[i];
}

const content_str = 'Question: ' + exQ.question + answers_str;
//global.content_str = content_str;

const correct = exQ.correct;
global.correct = correct;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('question')
		.setDescription('Gives a question (old, delete later).'),
	async execute(interaction) {
		//console.log(fileName);
		//console.log(rand); // goes twice
        await interaction.reply({ content: content_str, components: [row]});
    },
};