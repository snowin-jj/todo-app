import Knex from "knex";

const config = {
    client: 'better-sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    migrations: {
        directory: "resources/migrations",
    },
    seeds: {
        directory: "resources/migrations",
    },
    useNullAsDefault: true
}

const knex = Knex(config);

knex.migrate.latest().then(res => {
    console.log("Migration complete");
})

export default knex;
