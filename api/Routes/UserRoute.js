const express = require("express");
const route = express.Router();
const user = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("../Models/Post.js");
const SECRET = process.env.SECRET;
route.post(
  "/register",
  asyncHandler(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const IsUserAvailable = await user.findOne({ username });
    if (IsUserAvailable) {
      res.json({
        message: "Username is Already Taken",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const User = await user.create({
      username,
      password: hashpassword,
    });
  })
);
route.post(
  "/login",
  asyncHandler(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userexist = await user.findOne({ username });
    const isPasswordRight = await bcrypt.compare(password, userexist.password);
    console.log(isPasswordRight)
    if (userexist && isPasswordRight) {
      //login
      jwt.sign(
        { username, id: userexist._id },
        "SURAFEL123addis$",
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json({
            id: userexist._id,
            username,
          });
        }
      );
    } else {
      res.status(400).json("wrong credential");
    }
  })
);
route.get(
  "/profile",
  asyncHandler((req, res) => {
    const { token } = req.cookies;
    console.log(token);
    console.log(SECRET);
    jwt.verify(token, SECRET, {}, (error, info) => {
      if (error) throw error;
      res.json(info);
      console.log(info);
    });
  })
);
route.post(
  "/logout",
  asyncHandler((req, res) => {
    res.cookie("token", "").json("ok");
  })
);

route.post(
  "/createPost",
  uploadMiddleware.single("file"),
  asyncHandler(async (req, res) => {
   
    const { originalname, path } = req.file;
    const parse = originalname.split(".");
    const ext = parse[parse.length - 1];
    const newPath = path + "." + ext;
   const files= fs.renameSync(path, newPath);
    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, async(error, info) => {
        if (error) throw error;
        const { title, summery, content } = req.body;
        const PostDoc=await Post.create({
            title,summery,content,cover:newPath,
            author:info.id
        })
        res.json(PostDoc)
      });
 
  })
);
route.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, SECRET, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});
route.get("/allPosts",asyncHandler(async(req,res)=>{
    res.json(await Blog.find().populate('author',['username']).sort({
        createdAt:-1
    }).limit(20))
}))
route.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

module.exports = route;
