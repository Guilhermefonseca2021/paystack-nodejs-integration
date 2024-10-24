import mongoose from 'mongoose'
import config from '../config/auth'

export default async function connectDB() {
    try {
        const connect = await mongoose.connect(`${config.mongodb_uri}`)
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (err: any) {
        console.log(`Error: ${err.message}`)
        process
    }
}