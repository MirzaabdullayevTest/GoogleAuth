const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

module.exports = async (passport) => {
    await passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        async (accessToken, refreshToken, profile, cb) => {
            // console.log(profile);

            const user = await User.findOne({ googleId: profile.id })

            const newUser = {
                googleId: profile.id,
                fullName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
            }

            try {
                if (user) {
                    cb(null, user)
                } else {
                    const user = await User.create(newUser)
                    cb(null, user)
                }
            } catch (error) {
                console.error(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

