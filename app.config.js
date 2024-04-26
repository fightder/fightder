export default () => {
  return {
    expo: {
      name: process.env.APP_ENV === "production" ? "susu" : "susu (DEV)",
      slug: "susu",
      scheme: "susu",
      version: "1.0.1",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      experiments: {
        tsconfigPaths: true,
        typedRoutes: true,
      },
      updates: {
        url: "https://u.expo.dev/${fef1f6e4-33ee-4706-b188-609a91bac569}",
      },
      runtimeVersion: {
        policy: "sdkVersion",
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        associatedDomains: ["applinks:susu.team", "webcredentials:susu.team"],
        bundleIdentifier:
          process.env.APP_ENV === "production" ? "team.susu" : "team.susu-dev",
        privacyManifests: {
          NSPrivacyAccessedAPITypes: [
            {
              NSPrivacyAccessedAPIType:
                "NSPrivacyAccessedAPICategoryUserDefaults",
              NSPrivacyAccessedAPITypeReasons: ["3B52.1"],
            },
            {
              NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryDiskSpace",
              NSPrivacyAccessedAPITypeReasons: ["85F4.1"],
            },
            {
              NSPrivacyAccessedAPIType:
                "NSPrivacyAccessedAPICategorySystemBootTime",
              NSPrivacyAccessedAPITypeReasons: ["85F4.1"],
            },
            {
              NSPrivacyAccessedAPIType:
                "NSPrivacyAccessedAPICategoryUserDefaults",
              NSPrivacyAccessedAPITypeReasons: ["1C8F.1"],
            },
          ],
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#161F2D",
        },
        intentFilters: [
          {
            action: "VIEW",
            autoVerify: true,
            data: [
              {
                scheme: "https",
                host: "*.susu.team",
                pathPrefix: "/records",
              },
            ],
            category: ["BROWSABLE", "DEFAULT"],
          },
        ],
        package: "team.susu",
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      plugins: [
        "expo-router",
        [
          "expo-location",
          {
            locationAlwaysAndWhenInUsePermission:
              "Allow $(PRODUCT_NAME) to find people based on your location.",
          },
        ],
        [
          "expo-image-picker",
          {
            photosPermission:
              "The app accesses your photos to people match you based on your photos.",
          },
        ],
        [
          "expo-build-properties",
          {
            android: {
              compileSdkVersion: 34,
              targetSdkVersion: 34,
              buildToolsVersion: "34.0.0",
            },
            ios: {
              deploymentTarget: "14.0",
            },
          },
        ],
      ],
      extra: {
        router: {
          origin: false,
        },
        eas: {
          projectId: "fef1f6e4-33ee-4706-b188-609a91bac569",
        },
      },
      owner: "susuteam",
    },
  };
};
