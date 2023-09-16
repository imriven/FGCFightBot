import { Client, GatewayIntentBits, SlashCommandBuilder, Collection, Events } from 'discord.js'
import config from '../config/appConfig.js';

export default async function DiscordClient() {
    const discord = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
    })

    discord.on('ready', () => {
        console.log(`Logged in as ${discord.user.tag}!`);
    });

    discord.commands = new Collection();

    commands().forEach(c => {
        discord.commands.set(c.data.name, c);
    })

    discord.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
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

    await discord.login(config.discordToken);
    return discord
}

const commandDefinitions = [
    {
        name: "ping",
        description: "replies with pong",
        execute: async function (interaction) {
            await interaction.reply("pong")
        }
    },
    {
        name: "help",
        description: "replies with help commands",
        execute: async function (interaction) {
            await interaction.reply("This is the help")
        }
    }
]

export function commands() {

    return commandDefinitions.map(cd => {
        const cb = new SlashCommandBuilder()
            .setName(cd.name)
            .setDescription(cd.description)
        return { data: cb, execute: cd.execute }
    })

}




// streams.forEach(async s => {
//     if (!state.liveStreamers.hasOwnProperty(s.userName)) {
//       const streamer = getStreamer(s.userName)
//       const channel = await discordClient.channels.fetch(streamer.discordChannelId)
//       const message = await channel.send(`<@${streamer.discordId}> (${streamer.twitchName}) is Live now streaming ${s.gameName}. Check them out : https://twitch.tv/${streamer.twitchName} `);
//       state.addLiveStreamer(s.userName, message.id)
//     }
//     nowStreaming.push(s.userName)
//     console.log("Now streaming", nowStreaming)
//   })
//   Object.entries(state.liveStreamers).forEach(async ([streamerName, messageId]) => {
//     if (!nowStreaming.includes(streamerName)) {
//       console.log(streamerName)
//       const streamer = getStreamer(streamerName)
//       const channel = await discordClient.channels.fetch(streamer.discordChannelId)
//       const message = await channel.messages.fetch(messageId)
//       await message.delete()
//       state.deleteLiveStreamer(streamerName)
//     }
//   })