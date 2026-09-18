import { useEffect, useState } from 'react';

export function useDisplayQuality() {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 860px)').matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 860px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setCompact(compactQuery.matches); setReducedMotion(motionQuery.matches); };
    compactQuery.addEventListener('change', update); motionQuery.addEventListener('change', update);
    return () => { compactQuery.removeEventListener('change', update); motionQuery.removeEventListener('change', update); };
  }, []);
  return { compact, reducedMotion };
}
