import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
// eslint-disable-next-line @n8n/community-nodes/no-restricted-imports
import * as SentrySDK from '@sentry/node';

export class Sentry implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sentry',
		name: 'sentry',
		icon: { light: 'file:sentry.svg', dark: 'file:sentry.dark.svg' },
		group: ['transform'],
		version: 1,
		description: 'Send structured log messages to Sentry',
		defaults: {
			name: 'Sentry',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		properties: [
			{
				displayName: 'DSN',
				name: 'dsn',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://examplePublicKey@o0.ingest.sentry.io/0',
				description: 'Sentry Data Source Name (DSN) for your project',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'Log message',
				description: 'The log message to send to Sentry',
			},
			{
				displayName: 'Level',
				name: 'level',
				type: 'options',
				default: 'info',
				description: 'The severity level of the log message',
				options: [
					{
						name: 'Debug',
						value: 'debug',
					},
					{
						name: 'Error',
						value: 'error',
					},
					{
						name: 'Fatal',
						value: 'fatal',
					},
					{
						name: 'Info',
						value: 'info',
					},
					{
						name: 'Trace',
						value: 'trace',
					},
					{
						name: 'Warn',
						value: 'warn',
					},
				],
			},
			{
				displayName: 'Attributes',
				name: 'attributes',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Attribute',
				description: 'Additional key-value attributes to include with the log',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'attribute',
						displayName: 'Attribute',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								placeholder: 'userId',
								description: 'The attribute key',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								placeholder: '123',
								description: 'The attribute value',
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const dsn = this.getNodeParameter('dsn', itemIndex) as string;
				const message = this.getNodeParameter('message', itemIndex) as string;
				const level = this.getNodeParameter('level', itemIndex) as
					| 'trace'
					| 'debug'
					| 'info'
					| 'warn'
					| 'error'
					| 'fatal';
				const attributesCollection = this.getNodeParameter(
					'attributes',
					itemIndex,
					{},
				) as { attribute?: Array<{ key: string; value: string }> };

				// Initialize Sentry with the provided DSN
				SentrySDK.init({
					dsn,
					enableLogs: true,
				});

				// Build attributes object from the fixed collection
				const attributes: Record<string, string> = {};
				if (attributesCollection.attribute && Array.isArray(attributesCollection.attribute)) {
					for (const attr of attributesCollection.attribute) {
						if (attr.key) {
							attributes[attr.key] = attr.value;
						}
					}
				}

				// Send the log to Sentry using the appropriate level
				SentrySDK.logger[level](message, attributes);
        SentrySDK.flush();

				// Return the original item with additional Sentry response data
				returnData.push({
					json: {
						...items[itemIndex].json,
						sentryLog: {
							message,
							level,
							attributes,
							dsn,
							timestamp: new Date().toISOString(),
						},
					},
					pairedItem: itemIndex,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							...items[itemIndex].json,
							error: error.message,
						},
						error,
						pairedItem: itemIndex,
					});
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [returnData];
	}
}

