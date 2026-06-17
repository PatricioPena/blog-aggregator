import { db } from "../index.js";
import { feeds } from "../schema.js";
import { type Feed, User } from "../schema.js";
import { asc, desc, eq, sql } from "drizzle-orm";

export async function insertFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId }).returning();
    return result;
}

export async function printFeed(feed: Feed, user: User){
    console.log(feed, user)
}

export async function getFeeds(){
    const result = await db.select().from(feeds);
    return result;
}

export async function getFeedByUrl(url: string){
    const [feed] = await db
    .select()
    .from(feeds)
    .where(eq(feeds.url, url));
    return feed;
}

export async function markFeedFetched(feedsId: string){
    const[result] = await db.update(feeds)
    .set({lastFetchedAt : new Date,
        updatedAt: new Date
    })
    .where(eq(feeds.id, feedsId));
}

export async function getNextFeedToFetch(){
    const [feedsNullFirst] = await db.select().from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
    .limit(1);
    return feedsNullFirst;
}