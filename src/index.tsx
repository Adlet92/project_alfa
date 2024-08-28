import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import BookDetail from './components/BookDetail/BookDetail';
import store from './components/Store/store';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/book/works/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
