const jwt = require('jsonwebtoken');
const { user:User } = require('../models');

module.exports = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new Error('TOKEN NOT FOUND'); //TODO MESSAGE FOR AUTH TOKEN NOT FOUND
		const token = authorization.replace('Bearer ', '');
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		const {dataValues:user} = await User.findByPk(id);
		if (!user) throw new Error('User Not Found'); // TODO user not found
		if (user.role !== 'superAdmin') throw new Error('User Is Not Super Admin'); // TODO user not super admin
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		if(error.message==="TOKEN NOT FOUND"){
			res.status(401).send({
				success: false,
				message: 'Unauthorized'
			});
		}
		else if(error.message==="User Is Not Super Admin"){
			res.status(403).send({
				success: false,
				message: 'Forbidden'
			});
		}
		else{
			res.status(404).send({
				success: false,
				message: 'Not Found'
			});
		}
	}
};
