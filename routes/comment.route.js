const express = require("express");
const  router = express.Router();

const commentController = require("../controllers/comment.controller")
const jwtVerify = require("../services/jwtVerify");

router.post("/add" ,jwtVerify, commentController.addComment) ;
router.delete("/delete/:id" ,jwtVerify, commentController.deleteComment) ;
router.put("/edit/:id" , jwtVerify,commentController.updateComment);
router.get("/getByMovieId/:id" , commentController.getCommentsByMovieId)


module.exports = router ;