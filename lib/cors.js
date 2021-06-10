import Cors from "cors"

import initMiddleware from "./initMiddleware"

// Initialize the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = (req, res, options) => initMiddleware(Cors(options))
export default cors
