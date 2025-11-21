# Mint Market - React Native App

A comprehensive mobile marketplace application built with React Native and Expo, based on the [Mint Market](https://dev.mint-market.live/) website.

## Features

### 🏠 Home & Browse
- Beautiful home screen with featured items and categories
- Browse through multiple categories (Vehicles, Real Estate, Electronics, Jobs, Services, etc.)
- Quick stats and call-to-action buttons
- Professional evaluation services showcase

### 🔍 Search & Filter
- Advanced search functionality with filters
- Category-based filtering
- Price range filters
- Real-time search results

### 📝 Listings
- Post new ads with photos and details
- Create property listings with comprehensive details
- View detailed product information with ratings and reviews
- Seller information and contact options

### 🚗 Compare Vehicles
- Side-by-side vehicle comparison
- Detailed specifications comparison
- Add/remove vehicles from comparison
- Visual comparison with images

### ⭐ Evaluation Services
- Auto360 - Professional car evaluation
- Real Estate360 - Property assessment
- Electronics360 - Device condition check
- Antiques360 - Antique authentication

### 👤 User Features
- User authentication (Sign In/Sign Up)
- User profile with stats
- Favorites/wishlist
- Messages and notifications
- Personal listings management

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **React Native Paper** - UI component library
- **Async Storage** - Local data storage
- **Expo Linear Gradient** - Gradient components
- **Vector Icons** - Icon library

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd mint-market-react-native
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- Install Expo Go app on your iOS or Android device
- Scan the QR code from the terminal

### Run on Emulator/Simulator

**Android:**
```bash
npm run android
```

**iOS (macOS only):**
```bash
npm run ios
```

**Web:**
```bash
npm run web
```

## Project Structure

```
mint-market-react-native/
├── assets/                 # App assets (icons, splash screen)
├── src/
│   ├── components/        # Reusable components
│   │   ├── CategoryCard.js
│   │   ├── ProductCard.js
│   │   └── EvaluationServiceCard.js
│   ├── constants/         # App constants and mock data
│   │   ├── categories.js
│   │   └── mockData.js
│   ├── context/           # React Context providers
│   │   └── AuthContext.js
│   ├── navigation/        # Navigation configuration
│   │   ├── RootNavigator.js
│   │   ├── MainTabNavigator.js
│   │   └── AuthNavigator.js
│   ├── screens/           # App screens
│   │   ├── WelcomeScreen.js
│   │   ├── SignInScreen.js
│   │   ├── SignUpScreen.js
│   │   ├── HomeScreen.js
│   │   ├── SearchScreen.js
│   │   ├── CategoryScreen.js
│   │   ├── ProductDetailScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── PostAdScreen.js
│   │   ├── CreatePropertyScreen.js
│   │   ├── CompareVehiclesScreen.js
│   │   └── EvaluationScreen.js
│   ├── theme/             # Theme configuration
│   │   └── theme.js
│   └── utils/             # Utility functions
│       └── helpers.js
├── App.js                 # App entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## Screens

### Authentication Flow
- **Welcome Screen** - App introduction with stats
- **Sign In** - User login
- **Sign Up** - User registration

### Main App Flow
- **Home** - Featured items, categories, and quick actions
- **Search** - Advanced search with filters
- **Favorites** - Saved items
- **Profile** - User profile and settings

### Additional Screens
- **Category** - Category-specific listings
- **Product Detail** - Detailed product view with reviews
- **Post Ad** - Create new listing
- **Create Property** - Create real estate listing
- **Compare Vehicles** - Compare multiple vehicles
- **Evaluation** - Request professional evaluation

## Features Implementation

### Authentication
- Context-based authentication state management
- AsyncStorage for persistent login
- Protected routes

### Navigation
- Stack navigator for screen transitions
- Bottom tab navigator for main screens
- Nested navigation structure

### Styling
- Consistent theme across the app
- Custom color palette
- Responsive design
- Material Design components

## Customization

### Theme Colors
Edit `src/theme/theme.js` to customize colors:
```javascript
colors: {
  primary: '#6366f1',
  secondary: '#ec4899',
  // ... more colors
}
```

### Mock Data
Edit `src/constants/mockData.js` to update sample listings and stats.

### Categories
Edit `src/constants/categories.js` to add/remove categories.

## API Integration

Currently, the app uses mock data. To integrate with a backend API:

1. Create an API service file (e.g., `src/services/api.js`)
2. Replace mock data calls with actual API calls
3. Update the AuthContext to use real authentication endpoints
4. Add proper error handling and loading states

## Building for Production

### Android APK
```bash
expo build:android
```

### iOS App
```bash
expo build:ios
```

### Web
```bash
expo build:web
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@mintmarket.com or join our Slack channel.

## Acknowledgments

- Design inspired by [Mint Market](https://dev.mint-market.live/)
- Icons by [Material Community Icons](https://materialdesignicons.com/)
- Images from [Unsplash](https://unsplash.com/)

---

Built with ❤️ using React Native and Expo

