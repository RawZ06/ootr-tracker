import packageJson from '../../package.json';

export function BetaBanner() {
  const appStatus = packageJson.appStatus?.app;

  if (!appStatus || (appStatus !== 'beta' && appStatus !== 'alpha')) {
    return null;
  }

  const bgColor = appStatus === 'alpha' ? 'bg-red-600' : 'bg-yellow-500';
  const text = appStatus.toUpperCase();

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      <div
        className={`absolute ${bgColor} text-white text-center font-bold text-sm tracking-widest shadow-lg`}
        style={{
          width: '300px',
          height: '40px',
          top: '30px',
          left: '-95px',
          transform: 'rotate(-45deg)',
          transformOrigin: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {text} VERSION
      </div>
    </div>
  );
}
