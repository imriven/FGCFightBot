// config.js
import dotenv from "dotenv"
dotenv.config()

const config = {
startggToken: process.env.STARTGG_API_TOKEN,
    discordToken: process.env.DISCORD_TOKEN,
    discordTournamentChannelId: process.env.DISCORD_TOURNAMENT_CHANNEL_ID,
    startGgUri:process.env.STARTGG_URL,
    discordServerId:process.env.DISCORD_SERVER_ID,
    discordClientId:process.env.DISCORD_CLIENT_ID,
};

export default config;