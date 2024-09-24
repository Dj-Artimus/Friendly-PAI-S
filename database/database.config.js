import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_SERVER_CONN, {
            dbName: "PAI-Companion",
        })
        console.log('Connected to the Database.');

        // Event listeners for connection handling
        mongoose.connection.on('error', (err) => {
            console.error('Database connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB connection lost. Trying to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected!');
        });
    } catch (error) {
        console.log('error to connect Database', error);
        // Retry connection in case of ECONNRESET or other transient issues
        if (error.code === 'ECONNRESET' || error.name === 'MongoNetworkError') {
            console.log('Retrying connection...');
            setTimeout(connectDB, 5000); // Retry after 5 seconds
        } else {
            console.log(error)
            // process.exit(1); // Exit process on fatal error (optional)
        }
    }
}

export default connectDB;