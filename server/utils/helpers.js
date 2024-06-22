const jwt = require("jsonwebtoken");

exports.getToken = async (user) => {
    
    const token = jwt.sign(
        {identifier: user._id},
        "thisKeyIsSupposedToBeSecret"
    );
    return token;
};

exports.extractJwtFromCookie = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
}