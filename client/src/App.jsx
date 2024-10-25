import ChatRoom from "./ChatRoom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/rooms/${uuidV4()}`} replace />}
        />
        <Route path="/rooms/:id" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
