const { APIError, InternalServerError } = require('rest-api-errors');
const { STATUS_CODES } = require('http');
//const logger = require('../../logger');


const errorHandler = (err, req, res, next) => {
	const error = (err.status === 401 ||
		err instanceof APIError) ? err : new InternalServerError();

	// if (process.env.NODE_ENV !== 'production') {
	if (true) {

		console.log('-----> Unknown server error...');
		// todo: comment here for production

		console.log(err);
	}

	if (err.status === 404) {
		return res.status(404).json({ message: 'Resource not found' });
	}

	if (err.name === 'UnauthorizedError') {
		// jwt authentication error
		if (err.message) {
			return res.status(401).json({ message: err.message });
		} else {
			return res.status(401).json({ message: 'Invalid Token' });
		}

	}

	if (err.name === 'ValidationError') {
		return res.status(405).json(err);
	}
	if (err.errors && err.errors.length > 0) {

		switch (err.errors[0].type) {
			case "unique violation":
				error.code = 409;
				error.message = err.errors[0].message;
				break;

			default:
				break;
		}

	}
	if (err.name && err.name === 'SequelizeDatabaseError') {
		error.code = 400;
		error.message = err.original.error;
	}

	//logger.info('API error', { error: err });

	return res
		.status(error.status || 500)
		.json({
			code: error.code || 500,
			message: error.message || STATUS_CODES[error.status],
		});
};

module.exports = { errorHandler };