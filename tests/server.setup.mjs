export default async function setup() {
  process.env.PORT = '4399';
  const { server } = await import('../scripts/serve.mjs');
  if (!server.listening) {
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });
  }
  return async () => {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  };
}
