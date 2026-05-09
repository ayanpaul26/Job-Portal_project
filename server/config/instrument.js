// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
// const Sentry = require("@sentry/node");
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"
Sentry.init({
  dsn: "https://ad6757f676f70c88da28cfed07b130ca@o4511358191796224.ingest.us.sentry.io/4511358202347520",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  
});


Sentry.init({
  dsn: "",
});

export default Sentry;