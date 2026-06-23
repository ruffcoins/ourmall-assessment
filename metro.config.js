const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

// Expo 56's supervising-transform-worker reads `config.expo_customTransformerPath`
// to load the custom transformer. withNativeWind (via react-native-css-interop) sets
// `transformerPath` to its own transformer, but the supervising worker re-resolves
// it relative to the nativewind package, causing "Cannot find module" errors.
// Directly setting the transformer config options bypasses this path issue.
nativeWindConfig.transformer = {
  ...nativeWindConfig.transformer,
  expo_customTransformerPath: require.resolve(
    "react-native-css-interop/dist/metro/transformer"
  ),
};

module.exports = nativeWindConfig;
