const Teacher = require('../Models/Teacher');

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

const getTeachersData = async (req, res) => {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 4;
    const gender = req.query.gender || false;
    const search = req.query.search || false;
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

    let regex = new RegExp(search, 'i');
    // results.total = await Teacher.countDocuments();
    if (search) {
        if (gender === 'Male') {
            results.current = await Teacher.find({
                first_name: regex,
                gender: 'Male',
            })
                .limit(limit)
                .skip(startIndex)
                .exec();

            results.total = await Teacher.find({
                first_name: regex,
                gender: 'Male',
            }).countDocuments();
        } else if (gender === 'Female') {
            results.current = await Teacher.find({
                first_name: regex,
                gender: 'Female',
            })
                .limit(limit)
                .skip(startIndex)
                .exec();

            results.total = await Teacher.find({
                first_name: regex,
                gender: 'Female',
            }).countDocuments();
        } else {
            results.current = await Teacher.find({
                first_name: regex,
            })
                .limit(limit)
                .skip(startIndex)
                .exec();

            results.total = await Teacher.find({
                first_name: regex,
            }).countDocuments();
        }
    } else {
        if (gender === 'Male') {
            results.current = await Teacher.find({ gender: 'Male' })
                .limit(limit)
                .skip(startIndex)
                .exec();

            results.total = await Teacher.find({
                gender: 'Male',
            }).countDocuments();
        } else if (gender === 'Female') {
            results.current = await Teacher.find({ gender: 'Female' })
                .limit(limit)
                .skip(startIndex)
                .exec();

            results.total = await Teacher.find({
                gender: 'Female',
            }).countDocuments();
        } else {
            results.current = await Teacher.find()
                .limit(limit)
                .skip(startIndex)
                .exec();

            results.total = await Teacher.countDocuments();
        }
    }
    // }

    try {
        res.json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getTeacher = async (req, res) => {
    const first_name = req.params.first_name;
    let regex = new RegExp(first_name, 'i');
    // Teacher.find({ first_name: `/${first_name}/i` }, 'first_name');
    Teacher.find({ first_name: regex })
        .exec()
        .then((teacher) => {
            res.json(teacher);
        })
        .catch((err) => {
            res.status(400).json({ message: `Error: ${err}` });
        });
};

module.exports = {
    addTeachers,
    getTeacher,
    getTeachersData,
};
