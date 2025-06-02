import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import DropdownPage from "./DropdownPage"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dropdown" element={<DropdownPage />} />
      </Routes>
    </Router>
  );
}

export default App;
