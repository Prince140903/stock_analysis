import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    // Enhanced error checking
    if (!MONGO_URI) {
        console.error('❌ MONGO_URI not found in environment variables');
        console.error('Make sure .env.local exists with MONGO_URI defined');
        throw new Error('Please define the MONGO_URI environment variable inside .env.local');
    }

    // Return existing connection if available
    if (cached.conn) {
        console.log('✅ Using existing database connection');
        return cached.conn;
    }

    // Create new connection if none exists
    if (!cached.promise) {
        console.log('🔄 Creating new database connection...');
        
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000, // 10 second timeout
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 5, // Maintain a minimum of 5 socket connections
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
        };

        cached.promise = mongoose.connect(MONGO_URI, opts);
    }

    try {
        cached.conn = await cached.promise;
        console.log('✅ Successfully connected to MongoDB Atlas');
        console.log(`📊 Database: ${cached.conn.connection.name}`);
        console.log(`🌐 Host: ${cached.conn.connection.host}`);
        
        return cached.conn;
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error(error);
        
        // Reset the promise so we can try again
        cached.promise = null;
        
        // Provide helpful error information
        if (error instanceof Error) {
            if (error.message.includes('ECONNREFUSED')) {
                console.error('💡 Suggestion: Check if MongoDB Atlas cluster is running and accessible');
            } else if (error.message.includes('authentication')) {
                console.error('💡 Suggestion: Verify your MongoDB username and password');
            } else if (error.message.includes('timeout')) {
                console.error('💡 Suggestion: Check your internet connection and MongoDB Atlas IP whitelist');
            }
        }
        
        throw error;
    }
}