import { setUser } from "../config.js";
import { createUser, getUserName } from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        throw new Error("No arguments were passed");
    }
    const user = await getUserName(args[0]);
    if (!user) {
        throw new Error("User does not exist");
    }
    setUser(args[0]);
    console.log(`The user ${args[0]} was successfully set`);
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    const name = args[0];
    if (!name) {
        throw new Error("No name was passed");
    }
    if (await getUserName(name)) {
        throw new Error("A user with that name already exists");
    }
    const newUser = await createUser(name);
    setUser(name);
    console.log(`${name} was successfully registered`, newUser);
}
