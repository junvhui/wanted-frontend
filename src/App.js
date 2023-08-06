import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todolist from "./pages/Todo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todo" element={<Todolist />} />
      </Routes>
    </Router>
  );
};
export default App;
