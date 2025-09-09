const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // simple disk storage
const { importUsersCSV, exportUsersCSV } = require('../controllers/importExportController');

router.post('/import', auth, upload.single('file'), importUsersCSV); // form-data key: file
router.get('/export', auth, exportUsersCSV);

module.exports = router;