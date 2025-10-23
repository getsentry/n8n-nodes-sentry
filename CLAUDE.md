# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an n8n community node package for integrating Sentry with n8n workflows. The package follows the n8n node development standards and uses TypeScript with strict type checking.

## Development Commands

```bash
# Build the node
npm run build

# Build with watch mode for development
npm run build:watch

# Run development server
npm run dev

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Create release
npm run release

# Pre-publish preparation
npm run prepublishOnly
```

## Project Structure

The codebase follows n8n's standard node package structure:

- `nodes/` - Contains the node implementations
  - Each node is in its own directory with the TypeScript implementation and SVG icons
  - Example: `nodes/Example/Example.node.ts` implements the `INodeType` interface
- `credentials/` - Contains credential type definitions (currently empty)
- `dist/` - Build output directory (generated)

## Key Technical Details

### Node Development
- Nodes must implement the `INodeType` interface from `n8n-workflow`
- Each node requires a `description` property with metadata and a `execute` method for runtime logic
- Node files are registered in `package.json` under `n8n.nodes`
- Icons are provided as light/dark SVG pairs

### TypeScript Configuration
- Strict mode enabled with TypeScript target ES2019
- CommonJS module system
- Output to `dist/` directory
- Source maps and declarations generated

### Code Style
- Uses tabs (width 2) for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line structures
- Print width: 100 characters
- ESLint configuration imported from `@n8n/node-cli/eslint`

### Error Handling Pattern
- Wrap operations in try-catch blocks
- Use `NodeOperationError` for node-specific errors
- Support `continueOnFail()` mode for error recovery
- Include `itemIndex` in error context for debugging