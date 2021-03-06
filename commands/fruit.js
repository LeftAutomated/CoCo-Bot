const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fruit')
        .setDescription("Gives a random fruit"),
    async execute(message, args, Fruits){
        var fruitsEmoji = await Fruits.findAll({ attributes: ['emojiID'] }).map(fruit => fruit.emojiID);

        const ranIndex = Math.trunc(Math.random() * fruitsEmoji.length);

        var fruitEmoji = String(fruitsEmoji[ranIndex]);

        //No arguments give fruit list
        if(args[0] == undefined){
            
            const embed = new Discord.MessageEmbed();
            embed.setTitle("Fruit List");
            embed.setDescription("$fruit (1 - 50) (fruit)");

            fruitsEmoji.sort();
        
            for (const f of fruitsEmoji) {
                var fruitName = f.substring(f.search(":")+1);
                fruitName = fruitName.substring(0, fruitName.search(":"));
                embed.addFields(
                    { name: `${fruitName}`, value: `${f}`}
                );
            }

            embed.setColor('36393F');

            message.channel.send({ embeds: [embed]});
            return;
        }

        //Find emoji in fruit list
        var index = -1;
        for(var i = 0; i < fruitsEmoji.length; i++){
            var currentValue = fruitsEmoji[i];
            var fruitName = currentValue.substring(currentValue.search(":")+1);
            fruitName = fruitName.substring(0,fruitName.search(":"));
            if(fruitName == args[1] || fruitName == args[0]){
                index = i;
            }
        }

        fruitEmoji = String(fruitsEmoji[index]);
             
        //Catch error if invalid number
        if(!Number.isInteger(parseInt(args[0])) || index == - 1 || parseInt(args[0]) > 50 || parseInt(args[0]) <= 0){
            message.channel.send(`\`\`\`$fruit (1 - 50) (name of fruit)\`\`\``);
            return;
        }

        //Send array of fruits
        var str = "";
        for(var i = 0; i < parseInt(args[0]); i++){
            if(i % 10 == 0){
                str += "\n";
            }
            str += fruitEmoji;
        }
        message.channel.send(str);
        
    }
}