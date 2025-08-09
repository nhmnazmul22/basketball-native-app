const { getDefaultConfig } = require("expo/metro-config");
const { withTamagui } = require("@tamagui/metro-plugin");
const { withNativeWind } = require("nativewind/metro");

let config = getDefaultConfig(__dirname);

// Apply Tamagui first
config = withTamagui(config, {
  components: ["tamagui"],
  config: "./tamagui.config.ts",
  outputCSS: "./tamagui-web.css",
});

// Then apply NativeWind
config = withNativeWind(config, { input: "./global.css" });

module.exports = config;
