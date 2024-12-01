import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App.tsx';
import store from './store/store.tsx';
import { Provider } from 'react-redux';
import './style/style.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
