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
	// For random
	/*
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
	);*/

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
		//console.log('Button clicked');
		//await interaction.reply('Button Clicked!');
		//if (interaction.customId == corr) {
		if (interaction.customId == correct) {
			await interaction.reply('Correct');
		} else {
			await interaction.reply('Incorrect');
		}
		return;
	}
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	// For question
	
	if (interaction.commandName === 'question') {
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

client.login("TOKEN");