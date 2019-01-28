'use strict';

const config = require('./config.json')
	, Eris = require('eris');

const bot = new Eris(config.token);

bot.on('ready', () => {
    console.log('Ready!');
	bot.editStatus('invisible', {});
});

bot.on('guildMemberAdd', (guild, member) => {
	guild.addMemberRole(member.id, config.roleID, `Role added by Tom's AutoRole`)
});

bot.connect();
