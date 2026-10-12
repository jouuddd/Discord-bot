const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const CHANNEL_ID = '1559095541986758696';
const GUILD_ID = '1554195304629141625';

client.once('ready', async () => {
    console.log(`تم تسجيل الدخول بنجاح باسم: ${client.user.tag}`);

    try {
        const guild = await client.guilds.fetch(GUILD_ID);
        if (!guild) return console.log("لم يتم العثور على السيرفر!");

        const channel = await guild.channels.fetch(CHANNEL_ID);
        if (!channel) return console.log("الروم الصوتية غير موجودة!");

        joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: true
        });

        console.log(`تم دخول الروم الصوتية بنجاح!`);
    } catch (error) {
        console.error("خطأ أثناء الاتصال بالروم:", error);
    }
});

client.login(process.env.DISCORD_TOKEN);
