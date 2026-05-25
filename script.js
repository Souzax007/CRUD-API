const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login",(req,res) =>{
    const {name,email,password} = req.body;

    if(name === "xxxx" && email === "xxxx" && password === "xxxx"){
        return res.json({
            success:true,
            message: "Login OK",
            Location:"main.html"
        });
    }else{
        return res.json({
            success:false,
            message:"Erro no login"
        });
    };
})


app.listen(9090,function() {
    console.log("http://localhost:9090");
});