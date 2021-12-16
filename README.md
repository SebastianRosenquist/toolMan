# ToolMan

## Describtion
ToolMan is a Tool-Sharing-APP which hopes to make it easier for communities and people to rent and share their tools.
The app is currently a work in progress and in a very early development stage with many features still undeveloped.

The app currently uses reactNative Firebase and Firebase Realtime Database.

## Dependencies
```
{
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
  "dependencies": {
    "@react-native-community/datetimepicker": "^5.0.1",
    "@react-native-community/masked-view": "0.1.10",
    "@react-navigation/bottom-tabs": "^6.0.9",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/stack": "^6.0.11",
    "expo": "~42.0.1",
    "expo-app-loading": "1.1.2",
    "expo-constants": "~11.0.1",
    "expo-facebook": "~11.3.1",
    "expo-google-app-auth": "~8.2.5",
    "expo-haptics": "^11.0.3",
    "expo-local-authentication": "~11.1.1",
    "expo-location": "~12.1.2",
    "expo-status-bar": "~1.0.4",
    "firebase": "8.2.3",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-42.0.0.tar.gz",
    "react-native-gesture-handler": "~1.10.2",
    "react-native-maps": "0.28.0",
    "react-native-modal": "^13.0.0",
    "react-native-reanimated": "~2.2.0",
    "react-native-safe-area-context": "3.2.0",
    "react-native-safe-area-view": "^1.1.1",
    "react-native-screens": "~3.4.0",
    "react-native-vector-icons": "^8.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.9.0"
  },
  "private": true
}

```

## How to Run the APP
To test the app:
1. Download the Code
2. Navigate to the code directory in your terminal
3. Run expo start or the following:

```
npm install

npm start
```

When running the app, make sure NOT to run in web-view. The app is not developed for this.

## Credits
Credits where credits are due.

We learned a lot from fellow students and teachers (Eigil & Jesper).

Also, we would like to thank several YouTubers who helped with the understanding of React-Native and its components.
Especially: Darwin Tech - https://youtu.be/qlELLikT3FU
& notJust.dev https://youtu.be/NAos0QKgyxw

## Short Video Demo:
https://youtu.be/9H3_mPNsP80

## Screen-dumps of running App
<img src='/assets/appScreenDumps/1_Login.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/2_Register.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/3_InfoPage.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/4_ToolGroupPage.jpg' width='400' height='790'>  
<img src='/assets/appScreenDumps/5_MapPage.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/6_MapPage.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/7_MapPage.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/8_MapPage.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/9_MapPage.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/10_SearchPage.jpg' width='400' height='790'>
<img src='/assets/appScreenDumps/11_ProfilePage.jpg' width='400' height='790'>

## App structure

1. App.js
   - components
     - login
       - LoginPage.js
       - SignupPage.js
     - Modals
       - AddToolModal.js
       - EditToolModal.js
       - ToolDetailsModal.js
     - Navigators
       - StackNavigator.js
       - TapNavigator.js
     - Pages.js
       - InfoPage.js
       - MapPage.js
       - ProfilePage.js
       - SearchTool.js
       - ToolGroupPage.js
   - styles
     - GlobalStyles.js
2. firebase.js