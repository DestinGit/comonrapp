import mongoose from 'mongoose';
import passwordHash from 'password-hash';
import jwt from 'jwt-simple';
import config from '../config/config';


// const userSchema = new mongoose.Schema(
//     {
//         email: {
//             type: String,
//             lowercase: true,
//             trim: true,
//             unique: true,
//             require: true
//         },
//         password: {
//             type: String,
//             require: true
//         },
//     },
//     { timestamps: {createdAt: "created_at"} }
// );

// userSchema.methods = {
// 	authenticate: function(password: string) {
// 		return passwordHash.verify(password, this.password);
// 	},
// 	getToken: function() {
// 		return jwt.encode(this, config.secret);
// 	}
// }

// // module.exports = mongoose.model("User", userSchema);
// export const UserModel = mongoose.model("User", userSchema);


const Schema = mongoose.Schema;
let user = new Schema({
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            require: true
        },
        password: {
            type: String,
            require: true
        },
    },
    { timestamps: {createdAt: "created_at"} }
);

user.methods = {
	authenticate: function(password: string) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function() {
		return jwt.encode(this, config.secret);
	}
};

export const UserModel = mongoose.model('users', user);
// module.exports = UserModel;