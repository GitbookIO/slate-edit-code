# slate-edit-code

[![NPM version](https://badge.fury.io/js/slate-edit-code.svg)](http://badge.fury.io/js/slate-edit-code)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-edit-code.png?branch=master)](https://travis-ci.org/GitbookIO/slate-edit-code)

A Slate plugin to handle code block editing.

> ⚠️  This repository is now using GitBook's fork of [ianstormtaylor/slate](https://github.com/ianstormtaylor/slate).
> Previous versions are still [available on NPM](https://www.npmjs.com/package/slate-edit-code)
> All the versions using GitBook's fork of slate are now published under the `@gitbook` NPM scope.
> To learn more about why we forked Slate, read [our manifest](https://github.com/GitbookIO/slate/blob/master/Readme.md)

### Install

```js
npm install slate-edit-code
```

### Features

- Pressing <kbd>Enter</kbd> insert a new line starting with the right indentation
- Pressing <kbd>Tab</kbd> insert the right indentation if selection is collapsed or indent all lines in selection
- Pressing <kbd>Delete</kbd> remove the indentation before cursor if possible
- Pressing <kbd>Mod+Enter</kbd> exits the code block
- Pressing <kbd>Mod+A</kbd> selects all the text in the block

> <kbd>Mod</kbd> means <kbd>Ctrl</kbd> on Windows/Linux and <kbd>Command</kbd> on Mac.

### Structure

This plugin uses the following structure for code blocks:

```html
<code_block>
  <code_line>A code block is made of</code_line>
  <code_line>several code lines</code_line>
</code_block>
```

Texts inside `code_blocks` that contain newlines `\n` are automatically split into the appropriate number of `code_lines`.


### Simple Usage

```js
import EditCode from 'slate-edit-code'

const plugins = [
  EditCode()
]
```

#### Options arguments

- `containerType = 'code_block' : string` — The type of the code containers
- `lineType = 'code_line' : string` — The type of the code lines
- `exitBlockType = 'paragraph' : null | string` — <kbd>Mod+Enter</kbd> will exit the code container, into the given block type. Backspace at start of an empty code container will convert it to the given block type. Pass `null` to disable this behavior.
- `onExit: (Change) => void | Change` — Change to do when the user hits <kbd>Mod+Enter</kbd>. Defaults to exiting the code block, into a new `exitBlockType` block.
- `selectAll = true : boolean` — True to select all code inside a code container on <kbd>Mod+A</kbd>
- `allowMarks = false : boolean` —  False disallow marks in code blocks by normalizing them away.
- `getIndent: (Value) => string` — Returns the indent unit as a string. The current value is passed as context.

#### Suppressing onKeyDown behavior

Some behavior implemented by this plugins have no corresponding option. While there is an option `selectAll` to disable the behavior on `Mod+A`,  If you would like to fine tune these behavior, you can always redefine the exported `onKeyDown` function.

The following example disable all indent behavior

```js
import EditCode from 'slate-edit-code'

const options = { ... };

const basePlugin = EditCode(options);

const customPlugin = {
  ...basePlugin,
  onKeyDown(event, change, editor) {
    if (event.key === 'Tab') {
      // Bypass the original plugin behavior on `Tab`
      return;
    } else {
      return basePlugin.onKeyDown(event, change, editor);
    }
  }
}

// Use customPlugin later on
```

### Utilities and Changes

`slate-edit-code` exports utilities, accessible like so:

``` js
const plugin = EditCode()

// Access exported utilities there
plugin.utils
```

#### `utils.deserializeCode`

`plugin.utils.deserializeCode(text: String) => Block`

Split a text string into lines, and deserialize them to a `code_container` `Block`, with one children `code_line` `Block` per line.


#### `changes.toggleCodeBlock`

`plugin.changes.toggleCodeBlock(change: Change, type: String) => Change`

Toggle a block into a code block or a normal block (defined by `type`).

#### `changes.wrapCodeBlockByKey`

`plugin.changes.wrapCodeBlockByKey(change: Change, key: String) => Change`

Convert a block (paragraph, etc) into a code block.

#### `changes.wrapCodeBlock`

`plugin.changes.wrapCodeBlock(change: Change) => Change`

Convert current block (paragraph, etc) into a code block.

#### `changes.unwrapCodeBlockByKey`
`plugin.changes.unwrapCodeBlockByKey(change: Change, key: String, type: String) => Change`

Convert a code block into a normal block (paragraph, etc).

#### `changes.unwrapCodeBlock`

`plugin.changes.unwrapCodeBlock(change: Change, type: String) => Change`

Convert current code block into a normal block (paragraph, etc).
