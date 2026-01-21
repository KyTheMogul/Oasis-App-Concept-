# Oasis - Creator-Brand Deal Marketplace App

**Oasis** is a mobile app concept that connects **content creators with premium brand deals**. Built with React Native and Expo, this repository provides a **complete, production-ready template** for a creator marketplace platform where influencers can discover, apply for, and manage brand partnership opportunities.

This is an **open source app template and design concept** that you can immediately clone, customize, and deploy as your own creator-brand marketplace platform.

---

## 🎯 What is Oasis?

Oasis is a **creator economy platform** that simplifies the process of connecting content creators with brands looking for influencer partnerships. The app enables:

- **Creators** to discover brand deals matching their niche and audience
- **Brands** to find creators aligned with their marketing goals
- **Seamless deal management** with milestone tracking, progress monitoring, and direct messaging
- **Earnings management** with transparent payment tracking and withdrawal capabilities

The platform is designed to feel **premium, modern, and creator-focused**, with a sleek dark UI that puts deals and earnings front and center.

---

## 🚀 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack & Tab Navigators)
- **Styling**: Custom theme system with TypeScript
- **UI Components**: Reusable, production-ready components
- **State Management**: React Hooks

Everything is configured so you can **clone, install, and run** the app on iOS, Android, or web with minimal setup.

---

## 🎨 Design Style & Experience

Oasis features a **premium, dark-themed design** optimized for creators:

- **Dark-first UI** with pure black backgrounds and subtle transparency effects
- **Card-based layouts** for deals, profiles, and content discovery
- **Soft gradients and grain overlays** for depth and texture
- **Clean typography** with clear hierarchy for earnings, stats, and CTAs
- **Rounded corners and generous spacing** for a modern, approachable feel
- **High-contrast action buttons** with swipe-to-confirm interactions
- **Glassmorphism effects** for profile stats and overlays

The visual language is intentionally **opinionated but easily customizable**—update colors, typography, and assets in `theme.ts` to match your brand.

---

## 📱 Included Screens & Features

This template includes a **complete set of screens** covering the full creator-brand deal marketplace experience:

### Onboarding & Authentication

- **Get Started Screen** (`GetStartedScreen`):  
  Hero introduction with tagline: *"Monetize your influence. Connect with premium brands."*

- **Onboarding Flow** (`OnboardingScreen`):  
  Multi-step onboarding that collects:
  - Age verification
  - Content type preferences (Lifestyle, Comedy, Education, Tech, Fitness, Beauty, Gaming, Music, Travel, Food, Fashion, Art, Movies/TV, Automotive, Pets)
  - Brand category preferences (Fashion, Sneakers, Sports, Technology, Gaming, Skincare, Beverages, Apps/Software, Finance, Health & Wellness, Crypto & Web3, Travel, and more)
  - Social media account connections

- **Auth Screen** (`AuthScreen`):  
  Clean authentication entry point for sign in / sign up (ready to wire to your backend)

### Main App Experience

- **Hub Screen** (`HubScreen`):  
  Creator dashboard featuring:
  - Available earnings balance with quick withdraw action
  - Creator profile summary (name, handle, followers, total earnings)
  - Performance stats (new followers, average views, engagement status)
  - Active deals grid with progress tracking

- **Discover Screen** (`DiscoverScreen`):  
  Browse available brand deals with:
  - Search functionality
  - Category filters (All, Fashion, Tech, Gaming, Travel, Eco, etc.)
  - Deal cards showing brand, category, and payout amount
  - Tap to view full deal details

- **Deal Detail Screen** (`DealDetailScreen`):  
  Comprehensive deal view including:
  - Brand banner and logo
  - Company bio and category
  - Total earnings amount
  - Progress bar showing completion percentage
  - Milestone roadmap with payment breakdowns
  - Apply for deal / View details actions
  - Direct messaging with brand

- **Profile Screen** (`ProfileScreen`):  
  Creator profile showcase with:
  - Gradient header with profile picture
  - Stats overview (followers, average views, deals completed)
  - Social media links (YouTube, Instagram, TikTok, Twitter, Twitch, Kick, etc.)
  - QR code for profile sharing
  - Settings and notifications access

### Communication & Messaging

- **Messages Screen** (`MessagesScreen`):  
  List view of all conversations with brands, showing:
  - Brand name and icon
  - Last message preview
  - Unread message counts
  - Timestamps

- **Chat Screen** (`ChatScreen`):  
  Direct messaging interface for communicating with brands about deals, including:
  - Message history
  - Real-time chat UI (ready for WebSocket integration)
  - Deal context display

### Financial Management

- **Withdraw Screen** (`WithdrawScreen`):  
  Form for withdrawing earnings with multiple payment methods:
  - Bank transfer
  - PayPal
  - Instant payout options

- **Withdraw Success Screen** (`WithdrawSuccessScreen`):  
  Confirmation screen after successful withdrawal

- **Statements Screen** (`StatementsScreen`):  
  Historical view of earnings, payments, and transactions

### Additional Screens

- **Settings Screen** (`SettingsScreen`):  
  App preferences, account settings, and configuration options

- **QR Code Screen** (`QRCodeScreen`):  
  Generate and share creator profile QR codes

- **Terms & Privacy Screens** (`TermsScreen`, `PrivacyScreen`):  
  Legal compliance screens for terms of service and privacy policy

---

## 🧩 Reusable Components & Utilities

The project includes several **production-ready, reusable components**:

- **Deal Card** (`DealCard`):  
  Reusable card component for displaying brand deals in grids and lists

- **Deal Detail Modal** (`DealDetailModal`):  
  Modal overlay for quick deal previews

- **Grain Overlay** (`GrainOverlay`):  
  Animated texture overlay component for adding depth to backgrounds

- **Swipe Button** (`SwipeButton`):  
  Interactive swipe-to-confirm button for high-intent actions (e.g., apply for deal, confirm withdrawal)

- **Social Connect Button** (`SocialConnectButton`):  
  Branded button component for connecting social media accounts

- **Theme System** (`theme.ts`):  
  Centralized design tokens for colors, spacing, typography, shadows, and border radius

- **Type Definitions** (`types.ts`):  
  Complete TypeScript interfaces for deals, users, milestones, messages, and navigation

These building blocks enable rapid feature development while maintaining UI consistency.

---

## 🏃 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (or use `npx expo`)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KyTheMogul/Oasis-App-Concept-.git
   cd Oasis-App-Concept-
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app**

   ```bash
   npx expo start
   ```

   Then follow the Expo prompts to:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

The app will launch and you can immediately explore all screens and features!

---

## 🎨 Customizing the Template

This project is structured to be **easy to fork and rebrand**:

### Quick Customization

- **Update branding**: Modify colors, fonts, and spacing in `theme.ts`
- **Replace assets**: Swap logos, icons, and images in the `assets` folder
- **Modify copy**: Update text and messaging throughout the `screens` directory
- **Add features**: Extend navigation and add new screens for additional functionality

### Integration Points

The core UI and navigation are already wired, so you can focus on:

- **Backend integration**: Connect to your API for deals, users, messaging, and payments
- **Authentication**: Wire up `AuthScreen` to your auth provider (Firebase, Auth0, custom)
- **Real-time features**: Add WebSocket support for live messaging and deal updates
- **Payment processing**: Integrate Stripe, PayPal, or other payment gateways
- **Analytics**: Add tracking for deal views, applications, and conversions

---

## 💡 Use Cases

You can use Oasis as:

- **A starter kit** for building your own creator marketplace or influencer platform
- **A design reference** for teams exploring premium creator economy UX patterns
- **A demo / prototype** for pitch decks, stakeholder presentations, or user testing
- **A learning project** to explore React Native, Expo, modern mobile UI patterns, and TypeScript

---

## 📄 License & Open Source

This repository is intended as an **open source app template and concept** for the community.  
You are free to:

- ✅ Fork it and build your own creator marketplace on top
- ✅ Rebrand the UI to match your company or project
- ✅ Learn from the structure and components to accelerate your own work
- ✅ Use it commercially or non-commercially

If you use Oasis as the foundation for your app, a mention or link back to this repo is appreciated but not required.

---

## 🤝 Contributing

Feedback, suggestions, and contributions are welcome! Feel free to:

- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share your customizations and use cases

---

## 👤 Credits

Created and maintained by **KyTheMogul** as an open source contribution to the creator economy ecosystem.

---

## 🔗 Links

- **Repository**: [https://github.com/KyTheMogul/Oasis-App-Concept-](https://github.com/KyTheMogul/Oasis-App-Concept-)
- **Issues**: Report bugs or request features via GitHub Issues

---

**Ready to build the next creator marketplace? Clone, customize, and launch! 🚀**
