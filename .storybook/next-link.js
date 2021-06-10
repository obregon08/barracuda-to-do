const { createElement } = require("react")
const { action } = require("@storybook/addon-actions")

function onClick(event) {
  event.preventDefault()
  action("onClickLink")(event.target.href)
}

module.exports = ({ children, href }) => createElement("span", { href, onClick }, children)
