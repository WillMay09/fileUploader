const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {pool} = require('./pool');
const isValidPassword = require('./passwordUtil').validPassword;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const verifyCallback = async function(username, password, done){
    try {
        //Find the user by username
        const user = await prisma.users.findUnique({where: {username: username}});

        if(!user){

            return done(null, false, {message: 'Incorrect username. '});
        }
        //compare provided password with stored hashed password
        const isValid = isValidPassword(password, user.hash, user.salt);

        if(!isValidPassword){

            return done(null, false, {message: 'Password is incorrect.'})
        }
        //if everthing is good, return user object attached to req as req.user
        return done(null, user);
    } catch(err){

        return done(err);
    }

};
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);


//putting user into the session

passport.serializeUser((user, done) => {
    done(null, user.userid);//stores user id in the session
});

//grabbing user object by using the userid
passport.deserializeUser(async (userid, done) => {
    try {
        const user = await prisma.users.findUnique({ where: { userid } });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;