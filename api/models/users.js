const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    system_id: { type: Number, unique: true , required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    work_shift: { type: Number, min: 1, max: 3, default: 1 },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Users', usersSchema);