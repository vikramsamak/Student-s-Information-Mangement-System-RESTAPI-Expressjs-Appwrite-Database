import dotenv from "dotenv";
import Express from "express";
import { databases } from "./appwrite/appwrite.js";
import { Query, ID } from "appwrite";
dotenv.config();

const app = Express()
const port = 2000

app.use(Express.json());

app.get('/', (req, res) => {
    res.send({ res: "Welcome to Student's Info API" })
})

// Get information of all students 
app.get('/getallstudentsinfo', async (req, res) => {
    try {
        const promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,)

        const allstudentinfo = await promise;

        const StudentInfo = allstudentinfo.documents.map((studentinfo) => {
            const { roll_no, name, class: studentClass } = studentinfo;
            return { roll_no, name, class: studentClass };
        });

        res.status(200).json({ data: StudentInfo });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Get student's information from roll no
app.get('/getstudentinfobyrollno', async (req, res) => {
    try {
        const roll_no_to_find = parseInt(req.query.roll_no);
        const promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('roll_no', roll_no_to_find)
            ]
        )
        const studentinfo = await promise;
        const student_info_by_roll_no = studentinfo.documents.map((studentinfo) => {
            const { roll_no, name, class: studentclass } = studentinfo;
            return { roll_no, name, class: studentclass };
        })
        res.status(200).json({ data: student_info_by_roll_no })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//Get student's info from name
app.get('/getstudentinfobyname', async (req, res) => {
    try {
        const name_to_find = req.query.name;
        const promise = databases.listDocuments(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('name', name_to_find)
            ])
        const studentinfo = await promise;
        const student_info_by_name = studentinfo.documents.map((studentinfo) => {
            const { roll_no, name, class: studentclass } = studentinfo;
            return { roll_no, name, class: studentclass };
        })
        res.status(200).json({ data: student_info_by_name })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//Get student's info from class
app.get('/getstudentinfobyclass', async (req, res) => {
    try {
        const class_to_find = req.query.class;
        const promise = databases.listDocuments(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('class', class_to_find)
            ])
        const studentinfo = await promise;
        const student_info_by_class = studentinfo.documents.map((studentinfo) => {
            const { roll_no, name, class: studentclass } = studentinfo;
            return { roll_no, name, class: studentclass };
        })
        res.status(200).json({ data: student_info_by_class })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// Save student's info
app.post('/savestudentinfo', async (req, res) => {
    try {
        const studentdata = req.body;
        const save_studentinfo_promise = databases.createDocument(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            ID.unique(),
            {
                roll_no: studentdata.roll_no,
                name: studentdata.name,
                class: studentdata.class
            })

        const saved_student_info = await save_studentinfo_promise;
        res.status(200)
            .json({
                res: "Student's info sucessfully saved.",
                data: saved_student_info
            })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

// Update student's info by roll no
app.patch('/updatestudntinfo', async (req, res) => {
    try {
        // Getting student id from roll_no
        const roll_no_to_update = parseInt(req.query.roll_no);
        const get_student_by_roll_no_promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('roll_no', roll_no_to_update)
            ]
        )
        const current_student_info = await get_student_by_roll_no_promise;
        // Updating student info
        const data_to_update = req.body;
        const update_studentinfo_promise = databases.updateDocument(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            current_student_info.documents[0].$id,
            {
                name: data_to_update.name,
                class: data_to_update.class
            }
        )
        const updated_studentinfo = await update_studentinfo_promise;
        res.status(200)
            .json({
                res: "Student information sucessfully updated.",
                data: updated_studentinfo
            })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// Delete student info by roll no
app.delete('/deletestudntinfo', async (req, res) => {
    try {
        // Getting student id from roll_no
        const roll_no_to_delete = parseInt(req.query.roll_no);
        const get_student_by_roll_no_promise = databases.listDocuments(
            process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            [
                Query.equal('roll_no', roll_no_to_delete)
            ]
        )
        const current_student_info = await get_student_by_roll_no_promise;
        // Deleting student info
        const delete_studentinfo_promise = databases.deleteDocument(process.env.DATABASE_ID,
            process.env.COLLECTION_ID,
            current_student_info.documents[0].$id,
            )
        const deleted_studentinfo = await delete_studentinfo_promise;
        res.status(200)
            .json({
                res: "Student information sucessfully deleted.",
                data: deleted_studentinfo
            })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


app.listen(port, () => {
    console.log(`Student's Info API running on port ${port}`)
})