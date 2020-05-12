import mongoose from 'mongoose';

export default class DBMongoose {

    static getConnection(url: string) {
        mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to mongoDB");
        })
        .catch((err) => {
            console.log("Error while DB connecting");
            console.log(err);
        })
    }

    static closeConnection() {}
}
