const URL = 'https://profitablegoals-server.herokuapp.com/';
const APPLICATION_NAME = '/Profitablegoals';

export const environment = {
  production: true,
  customerAPIUrl: URL + APPLICATION_NAME + '/CustomerAPI',
  MyTeamAPIUrl: URL + APPLICATION_NAME + '/MyTeamAPI',
  ProviderAPIUrl: URL + APPLICATION_NAME + '/ProviderAPI',
  GetterAPIUrl: URL + APPLICATION_NAME + '/GetterAPI',
  NotificationAPIUrl: URL + APPLICATION_NAME + '/NotificationAPI',
  StaffAPIUrl: URL + APPLICATION_NAME + '/StaffAPI',
  StaffRequestAPIUrl: URL + APPLICATION_NAME + '/StaffRequestAPI',
  WithdrawAPIUrl: URL + APPLICATION_NAME + '/WithdrawAPI',
  OTPSystemAPIUrl: URL + APPLICATION_NAME + '/OTPSystemAPI'
};
