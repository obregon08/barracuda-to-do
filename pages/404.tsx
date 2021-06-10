import Error from "next/error"
import { FunctionComponent } from "react"

const NotFound: FunctionComponent = () => <Error statusCode={404} />
export default NotFound
