'use client';

import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from 'react';

const IndexContext = createContext<{
  index: number;
  numSections: number;
  next: () => void;
  prev: () => void;
  set: (index: number) => void;
}>({
  index: 0,
  numSections: 0,
  next: () => {},
  prev: () => {},
  set: () => {},
});

interface IndexProviderProps {
  numSections?: number;
  children: ReactNode;
}

export function IndexProvider({
  children,
  numSections = Number.POSITIVE_INFINITY,
}: IndexProviderProps) {
  const [index, setIndex] = useState(0);
  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, numSections - 1)),
    [numSections],
  );
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  return (
    <IndexContext.Provider
      value={{ index, numSections, next, prev, set: setIndex }}
    >
      {children}
    </IndexContext.Provider>
  );
}

export const useIndexContext = () => useContext(IndexContext);
