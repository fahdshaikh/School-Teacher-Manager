const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
    {
        id: {
            type: Number,
        },
        first_name: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
        },

        gender: {
            type: String,
            required: true,
            trim: true,
            minLength: 4,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
        },

        img_url: {
            type: String,
            trim: true,
            default:
                'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
        },
        classes: {
            type: Object,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

module.exports = mongoose.model('Teacher', teacherSchema);
