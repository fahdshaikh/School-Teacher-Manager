const express = require('express');
const router = express.Router();
const {
    getTeacher,
    addTeachers,
    getTeachersData,
} = require('../Controllers/teacherController');

router.post('/', addTeachers);
router.get('/', getTeachersData);
router.get('/search/:first_name', getTeacher);

module.exports = router;
