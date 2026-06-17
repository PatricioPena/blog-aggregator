import { CommandHandler, UserCommandHandler } from "./commands/commands.js";
import { readConfig } from "./config.js";
import { getUserName } from "./lib/db/queries/users.js";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName, ...args) => {
    const currentUser = readConfig().currentUserName;
        if (!currentUser) {
            throw new Error("User not found");
        }
        if (typeof currentUser !== "string") {
            throw new Error("Invalid user")
        }
        const user = await getUserName(currentUser);
        if (!user) {
            throw new Error("User not found")
        }
        await handler(cmdName, user, ...args);
    };
}