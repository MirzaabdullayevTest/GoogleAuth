const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));

        db.once('open', () => {
            console.log(`MongoDB opened: ${conn.connection.host}`);
        });
        
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

module.exports = connectDB