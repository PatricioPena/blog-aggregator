import { deleteAllUsers } from "../lib/db/queries/users.js";

export async function handlerResetDB(cmdName: string, ...args: string[]): Promise<void> {
    await deleteAllUsers();
}
