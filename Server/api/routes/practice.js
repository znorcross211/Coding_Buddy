const express = require("express");
const router = express.Router();



router.post("/init", (req, res)=>{
    console.log("Post");
    console.log(req.body);
});

module.exports = router;