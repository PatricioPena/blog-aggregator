import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string;
    currentUserName?: string;
}

export function setUser(userName: string){
    const cfg = readConfig()
    cfg.currentUserName = userName;
    writeConfig(cfg);
}

export function readConfig(): Config {
    const configPath = getConfigFilePath();
    const rawData = fs.readFileSync(configPath, "utf-8");
    const rawConfig = JSON.parse(rawData);
    return validateConfig(rawConfig);
}

function getConfigFilePath(): string{
    const homeDir = os.homedir();
    return path.join(homeDir, ".gatorconfig.json")
}
function writeConfig(cfg: Config): void {
    const configPath = getConfigFilePath();
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };

    fs.writeFileSync(configPath, JSON.stringify(rawConfig));
}

function validateConfig(rawConfig: any): Config{
    if (typeof rawConfig.db_url !== "string") {
        throw new Error("invalid config");
    }
    const newConfig: Config = {
        dbUrl: rawConfig.db_url,
    };
    if (rawConfig.current_user_name !== undefined) {
        if (typeof rawConfig.current_user_name !== "string") {
            throw new Error("invalid config");
        }
        newConfig.currentUserName = rawConfig.current_user_name;
}
    return newConfig;
}