import Express from "express";
import { StudentInfo } from "./model/dbcrud.js";
import { Feedbackdb } from './model/feedbackdb.js'
import cors from 'cors';
const app = Express()
const port = 2000 || process.env.PORT

app.use(cors())
app.use(Express.json());

app.get('/', (req, res) => {
    res.send({ res: "Welcome to Student's Info API" })
})

// Get information of all students 
app.get('/getallstudentsinfo', async (req, res) => {
    try {
        const result = await StudentInfo.get_all_students_info()
        res.status(200).json({ data: result });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// Save student's info
app.post('/savestudentinfo', async (req, res) => {
    try {
        const studentdata = req.body;
        const result = await StudentInfo.save_student_info(
            studentdata.roll_no,
            studentdata.name,
            studentdata.standard,
            studentdata.division
        )
        res.status(200)
            .json({
                res: "Student's info sucessfully saved.",
                data: result
            })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

// Update student's info by roll no
app.patch('/updatestudentinfo', async (req, res) => {
    try {
        const roll_no_to_update = parseInt(req.query.roll_no);
        const studentdata = req.body;
        const result = await StudentInfo.update_student_info(
            roll_no_to_update,
            studentdata.new_roll_no,
            studentdata.name,
            studentdata.standard,
            studentdata.division
        )
        res.status(200)
            .json({
                res: "Student information sucessfully updated.",
                data: result
            })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// Delete student info by roll no
app.delete('/deletestudentinfo', async (req, res) => {
    try {
        const roll_no_to_delete = parseInt(req.query.roll_no);
        const result = await StudentInfo.delete_student_info(roll_no_to_delete)
        res.status(200)
            .json({
                res: "Student information sucessfully deleted.",
                data: result
            })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// Save Feedback to database
app.post('/savefeedback', async (req, res) => {
    try {
        const feedback = req.body;
        const result = await Feedbackdb.saveFeedback(
            feedback.name,
            feedback.email,
            feedback.msg)

        res.status(200)
            .json({
                res: "Thank You . I will get back to you as soon as posssible.",
                data: result
            })
    }

    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})


// Get all feedbacks 
app.get('/getallfeedbacks', async (req, res) => {
    try {
        const result = await Feedbackdb.getallFeedbacks()
        res.status(200).json({ data: result })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

app.listen(port, () => {
    console.log(`Student's Info API running on port ${port}`)
})