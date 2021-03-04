
const pages = ['overview', 'list', 'await', 'submit', 'accounts']

module.exports = (req, res) => {

    return res.render("admin/layout", { page: pages.find(e => req.path.includes(e)), title: "Disquette Admin", admin: false, user: { username: "LeZ", profil_url: "https://via.placeholder.com/150" }, args: req.args })

}