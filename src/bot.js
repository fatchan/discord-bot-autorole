'use strict';

const config = require('./config.json')
	, Eris = require('eris')
	, bot = new Eris(config.token)
	, rr = (min, max) => Math.floor(Math.random() * (max-min + 1) + min)
	, vwNums = [ '０', '１', '２', '３', '４', '５', '６', '７', '８', '９' ]
	, vwConv = (num) => String(num).split('').reduce((acc, curr) => `${acc}${vwNums[+curr]}`, '')
	, delChannel = () => {
        const guild = bot.guilds.get(config.guildID);
        const textChannels = guild.channels.filter(c => c.type === 0);
        const names = textChannels.map(c => c.name);
        textChannels.forEach(c => {
            c.delete('Deleted on 24 hour schedule by Tom\'s Bot');
        });
        names.forEach(n => {
            guild.createChannel(n, 0, 'Recreated channel by Tom\'s Bot', config.categoryID);
        });
    };

bot.on('ready', () => {
    console.log('Ready!');
	bot.editStatus('invisible', {});
	bot.editNickname(config.guildID, '００００');
	delChannel();
	setInterval(delChannel, 86400000);
});

bot.on('guildMemberAdd', (guild, member) => {
	guild.addMemberRole(member.id, config.roleID, 'Role added by Tom\'s Bot');
	const randNum = rr(1000, 9999);
	member.edit({ nick: config.vw ? vwConv(randNum) : randNum }, 'Nickname set by Tom\'s Bot');
});

bot.connect();
