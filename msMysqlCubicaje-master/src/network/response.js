exports.success = function (req, res, code, message) {
    const statusCode = code || 200;
    const statusMessage = message || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: statusMessage
    })
}

exports.error = function (req, res, code, message) {
    let statusCode = code || 500;
    let statusMessage = message || '';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: statusMessage
    })
}