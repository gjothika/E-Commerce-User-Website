const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();


app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb+srv://jothika:jothika@cluster0.uyxgqyk.mongodb.net/EcommerceDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));




const CategorySchema = new mongoose.Schema({
  image: String,
  name: String,
});
const Category = mongoose.model("Category", CategorySchema);


const BrandSchema = new mongoose.Schema({
  image: String,
});
const Brand = mongoose.model("Brand", BrandSchema);


const CardSchema = new mongoose.Schema({
  image: String,
  name:String,
})
const Card = mongoose.model("Card",CardSchema);


const ProductSchema =new mongoose.Schema({
  image: String,
  name: String,
  selling_price: String,
  actual_price: String,
  discount: String,
  ratings: String,
  reviews: String,
})
const Product = mongoose.model("Product",ProductSchema);



const UserSchema = new mongoose.Schema({
  Email:String,
  Password:String,
  FirstName:String,
  LastName:String,
})
const User = mongoose.model("User",UserSchema)



app.get("/Category", async (req, res) => {
  console.log("✅ GET /getdata HIT");
  const categories = await Category.find({});
  res.json(categories);
});

app.get("/Brand",async (req,res)=>{
  const brands = await Brand.find({});
  res.json(brands);
})

app.get("/Product",async(req,res)=>{
  const products = await Product.find({});
  res.json(products);
})

app.get("/getdata",async(req,res)=>{
  const cards = await Card.find({});
  res.json(cards);
})



// app.get("/Login",async(req,res)=>{
//   const users = await User.find({});
//   res.json(users);
// })


app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  const user = await User.findOne({ Email, Password });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    FirstName: user.FirstName,
    LastName: user.LastName,
    Email: user.Email
  });
});


// app.get("/getdata", async (req, res) => {
//   try {
//     const cards = await Card.find({});
//     res.json(cards);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// })


app.get("/test", (req, res) => {
  res.send("TESTING OK");
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});