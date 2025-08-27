# MyDecisions App - Layout Structure & Implementation

## Overview
MyDecisions is a revolutionary AI-powered decision intelligence platform that transforms how teams make decisions. It features a persistent overlay interface (like Claude for decisions), comprehensive backend with 108+ APIs, and real-time collaboration capabilities.

## Implementation Approach

### Recommended Technology Stack
- **Framework**: Electron with native OS integration
- **Frontend**: React 18+ with TypeScript
- **State Management**: Zustand with Immer
- **Real-time**: Socket.io for WebSocket connections
- **Overlay Technology**: 
  - Windows: Acrylic/Mica effect (Windows 11) or custom transparent overlay
  - macOS: Vibrancy effects with NSVisualEffectView
- **Rendering**: Hardware-accelerated WebGL with Framer Motion animations
- **Window Management**: Native OS APIs for proper z-ordering and focus handling
- **Backend**: Express + TypeScript with 108+ decision intelligence APIs

## Layout Architecture

### 1. Main Application Window (Hidden/Minimized)
```
┌─────────────────────────────────────────┐
│  System Tray / Menu Bar Application     │
│  • Always running in background         │
│  • Resource monitoring                  │
│  • Settings management                  │
└─────────────────────────────────────────┘
```

### 2. Overlay Interface (Primary UI)

#### 2.1 Collapsed State (Default)
```
                    ┌──────────────┐
                    │ 🧠 MyDecisions│  ← Floating pill/badge
                    └──────────────┘
                         (72x32px)
```
- **Position**: Bottom-right corner (customizable)
- **Behavior**: Always on top, click-through when not focused
- **Visual**: Glass morphism with 80% opacity

#### 2.2 Expanded State (Active)
```
┌────────────────────────────────────────────────┐
│  ╭─────────────────────────────────────────╮  │
│  │         MyDecisions Assistant            │  │
│  ├─────────────────────────────────────────┤  │
│  │  📊 DECISION PIPELINE (7 Phases)         │  │
│  │  [📝Frame]→[🔍Analyze]→[💡Options]→     │  │
│  │  [🗳️Vote]→[✅Commit]→[📚Learn]          │  │
│  │  Progress: ████████░░░░ 65% | 23/108 APIs│  │
│  ├─────────────────────────────────────────┤  │
│  │  💭 Current Decision Context             │  │
│  │  ┌────────────────────────────────┐     │  │
│  │  │ "Should I accept this job offer?"│    │  │
│  │  └────────────────────────────────┘     │  │
│  │                                          │  │
│  │  🤖 AI Analysis (Multi-Agent Debate)     │  │
│  │  • Optimist: Great growth opportunity    │  │
│  │  • Analyst: ROI positive after 18 months │  │
│  │  • Pragmatist: Negotiate 15% higher      │  │
│  │                                          │  │
│  │  💬 DUAL-MODE CHAT                        │  │
│  │  [🔒 Individual] [👥 Shared]             │  │
│  │  ┌────────────────────────────────┐     │  │
│  │  │ AI: Based on your decision DNA,  │    │  │
│  │  │ this aligns with your values...  │    │  │
│  │  └────────────────────────────────┘     │  │
│  │                                          │  │
│  │  🎯 Key Metrics                          │  │
│  │  ┌─────────┬─────────┬─────────┐       │  │
│  │  │Confidence│Bias Risk│Alignment│       │  │
│  │  │   89%    │  Low    │   92%   │       │  │
│  │  └─────────┴─────────┴─────────┘       │  │
│  │                                          │  │
│  │  ┌────────────────────────────────┐     │  │
│  │  │ Type your thoughts here...      │     │  │
│  │  └────────────────────────────────┘     │  │
│  │                                          │  │
│  │  [🎙️ Voice] [📎 Attach] [⚡ Quick]      │  │
│  ╰─────────────────────────────────────────╯  │
└────────────────────────────────────────────────┘
```
- **Size**: 420x600px (responsive)
- **Visual Style**: Frosted glass with blur backdrop
- **Shadow**: Soft drop shadow for depth
- **Key Features**: Decision Pipeline visualization, Multi-Agent AI debate, Dual-mode chat

### 3. Component Layout Details

#### 3.1 Header Section
```
┌─────────────────────────────────────┐
│  [≡] MyDecisions        [−][□][×]  │
│  ─────────────────────────────────  │
│  Home | Analysis | History | Settings│
└─────────────────────────────────────┘
```

#### 3.2 Decision Input Area
```
┌─────────────────────────────────────┐
│  What decision are you facing?      │
│  ┌─────────────────────────────┐   │
│  │                              │   │
│  │  (Multi-line text input)     │   │
│  │                              │   │
│  └─────────────────────────────┘   │
│  [🎤 Record] [📸 Screenshot]        │
└─────────────────────────────────────┘
```

#### 3.3 Analysis Dashboard
```
┌─────────────────────────────────────┐
│  Decision Score: 7.8/10             │
│  ┌───────────────────────────┐     │
│  │     ╱╲    Confidence      │     │
│  │    ╱  ╲   ████████ 78%    │     │
│  │   ╱    ╲                  │     │
│  │  ╱      ╲  Risk Level     │     │
│  │ ╱________╲ ███ 32%        │     │
│  └───────────────────────────┘     │
└─────────────────────────────────────┘
```

#### 3.4 Recommendation Cards
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │ ✅ Recommended Action        │   │
│  │ Accept with negotiation      │   │
│  │ Confidence: 85%              │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ ⚠️ Alternative Option        │   │
│  │ Request more time            │   │
│  │ Confidence: 65%              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 4. Overlay Modes

#### 4.1 Minimal Mode
```
┌──────────────────┐
│ 🧠 7.8 | Accept ↗│  ← Compact decision indicator
└──────────────────┘
```

#### 4.2 Focus Mode
```
┌─────────────────────────┐
│  Current Decision       │
│  ──────────────────    │
│  Job Offer Analysis    │
│                        │
│  [View] [Dismiss]      │
└─────────────────────────┘
```

#### 4.3 Full Dashboard Mode
```
┌──────────────────────────────────────────┐
│  ┌──────────┬───────────┬──────────┐    │
│  │ Decisions│ Analytics │ History  │    │
│  ├──────────┴───────────┴──────────┤    │
│  │                                  │    │
│  │  [Main Content Area]             │    │
│  │                                  │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

#### 4.4 Analytics Intelligence Mode
```
┌──────────────────────────────────────────┐
│  [Dashboard][Analytics][Team][Meeting][Quick] │
│  ├─────────────────────────────────────────┤
│  │  📊 Decision Score: 7.8/10              │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Confidence: ████████ 78%        │   │
│  │  │ Risk Level: ███ 32% (Medium)    │   │
│  │  │ Timeline: 3 Days Optimal        │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  📈 Historical Performance              │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Similar Decisions: 87% Success   │   │
│  │  │ ████████████████████░░░░        │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  👥 Stakeholder Impact Analysis         │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Team Members: High Impact        │   │
│  │  │ Customers: Medium Impact         │   │
│  │  │ Budget: Low Impact               │   │
│  │  └─────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

#### 4.5 Team Collaboration Mode
```
┌──────────────────────────────────────────┐
│  [Dashboard][Analytics][Team][Meeting][Quick] │
│  ├─────────────────────────────────────────┤
│  │  🌐 Active Session                      │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Team Decision Room         🟢   │   │
│  │  │ 5 participants active           │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  👥 Team Members                        │
│  │  ┌─────────────────────────────────┐   │
│  │  │ 👩‍💼 Sarah K. (Lead)       🟢    │   │
│  │  │ 👨‍💻 Mike R. (Analyst)     🟡    │   │
│  │  │ 👨‍🎨 Alex T. (Designer)    🟢    │   │
│  │  │ 👩‍🚀 Emma L. (PM)          ⚫    │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  🗳️ Live Voting                         │
│  │  ┌─────────────────────────────────┐   │
│  │  │ "Accept the job offer?"          │   │
│  │  │ [✓ Yes (3)] [✗ No (1)]          │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  💡 Shared Ideas                        │
│  │  ┌─────────────────────────────────┐   │
│  │  │ "Negotiate salary first" - Sarah │   │
│  │  │ "Consider remote work" - Mike    │   │
│  │  │ "Check tech stack" - Alex        │   │
│  │  └─────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

#### 4.6 Meeting Intelligence Mode
```
┌──────────────────────────────────────────┐
│  [Dashboard][Analytics][Team][Meeting][Quick] │
│  ├─────────────────────────────────────────┤
│  │  🎥 Meeting Intelligence                │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Decision Meeting        🔴 LIVE │   │
│  │  │ 23:45 elapsed • 6 participants  │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  🎤 Speaking Time Analysis              │
│  │  ┌─────────────────────────────────┐   │
│  │  │ 🟢 Sarah: 8m 32s ████████████  │   │
│  │  │ ⚫ Mike:  4m 15s █████          │   │
│  │  │ ⚫ Alex:  1m 48s ██             │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  ✅ Decision Coverage                   │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Topics Covered: 73%              │   │
│  │  │ Missing Points: 4                │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  📝 AI Meeting Notes                    │
│  │  ┌─────────────────────────────────┐   │
│  │  │ 🎯 Key: Salary negotiation      │   │
│  │  │ ⚠️ Concern: Work-life balance    │   │
│  │  │ 💡 Suggest: Tech stack details  │   │
│  │  └─────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

#### 4.7 Quick Decision Mode
```
┌──────────────────────────────────────────┐
│  [Dashboard][Analytics][Team][Meeting][Quick] │
│  ├─────────────────────────────────────────┤
│  │  ⚡ Quick Decision Input                │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Describe your decision...        │   │
│  │  │                                 │   │
│  │  │ [🎯 Analyze] [🎲 Random]        │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  🎯 Instant Verdict                     │
│  │  ┌─────────────────────────────────┐   │
│  │  │            ✅                   │   │
│  │  │         GO FOR IT               │   │
│  │  │ 87% confidence • Low risk       │   │
│  │  └─────────────────────────────────┘   │
│  │                                         │
│  │  Quick Actions:                         │
│  │  ┌─────────────┬─────────────────┐     │
│  │  │ 🎲 Coin Flip│ 🔮 Magic 8      │     │
│  │  └─────────────┴─────────────────┘     │
│  │                                         │
│  │  ⏱️ Recent Quick Decisions              │
│  │  ┌─────────────────────────────────┐   │
│  │  │ Choose restaurant → Italian     │   │
│  │  │ Meeting time → 2 PM             │   │
│  │  │ Project priority → Feature A    │   │
│  │  └─────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### 5. Platform-Specific Implementations

#### 5.1 Windows 11/10
```
Features:
- Acrylic material effect (Windows 11)
- Snap layouts integration
- Action center notifications
- Jump list in taskbar

Visual Style:
┌─────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← Mica/Acrylic
│ ░░ MyDecisions ░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────┘
```

#### 5.2 macOS
```
Features:
- Vibrancy with NSVisualEffectView
- Touch Bar support (if available)
- Notification Center widgets
- Spotlight integration

Visual Style:
┌─────────────────────────────────┐
│ ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ │ ← Vibrancy effect
│ ≈≈ MyDecisions ≈≈≈≈≈≈≈≈≈≈≈≈≈ │
│ ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ │
└─────────────────────────────────┘
```

### 6. Interaction Zones

```
┌─────────────────────────────────────┐
│  [Drag Zone]                    [×] │ ← 32px height
├─────────────────────────────────────┤
│                                     │
│         Main Content Area           │ ← Click-through disabled
│                                     │
├─────────────────────────────────────┤
│  [Resize Handle]                    │ ← 8px corner grips
└─────────────────────────────────────┘
```

### 7. Animation & Transitions

#### 7.1 Expand Animation
```
Frame 1: ○ (Collapsed)
Frame 2: ◐ (Expanding)
Frame 3: ◕ (Almost expanded)
Frame 4: ● (Fully expanded)
Duration: 300ms with ease-out curve
```

#### 7.2 Glass Effect Layers
```
Layer 1: Background blur (20px)
Layer 2: Gradient overlay (rgba(255,255,255,0.1))
Layer 3: Noise texture (2% opacity)
Layer 4: Border (1px, rgba(255,255,255,0.2))
```

### 8. Responsive Breakpoints

```
Mobile (Tablet mode): 320px - 768px
┌──────────┐
│          │
│  Stacked │
│  Layout  │
│          │
└──────────┘

Desktop: 769px - 1920px
┌────────────────┐
│   Standard     │
│   Layout       │
└────────────────┘

Ultra-wide: 1921px+
┌──────────────────────┐
│   Extended Layout    │
└──────────────────────┘
```

### 9. Accessibility Features

```
┌─────────────────────────────────────┐
│  Focus Indicators:                  │
│  ┌─────────────────┐                │
│  │╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱│ ← High contrast │
│  │╱ Focused Item ╱│    outline      │
│  │╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱│                 │
│  └─────────────────┘                │
│                                     │
│  Screen Reader Regions:             │
│  [Navigation] [Main] [Status]       │
└─────────────────────────────────────┘
```

### 10. Performance Optimizations

- **Rendering**: GPU-accelerated compositing
- **Memory**: Max 150MB RAM usage
- **CPU**: < 2% idle, < 10% active
- **Battery**: Power-efficient rendering on battery

### 11. Integration Points

```
System Integrations:
├── Calendar APIs (Google, Outlook, Apple)
├── Email clients (Gmail, Outlook, Slack)
├── Browser extensions (Chrome, Edge, Safari)
├── Cloud storage (Drive, OneDrive, Dropbox)
├── Voice assistants (Siri, Alexa, Google)
├── Productivity tools (Notion, Jira, Asana)
├── Meeting platforms (Zoom, Teams, Meet)
└── AI Services (108+ backend APIs)

Data Flow:
[User Input] → [Local Processing] → [AI Analysis] → [Visual Feedback]
     ↓               ↓                    ↓              ↓
[Voice/Text]    [Privacy Check]    [108 APIs]    [Overlay Update]
     ↓               ↓                    ↓              ↓
[WebSocket]     [PII Redaction]    [Multi-Agent]  [Real-time Sync]
```

### API Integration Architecture
```
Frontend ←→ WebSocket Server ←→ Backend APIs
    ↓            ↓                   ↓
React App    Socket.io        Express + TypeScript
    ↓            ↓                   ↓
Zustand      Real-time         108+ Endpoints:
Store        Events            • Decision Analysis
    ↓            ↓             • AI Intelligence
UI Updates   Collaboration     • Voting Systems
             Features          • Visualization
                               • Meeting Intel
```

### 12. Settings Panel Layout

```
┌─────────────────────────────────────┐
│  Settings                      [×]  │
├─────────────────────────────────────┤
│  🎨 Appearance                      │
│  ├─ Theme: [Auto|Light|Dark]        │
│  ├─ Opacity: ═══════○═══ 75%       │
│  └─ Position: [↗|↖|↙|↘]           │
│                                     │
│  ⚡ Performance                     │
│  ├─ Hardware Acceleration: [✓]      │
│  ├─ Animations: [✓]                 │
│  └─ Power Saving: [Auto]            │
│                                     │
│  🔒 Privacy                         │
│  ├─ Local Processing: [✓]           │
│  └─ Data Collection: [Limited]      │
└─────────────────────────────────────┘
```

## Technical Implementation Notes

### Window Properties
```javascript
{
  transparent: true,
  frame: false,
  alwaysOnTop: true,
  skipTaskbar: true,
  resizable: true,
  hasShadow: true,
  vibrancy: 'under-window', // macOS
  backgroundMaterial: 'acrylic', // Windows
}
```

### Z-Index Hierarchy
1. System overlays (highest)
2. MyDecisions overlay
3. Other applications
4. Desktop (lowest)

## Key Backend Integration Features

### Decision Intelligence APIs (108+ Total)
```
Phase-Based API Distribution:
├── Capture Phase: 15 APIs
│   ├── evaluateDecisionType
│   ├── findMatchingTemplates
│   ├── searchSimilarDecisions
│   └── checkValuesAlignment
├── Enhance Phase: 23 APIs
│   ├── addHistoricalContext
│   ├── mapStakeholders
│   └── analyzeMarket
├── Analyze Phase: 19 APIs
│   ├── assessRisk
│   ├── modelScenarios
│   └── detectBias
├── Collaborate Phase: 12 APIs
│   ├── createWorkspace
│   ├── submitIdea
│   └── aggregateInput
├── Decide Phase: 15 APIs
│   ├── castVote
│   ├── calculateConsensus
│   └── generateReceipt
├── Commit Phase: 14 APIs
│   ├── lockDecision
│   ├── createActionPlan
│   └── setReminders
└── Learn Phase: 10 APIs
    ├── analyzeOutcome
    ├── updateDecisionDNA
    └── improveFrameworks
```

### Real-time Collaboration Features
```
WebSocket Events:
├── decision-update: Live decision state changes
├── participant-joined: Team member enters workspace
├── vote-cast: Real-time voting updates
├── idea-submitted: New ideas in brainstorming
├── typing-indicator: Shows who's typing
├── cursor-position: Shared cursor tracking
└── annotation-added: Collaborative markup
```

### AI Meeting Intelligence
```
Meeting Features:
├── Participation Monitor
│   ├── Track speaking time per participant
│   ├── Identify silent stakeholders
│   └── Prompt for missing perspectives
├── Decision Gap Analyzer
│   ├── Identify uncovered topics
│   ├── Highlight missing criteria
│   └── Suggest follow-up questions
└── Auto-Documentation
    ├── Generate meeting summary
    ├── Extract action items
    └── Create decision receipt
```

## Conclusion
This enhanced layout structure provides a comprehensive view of the MyDecisions platform, integrating:
- **Modern UI/UX**: Glass morphism overlays with native OS integration
- **Powerful Backend**: 108+ APIs orchestrated across 7 decision phases
- **Real-time Collaboration**: WebSocket-powered team features
- **AI Intelligence**: Multi-agent debates, bias detection, pattern analysis
- **Cross-platform Consistency**: Unified experience on Windows and macOS

The architecture ensures the app delivers on its promise of being "Claude for decisions" - always accessible, incredibly intelligent, and transformative for team decision-making.