import { useRef, useEffect, DependencyList } from 'react';

export default function useUpdate(fn: () => void, deps: DependencyList = []) {
  const isFirstEffect = useRef(true);
  const lastDeps = useRef<DependencyList>(deps);

  useEffect(() => {
    if (isFirstEffect.current) {
      isFirstEffect.current = false;
      lastDeps.current = deps;
      return;
    }

    const depsChanged =
      lastDeps.current.length !== deps.length ||
      deps.some((dep, index) => !Object.is(lastDeps.current[index], dep));
    lastDeps.current = deps;
    if (depsChanged) {
      fn();
    }
  }, deps);
}
