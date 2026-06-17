
import { db } from "../index.js";
import { feedFollows, NewPost, posts } from "../schema.js";
import { eq , desc } from "drizzle-orm";

export async function createPost(post: NewPost) {
    const [result] = await db.insert(posts)
        .values(post)
        .returning();
    return result;
}

export async function getPostsForUser(userId: string, limit: number) {
    console.log(`Querying posts for userId: "${userId}" with limit: ${limit}`);
    const result = await db
        .select()
        .from(posts)
        .innerJoin(feedFollows, eq(feedFollows.feedId, posts.feedId))
        .where(eq(feedFollows.userId, userId))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
    return result;
}