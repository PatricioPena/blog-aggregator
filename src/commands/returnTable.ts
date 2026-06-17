import { getUsers } from "../lib/db/queries/users.js";
import { readConfig } from "../config.js";

export async function handlerListUsers(): Promise<void> {
    const usersTable = await getUsers();
    const currentUser = readConfig().currentUserName;
    for(const item of usersTable){
        if (item.name === currentUser){
            console.log(`* ${item.name} (current)`);
        }
        else{
            console.log(`* ${item.name}`);
        }
    }
}