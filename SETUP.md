# Setup Guide for Mint Market React Native App

## Quick Start

Follow these steps to get the app running on your machine:

### 1. Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or later) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### 2. Install Expo CLI

```bash
npm install -g expo-cli
```

### 3. Clone and Install

```bash
# Navigate to the project directory (you're already here!)
cd mint-market-react-native

# Install dependencies
npm install
```

### 4. Start the Development Server

```bash
npm start
```

This will open the Expo Dev Tools in your browser.

### 5. Run on Your Device

#### Option A: Physical Device (Easiest)
1. Install **Expo Go** app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code from the terminal or Expo Dev Tools

#### Option B: Emulator/Simulator

**For Android:**
1. Install [Android Studio](https://developer.android.com/studio)
2. Set up an Android Virtual Device (AVD)
3. Run: `npm run android`

**For iOS (Mac only):**
1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools
3. Run: `npm run ios`

**For Web:**
```bash
npm run web
```

## Troubleshooting

### Common Issues

#### 1. "Command not found: expo"
**Solution:** Install Expo CLI globally
```bash
npm install -g expo-cli
```

#### 2. Port already in use
**Solution:** Kill the process or use a different port
```bash
# Kill process on port 19000 (Windows)
netstat -ano | findstr :19000
taskkill /PID <PID> /F

# Or start on a different port
expo start --port 19001
```

#### 3. Metro bundler issues
**Solution:** Clear cache and restart
```bash
expo start -c
```

#### 4. Module not found errors
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

#### 5. "Unable to resolve module"
**Solution:** Clear watchman cache (Mac/Linux) or restart
```bash
watchman watch-del-all
expo start -c
```

### Platform-Specific Issues

#### iOS
- Make sure you have Xcode installed (Mac only)
- Update CocoaPods: `sudo gem install cocoapods`
- If simulator doesn't open, open Xcode and check simulator list

#### Android
- Enable USB debugging on your device
- Accept ADB connection on your device
- Make sure Android SDK is properly installed
- Check environment variables (ANDROID_HOME)

## Project Structure Overview

```
mint-market-react-native/
├── src/
│   ├── components/      # Reusable UI components
│   ├── constants/       # App constants and data
│   ├── context/         # React Context (state management)
│   ├── navigation/      # Navigation setup
│   ├── screens/         # All app screens
│   ├── theme/          # Theme and styling
│   └── utils/          # Helper functions
├── assets/             # Images, icons, fonts
├── App.js             # Root component
└── package.json       # Dependencies
```

## Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Clear cache and start
expo start -c
```

## Next Steps

1. **Add Assets**: Place your app icons and splash screen in the `assets/` folder
2. **Customize Theme**: Edit `src/theme/theme.js` to match your brand colors
3. **Connect API**: Replace mock data with real API calls
4. **Test**: Try all features and screens
5. **Build**: When ready, build for production using `expo build`

## Development Tips

1. **Hot Reloading**: Changes are automatically reflected. Shake device to open dev menu
2. **Debugging**: 
   - Shake device → "Debug Remote JS"
   - Use React DevTools browser extension
   - Use `console.log()` for quick debugging
3. **State Management**: Currently using Context API. For larger apps, consider Redux or MobX
4. **Linting**: Add ESLint for code quality
5. **Testing**: Add Jest and React Native Testing Library

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

## Getting Help

If you encounter issues:
1. Check the error message carefully
2. Search in Expo forums
3. Check Stack Overflow
4. Review the documentation

## Happy Coding! 🚀

