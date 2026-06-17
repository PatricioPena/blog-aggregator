import { getPostsForUser } from "../lib/db/queries/posts.js";
import { User } from "../lib/db/schema.js";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]){
    let limit = 2;
    if (args.length === 1) {
        const parsed = parseInt(args[0]);
        if (parsed) {
            limit = parsed;
        }
    }
    const posts = await getPostsForUser(user.id, limit);
    for(const item of posts){
        console.log(item.posts.title);
        console.log(item.posts.url);
        console.log(item.posts.publishedAt);
        console.log(item.posts.description);
    }
}