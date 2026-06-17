import { registerCommand, runCommand, type CommandsRegistry } from "./commands/commands.js";
import { handlerLogin, handlerRegister } from "./commands/users.js";
import { handlerResetDB } from "./commands/reset.js";
import { handlerListUsers } from "./commands/returnTable.js";
import { handlerAgg } from "./commands/aggregate.js";
import { handlerAddFeed, handlerListFeeds } from "./commands/addfeed.js";
import { handlerFollow, handlerFollowing, handlerUnfollow } from "./commands/feed-follows.js";
import { middlewareLoggedIn } from "./middleware.js";
import { handlerBrowse } from "./commands/browse.js";

async function main() {
    const registry: CommandsRegistry = {}
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handlerResetDB);
    registerCommand(registry, "users", handlerListUsers);
    registerCommand(registry, "agg", handlerAgg);
    registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(registry, "feeds", handlerListFeeds);
    registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
    registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
    registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("No args were passed");
        process.exit(1);
    }
    const commandName = args[0];
    const commandArgs = []
    for (let i = 1; i < args.length; i++) {
        commandArgs.push(args[i]);
    }
    try {
        await runCommand(registry, commandName, ...commandArgs);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        process.exit(1);
    }
    process.exit(0);
}
main();