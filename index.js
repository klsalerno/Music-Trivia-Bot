const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const row = new ActionRowBuilder();
global.row = row;	// To make accessible in command files
	row.addComponents(
		new ButtonBuilder()
			.setCustomId('A')
			.setLabel('A')
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId('B')
			.setLabel('B')
			.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
			.setCustomId('C')
			.setLabel('C')
			.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
			.setCustomId('D')
			.setLabel('D')
			.setStyle(ButtonStyle.Primary),
	);
//global.fileArr = ["question1.json", "question2.json"];
//global.fileName = "";
//global.rand = 0;
//global.correct_answer = "";
//testing
fileArr = ["question1.json", "question2.json"];
fileName = "";
rand = 0;
q1 = JSON.parse(fs.readFileSync(fileArr[0]));
q2 = JSON.parse(fs.readFileSync(fileArr[1]));
answers_arr1 = q1.answers;
answers_str1 = "";
answers_arr2 = q2.answers;
answers_str2 = "";
correctArr = [q1.correct, q2.correct];
//correct_answer = "";
for (i = 0; i < answers_arr1.length; i++) {
    answers_str1 += "\n\t" + answers_arr1[i];
    answers_str2 += "\n\t" + answers_arr2[i];
}
content_str1 = 'Question: ' + q1.question + answers_str1;
content_str2 = 'Question: ' + q2.question + answers_str2;
question_num = 1;
//global.contents = "";
//end testing

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (interaction.isButton()) {
		if (question_num == 1 && interaction.customId == q1.correct) {
			//await interaction.reply('Correct');
			question_num = 2;
			await interaction.reply({ content: 'Correct!\n\n' + content_str2, components: [row]});
		} else if (question_num == 2 && interaction.customId == q2.correct) {
			question_num = 3;
			await interaction.reply('Correct! You finished the quiz') // change and keep going for question3 etc
		} else {
			await interaction.reply('Incorrect, try again.');
		}
		return;
	}
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	if (interaction.commandName === 'random') {
		rand = Math.floor(Math.random() * 2);
		fileName = fileArr[rand];
		if (fileName == fileArr[0]) {
			global.contents = content_str1;
		} else {
			global.contents = content_str2;
		}
		global.correct_answer = correctArr[rand];
		
		/*row.addComponents(
			new ButtonBuilder()
				.setCustomId('A')
				.setLabel('A')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('B')
				.setLabel('B')
				.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
				.setCustomId('C')
				.setLabel('C')
				.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
				.setCustomId('D')
				.setLabel('D')
				.setStyle(ButtonStyle.Primary),
		);*/
	}

	try {
		console.log("test")
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login("MTA4OTI5MDA0NDkwNjQxODE5Nw.Grgtk2.dvIEnBzXysEmdvhnzvJD5L3jWQE_nut5g2EQBc");