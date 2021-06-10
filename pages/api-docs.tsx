import { FunctionComponent } from "react"
import { RedocStandalone } from "redoc"

const ApiDocs: FunctionComponent = () => (
  <RedocStandalone
    specUrl="/swagger.json"
    options={{
      nativeScrollbars: true,
      theme: { colors: { primary: { main: "#dd5522" } } },
    }}
  />
)

export default ApiDocs
