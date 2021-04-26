const jwt = require('jsonwebtoken');
const { user:User } = require('../models');

module.exports = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new Error('TOKEN NOT FOUND'); //TODO MESSAGE FOR AUTH TOKEN NOT FOUND
		const token = authorization.replace('Bearer ', '');
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		let user;
		const superAdmin = await User.findByPk(id);
		if(superAdmin)
			user=superAdmin.dataValues;
		if (!user) throw new Error('User Not Found'); // TODO user not found
		if (user.role !== 'superAdmin') throw new Error('User Is Not Super Admin'); // TODO user not super admin
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		if(error.message==="TOKEN NOT FOUND"){
			res.status(401).send({
				success: false,
				message: 'Unauthorized. Token not found.'
			});
		}
		else if(error.message==="invalid token"){
			res.status(401).send({
				success: false,
				message: 'Token is Invalid'
			});
		}
		else if(error.message==="User Is Not Super Admin"){
			res.status(403).send({
				success: false,
				message: 'Forbidden. User Is Not Super Admin'
			});
		}
		else if(error.message==="User Not Found"){
			res.status(401).send({
				success: false,
				message: 'Super admin is not found against this token. Token might be expired. Sign In again.'
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
