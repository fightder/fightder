export default () => {
  return {
    expo: {
      name: process.env.APP_ENV === "production" ? "susu" : "susu (DEV)",

      slug: "fightder",
      scheme: "susu",
      version: "1.0.0",
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
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        associatedDomains: ["applinks:susu.team", "webcredentials:susu.team"],
        bundleIdentifier:
          process.env.APP_ENV === "production" ? "team.susu" : "team.susu-dev",
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
            ios: {
              deploymentTarget: "13.4",
            },
          },
        ],
      ],
      extra: {
        router: {
          origin: false,
        },
        eas: {
          projectId: "fe5fbc73-81d8-4d66-b52a-3601cc5409fc",
        },
      },
      owner: "fightder",
    },
  };
};
