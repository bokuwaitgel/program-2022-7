import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import './index.css';
import { NotFound } from './components/NotFound';
import { Day1 } from './page/Day1';
import { Day2 } from './page/Day2';
import { Day3 } from './page/Day3';
function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          {/*<Route path="/" element={<App />}>*/}
          <Route index element={<Day1 />} />
          <Route path="/day2" element={<Day2 />} />
          <Route path="/day3" element={<Day3 />} />
          <Route path="*" element={<NotFound />} />
          {/*</Route>*/}
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
