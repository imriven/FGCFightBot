`````
import config from "./config/appConfig.js";`````
import DiscordClient from "./discord/utils.js"
const discordClient = await DiscordClient()
import pkg from '@apollo/client'
const { ApolloClient, InMemoryCache, ApolloProvider, gql } = pkg;


const channel = await discordClient.channels.fetch(config.discordTournamentChannelId)

channel.send("testing")


const client = new ApolloClient({
    uri: config.startGgUri,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${config.startggToken}`,
    },
});

client.query({
    query: gql`
    {
        tournament(id: 589057) {
            name
            events(filter: {
                id: 984917
            }) {
                entrants {
                nodes {
                  name
                  participants {
                    user {
                        authorizations(types: DISCORD) {
                            externalUsername
                            externalId
                        }
                    }
                  }
                }
              }
            }
        }
    }
`,
})
    .then((result) => console.log(result.data.tournament.events[0].entrants.nodes[0].participants[0].user));