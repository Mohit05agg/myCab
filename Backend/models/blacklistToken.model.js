const mongoose = require('mongoose');
// create a schema of blacklisting  JWT token and have ttl of 24 hours
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // this will delete the token after 24 hours
    }
});

module.exports = mongoose.model('blacklistToken', blacklistTokenSchema);
