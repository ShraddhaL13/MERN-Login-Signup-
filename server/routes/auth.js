const router = require("express").Router();
const { User } = require("../models/user");
// const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/getUser", async function (req, res) {
	const user = await User.findOne({ email: "shraddha@gmail.com" });
	res.json({"data":user});
});

router.get("/getAll", async function (req, res) {
	const user = await User.find();
	res.json({"data":user});
});

router.post("/", async (req, res) => {
	try {
		
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email,password: req.body.password });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		// const hashPassword = await bcrypt.hash(req.body.password,10);

		const token = process.env.token;
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error x" });
	}
});

router.delete("/delete",async (req,res,next) =>{
	User.deleteOne({"_id":req.body.userId})
	.then(result=>{
		res.json(
			{
				"message":"User Has been deleted",
				"data":result
			})
		})
	.catch(err=>{
			res.json(
				{
					"message":"User deletion is Failed",
					"data":err
				})
		}
	)
   
}) 



router.delete("/delete",async (req,res,next) =>{
	User.deleteOne({"_id":req.body.userId})
	.then(result=>{
		res.json(
			{
				"message":"User Has been deleted",
				"data":result
			})
		})
	.catch(err=>{
			res.json(
				{
					"message":"User deletion is Failed",
					"data":err
				})
		}
	)
   
}) 


router.patch("/update", (req, resp, next) => {
	//
	const UpdateData=new User
	(
		{
			_id: req.body.userId,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		}
	)
	//
	User.findByIdAndUpdate({"_id":req.body.userId},UpdateData)
	.then(

		result=>{
			resp.json(
				{
					"message":"User Updated",
					"data":result
				}
			)
		}
	)
	.catch(err=>{
		resp.json(
			{
				"message":"Product Updataion Failed",
				"data":err

			}
		)
	})
	
})



const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
