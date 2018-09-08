import 'isomorphic-fetch';
import server from './server';

const PORT = process.env.SHOPIFY_APP_PORT || 3000;

// start the server on the given port
server.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
