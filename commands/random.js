/** 
 * This command successfully runs, but the functionality is not correct.
 * 
 * The displayed question and the awaited answer are not always aligned correctly.
 */

const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Gives a randomized question (doesn\'t work correctly).'),
	async execute(interaction) {
        // not working, the insides run twice so the correct answer
        // doesn't always align with the question printed
        //console.log("File name: " + fileName);
        //console.log("Correct answer: " + correct_answer);
        console.log(contents)
        console.log(correct_answer)
        await interaction.reply({ content: contents, components: [row]});
        await interaction.reply({ content: contents, components: [row]});
    },
};