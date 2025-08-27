import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Zap, CreditCard, HelpCircle } from 'lucide-react';
import theme from '../../styles/theme';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.lg }}>
        <span style={{ color: theme.colors.text.red }}>Decision</span> Settings
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
        gap: isMobile ? '16px' : '24px',
      }}>
        {/* Settings Navigation */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
          borderRadius: theme.borderRadius.lg,
          padding: isMobile ? '8px' : '12px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
          height: 'fit-content',
          ...(isMobile && {
            order: 2,
            display: 'flex',
            overflowX: 'auto',
            gap: '8px',
          }),
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: '2px',
                  border: 'none',
                  borderRadius: theme.borderRadius.md,
                  background: isActive ? theme.colors.glass.red : 'transparent',
                  color: isActive ? theme.colors.text.primary : theme.colors.text.secondary,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
          borderRadius: theme.borderRadius.lg,
          padding: isMobile ? '20px' : '32px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
          minHeight: isMobile ? '300px' : '500px',
          ...(isMobile && {
            order: 1,
          }),
        }}>
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'integrations' && <IntegrationSettings />}
          {activeTab === 'performance' && <PerformanceSettings />}
          {activeTab === 'billing' && <BillingSettings />}
        </div>
      </div>
    </div>
  );
};

const GeneralSettings: React.FC = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1F2937', marginBottom: '20px' }}>
      General Settings
    </h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px', display: 'block' }}>
          Full Name
        </label>
        <input
          type="text"
          defaultValue="John Doe"
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '12px 16px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
            border: 'none',
            borderRadius: theme.borderRadius.md,
            fontSize: '14px',
            color: theme.colors.text.primary,
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px', display: 'block' }}>
          Email Address
        </label>
        <input
          type="email"
          defaultValue="john.doe@company.com"
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '12px 16px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
            border: 'none',
            borderRadius: theme.borderRadius.md,
            fontSize: '14px',
            color: theme.colors.text.primary,
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px', display: 'block' }}>
          Role
        </label>
        <select style={{
          width: '100%',
          maxWidth: '400px',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid rgba(255, 255, 255, 0.05)`,
          borderRadius: theme.borderRadius.md,
          fontSize: '14px',
          color: theme.colors.text.primary,
        }}>
          <option>Decision Maker</option>
          <option>Analyst</option>
          <option>Contributor</option>
          <option>Observer</option>
        </select>
      </div>

      <div>
        <label style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px', display: 'block' }}>
          Time Zone
        </label>
        <select style={{
          width: '100%',
          maxWidth: '400px',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid rgba(255, 255, 255, 0.05)`,
          borderRadius: theme.borderRadius.md,
          fontSize: '14px',
          color: theme.colors.text.primary,
        }}>
          <option>Eastern Time (ET)</option>
          <option>Pacific Time (PT)</option>
          <option>Central European Time (CET)</option>
          <option>Japan Standard Time (JST)</option>
        </select>
      </div>

      <button style={{
        width: 'fit-content',
        padding: '12px 24px',
        background: theme.colors.button.primary,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: '#ffffff',
        border: `1px solid ${theme.colors.glass.redBorder}`,
        borderRadius: theme.borderRadius.md,
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
      }}>
        Save Changes
      </button>
    </div>
  </div>
);

const NotificationSettings: React.FC = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
      Notification <span style={{ color: theme.colors.text.red }}>Preferences</span>
    </h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
      {[
        { label: 'Email notifications for new decisions', checked: true },
        { label: 'Push notifications for votes', checked: true },
        { label: 'Weekly summary reports', checked: false },
        { label: 'Meeting reminders', checked: true },
        { label: 'Decision deadline alerts', checked: true },
      ].map((item) => (
        <label key={item.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}>
          <input type="checkbox" defaultChecked={item.checked} />
          <span style={{ fontSize: '14px', color: theme.colors.text.primary }}>{item.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const PrivacySettings: React.FC = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
      Privacy & <span style={{ color: theme.colors.text.red }}>Security</span>
    </h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
      <div style={{
        padding: '16px',
        background: theme.colors.warningGlass,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: theme.borderRadius.md,
        fontSize: '14px',
        color: theme.colors.warning,
        border: `1px solid ${theme.colors.warning}40`,
        boxShadow: '0 2px 12px rgba(245, 158, 11, 0.1)',
      }}>
        ⚠️ Two-factor authentication is not enabled. Enable it for better security.
      </div>

      <button style={{
        width: 'fit-content',
        padding: '12px 24px',
        background: theme.colors.success,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: '#ffffff',
        border: `1px solid ${theme.colors.success}`,
        borderRadius: theme.borderRadius.md,
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
      }}>
        Enable Two-Factor Authentication
      </button>

      <div style={{ marginTop: theme.spacing.md }}>
        <h3 style={{ fontSize: '16px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '12px' }}>
          Data Privacy
        </h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input type="checkbox" defaultChecked />
          <span style={{ fontSize: '14px', color: '#374151' }}>Allow data collection for analytics</span>
        </label>
      </div>
    </div>
  </div>
);

const AppearanceSettings: React.FC = () => {
  const [overlayOpacity, setOverlayOpacity] = useState(90);
  const [overlayPosition, setOverlayPosition] = useState('bottom-right');

  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
        Appearance <span style={{ color: theme.colors.text.red }}>Settings</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <div>
          <label style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px', display: 'block' }}>
            Theme
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Light', 'Dark', 'Auto'].map((themeOption) => (
              <button
                key={themeOption}
                style={{
                  padding: '10px 20px',
                  border: `1px solid ${themeOption === 'Light' ? theme.colors.glass.redBorder : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: theme.borderRadius.md,
                  background: themeOption === 'Light' ? theme.colors.text.red : 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                {themeOption}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px', display: 'block' }}>
            Overlay Opacity: {overlayOpacity}%
          </label>
          <input
            type="range"
            min="50"
            max="100"
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(Number(e.target.value))}
            style={{ width: '300px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px', display: 'block' }}>
            Overlay Position
          </label>
          <select
            value={overlayPosition}
            onChange={(e) => setOverlayPosition(e.target.value)}
            style={{
              width: '200px',
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: '14px',
              color: theme.colors.text.primary,
            }}
          >
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const IntegrationSettings: React.FC = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
      <span style={{ color: theme.colors.text.red }}>Decision</span> Integrations
    </h2>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: theme.spacing.md,
    }}>
      {[
        { name: 'Slack', connected: true, icon: '💬' },
        { name: 'Google Calendar', connected: true, icon: '📅' },
        { name: 'Microsoft Teams', connected: false, icon: '👥' },
        { name: 'Zoom', connected: true, icon: '📹' },
        { name: 'Notion', connected: false, icon: '📝' },
        { name: 'Jira', connected: false, icon: '🎯' },
      ].map((integration) => (
        <div
          key={integration.name}
          style={{
            padding: '20px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
            border: 'none',
            borderRadius: theme.borderRadius.md,
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>{integration.icon}</div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: theme.colors.text.primary, marginBottom: '8px' }}>
            {integration.name}
          </div>
          <button style={{
            padding: '8px 16px',
            background: integration.connected ? theme.colors.success : theme.colors.text.red,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#ffffff',
            border: integration.connected ? `1px solid ${theme.colors.success}` : `1px solid ${theme.colors.text.red}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          }}>
            {integration.connected ? 'Connected' : 'Connect'}
          </button>
        </div>
      ))}
    </div>
  </div>
);

const PerformanceSettings: React.FC = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
      Performance <span style={{ color: theme.colors.text.red }}>Settings</span>
    </h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input type="checkbox" defaultChecked />
        <span style={{ fontSize: '14px', color: '#374151' }}>Enable hardware acceleration</span>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input type="checkbox" defaultChecked />
        <span style={{ fontSize: '14px', color: '#374151' }}>Enable animations</span>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input type="checkbox" />
        <span style={{ fontSize: '14px', color: '#374151' }}>Power saving mode</span>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input type="checkbox" defaultChecked />
        <span style={{ fontSize: '14px', color: '#374151' }}>Preload decision data</span>
      </label>
    </div>
  </div>
);

const BillingSettings: React.FC = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
      Billing & <span style={{ color: theme.colors.text.red }}>Subscription</span>
    </h2>

    <div style={{
      padding: '24px',
      background: `linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(239, 68, 68, 0.4))`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: theme.borderRadius.lg,
      border: `1px solid ${theme.colors.glass.redBorder}`,
      color: theme.colors.text.primary,
      marginBottom: '32px',
      boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)',
    }}>
      <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Current Plan</div>
      <div style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Professional</div>
      <div style={{ fontSize: '14px' }}>$49/month • Renews on April 15, 2024</div>
    </div>

    <button style={{
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      color: '#ffffff',
      border: `1px solid rgba(255, 255, 255, 0.3)`,
      borderRadius: theme.borderRadius.md,
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    }}>
      Upgrade to Enterprise
    </button>
  </div>
);

export default SettingsView;