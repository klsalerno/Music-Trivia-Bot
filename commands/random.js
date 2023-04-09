/** Faulty, doesn't work correctly */

const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

files = ["question1.json", "question2.json"];

/*exQ = JSON.parse(fs.readFileSync(files[rand]));
answers_arr = exQ.answers;
answers_str = "";

for (i = 0; i < answers_arr.length; i++) {
    answers_str += "\n\t" + answers_arr[i];
}

const content_str = 'Question: ' + exQ.question + answers_str;
global.content_str = content_str;

const correct = exQ.correct;
global.correct = correct;*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Gives a question'),
	async execute(interaction) {
        
        rand = Math.floor(Math.random() * 2);
        exQ = JSON.parse(fs.readFileSync(files[rand]));
        answers_arr = exQ.answers;
        answers_str = "";

        for (i = 0; i < answers_arr.length; i++) {
            answers_str += "\n\t" + answers_arr[i];
        }

        const content_str = 'Question: ' + exQ.question + answers_str;
        //global.content_str = content_str;

        var correct = exQ.correct;
        global.correct = correct;

        await interaction.reply({ content: content_str, components: [row]});
    },
};