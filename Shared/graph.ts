import { startDateTimeAsync, endDateTimeAsync } from './dateTimeFormat';
import { ClientSecretCredential, DefaultAzureCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import 'isomorphic-fetch';

let clientSecretCredential;
let appGraphClient;

function ensureGraphForAppOnlyAuth() {

  if (!clientSecretCredential) {
    clientSecretCredential = new DefaultAzureCredential();
  }

  if (!appGraphClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(
      clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    appGraphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}

async function createNewMeetingAsync(userId) {
  ensureGraphForAppOnlyAuth();
  let startTime = await startDateTimeAsync();
  let endTime = await endDateTimeAsync();
  const newMeeting = `/users/${userId}/calendar/events`;
  
  const event = {
  subject: 'Customer Service Meeting',
  start: {
      dateTime: startTime,
      timeZone: 'UTC'
  },
  end: {
      dateTime: endTime,
      timeZone: 'UTC'
  },
  attendees: [
  /*{
      emailAddress: {
        "address": 'acsusers@10xds.com',
        "name": 'Customer Service Agent'
      },
      type: 'required'
    },*/
    {
      emailAddress: {
        "address": 'da394a77.insite.co@au.teams.ms',
        "name": 'Customer Service Agent'
      },
      type: 'required'
    }
  ],
  isOnlineMeeting: true
  };
  
  const newEvent = await appGraphClient.api(newMeeting).post(event);    
  return newEvent;     
}

export default createNewMeetingAsync;
