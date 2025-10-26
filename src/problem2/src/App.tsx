import Navbar from "./components/ui/Navbar";
import { CurrencySwapForm } from "./features/currency-swap/components/currency-swap-form";

function App() {
  return (
    <div className="dark min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[oklch(0.05 0.01 256.38)] to-[oklch(0.05 0.01 256.38)]">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-25 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-20 animate-pulse animation-delay-3000"></div>
        </div>
        <Navbar />
        <main className="relative z-10 flex items-center justify-center p-4 w-full min-h-[calc(100vh-4rem)]">
          <div className="w-full max-w-md space-y-4">
            <CurrencySwapForm />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
