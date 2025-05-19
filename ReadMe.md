# CA Policy Coplier

![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/DanielatOCN)
[![LinkedIn: Daniel Bradley](https://img.shields.io/badge/LinkedIn-Daniel%20Bradley-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/danielbradley2/) 
[![Website](https://img.shields.io/badge/Blog-Our%20Cloud%20Network-orange?style=flat-square&logo=internet-explorer)](https://ourcloudnetwork.com/)

CA Policy Coplier is a Chrome extension that enhances the Microsoft Entra Conditional Access portal by adding convenient options to copy and download policy configurations as JSON.

![Extension Demo](images/extensiondemo.png)

## Features

- **Copy JSON**: Copy the full JSON configuration of any Conditional Access policy to your clipboard with a single click
- **Download JSON**: Download a clean version of the policy JSON (with metadata fields removed) as a file named after the policy
- **Non-intrusive UI**: Seamlessly integrates into the existing Entra admin portal UI
- **Simple notifications**: Get clear feedback when operations complete

## Installation

### From Chrome Web Store
*(Coming soon)*

### Manual Installation (Developer Mode)

1. **Download the extension**:
   - Clone this repository or download it as a ZIP file and extract it to your local machine:
   ```
   git clone https://github.com/yourusername/CACopyPaste.git
   ```

2. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions` in your Chrome browser
   - Or go to Menu → More Tools → Extensions

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**:
   - Click the "Load unpacked" button
   - Browse to the location where you extracted the extension files
   - Select the folder containing the extension files (the folder with manifest.json)

5. **Verify installation**:
   - The extension icon should appear in your Chrome toolbar
   - You may need to pin it if it's hidden in the extensions menu

## Usage

1. Log in to the [Microsoft Entra admin center](https://entra.microsoft.com)
2. Navigate to "Protection" → "Conditional Access" → "Policies"
3. Open any Conditional Access policy
4. Look for the "Copy JSON" and "Download" buttons in the toolbar at the top of the policy page
5. Click "Copy JSON" to copy the policy configuration to your clipboard
6. Click "Download" to save the configuration as a JSON file (without metadata fields)

## Notes

- The "Download" option removes the following metadata fields:
  - `id`
  - `createdDateTime`
  - `modifiedDateTime`
- No data is collected or transmitted elsewhere; all operations happen locally in your browser

## Compatibility

- Google Chrome 88+
- Microsoft Edge 88+ (Chromium-based)
- Other Chromium-based browsers should also be compatible

## Development

This extension uses:
- JavaScript for functionality
- Chrome Extension Manifest V3
- SVG icons for a clean UI

To modify the extension:
1. Make your changes to the source code
2. Reload the extension in chrome://extensions by clicking the refresh icon
3. Test your changes in the Entra admin portal

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

[MIT License](LICENSE)

## Disclaimer

This extension is not affiliated with or endorsed by Microsoft. All Microsoft product names and logos are trademarks of Microsoft Corporation.
