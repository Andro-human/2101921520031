import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopProduct from "./pages/topProduct";
import ProductById from "./pages/ProductById";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopProduct />} />
        <Route path="/productById" element={<ProductById />} />
      </Routes>
    </Router>
  );
}

export default App;
