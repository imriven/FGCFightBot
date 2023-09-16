import config from "../config/appConfig.js";
import { commands } from "./utils.js";
import { REST, Routes }from 'discord.js';




// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.discordToken);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(config.discordClientId, config.discordServerId),
			{ body: commands().map(c => {
                return c.data.toJSON()
            })  },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();


