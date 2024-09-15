const { config } = require("dotenv")

const environment = process.env.NODE_ENV || 'production';
config({
    path: `.env.${environment}.local`
})

const configuration = () => ({
    "BACKEND_HOST": process.env.BACKEND_HOST,
    "DISCORD_API_KEY": process.env.DISCORD_API_KEY,
    "DISCORD_AUTH_DOMAIN": process.env.DISCORD_AUTH_DOMAIN,
    "DISCORD_PROJECT_ID": process.env.DISCORD_PROJECT_ID,
    "DISCORD_STORAGE_BUCKET": process.env.DISCORD_STORAGE_BUCKET,
    "DISCORD_MESSAGING_SENDER_ID": process.env.DISCORD_MESSAGING_SENDER_ID,
    "DISCORD_APP_ID": process.env.DISCORD_APP_ID,
    "DISCORD_MEASUREMENT_ID": process.env.DISCORD_MEASUREMENT_ID
})

module.exports = configuration;