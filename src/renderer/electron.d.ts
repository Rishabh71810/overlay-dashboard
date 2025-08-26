export interface IElectronAPI {
  toggleOverlay: () => Promise<void>;
  showDashboard: () => Promise<void>;
  setOverlayPosition: (position: string) => Promise<void>;
  onOverlayToggle: (callback: (expanded: boolean) => void) => void;
  onNavigate: (callback: (route: string) => void) => void;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}