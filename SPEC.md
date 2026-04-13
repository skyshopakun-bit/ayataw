# AI Generator Hub - Specification

## Project Overview

**Name**: AI Generator Hub  
**Type**: Web Application (Next.js 16)  
**Core Functionality**: Unified interface for AI-powered video and image generation using Veo 3, Sora 2, Seedance 2, Grok, and image generators via browser automation.  
**Target Users**: Content creators, designers, and AI enthusiasts who want free access to various AI generation tools.

---

## UI/UX Specification

### Layout Structure

**Header**
- Fixed top navigation
- Logo on left: "AI Generator Hub" with animated gradient text
- Navigation links: Generators, Gallery, About
- Dark mode toggle on right

**Main Content**
- Hero section with animated background
- Generator selection grid
- Generation workspace (modal/panel)
- Results gallery

**Footer**
- Minimal footer with credits

### Responsive Breakpoints
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

### Visual Design

**Color Palette**
- Background: `#0a0a0f` (deep dark)
- Surface: `#12121a` (card background)
- Surface Elevated: `#1a1a24`
- Primary: `#8b5cf6` (violet)
- Primary Hover: `#a78bfa`
- Secondary: `#06b6d4` (cyan)
- Accent: `#f472b6` (pink)
- Success: `#22c55e`
- Error: `#ef4444`
- Text Primary: `#f8fafc`
- Text Secondary: `#94a3b8`
- Border: `#2e2e3a`

**Typography**
- Headings: "Outfit" (Google Fonts) - geometric, modern
- Body: "DM Sans" (Google Fonts) - clean, readable
- Monospace: "JetBrains Mono" for code/technical text
- H1: 48px / 56px line-height / 700 weight
- H2: 36px / 44px line-height / 600 weight
- H3: 24px / 32px line-height / 600 weight
- Body: 16px / 24px line-height / 400 weight
- Small: 14px / 20px line-height / 400 weight

**Spacing System**
- Base unit: 4px
- XS: 4px, SM: 8px, MD: 16px, LG: 24px, XL: 32px, 2XL: 48px, 3XL: 64px

**Visual Effects**
- Cards: `box-shadow: 0 4px 24px rgba(139, 92, 246, 0.1)`
- Hover glow: `box-shadow: 0 0 40px rgba(139, 92, 246, 0.3)`
- Glass effect: `backdrop-filter: blur(12px); background: rgba(18, 18, 26, 0.8)`
- Border gradient on hover
- Smooth transitions: 300ms ease

### Components

**Generator Card**
- Icon (AI-generated style illustration)
- Title: Generator name
- Description: Brief capability description
- Status indicator (available/busy/coming soon)
- Hover: Scale 1.02, glow effect, border highlight

**Input Panel**
- Textarea for prompt (min 100px height, expandable)
- Character counter
- Style presets dropdown
- Aspect ratio selector
- Generate button with loading state

**Results Display**
- Video/Image preview with skeleton loader
- Download button
- Share button
- Regenerate button
- Loading state with animated progress

**Navigation**
- Active state: violet underline
- Hover: text color change to primary

---

## Functionality Specification

### Core Features

1. **Generator Selection**
   - 5 generator cards: Veo 3, Sora 2, Seedance 2, Grok, Image Gen
   - Click to open generation panel
   - Each has unique input options

2. **Video Generation (Veo 3, Sora 2, Seedance 2)**
   - Text prompt input
   - Duration selection (3-8 seconds)
   - Aspect ratio (16:9, 9:16, 1:1)
   - Style presets (cinematic, realistic, animated, abstract)

3. **Image Generation (Grok, Image Generator)**
   - Text prompt input
   - Resolution selection
   - Style presets
   - Negative prompt option

4. **Generation Workflow**
   - User selects generator
   - Fills in prompt and options
   - Clicks generate
   - System automation runs via Playwright
   - Results displayed in gallery
   - Download available

5. **Gallery**
   - Grid of generated content
   - Filter by generator type
   - View details on click

### Automation Approach

Since we need free access, we'll use Playwright to:

1. **Google AI Studio (Veo 3)**
   - Navigate to studio.google.com
   - Authenticate (user provides credentials or uses existing session)
   - Submit generation request
   - Retrieve result URL

2. **Sora (OpenAI)**
   - Navigate to sora.com
   - Handle authentication
   - Submit prompt
   - Fetch generated video

3. **Seedance 2**
   - Navigate to seedance.ai or similar
   - Use free tier

4. **Grok**
   - Navigate to xai.com/grok
   - Use image generation feature

5. **Image Generator (Hugging Face/Leonardo)**
   - Use free tier APIs where available
   - Fallback to automation

### User Interactions
- Click generator card → Open generation panel
- Type prompt → Live character count
- Select options → Update UI
- Click generate → Show progress, then results
- Click download → Save file
- Click regenerate → Re-run with same params

### Edge Cases
- Service unavailable → Show error, suggest alternatives
- Authentication required → Prompt user for credentials
- Rate limited → Queue request, show wait time
- Generation fails → Allow retry with same/different params

---

## Technical Architecture

### File Structure
```
src/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   ├── globals.css          # Global styles
│   ├── api/
│   │   ├── generate/
│   │   │   ├── route.ts     # Generation API
│   │   │   └── types.ts     # Type definitions
│   │   └── gallery/
│   │       └── route.ts     # Gallery API
│   └── components/
│       ├── ui/              # Reusable UI components
│       ├── GeneratorCard.tsx
│       ├── GenerationPanel.tsx
│       ├── ResultsViewer.tsx
│       └── Header.tsx
├── lib/
│   ├── automation/          # Playwright automation
│   │   ├── veo.ts
│   │   ├── sora.ts
│   │   ├── seedance.ts
│   │   ├── grok.ts
│   │   └── imagegen.ts
│   └── utils.ts
└── types/
    └── index.ts
```

### API Routes
- `POST /api/generate` - Submit generation request
- `GET /api/gallery` - Get gallery items

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with violet/cyan accent colors applied
- [ ] Outfit font for headings, DM Sans for body
- [ ] Cards have glass effect and glow on hover
- [ ] Smooth 300ms transitions on all interactive elements
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Loading states show animated skeleton/spinner
- [ ] Gradient borders on active/hover states

### Functional Checkpoints
- [ ] Can select each of the 5 generators
- [ ] Input panel accepts prompt with character count
- [ ] Style/options selectors work
- [ ] Generate button triggers automation (or mock for demo)
- [ ] Results display in gallery
- [ ] Download functionality works

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Smooth animations (60fps)
- [ ] No layout shifts during load
