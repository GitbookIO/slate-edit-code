# slate-edit-code

[![NPM version](https://badge.fury.io/js/slate-edit-code.svg)](http://badge.fury.io/js/slate-edit-code)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-edit-code.png?branch=master)](https://travis-ci.org/GitbookIO/slate-edit-code)

A Slate plugin to handle keyboard events in code blocks.

### Install

```js
npm install slate-edit-code
```

### Features

- Pressing <kbd>Enter</kbd> insert a new line starting with the right indentation
- Pressing <kbd>Tab</kbd> insert the right indentation if selection is collapsed or indent all lines in selection
- Pressing <kbd>Delete</kbd> remove the indentation before cursor if possible
- Pressing <kbd>Command+Enter</kbd> (<kbd>Ctrl+Enter</kbd> on Windows/Linux) exits the code block

### Simple Usage

```js
import EditCode from 'slate-edit-code'

const plugins = [
  EditCode()
]
```

#### Arguments

- ``[onlyIn: Function(Node)]`` — a filtering function to select code blocks.
