import clientPromise from "../lib/mongodb";
import { Movie } from "../model/movie"
import { Comment } from "../model/comment"
import { ObjectId } from "mongodb"

export const dbService = {
    
    findAll: async (collection) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await db.collection(collection).find({}).limit(10).toArray();
    },

    findOne: async (collection, id) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await db.collection(collection).findOne({ _id : new ObjectId(id) });
    },

    findCommentsByMovieId: async (idMovie) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await db.collection("comments").findOne({ movie_id : new ObjectId(idMovie) });
    },

    insertOneMovie: async (collection, body) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await 
            new Movie(
                (await db.collection(collection).insertOne(body)).insertedId, 
                body.name, 
                body.description, 
                body.date, 
                body.note
            );
    },

    insertOneComment: async (collection, body) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await 
            new Comment(
                (await db.collection(collection).insertOne(body)).insertedId, 
                body.text, 
                body.note, 
                body.movie_id
            );
    },

    deleteOne: async (collection, id) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await db.collection(collection).deleteOne({ _id : new ObjectId(id) });
    },

    updateOne: async (collection, id, body) => {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        return await db.collection(collection).updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name: body.name,
                    description: body.description,
                    date: body.date,
                    note: body.note
                }
            }
        );
    }
}