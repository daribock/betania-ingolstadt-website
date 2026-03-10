'use client';

import React, { useState, useContext } from 'react';
import { GlobalQuery, GlobalSharedQuery } from '../../tina/__generated__/types';

type LocalizedGlobalData = NonNullable<GlobalQuery['global']>;
type SharedGlobalData = NonNullable<GlobalSharedQuery['globalShared']>;

type CombinedLayoutData = Omit<LocalizedGlobalData, '__typename'> &
  Omit<SharedGlobalData, '__typename'>;

interface LayoutState {
  globalSettings: CombinedLayoutData;
  setGlobalSettings: React.Dispatch<React.SetStateAction<CombinedLayoutData>>;
  pageData: object;
  setPageData: React.Dispatch<React.SetStateAction<object>>;
  theme: SharedGlobalData['theme'];
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      theme: {
        color: 'blue',
        darkMode: 'default',
      },
      globalSettings: undefined,
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: LocalizedGlobalData;
  sharedGlobalSettings: SharedGlobalData;
  pageData: object;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  sharedGlobalSettings: initialSharedGlobalSettings,
  pageData: initialPageData,
}) => {
  // Merge locale-specific and shared global settings for a single read model.
  const combinedSettings: CombinedLayoutData = {
    ...initialGlobalSettings,
    ...initialSharedGlobalSettings,
  };

  const [globalSettings, setGlobalSettings] = useState<CombinedLayoutData>(
    combinedSettings,
  );
  const [pageData, setPageData] = useState<object>(initialPageData);

  const theme = globalSettings.theme;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
