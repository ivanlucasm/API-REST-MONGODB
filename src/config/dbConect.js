import mongoose from "mongoose";

mongoose.connect("mongodb+srv://ivanlucasm:042299%40Iv@cluster0.bqjubzk.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;