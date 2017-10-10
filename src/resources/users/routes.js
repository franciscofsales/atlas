/**
 * Imports
 */
import Joi from 'joi';

// Data schemas
import {UserSerializer} from './serializers';

// API endpoint handlers
import {UsersHandler} from './handlers';

export default [
    {
        path: '',
        method: 'GET',
        config: {
            handler: {async: UsersHandler.get},
            auth: {
                strategy: 'jwt',
                scope: 'admin'
            },
            description: 'Get users collection',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            response: {
                schema: {
                    items: Joi.array().items(UserSerializer.schema)
                }
            }
        }
    },
    {
        path: '/{userId}',
        method: 'GET',
        config: {
            handler: {async: UsersHandler.retrieve},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Get user',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                params: {
                    userId: Joi.string().required().description('the id for the user'),
                }
            }
        }
    },
    {
        path: '/{userId}',
        method: 'PATCH',
        config: {
            handler: {async: UsersHandler.patch},
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            description: 'Partial user update',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: {
                    userId: Joi.string().required().description('the id for the user'),
                },
                payload: {
                    notes: Joi.string(),
                    status: Joi.string().valid('inactive', 'active', 'pendingConfirmation')
                }
            }
        }
    },
];
