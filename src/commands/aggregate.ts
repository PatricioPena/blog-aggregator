import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds.js";
import { createPost } from "../lib/db/queries/posts.js";
import { fetchFeed } from "../lib/rss.js";
import { parseDuration } from "../lib/time.js";

export async function handlerAgg(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Args not valid");
    }
    const duration = args[0];
    const parsedDuration = parseDuration(duration);
    if (!parsedDuration) {
        throw new Error("Invalid format");
    }
    console.log("Starting the collection process");
    scrapFeeds().catch(console.error);

    const interval = setInterval(() => {
        scrapFeeds().catch(console.error);
    }, parsedDuration);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}

export async function scrapFeeds() {
    console.log("Looking for a feed to fetch...");
    const feed = await getNextFeedToFetch();
    if (!feed) {
        console.log("No feed returned from the database!");
        return;
    }
    console.log(`Fetching feed: ${feed.name} (${feed.url})`);
    const result = await fetchFeed(feed.url);
    await markFeedFetched(feed.id);
    
    console.log(`Found ${result.channel.item.length} posts. Saving them...`);
    for (const item of result.channel.item) {
        try {
            await createPost({
                url: item.link,
                title: item.title,
                description: item.description,
                publishedAt: new Date(item.pubDate),
                feedId: feed.id
            });
            console.log(`Saved: ${item.title}`);
        } catch (err) {
            console.log(`Failed to save (probably duplicate): ${item.title}`);
        }
    }
}