const DroneHeroIcon = () => {
  return (
    <div className="relative w-full h-44 mb-4 -mx-8 -mt-8 rounded-t-lg overflow-hidden" style={{ marginLeft: '-2rem', marginRight: '-2rem', marginTop: '-2rem', width: 'calc(100% + 4rem)' }}>
      {/* Dark gradient background matching reference */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a5565] via-[#1d4555] to-[#122d3d]"></div>
      
      {/* Soft circular glow behind drone */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full bg-gradient-radial from-[#3a7585]/40 via-[#2a6575]/20 to-transparent blur-xl"></div>
        <div className="absolute w-28 h-28 rounded-full bg-[#4a95a5]/25 blur-lg"></div>
      </div>
      
      {/* Drone icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          className="relative z-10 w-12 h-12"
          style={{ color: '#2596a8' }}
        >
          {/* Drone body */}
          <rect x="38" y="38" width="24" height="24" rx="3" fill="currentColor" />
          
          {/* Arms */}
          <line x1="42" y1="42" x2="22" y2="22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <line x1="58" y1="42" x2="78" y2="22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <line x1="42" y1="58" x2="22" y2="78" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <line x1="58" y1="58" x2="78" y2="78" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          
          {/* Propeller rings */}
          <circle cx="22" cy="22" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="78" cy="22" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="22" cy="78" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="78" cy="78" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          
          {/* Propeller centers */}
          <circle cx="22" cy="22" r="4" fill="currentColor" />
          <circle cx="78" cy="22" r="4" fill="currentColor" />
          <circle cx="22" cy="78" r="4" fill="currentColor" />
          <circle cx="78" cy="78" r="4" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default DroneHeroIcon;
