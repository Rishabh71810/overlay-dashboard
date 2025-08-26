# MyDecisions App - Layout Architecture

## Overview
AI-powered decision intelligence platform with dual-window Electron architecture featuring a dashboard and overlay interface.

## Application Structure

### 1. Main Process (`src/main/`)
- **main.js**: Electron main process handling window management
  - Dashboard Window: 1440x900px main application
  - Overlay Window: Collapsible floating overlay (100x40px collapsed, 420x600px expanded)
  - System Tray: Quick access controls
  - IPC Communication: Bridge between main and renderer processes

### 2. Renderer Process (`src/renderer/`)

#### Core Components

##### App.tsx (Router Configuration)
```
Routes:
- "/" → Dashboard (default)
- "/overlay" → DecisionHubPickle (active overlay)
- "/overlay-old" → DecisionHub (legacy)
- "/glass" → OverlayDemo (demo mode)
```

#### Dashboard Components (`components/Dashboard/`)

##### Dashboard.tsx (Main Container)
- **Layout**: Sidebar + Main Content Area
- **State Management**: 
  - activeView: ViewType ('dashboard' | 'workspace' | 'analytics' | 'history' | 'settings')
  - sidebarCollapsed: boolean
- **Features**:
  - Collapsible sidebar (240px expanded, 60px collapsed)
  - Navigation menu with 5 main sections
  - Header with search and notifications
  - User profile section

##### Sub-views:
1. **DashboardHome** (Default View)
   - Welcome message with user personalization
   - QuickStats component integration
   - Recent decisions grid (4 cards)
   - Active workspaces list (3 items)

2. **WorkspaceView.tsx**
   - Collaborative decision spaces
   - Workspace cards with member info
   - Activity feed
   - Privacy indicators (shared/private)

3. **AnalyticsView.tsx**
   - Performance metrics
   - Charts and visualizations
   - Team analytics

4. **HistoryView.tsx**
   - Decision history with filters
   - Search functionality
   - Timeline view

5. **SettingsView.tsx**
   - User preferences
   - System configuration
   - Integration settings

6. **QuickStats.tsx**
   - Key performance indicators
   - Real-time metrics display
   - Trend indicators

#### Overlay Components (`components/Overlay/`)

##### DecisionHubPickle.tsx (Primary Overlay)
- **States**: Collapsed/Expanded toggle
- **Dimensions**: 
  - Collapsed: 140x48px floating pill
  - Expanded: 420x600px glass morphism panel
- **Features**:
  - Draggable positioning
  - Glass morphism effects
  - Integration with PickleGlass components

##### Supporting Components:
1. **PickleGlass.tsx**
   - Glass morphism wrapper components
   - Blur and transparency effects
   - Custom styled inputs and badges

2. **DecisionPipeline.tsx**
   - 7-phase decision visualization
   - 108 API integration points
   - Progress tracking

3. **DualModeChat.tsx**
   - Individual/Shared chat modes
   - Real-time messaging
   - Context switching

4. **AIAnalysis.tsx**
   - Multi-agent AI insights
   - Analysis visualization
   - Recommendation engine

5. **GlassOverlay.tsx**
   - Base overlay container
   - Window management
   - Transparency handling

### 3. Styling System (`styles/`)

#### theme.ts
- **Color Palette**:
  - Primary: Blue (#3B82F6)
  - Background: Light grays (#F8FAFC, #FFFFFF)
  - Text: Hierarchical grays
  - Accent: Red for branding (#EF4444)
  - Status colors: Success, Warning, Error

- **Typography**:
  - Font family: '-apple-system, BlinkMacSystemFont, "Segoe UI"'
  - Sizes: 12px to 28px scale
  - Weights: 400, 500, 600

- **Spacing & Layout**:
  - Border radius: sm (4px), md (8px), lg (12px), xl (16px)
  - Consistent padding/margin scale
  - Glass morphism effects

### 4. Asset Management (`assets/`)
- logo.png: Brand logo
- icon.png: Application icon

## Design Patterns

### Component Architecture
- **Functional Components**: React.FC with TypeScript
- **State Management**: useState hooks for local state
- **Animation**: Framer Motion for transitions
- **Icons**: Lucide React for consistent iconography

### Layout Principles
1. **Responsive Design**: Grid-based layouts with minmax
2. **Glass Morphism**: Blur effects with transparency
3. **Color Consistency**: Theme-based color system
4. **Micro-interactions**: Hover states and transitions

### Navigation Flow
```
Entry → Dashboard (default)
     ├── Sidebar Navigation
     │   ├── Dashboard Home
     │   ├── Workspace
     │   ├── Analytics
     │   ├── History
     │   └── Settings
     └── Overlay (floating)
         ├── Collapsed State
         └── Expanded State
             ├── Decision Pipeline
             ├── Dual Mode Chat
             └── AI Analysis
```

## Window Management

### Dashboard Window
- **Type**: Standard frame window
- **Size**: 1440x900px (resizable)
- **Features**: Full application suite

### Overlay Window
- **Type**: Frameless, transparent
- **Position**: Bottom-right corner (default)
- **Features**: 
  - Always on top
  - Draggable
  - Toggle states
  - Glass effects (platform-dependent)

## Platform-Specific Features

### Windows
- Acrylic/Mica effects (Windows 11)
- Transparency with backdrop-filter

### macOS
- Vibrancy effects
- Native blur support

### Linux
- Standard transparency
- CSS-based glass effects

## Performance Optimizations
1. Lazy loading for heavy components
2. AnimatePresence for exit animations
3. Memoization for expensive computations
4. Efficient re-rendering with proper keys

## Accessibility Features
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management
- Color contrast compliance

## Future Enhancements
- [ ] Dark mode support
- [ ] Customizable themes
- [ ] Plugin system
- [ ] Mobile companion app
- [ ] Advanced analytics dashboard
- [ ] Real-time collaboration features