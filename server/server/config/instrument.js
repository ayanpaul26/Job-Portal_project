// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
// const Sentry = require("@sentry/node");
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"
Sentry.init({
  dsn: "https://dc1f810bc48ffec8256b3dab63f9da91@o4511484412821504.ingest.de.sentry.io/4511484426780752",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  integrations: [Sentry.mongooseIntegration()],
  sendDefaultPii: true,
  
});

// Sentry.init({
  
// });
// Sentry.init({
//   dsn: "",
// });

export default Sentry;