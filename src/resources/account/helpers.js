import fbgraph from 'fbgraph';
import gapi from 'googleapis';
import config from '../../config';

function checkClient(provider) {
  if ( ! config[provider].clientId ) {
    throw new Error(`${provider} authentication is not set up`);
  }
}

export async function AuthorizeSocial (provider, code) {
  checkClient();
  const { clientId, redirectUri, clientSecret } = config[provider];
  let func = null;

  return await new Promise((ful, rej) => {
    if(provider === 'facebook'){
      fbgraph.authorize({ clientId, redirectUri, clientSecret, code }, (e, v) => e ? rej(e) : ful(v));
    } else if (provider === 'google') {
      const oauth2Client = new gapi.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
      );
      oauth2Client.getToken(code, (e, v) => e ? rej(e) : ful(v));
    }
  });
}

export async function UserSocialData (provider, accessToken, refreshToken = null) {
  checkClient();
  const { clientId, redirectUri, clientSecret } = config[provider];

  if(provider === 'facebook'){
    fbgraph.setAccessToken(accessToken);
  } else if (provider === 'google'){
    const oauth2Client = new gapi.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );
    oauth2Client.setCredentials({
      accessToken,
      refreshToken
    });
  }

  return await new Promise((ful, rej) => {
    if(provider === 'facebook'){
      fbgraph.get('me?fields=picture,name,email', { accessToken }, (e, v) => e ? rej(e) : ful(v));
    } else if(provider === 'google'){
      const plus = gapi.plus('v1');
      plus.people.get({
        userId: 'me',
        auth: oauth2Client
      }, (e, v) => e ? rej(e) : ful(v) );
    }
  })
}
