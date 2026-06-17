import { getFeeds, insertFeed } from "../lib/db/queries/feeds.js";
import { getUserById } from "../lib/db/queries/users.js";
import { createFeedFollow } from "../lib/db/queries/feed-follows.js";
import { User } from "../lib/db/schema.js";


export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 2) {
        process.exit(1);
    }
    const feed = await insertFeed(args[0], args[1], user.id);
    const follow = await createFeedFollow(user.id, feed.id);
    console.log(`Feed: ${follow.feedName}`);
    console.log(`User: ${follow.userName}`);
}

export async function handlerListFeeds(){
    const allFeeds = await getFeeds();
    for(const item of allFeeds){
        const currentUser = await getUserById(item.userId);
        console.log(item.name);
        console.log(item.url);
        console.log(currentUser.name)
    }
}
