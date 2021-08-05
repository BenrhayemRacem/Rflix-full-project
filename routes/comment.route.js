const express = require("express");
const  router = express.Router();

const commentController = require("../controllers/comment.controller")

router.post("/add" , commentController.addComment) ;
router.delete("/delete/:id" , commentController.deleteComment) ;
router.put("/edit/:id" , commentController.updateComment);
router.get("/getByMovieId/:id" , commentController.getCommentsByMovieId)


module.exports = router ;