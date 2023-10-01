import Express from "express";
import { StudentInfo } from "./model/dbcrud.js";

const app = Express()
const port = 2000

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

// Get student's information from roll no
app.get('/getstudentinfobyrollno', async (req, res) => {
    try {
        const roll_no_to_find = parseInt(req.query.roll_no);
        const result = await StudentInfo.get_student_info_by_roll_no(roll_no_to_find)
        res.status(200).json({ data: result })
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
        const result = await StudentInfo.get_student_info_by_name(name_to_find)
        res.status(200).json({ data: result })
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
        const result = await StudentInfo.get_student_info_by_class(class_to_find)
        res.status(200).json({ data: result })
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
        const result = await StudentInfo.save_student_info(studentdata.roll_no, studentdata.name, studentdata.student_class)
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
        const data_to_update = req.body;
        const result = await StudentInfo.update_student_info(roll_no_to_update, data_to_update.name, data_to_update.student_class)
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


app.listen(port, () => {
    console.log(`Student's Info API running on port ${port}`)
})