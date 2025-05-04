const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get total count of students
router.get('/count', async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get students with DSBDA marks > 20
router.get('/dsbda', async (req, res) => {
    try {
        const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update marks by 10 for a specific student
router.put('/update/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.WAD_Marks += 10;
        student.CC_Marks += 10;
        student.DSBDA_Marks += 10;
        student.CNS_Marks += 10;
        student.AI_marks += 10;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get students with marks > 25 in all subjects
router.get('/excellent', async (req, res) => {
    try {
        const students = await Student.find({
            WAD_Marks: { $gt: 25 },
            CC_Marks: { $gt: 25 },
            DSBDA_Marks: { $gt: 25 },
            CNS_Marks: { $gt: 25 },
            AI_marks: { $gt: 25 }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get students with marks < 40 in both WAD and CC
router.get('/poor', async (req, res) => {
    try {
        const students = await Student.find({
            WAD_Marks: { $lt: 40 },
            CC_Marks: { $lt: 40 }
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 