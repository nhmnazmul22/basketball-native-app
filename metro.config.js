const { getDefaultConfig } = require("expo/metro-config");
const { withTamagui } = require("@tamagui/metro-plugin");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const tamaguiConfig = path.join(projectRoot, "tamagui.config.ts");

let config = getDefaultConfig(projectRoot);

// Ensure Metro knows about TypeScript extensions
config.resolver.sourceExts.push("ts", "tsx");

// Apply Tamagui first
config = withTamagui(config, {
  components: ["tamagui"],
  config: tamaguiConfig,
  outputCSS: "./tamagui-web.css",
  disableExtraction: process.env.NODE_ENV === "development",
});

// Then apply NativeWind
config = withNativeWind(config, { input: "./global.css" });

module.exports = config;
