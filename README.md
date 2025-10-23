# @sentry/n8n-nodes-sentry

This is an n8n community node. It lets you send structured log messages to Sentry directly from your n8n workflows.

[Sentry](https://sentry.io/) is an application monitoring and error tracking platform that helps developers identify, diagnose, and fix issues in real-time.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

The package name is: `@sentry/n8n-nodes-sentry`

## Operations

This node supports sending structured log messages to Sentry with the following capabilities:

- **Send Log Messages**: Send custom log messages to your Sentry project
- **Multiple Severity Levels**: Choose from trace, debug, info, warn, error, or fatal levels
- **Custom Attributes**: Add key-value pairs for additional context and metadata
- **Data Passthrough**: Enriches input items with Sentry log metadata

## Credentials

This node does not use n8n credential authentication. Instead, you provide your Sentry DSN (Data Source Name) directly in the node configuration.

### Prerequisites

1. Create a Sentry account at [sentry.io](https://sentry.io/)
2. Create a new project in your Sentry organization
3. Obtain your project's DSN from the project settings

### Getting Your DSN

1. Go to **Settings** → **Projects** → **[Your Project]** → **Client Keys (DSN)**
2. Copy the DSN, which looks like: `https://examplePublicKey@o0.ingest.sentry.io/0`
3. Paste the DSN into the node's DSN field in your n8n workflow

## Compatibility

- **Minimum n8n version**: 1.0.0
- Built with `@sentry/node` v10.21.0
- Uses n8n API version 1
- Compatible with the latest n8n versions

## Usage

### Basic Example

1. Add the Sentry node to your workflow
2. Configure the DSN with your Sentry project's DSN
3. Set your log message and severity level
4. Optionally add custom attributes for context (e.g., userId, environment, etc.)

### Adding Custom Attributes

Custom attributes help you add context to your logs:

- Click "Add Attribute" to create key-value pairs
- Common examples: `userId`, `environment`, `requestId`, `workflow`, etc.
- Attributes are included with the log message in Sentry

### Error Handling

The node supports n8n's `continueOnFail` mode:
- When enabled, errors won't stop your workflow
- Error details are included in the output data

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Sentry Documentation](https://docs.sentry.io/)
* [Sentry Node.js SDK](https://docs.sentry.io/platforms/javascript/guides/node/)
* [GitHub Repository](https://github.com/getsentry/n8n-nodes-sentry)
