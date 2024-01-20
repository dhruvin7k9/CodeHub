const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required:true
    },

    username : {
        type: String,
        required : true
    },

    password : {
        type: String,
        required:true
    },

    bio : {
        type: String,
    },

    links: [{ type: String }],

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],

    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],

    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

module.exports = mongoose.model("User", userSchema);