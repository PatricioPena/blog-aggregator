import { getFeedByUrl } from "../lib/db/queries/feeds.js";
import { createFeedFollow, deleteFeedFollow, getFeedFollowsForUser } from "../lib/db/queries/feed-follows.js";
import { User } from "../lib/db/schema.js";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        process.exit(1);
    }
    const feed = await getFeedByUrl(args[0]);
    if (!feed) {
        throw new Error("Invalid feed")
    }
    const follow = await createFeedFollow(user.id, feed.id);
    console.log(`Feed: ${follow.feedName}`);
    console.log(`User: ${follow.userName}`);
}

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 0) {
        process.exit(1);
    }
    const follows = await getFeedFollowsForUser(user.id);
    for (const follow of follows) {
        console.log(follow.feedName);
    }
}

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]){
    if (args.length !== 1) {
        throw new Error("Args incorrect");
    }
    const url = args[0];
    const feed = await getFeedByUrl(url);
    if (!feed) {
        throw new Error("Feed incorrect");
    }
    const result = await deleteFeedFollow(user.id, feed.id);
    console.log(result);
}