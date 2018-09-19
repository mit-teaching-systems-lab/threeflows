import rollbar from 'rollbar-browser';


export function startRollbar() {
  const {hostname, protocol, port} = window.location;
  const portString = port === '' ? '' : `:${port}`;
  const environment = `${protocol}//${hostname}${portString}`;

  // Don't log if hosted locally
  if (hostname === 'localhost') return;
  window.Rollbar = rollbar.init({
    accessToken: "de42c0395e924afba679510bd16908a6",
    captureUncaught: true,
    captureUnhandledRejections: false,
    payload: {
      environment: environment
    }
  });
}