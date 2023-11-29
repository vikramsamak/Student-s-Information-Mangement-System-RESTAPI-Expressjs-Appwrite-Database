import dotenv from "dotenv";
import { databases } from "../appwrite/appwrite.js"
import { Query, ID } from "appwrite";
dotenv.config();

class DatabaseCRUD {
    constructor() {
    }

    async get_all_students_info() {
        const promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,)

        const allstudentinfo = await promise;

        const StudentInfo = allstudentinfo.documents.map((studentinfo) => {
            const { roll_no, name, standard, division } = studentinfo;
            return { roll_no, name, standard, division };
        });

        return StudentInfo;
    }

    async get_student_info_by_roll_no(roll_no) {
        const promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('roll_no', roll_no)
            ]
        )
        const studentinfo = await promise;
        const student_info_by_roll_no = studentinfo.documents.map((studentinfo) => {
            const { roll_no, name, standard, division } = studentinfo;
            return { roll_no, name, standard, division };
        })

        return student_info_by_roll_no;
    }

    async get_student_info_by_name(name) {

        const promise = databases.listDocuments(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('name', name)
            ])
        const studentinfo = await promise;
        const student_info_by_name = studentinfo.documents.map((studentinfo) => {
            const { roll_no, name, standard, division } = studentinfo;
            return { roll_no, name, standard, division };
        })
        return student_info_by_name;
    }

    async get_student_info_by_standard(standard) {
        const promise = databases.listDocuments(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('standard', standard)
            ])
        const studentinfo = await promise;
        const student_info_by_class = studentinfo.documents.map((studentinfo) => {
            const { roll_no, name, standard, division } = studentinfo;
            return { roll_no, name, standard, division };
        })
        return student_info_by_class;
    }

    async get_student_info_by_division(division) {
        const promise = databases.listDocuments(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('division', division)
            ])
        const studentinfo = await promise;
        const student_info_by_class = studentinfo.documents.map((studentinfo) => {
            const { roll_no, name, standard, division } = studentinfo;
            return { roll_no, name, standard, division };
        })
        return student_info_by_class;
    }

    async save_student_info(roll_no, name, standard, division) {
        const promise = databases.createDocument(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            ID.unique(),
            {
                roll_no: roll_no,
                name: name,
                standard: standard,
                division: division
            })
        const saved_student_info = await promise;
        const data = {
            roll_no: saved_student_info.roll_no,
            name: saved_student_info.name,
            standard: saved_student_info.standard,
            division: saved_student_info.division
        }
        return data;
    }

    async update_student_info(roll_no, new_roll_no, name, standard, division) {
        const get_student_by_roll_no_promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('roll_no', roll_no)
            ]
        )
        const current_student_info = await get_student_by_roll_no_promise;
        // Updating student info

        const promise = databases.updateDocument(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            current_student_info.documents[0].$id,
            {
                roll_no: new_roll_no,
                name: name,
                standard: standard,
                division: division,

            }
        )
        const updated_studentinfo = await promise;
        const data = {
            roll_no: updated_studentinfo.roll_no,
            name: updated_studentinfo.name,
            standard: updated_studentinfo.standard,
            division: updated_studentinfo.division
        }
        return data;
    }

    async delete_student_info(roll_no) {
        const get_student_by_roll_no_promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('roll_no', roll_no)
            ]
        )
        const current_student_info = await get_student_by_roll_no_promise;
        // Deleting student info
        const delete_studentinfo_promise = databases.deleteDocument(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            current_student_info.documents[0].$id,
        )
        const deleted_studentinfo = await delete_studentinfo_promise;
        return deleted_studentinfo;
    }

}

export const StudentInfo = new DatabaseCRUD();