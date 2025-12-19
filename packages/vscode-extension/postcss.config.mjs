export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Chrome >= 118", // VSCode 1.85+ uses Electron 27 with Chrome 118+
      ],
      // Disable legacy IE prefixes
      grid: false,
    },
  },
};
