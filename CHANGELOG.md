# overtune

## 1.2.0

### Minor Changes

- 8ec8769: - Remote control via Remote Companion:
  - Users can now control paired devices remotely for the first time.
  - Includes setup of offscreen rendering on successful pairing.
  - Handles connection revocation and internal logic for reliable remote control.
  - Refactored pairing and connection handling to support the new feature.
  - Various pairing and connection bugs fixed as part of enabling remote control.
  - Updated documentation to reflect the new feature and internal logic changes.
  - Improved internal linking and project structure.

## 1.1.1

### Patch Changes

- 2daebaf: add custom action `show-ytm`

## 1.1.0

### Minor Changes

- 69741c5: _Added_
  - New configurable options in settings:
    - Color Mode selection
    - Open if None Available: automatically launches YouTube Music when no instance is detected
    - Surprise Me: plays random music when YouTube Music opens - Pin Instance: keeps the YouTube Music instance pinned for quick access

  These additions enhance personalization and convenience when managing YouTube Music behavior.

## 1.0.0

### Major Changes

- c493f1b: 🚀 Over Tune v1.0.0

  The first stable release of **Over Tune**, a Chrome extension that allows you to fully customize your YouTube Music experience.
  - 🎶 **Now Playing Widget** - Always know what’s playing at a glance.
  - ⌨️ **Customizable Shortcuts** - Set your own shortcuts for play, pause, skip, volume, and more.
  - 🔊 **Custom Output Device** - Choose and switch your playback device directly from the extension.
  - ⚡ **Customizable Actions** (Coming Soon) - Bind actions like opening lyrics, liking a track, or shuffling to keys or buttons.
  1. Download the latest `release.zip` from the [Releases page](https://github.com/kyng-cytro/over-tune/releases).
  2. Extract the `.zip` file.
  3. Open Chrome and go to `chrome://extensions/`.
  4. Enable **Developer mode** (toggle in the top-right).
  5. Click **Load unpacked** and select the extracted folder.
  6. Over Tune should now appear in your extensions bar!

  Need help getting started?
  Check out the [Over Tune Guide](./GUIDE.md) for setup tips, shortcut customization, audio device switching, and FAQs.
