const { Client } = require("discord.js");
const { activityInterval, guildId, database } = require("../../../config.json")
const mongoose = require('mongoose')

module.exports = {
  name: "ready",
  rest: false,
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    console.log(
      `Logged in as ${client.user.tag} and running on ${client.guilds.cache.size} Server!`
    );
    updateActivity(client)

    /* Connect to database */
    if(!database) return;
    mongoose.connect(database, {}).then(() => console.log("The client is now connected to the database!")).catch((err) => console.error(err))
  },
};

/**
 * @param {Client} client
 */
async function updateActivity(client) {

  let servercount = await client.guilds.cache.size

  const activities = [
    `/invite | Watching ${servercount} Server`,
    `Created by maxシ#6858`,
  ]

  setInterval(() => {
    const status = activities[Math.floor(Math.random() * activities.length)]
    client.user.setActivity(status)
  }, activityInterval*1000)
}