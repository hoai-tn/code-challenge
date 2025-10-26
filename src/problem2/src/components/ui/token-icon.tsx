
interface TokenIconProps {
  symbol: string;
  className?: string;
  size?: number;
}

export function TokenIcon({ symbol, className = '', size = 24 }: TokenIconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={`/tokens/${symbol.toUpperCase()}.svg`}
        alt={`${symbol} token icon`}
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to a generic icon if the token icon doesn't exist
          const target = e.target as HTMLImageElement;
          target.src = `data:image/svg+xml;base64,${btoa(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#6366f1" stroke="#4f46e5" stroke-width="2"/>
              <text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${symbol.charAt(0)}</text>
            </svg>
          `)}`;
        }}
      />
    </div>
  );
}
