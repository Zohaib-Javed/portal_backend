const jwt = require('jsonwebtoken');
const { user:User } = require('../models');

module.exports = async (req, res, next) => {
	console.log(req.headers);
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new Error('TOKEN NOT FOUND'); //TODO MESSAGE FOR AUTH TOKEN NOT FOUND
		const token = authorization.replace('Bearer ', '');
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		console.log("id is :",id)
		const {dataValues:user} = await User.findByPk(id);
		console.log("user is :",user)
		if (!user) throw new Error('User Not Found'); // TODO user not found
		if (user.role !== 'superAdmin') throw new Error('User Is Not Super Admin'); // TODO user not super admin
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).send({
			success: false,
			message: 'Unauthorized'
		});
	}
};
