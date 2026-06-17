import { User } from "../lib/db/schema.js";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export type UserCommandHandler = (cmdName: string, user: User, ...args: string[]) => Promise<void>

export function registerCommand(
    registry: CommandsRegistry,
    cmdName: string,
    handler: CommandHandler
): void {
    registry[cmdName] = handler;
}

export async function runCommand(
    registry: CommandsRegistry,
    cmdName: string,
    ...args: string[]
): Promise<void> {
    if (!registry[cmdName]) {
        throw new Error("Command does not exist");
    }
    await registry[cmdName](cmdName, ...args);
}
