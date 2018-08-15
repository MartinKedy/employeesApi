const mongoose = require('mongoose');

const vacationsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_system_id: { type: Number, ref: 'Users', required: true },
    from_date: { type: Date, required: true },
    to_date: { type: Date, required: true }
});

module.exports = mongoose.model('Vacations', vacationsSchema);