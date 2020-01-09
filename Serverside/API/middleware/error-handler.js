module.exports = (err, req, res, next) => {
    res.status(422).json({
        error: err.message,
        myMessage: "Mark Faulkner's API has been pinged but something went wrong"
    });
}