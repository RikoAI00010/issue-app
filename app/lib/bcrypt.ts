import bcrypt from 'bcrypt'

const saltRounds = 10

const hasPassword = (password:string) =>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
        });
    });
}