const Command = require('../Struct/Command.js');

class RebootCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reboot",
            description: "Reboots the bot.",
            usage: "tl.reboot",
            example: ["tl.reboot"],
            aliases: ["die"],
            clientPermissions: ["SEND_MESSAGES"],
            ownerOnly: true
        })
    }

    async execute(message, client, args) {
        message.channel.send("Please confirm whether you want to reboot. [y|n]")
        const filter = m => ["y", "yes", "n", "no", "cancel"].includes(m.content.toLowerCase())
        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ["time"]})
        .then(async collected => {
            switch (collected.first().content.toLowerCase()) {
                case "y":
                    await message.channel.send("Rebooting . . .")
                    await process.exit()
                    await client.destroy()
                case "yes":
                    await message.channel.send("Rebooting . . .")
                    await process.exit()
                    await client.destroy()
                case "n":
                    message.channel.send("Aborted process.")
                    return;
                case "no":
                        message.channel.send("Aborted process.")
                        return;
            }
        })
        .catch(collected => message.channel.send("Timed out."))
}
}

module.exports = RebootCommand;