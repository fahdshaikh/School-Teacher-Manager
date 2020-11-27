const Teacher = require('../Models/Teacher');

const getAllTeachers = (req, res) => {
    console.log('get Teachers: ', req.body);
    Teacher.find()
        .then((teachers) => {
            res.json(teachers);
            console.log('get teachers total: ', teachers.length);
        })
        .catch((err) => {
            res.status(400).json({ message: `Error: ${err}` });
        });
};

const addTeachers = async (req, res) => {
    const payload = new Teacher({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
        img_url:
            req.body.img_url ||
            'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
        classes: req.body.classes || {},
    });

    try {
        const savedTeacher = await payload.save();
        res.status(200).send('Teachers data added successfully');
    } catch (err) {
        res.status(400).send(err);
    }
};

const paginatedTeacherResults = async (req, res) => {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 4;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Teacher.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        };
    }

    try {
        results.current = await Teacher.find()
            .limit(limit)
            .skip(startIndex)
            .exec();
        // res.pagination = results;
        res.json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getTeacher = async (req, res) => {
    const first_name = req.params.first_name;
    Teacher.find({ first_name })
        .then((teacher) => {
            res.json(teacher);
        })
        .catch((err) => {
            res.status(400).json({ message: `Error: ${err}` });
        });
};

module.exports = {
    getAllTeachers,
    addTeachers,
    getTeacher,
    paginatedTeacherResults,
};
