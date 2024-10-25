import "dotenv/config"

export default {
    mongodb_uri: process.env.MONGODB_URI,
    port: process.env.PORT,
    ngrok_token: process.env.NGROK_AUTHTOKEN,
    node_env: process.env.NODE_ENV
}