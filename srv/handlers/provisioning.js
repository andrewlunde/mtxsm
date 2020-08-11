const cds = require('@sap/cds');

module.exports = (service) => {
  // event handler for returning the tenant specific application URL as a response to an onboarding request
  service.on('UPDATE', 'tenant', async (req, next) => {
    console.log('[INFO ][ON_UPDATE_TENANT] XXX_Starting Subscription for ' + req.data.subscribedSubdomain + '.');
    const res = await next();          // IMPORTANT: call default implementation which is doing the HDI container creation
    let c = cds.env.for('app');        // use cds config framework to read app specific config node
    //let appuri = typeof c.urlpart === "undefined" ? ' ' : c.urlpart;
    let appuri = "-dev-mtxsm-app.cfapps.us10.hana.ondemand.com";
    if (appuri === ' ') {
      console.log('[INFO ][ON_UPDATE_TENANT] XXX_Application URI for subscriptions is not configured.');
      return '';
    } else {
      let url = 'https://' + req.data.subscribedSubdomain + appuri;
      console.log('[INFO ][ON_UPDATE_TENANT] ' + 'XXX_Application URL is ' + url);
      return url;
    }
  });
}

