import {BrowserRouter,Routes,Route} from 'react-router-dom'

import SummaryPage from './pages/SummaryPage'
import WeatherPage from './pages/WeatherPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SummaryPage />} />
          <Route path="/weather-analysis" element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
