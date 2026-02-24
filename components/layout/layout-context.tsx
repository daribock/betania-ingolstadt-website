'use client';

import React, { useState, useContext } from 'react';
import { GlobalQuery, ContactInformationQuery } from '../../tina/__generated__/types';

// Combined type that merges Global and ContactInformation data
type CombinedLayoutData = GlobalQuery['global'] & {
  contact: ContactInformationQuery['contactInformation'];
};

interface LayoutState {
  globalSettings: CombinedLayoutData;
  setGlobalSettings: React.Dispatch<React.SetStateAction<CombinedLayoutData>>;
  pageData: object;
  setPageData: React.Dispatch<React.SetStateAction<object>>;
  theme: GlobalQuery['global']['theme'];
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
  globalSettings: GlobalQuery['global'];
  contactInformation: ContactInformationQuery['contactInformation'];
  pageData: object;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  contactInformation: initialContactInformation,
  pageData: initialPageData,
}) => {
  // Combine global settings with contact information
  const combinedSettings: CombinedLayoutData = {
    ...initialGlobalSettings,
    contact: initialContactInformation,
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
