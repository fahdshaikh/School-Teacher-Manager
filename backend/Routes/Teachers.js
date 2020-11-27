const express = require('express');
const router = express.Router();
const {
    getAllTeachers,
    getTeacher,
    addTeachers,
    paginatedTeacherResults,
} = require('../Controllers/teacherController');

router.get('/', getAllTeachers);
router.post('/', addTeachers);
router.get('/pagination', paginatedTeacherResults);
router.get('/:first_name', getTeacher);

module.exports = router;
