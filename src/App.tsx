import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-sans font-bold text-xs rounded-2xl border border-slate-100 shadow-lg text-slate-800 bg-white/95 backdrop-blur-md',
          duration: 3000,
        }}
      />
    </>
  );
}
