const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const http = require('http');
const socketIo = require('socket.io');

const Users = require('./models/User.js');
const db = require("./DatabaseConnection.js");
const authRouter = require("./routes/AuthRoutes.js");
const questionRouter = require("./routes/QuestionRoutes.js");
const userRouter = require("./routes/UserRoutes.js");
const answerRouter = require("./routes/AnswerRoutes.js");
const commentRouter = require("./routes/CommentRoutes.js");
const blogRouter = require("./routes/BlogRoutes.js");

const PORT = process.env.PORT || 80

// DB connection
db.connect();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://ask-me-dev.vercel.app'],
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ extended : true, limit: "50mb"}))
app.use(express.json())
app.use(cookieParser());

// Headers
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://ask-me-dev.vercel.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    next()
})

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await Users.findOne({ _id: jwt_payload.identifier });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (err) {
            return done(err, false);
        }
    })
);


// Cors
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    origin: ['http://localhost:3000', 'https://ask-me-dev.vercel.app']
}));


// API
app.use('/auth/', authRouter);
app.use("/codehub/question", questionRouter);
app.use("/codehub/user", userRouter);
app.use("/codehub/comment", commentRouter);
app.use("/codehub/blog", blogRouter);
app.use("/codehub/answer", answerRouter);

// Socket.io
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('newComment', (comment) => {
        io.emit('liveComments', comment);
    });

    socket.on('deleteComment', (comment) => {
        io.emit('liveComments', comment);
    });

    socket.on('newAnswer', (answer) => {
        io.emit('liveAnswers', answer);
    });

    socket.on('deleteAnswer', (answer) => {
        io.emit('liveAnswers', answer);
    });

    socket.on('toggleVote', (data) => {
        io.emit('liveVotes', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


// Server listens
server.listen(PORT, () => {
    console.log(`CODE HUB is running on PORT number : ${PORT}`)
})