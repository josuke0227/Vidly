import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://cfeff1f865854ab1a2886736f5367f11@o421001.ingest.sentry.io/5561825",
    release: "my-project-name@" + process.env.npm_package_version,
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
