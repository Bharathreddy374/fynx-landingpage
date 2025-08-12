import { Toaster } from "@/components/ui/toaster"
import  Index  from "./pages/Index"
import  NotFound  from "./pages/NotFound"
import { Route, Switch } from "wouter"

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Index} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  )
}

export default App
