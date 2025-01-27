const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Cours } = require('../Models/Cours');
const Chapitre = require('../Models/Chapitre');


router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    // console.log(`Fetching course data for courseId: ${_id}`); // Add this logging statement
    try {
        const course = await Cours.findById(_id)
            .populate('enseignant')
            .populate('chapitres')
            .populate('trancheAge')
            .populate('Etudiants')
            .populate('Competences')
            .populate('quiz');
        if (!course) {
            console.log(`Course data not found for courseId: ${_id}`); // Add this logging statement
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (e) {
        console.error('Error fetching course data:', e); // Add this logging statement
        res.status(500).json({ error: e.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const courses = await Cours.find({})
            .populate('enseignant')
            .populate('chapitres')
            .populate('trancheAge')
            .populate('Etudiants')
            .populate('Competences')
            .populate('quiz');
        res.status(200).json(courses);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file if needed
    }
});

const upload = multer({ storage: storage });

// POST route to create a new course
router.post('/', upload.single('Thumbnail'), async (req, res) => {
    try {
        // Log the request body
        console.log('Request Body:', req.body);
        // Log the uploaded file
        console.log('Uploaded File:', req.file);

        const { titre, description, trancheAge, Competences } = req.body;
        const competencesArray = Array.isArray(Competences) ? Competences : JSON.parse(Competences);

        const newCourse = new Cours({
            titre,
            description,
            trancheAge,
            Competences: competencesArray,
            Thumbnail: req.file ? req.file.path : null,
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(400).json({ message: 'Failed to create course' });
    }
});

// PATCH route to add a new chapter to a course
router.patch('/:id/chapitres', upload.any('resources'), async (req, res) => {
    try {
        // Log the request body
        console.log('Request Body:', req.body);
        // Log the uploaded files
        console.log('Uploaded Files:', req.files);

        const { titre, content } = req.body;
        const courseId = req.params.id;

        const newChapter = new Chapitre({
            titre,
            content,
            resources: req.files.map(file => ({ filename: file.filename })),
        });

        const savedChapter = await newChapter.save();

        const course = await Cours.findByIdAndUpdate(
            courseId,
            { $push: { chapitres: savedChapter._id } },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: 'Chapter added successfully', course });
    } catch (error) {
        console.error('Error adding chapter to course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage: storage });

// PUT route to update a course
router.put('/editCourse/:id', upload.single('Thumbnail'), async (req, res) => {
    try {
        const courseId = req.params.id;
        const updatedCourseData = req.body;

        // Log the incoming data for debugging
        console.log('Updated Course Data:', updatedCourseData);
        console.log('Uploaded File:', req.file);

        // If there's a file, add its path to the updated data
        if (req.file) {
            updatedCourseData.Thumbnail = req.file.path;
        }

        // Handle Competences array if necessary
        if (updatedCourseData.Competences) {
            updatedCourseData.Competences = Array.isArray(updatedCourseData.Competences) 
                ? updatedCourseData.Competences 
                : JSON.parse(updatedCourseData.Competences);
        }

        const updatedCourse = await Cours.findByIdAndUpdate(courseId, updatedCourseData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// delete 


// DELETE route to delete a course by ID
router.delete('/deleteCourse/:id', async (req, res) => {
    try {
        const courseId = req.params.id;

                const deletedCourse = await Cours.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// cousese ->enroll 

// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(401).send('User not authenticated');
// };

router.post('/enroller/:id', async (req, res) => {
    const courseId = req.params.id;
    const { userId } = req.body;

    try {
        const course = await Cours.findById(courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        // Check if the user is already enrolled
        const isEnrolled = course.Etudiants.includes(userId);
        if (isEnrolled) {
            console.log(userId);
            // Redirect the user to '/student'
            return res.redirect('/student');
        }

        course.Etudiants.push(userId);

        // Save the updated course document
        await course.save();

        res.status(200).send('User enrolled successfully');
    } catch (error) {
        console.error('Error enrolling user:', error);
        res.status(500).send('Error enrolling user');
    }
});


module.exports = router;
