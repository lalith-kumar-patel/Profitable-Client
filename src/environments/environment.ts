// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const HOSTNAME = 'localhost';
const PORT_NUMBER = 3333;
const APPLICATION_NAME = '/Profitablegoals';

export const environment = {
  production: false,
  customerAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/CustomerAPI',
  MyTeamAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/MyTeamAPI',
  ProviderAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/ProviderAPI',
  GetterAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/GetterAPI',
  NotificationAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/NotificationAPI',
  StaffAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/StaffAPI',
  StaffRequestAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/StaffRequestAPI',
  WithdrawAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/WithdrawAPI',
  OTPSystemAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/OTPSystemAPI'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
