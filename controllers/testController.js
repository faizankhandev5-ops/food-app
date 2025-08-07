const userTestController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "User test route",
  });
};

module.exports = {
  userTestController,
};
