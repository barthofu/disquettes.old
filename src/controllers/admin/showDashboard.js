const pages = ['overview', 'list', 'await', 'submit', 'accounts', 'submit']

module.exports = (req, res) => {

    return res.render("admin/layout", { page: pages.find(e => req.path.includes(e)), title: "Disquette Admin", user: req.user, args: req.args })

}