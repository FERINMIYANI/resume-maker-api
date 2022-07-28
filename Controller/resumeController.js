let Resume = require('../Model/Resume')


const capitalise = (Str) => {
    const lower = Str.toLowerCase();
    return Str.charAt(0).toUpperCase() + lower.slice(1);
}

exports.createResume = async function (req, res, next) {
    try {
        let data = { ...req.body }
        data.lname = capitalise(data.lname)
        data.fname = capitalise(data.fname)
        let details = await Resume.create(data)
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.updateResume = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.query.id
        if(data.fname){
            data.fname = capitalise(data.fname)
        }
        if(data.lname){
            data.lname = capitalise(data.lname)
        }
        await Resume.findByIdAndUpdate(id, { $set: data })
        return res.status(200).json({
            message: "Update Success"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.createPortfolio = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.query.id
        if (req.files) {
            console.log(req.files);
            let imageArray = []
            for (var i = 0; i < req.files.length; i++) {
                imageArray.push(req.files[i].filename)
            }
            data.image = [...imageArray]
        }
        await Resume.findByIdAndUpdate(id, { $push: { 'portfolio': data } })
        return res.status(200).json({
            message: "portfolio uploaded successfuly"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.updatePortfolio = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let id = req.query.id
        let portfolioId = req.query.portfolioId
        if (req.files) {
            let imageArray = []
            for (var i = 0; i < req.files.length; i++) {
                imageArray.push(req.files[i].filename)
            }
            data.image = [...imageArray]
        }
        await Resume.findByIdAndUpdate(id, { $set: { 'portfolio.$[a]': data } }, { "arrayFilters": [{ 'a._id': portfolioId }] })
        return res.status(200).json({
            message: "portfolio uploaded successfuly"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}



exports.getPortfolio = async function (req, res, next) {
    try {
        let name = req.query.name
        // console.log(name.indexOf('-'));
        let fname = capitalise(name.substring(0, name.indexOf('-')))
        let lname = capitalise(name.substring(name.indexOf('-') + 1, name.length))

        if (!fname || !lname) {
            throw new Error("fname or lname was not found")
        }

        let details = await Resume.findOne({ lname: lname, fname: fname }).exec();
        if (!details) {
            throw new Error("No details found on this name")
        }
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}