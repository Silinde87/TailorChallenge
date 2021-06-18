import mongoose from 'mongoose';

const DBURL = process.env.DBURL;

if (!DBURL) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false,
			bufferMaxEntries: 0,
			useFindAndModify: false,
			useCreateIndex: true,
		};

		cached.promise = mongoose.connect(DBURL, opts).then((mongoose) => {
			console.log("Connected to MongoDB");
			return mongoose;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
