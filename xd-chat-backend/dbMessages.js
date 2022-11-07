import mongoose from 'mongoose';

const xdChatSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    timestamp: String
});

export default mongoose.model('messagecontents',xdChatSchema);