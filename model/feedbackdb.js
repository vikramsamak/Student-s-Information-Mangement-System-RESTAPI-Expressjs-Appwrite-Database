import dotenv from "dotenv";
import { databases } from "../appwrite/appwrite.js"
import { Query, ID } from "appwrite";
dotenv.config();

class Feedback {
    constructor() {

    }

    async getallFeedbacks() {
        const promise = databases.listDocuments(process.env.FEEDBACK_DB,
            process.env.FEEDBACK_COLLECTION)

        const allFeedback = await promise;

        const feedbacks = allFeedback.documents.map((fd) => {
            const { name, email, msg } = fd;
            return { name, email, msg };
        });

        return feedbacks;
    }


    async saveFeedback(name, email, msg) {
        const save_feedback_promise = databases.createDocument(process.env.FEEDBACK_DB,
            process.env.FEEDBACK_COLLECTION,
            ID.unique(),
            {
                name: name,
                email: email,
                msg: msg,
            })
        await save_feedback_promise;
    }
}

export const Feedbackdb = new Feedback()