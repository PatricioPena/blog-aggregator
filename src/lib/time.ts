
export function parseDuration(durationStr:string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if(!match){
        return undefined;
    }
    let converted = parseInt(match[1], 10);
    switch(match[2]){
        case ("ms"):
            converted;
            break;
        case("s"):
            converted *=  1000;
            break;
        case("m"):
            converted = converted * 60 * 1000;
            break;
        case("h"):
            converted = converted * 60 * 60 * 1000;
            break;
    }
    return converted;
}