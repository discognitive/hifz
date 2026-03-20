import { useEffect } from 'react';

interface XpPopupProps {
  amount: number;
  onDone: () => void;
}

export function XpPopup({ amount, onDone }: XpPopupProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <span className="xp-pop text-xp font-medium" style={{ fontSize: '18px' }}>
        +{amount} XP
      </span>
    </div>
  );
}
