let getHomePage = async (req, res) => {
  return res.render("HomePage.ejs");
};

module.exports = { getHomePage };
