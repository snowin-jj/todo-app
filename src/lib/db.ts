import Knex from "knex";
import fs from 'fs';
import path from 'path'
import os from 'os'

const dbPath = path.join(os.homedir(),'.config', 'todo-app', 'dev.sqlite3');

try {
    // Check if the directory exists
    fs.accessSync(path.dirname(dbPath), fs.constants.F_OK);
} catch (error) {
    // If directory doesn't exist, create it recursively (may throw errors)
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}


const config = {
    client: 'better-sqlite3',
    connection: {
        filename: dbPath
    },
    migrations: {
        directory: "./resources/migrations",
    },
    seeds: {
        directory: "./resources/migrations",
    },
    useNullAsDefault: true
}

const knex = Knex(config);

knex.migrate.latest().then(res => {
    console.log("Migration complete");
})

export default knex;
