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
	
fileArr = ["question1.json", "question2.json", "question3.json", "question4.json", "question5.json", "question6.json"];
fileName = "";
rand = 0;
q1 = JSON.parse(fs.readFileSync(fileArr[0]));
q2 = JSON.parse(fs.readFileSync(fileArr[1]));
q3 = JSON.parse(fs.readFileSync(fileArr[2]));
q4 = JSON.parse(fs.readFileSync(fileArr[3]));
q5 = JSON.parse(fs.readFileSync(fileArr[4]));
q6 = JSON.parse(fs.readFileSync(fileArr[5]));
answers_arr1 = q1.answers;
answers_str1 = "";
answers_arr2 = q2.answers;
answers_str2 = "";
answers_arr3 = q3.answers;
answers_str3 = "";
answers_arr4 = q4.answers;
answers_str4 = "";
answers_arr5 = q5.answers;
answers_str5 = "";
answers_arr6 = q6.answers;
answers_str6 = "";
correctArr = [q1.correct, q2.correct];
for (i = 0; i < answers_arr1.length; i++) {
    answers_str1 += "\n\t" + answers_arr1[i];
    answers_str2 += "\n\t" + answers_arr2[i];
	answers_str3 += "\n\t" + answers_arr3[i];
	answers_str4 += "\n\t" + answers_arr4[i];
    answers_str5 += "\n\t" + answers_arr5[i];
	answers_str6 += "\n\t" + answers_arr6[i];
}
content_str1 = 'Question: ' + q1.question + answers_str1;
content_str2 = 'Question: ' + q2.question + answers_str2;
content_str3 = 'Question: ' + q3.question + answers_str3;
content_str4 = 'Question: ' + q4.question + answers_str4;
content_str5 = 'Question: ' + q5.question + answers_str5;
content_str6 = 'Question: ' + q6.question + answers_str6;
question_num = 1;

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
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
			question_num = 2;
			await interaction.reply({ content: 'Correct!\n\n' + content_str2, components: [row]});
		} else if (question_num == 2 && interaction.customId == q2.correct) {
			question_num = 3;
			await interaction.reply({ content: 'Correct!\n\n' + content_str3, components: [row]});
		} else if (question_num == 3 && interaction.customId == q3.correct) {
			question_num = 4;
			await interaction.reply({ content: 'Correct!\n\n' + content_str4, components: [row]});
		} else if (question_num == 4 && interaction.customId == q4.correct) {
			question_num = 5;
			await interaction.reply({ content: 'Correct!\n\n' + content_str5, components: [row]});
		} else if (question_num == 5 && interaction.customId == q5.correct) {
			question_num = 6;
			await interaction.reply({ content: 'Correct!\n\n' + content_str6, components: [row]});
		} else if (question_num == 6 && interaction.customId == q6.correct) {
			question_num = 1;
			await interaction.reply('Correct! You finished the quiz!');
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
	}

	try {
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

client.login("MTA4OTI5MDA0NDkwNjQxODE5Nw.GrQAs4.gVa-3j-gUgGrqdEQugR3-zzZU1_j86ylz7gMSc");