const { APIError, InternalServerError } = require('rest-api-errors');
const { STATUS_CODES } = require('http');

const errorHandler = (err, req, res, next) => {
	const error = (err.status === 401 ||
		err instanceof APIError) ? err : new InternalServerError();
	
	if (err.name === 'UnauthorizedError') {
		if (err.message) {
			return res.status(401).json({ message: err.message });
		} else {
			return res.status(401).json({ message: 'Invalid Token' });
		}

	}
	if (err.errors && err.errors.length > 0) {
		if(err.errors[0].type==="unique violation"){
			if (err.errors[0].message) {
				return res.status(409).json({ message: err.errors[0].message });
			} else {
				return res.status(409).json({ message: 'Provided Data is not Unique.' });
			}
		}else if(err.errors[0].type==="notNull Violation"){
			if (err.errors[0].message) {
				return res.status(400).json({ message: err.errors[0].message });
			} else {
				return res.status(400).json({ message: 'Some provided data fields are empty.' });
			}
		}
	}

	return res.status(error.status || 500).json({
		code: error.code || 500,
		message: error.message || STATUS_CODES[error.status],
	});
};

module.exports = { errorHandler };