import path from 'path';

export default {
    app: {
        host: '0.0.0.0',
        port: 8000,
        jwtKey: process.env.JWT_KEY || 'test_jwt_key',
        defaultCurrency: 'EUR'
    },
    database: {
        servers: [
            {
                host: process.env.DB_PORT_28015_TCP_ADDR || 'localhost',
                port: process.env.DB_PORT_28015_TCP_PORT || 28015
            }
        ],
        name: 'atlas'
    },
    logs: {
        folder: path.join(__dirname, '../logs/'),
        streams: [
            {
                level: 'debug',
                stream: process.stdout // log INFO and above to stdout
            }
        ]
    },
    uploads: {
        provider: 'atlas',
        folder: path.join(process.cwd(), 'uploads'),
        baseUrl: 'localhost:8000/uploads'
    },
    emails: {
        from: {
            name: 'dicci.eu',
            email: 'geral@dicci.eu'
        }
    },
    storefront: {
        label: 'nicistore.com',
        baseUrl: 'http://localhost:3000',
        defaultLocale: 'pt'
    },
    switchPayments: {
        enabled: false,
        baseUrl: 'https://api-test.switchpayments.com/v2',
        accountId: process.env.SWITCH_ACCOUNT_ID,
        privateKey: process.env.SWITCH_PRIVATE_KEY
    },
    stripe: {
        enabled: true,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    },
    mailgun: {
        domain: process.env.MAILGUN_DOMAIN,
        apiKey: process.env.MAILGUN_API_KEY
    }
}
