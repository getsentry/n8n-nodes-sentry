# Changelog

## 1.0.0

### Added

- Initial release of the Sentry n8n community node
- Send structured log messages to Sentry using the official `@sentry/node` SDK
- Support for all Sentry log levels: Trace, Debug, Info, Warn, Error, and Fatal
- Configurable DSN (Data Source Name) parameter for Sentry project integration
- Custom message field for log content
- Dynamic key-value attributes using fixedCollection for flexible log metadata
- Automatic log flushing to ensure delivery to Sentry
- Full error handling with n8n's `continueOnFail()` support
- Data passthrough that enriches input items with Sentry log metadata
- Light and dark mode Sentry icons

### Technical Details

- Built with TypeScript following n8n node development standards
- Uses `@sentry/node` v10.21.0 for reliable Sentry integration
- Implements n8n's `INodeType` interface with strict typing
- Follows n8n error handling patterns with `NodeOperationError`
- Compatible with n8n workflow automation platform

