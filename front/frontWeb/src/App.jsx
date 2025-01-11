import { BrowserRouter as Router } from "react-router-dom"
import RouterConfig from "./routes/RouterConfig"

function App() {
  return (
      <div>
        <Router>
          <RouterConfig />
        </Router>
      </div>
  )
}

export default App
