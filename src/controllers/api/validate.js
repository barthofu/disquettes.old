const {
	waitingDisquette,
	validateDisquette,
} = require("../../models/Disquette");

module.exports = (req, res) => {
	waitingDisquette.findByIdAndDelete(req.body.id).then((result) => {
		result = result?.toJSON();

		if (!result)
			return res.json({
				status: "error",
				message: `Disquette with id ${req.body.id} not found`,
			});

		const newValidated = new validateDisquette(result);

		newValidated
			.save()
			.then((data) => {
				res.json({
					status: "success",
					message: "Disquette validated with success",
					data: data,
				});
			})
			.catch((err) => {
				res.json({
					status: "error",
					message: err.message,
					details: err,
				});
			});
	});
};
