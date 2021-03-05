import Client from 'shopify-buy';


// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'osha-testing-store.myshopify.com',
  storefrontAccessToken: 'e6e9218be0a866815ab3555e8e0175ec'
});

export { client };