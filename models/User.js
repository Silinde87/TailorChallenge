import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	favouriteRestaurants: { type: Array },
},{
	versionKey: false
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
