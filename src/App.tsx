import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExamplePage from "@/pages/ExamplePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/" element={<ExamplePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;