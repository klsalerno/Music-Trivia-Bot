/** Faulty, doesn't work correctly */

const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

/*files = ["question1.json", "question2.json", "question3.json"];

global.q1 = JSON.parse(fs.readFileSync(files[0]));
global.q2 = JSON.parse(fs.readFileSync(files[1]));
q3 = JSON.parse(fs.readFileSync(files[2]));

global.correctArr = [q1.correct, q2.correct];

answers_arr1 = q1.answers;
answers_str1 = "";
answers_arr2 = q2.answers;
answers_str2 = "";
answers_arr3 = q3.answers;
answers_str3 = "";

// All questions have four options (because of buttons)
for (i = 0; i < answers_arr1.length; i++) {
    answers_str1 += "\n\t" + answers_arr1[i];
    answers_str2 += "\n\t" + answers_arr2[i];
    answers_str3 += "\n\t" + answers_arr3[i];
}

const content_str1 = 'Question: ' + q1.question + answers_str1;
const content_str2 = 'Question: ' + q2.question + answers_str2;
const content_str3 = 'Question: ' + q3.question + answers_str3;

global.cor = "Z";*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Gives a randomized question.'),
	async execute(interaction) {
        // not working, the insides run twice so the correct answer
        // doesn't always align with the question printed
        /*console.log("File name: " + fileName);
        console.log("Correct answer: " + correct_answer);
        if (fileName == files[0]) {
            content_str = content_str1;
            //cor = q1.correct;
        } else if (fileName == files[1]) {
            content_str = content_str2;
            //cor = q2.correct;
        }*/
        console.log(contents)
        console.log(correct_answer)
        await interaction.reply({ content: contents, components: [row]});
        await interaction.reply({ content: contents, components: [row]});
    },
};