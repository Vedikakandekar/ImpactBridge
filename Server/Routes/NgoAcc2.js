const express = require("express");
const router = express.Router();
const cors = require("cors");
const NgoDocs = require("../DB/models/ngoDocs");
router.use(express.json());
router.use(cors());


router.post("/api/NGOAcc2", async(req, res) => {

    let {
        regCert,
        constiFile,
        financialStmt,
        textExemption,
        bodFile,
        projectReports
    } = req.body;
    try {
        const response = await NgoDocs.create({
            regCert,
            constiFile,
            financialStmt,
            textExemption,
            bodFile,
            projectReports
        });
        res.json({ status: "ok", data: "success" });
    } catch (error) {
        console.log(error);
        if ((error.code = 11000)) {
            return res.json({ staus: "error", error: 'failed' });
        }
        throw error;
    }



});

router.get("/api/NGOAcc2", async(req, res) => {
    res.send({ status: "ok", msg: "error" });
});

module.exports = router;