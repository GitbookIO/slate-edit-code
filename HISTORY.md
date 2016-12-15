# Release notes
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

### 0.8.2

- Fixed onPaste

### 0.8.1

- Removed unused dependency

### 0.8.0

- *Breaking change* : Changed the structure of code blocks. A code block is now made of a container, and a list of lines.
  - Removed option `onlyIn`
  - Add option `containerType`
  - Add option `lineType`
- Added option `shiftEnterBlockType` to determine the default block type when exiting a code block.
- Added support for multi-lines Tab and Shift+Tab

### 0.7.0

- Add option `selectAll`

### 0.6.2

- Update slate peed dependency to prevent NPM warnings when used with `0.15.x`

### 0.6.1

- Move slate to `peerDependencies`

### 0.6.0

- Adapt for Slate 0.15

### 0.5.0

- Pressing <kbd>Ctrl+A / Cmd+A</kbd> in a code block, select only the text in the block

### 0.4.0

- Add schema to normalize code blocks

### 0.3.0

- Pressing <kbd>Tab</kbd> with a extended selection will indent all lines in the selection
