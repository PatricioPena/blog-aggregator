
import { db } from "../index.js";
import { users } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUserName(name: string){
    const [result] = await db
    .select()
    .from(users)
    .where(eq(users.name, name));
    return result;
}

export async function deleteAllUsers(): Promise<void> {
    await db.delete(users);
    console.log("Users database was refreshed"); 
}

export async function getUsers(){
    return await db.select().from(users);
}

export async function getUserById(userId: string){
    const [result] = await db.select().from(users).where(eq(users.id, userId));
    return result;
}
