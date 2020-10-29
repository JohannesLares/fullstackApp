import 'dotenv/config';

export default {
    name: "fullstackMobile",
    slug: "fullstackMobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    androidStatusBar: {
      backgroundColor: "#4287f5"
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#4287f5"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      APOLLO_URI: process.env.APOLLO_URI
    }
};
