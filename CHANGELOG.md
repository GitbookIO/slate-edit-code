# Release notes

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/).

### 0.15.6

* Improve normalization of non text inside code lines

### 0.15.4, 0.15.5

* Fix normalization of non lines inside code container.

### 0.15.3

* Reduce the likelihood of Maximum call stack exceeded, by avoiding
  `change.withoutNormalization`.

### 0.15.2

* Small monkey patch to support the GitBook's fork of Slate.

### 0.15.1

* Fix and improve orphan lines normalization.

### 0.15.0

* Upgrade to be compatible with Slate > 0.33.x
* Use the new schema definition for improved performance

### 0.14.0

* Upgrade to be compatible with Slate > 0.32.x

### 0.13.3

* Normalize multiline texts in code to be split into the appropriate number of
  code lines.

### 0.13.2

* Add `getIndent` option to customize the indent unit used.
* Fix Ctrl shortcuts on Windows/Linux

### 0.13.1

* Properly declare `immutable` as a peer dependency (already a peer dependency
  of slate)

### 0.13.0

* Upgrade to be compatible with Slate > 0.29.x

### 0.12.0

* Upgrade to be compatible with Slate > 0.27.x

### 0.11.0

* Upgrade to be compatable with Slate after the `expose-transform` branch went
  in.
* change all instances of `transform` to `change`
* change the namespace of `plugin.transforms` to `plugin.changes`

### 0.10.4

* Added `onExit(transform: Transform): ?Transform` option

### 0.10.2

* Upgrade to slate^0.19.7

### 0.10.1

* Added `isInCodeBlock` utils
* Added `wrapCodeBlock` and `wrapCodeBlockByKey` transforms
* Added `unwrapCodeBlock` and `unwrapCodeBlockByKey` transforms

### 0.10.0

* Added: Backspace in empty code container will convert it to default
  `exitBlockType`

### 0.9.2

* Fix case-insensitive slate require

### 0.9.1

* Export utils.deserializeCode that deserialize a text into a code block

### 0.9.0

* _Breaking change_ Renamed option `shiftEnterBlockType` to `exitBlockType`.
* Shift+Enter shortcut is now assigned to Mod+Enter, as before.

### 0.8.2

* Fixed onPaste

### 0.8.1

* Removed unused dependency

### 0.8.0

* _Breaking change_ : Changed the structure of code blocks. A code block is now
  made of a container, and a list of lines.
  * Removed option `onlyIn`
  * Add option `containerType`
  * Add option `lineType`
* Added option `shiftEnterBlockType` to determine the default block type when
  exiting a code block.
* Added support for multi-lines Tab and Shift+Tab

### 0.7.0

* Add option `selectAll`

### 0.6.2

* Update slate peed dependency to prevent NPM warnings when used with `0.15.x`

### 0.6.1

* Move slate to `peerDependencies`

### 0.6.0

* Adapt for Slate 0.15

### 0.5.0

* Pressing <kbd>Ctrl+A / Cmd+A</kbd> in a code block, select only the text in
  the block

### 0.4.0

* Add schema to normalize code blocks

### 0.3.0

* Pressing <kbd>Tab</kbd> with a extended selection will indent all lines in the
  selection
