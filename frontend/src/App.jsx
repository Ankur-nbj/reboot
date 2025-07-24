import { Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import AutoFormPage from './pages/AutoFormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/form" element={<AutoFormPage />} />
    </Routes>
  );
}

export default App;
