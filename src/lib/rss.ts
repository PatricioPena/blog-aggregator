import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

export type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed>{
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator" 
        }
    })
    const xmlText = await response.text();
    const xmlParser = new XMLParser({"processEntities": false});
    const parsed = xmlParser.parse(xmlText);
    const channel = parsed.rss.channel;
    if(!channel){
        throw new Error("Channel empty");
    }
    const title = channel.title;
    const link = channel.link;
    const description = channel.description;
    if(typeof title !== "string"
        || typeof link !== "string"
        || typeof description !== "string"
    ){ throw new Error("Channel types are incorrect");}
    const items: RSSItem[] = [];
    let rawItems = [];
    if(!channel.item){
        
    }
    else if(Array.isArray(channel.item)){
        rawItems = channel.item;
    }
    else{
        rawItems = [channel.item];
    }
    for(const item of rawItems){
        if(typeof item.title !== "string"
        || typeof item.link !== "string"
        || typeof item.description !== "string"
        || typeof item.pubDate !== "string"
        ){ continue}
        items.push({
            title: item.title, 
            link: item.link, 
            description: item.description, 
            pubDate: item.pubDate
        });
    }
    return {
        channel: {
            title: title,
            link: link,
            description: description,
            item: items
        }
    }
}