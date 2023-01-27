import { Router } from "./Router";
import './App.css';
import { AuthProvider } from "../Context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <Router />
    </AuthProvider>
  );
}

export default App;
