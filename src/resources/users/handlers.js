/**
 * Imports
 */
import {User} from './models';
import {ErrorName} from '../../core/errors';
import {BadRequest} from '../../core/responses';
import {hasKeys, hasValue} from '../../core/utils';

/**
 * API handler for Users collection endpoint
 */
class UsersHandler {

    /**
     * Process GET request
     * Return the user's collection
     */
    static async get(request, reply) {
      return reply({items: await User.find()});
    }

    /**
     * Process GET request
     * Return the user's info
     */
    static async retrieve(request, reply) {
      return reply(await User.get(request.params.userId));
    }

    /**
     * Update user details
     */
    static async patch(request, reply) {
        let userId = request.params.userId;

        let user;
        let updatePayload = {};
        // Validate payload and make respective updates
        if (hasKeys(request.payload, ['status'], true)) {
          if (request.payload.status !== 'active' && request.payload.status !== 'pendingConfirmation' && request.payload.status !== 'disabled') {
              return reply(BadRequest.invalidParameters('payload', {status: ['This field is invalid']})).code(400);
          }
          updatePayload.status = request.payload.status;
        }
        if (hasKeys(request.payload, ['notes'], true)) {
          updatePayload.notes = request.payload.notes;
        }
        console.log(updatePayload);
        user = await User.updateDetails(userId, updatePayload);

        // Return
        return reply(user);
    }
}

/**
 * Exports
 */
export {UsersHandler};
