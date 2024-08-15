const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {pool} = require('./pool');
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
        const isValidPassword = await bcrypt.compare(password, user.password);

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
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.users.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;