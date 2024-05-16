/**
 * @type { import("knex").Knex.Config }
 */
const config = {
    development: {
        client: 'better-sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        },
        useNullAsDefault: true
    },
    production: {
        client: 'better-sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
        useNullAsDefault: true
    }
};

export default config;
