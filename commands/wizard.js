const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wizard')
        .setDescription("Determines if you are the wizard"),
    execute(message){
        if(message.member.roles.cache.has('891540072661397544')){   //Wizard role
            message.react('<:wlpog:891123046453227562>');
            message.channel.send(`<:wlpog:891123046453227562> WIZARD <:wrpog:890046143696871474>`);
        }else{
            message.react('<:fire:892575363115401306>');
            message.channel.send(`Here's a fireball sussy baka. <:fire:892575363115401306>`);
        }
    }
}