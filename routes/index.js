var express = require('express');
var router = express.Router();
let resumeController = require('../Controller/resumeController')
let multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/build', resumeController.createResume)
router.post('/updateresume', resumeController.updateResume)

// -----------------------------------------------portfolio--------------------------------------------
router.post('/createportfolio', upload.array('image', 3), resumeController.createPortfolio)
router.post('/updateportfolio', upload.array('image', 3), resumeController.updatePortfolio)

router.get('/getportfolio', resumeController.getPortfolio)

module.exports = router;