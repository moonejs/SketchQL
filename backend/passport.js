const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
    
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        }

     
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
        }

        user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
        });
        await user.save();
        done(null, user);
        
    } catch (err) {
        done(err, null);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['user:email'] 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
       
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;

        let user = await User.findOne({ githubId: profile.id });
        if (user) return done(null, user);

        user = await User.findOne({ email: email });
        if (user) {
            user.githubId = profile.id;
            await user.save();
            return done(null, user);
        }

        user = new User({
            username: profile.username,
            email: email,
            githubId: profile.id,
        });
        await user.save();
        done(null, user);

    } catch (err) {
        done(err, null);
    }
  }
));