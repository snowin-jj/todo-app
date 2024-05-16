import Knex from "knex";
import 'dotenv/config'

const migrationDir = process.env.NODE_ENV === "development" ? "./migrations" : "./resources/migrations";
const seedDir = process.env.NODE_ENV === "development" ? "./seeds" : "./resources/seeds";

const config = {
    client: 'better-sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    migrations: {
        directory: migrationDir,
    },
    seeds: {
        directory: seedDir,
    },
    useNullAsDefault: true
}

const knex = Knex(config);

knex.migrate.latest().then(res => {
    console.log("Migration complete");
})

export default knex;
