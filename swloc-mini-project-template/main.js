/**
 * Make sure to import this using type="module", that is:
 *
 *    <script type="module" src="main.js"></script>
 */

/* Imports */
// NOTE! Because we're not using a bundler (e.g., webpack),
// all imports for libraries is through ./vendor and must include a .js file, e.g.,.
//
//   "./vendor/@fluent/bundle/index.js" instead of "@fluent/bundle"

import BlazingSlow from "./vendor/blazing-slow.js";
import BlazingSlowLocalization from "./vendor/blazing-slow-fluent.js";
import {negotiateLanguages} from "./vendor/@fluent/langneg/index.js";
import {FluentBundle, FluentResource} from "./vendor/@fluent/bundle/index.js";

import "./app.js";


// TODO: Setup Fluent and localisations
const RESOURCES = {
  "en-US": new FluentResource(`
  title = Chip Fiend`),
  "en-IE": new FluentResource(`
  title = Crisp Maniac`)
};

function* generateBundles(userLocales) {
  const currentLocales = negotiateLanguages(
    userLocales,
    ['en-US'],
    { defaultLocale: 'en-US' }
  );

  for (const locale of currentLocales) {
    const bundle = new FluentBundle(locale);
    bundle.addResource(RESOURCES[locale]);
    yield bundle;
  }
}

// TODO: setup BlazingSlowLocalization
let l10n = new BlazingSlowLocalization(generateBundles(navigator.languages));

// Similar to @fluent/react:
// https://github.com/projectfluent/fluent.js/wiki/React-Bindings#a-complete-example

BlazingSlow.renderLocalizedTemplate = function renderUsingFluent(
  messageId,
  bindings
) {
  // TODO: Use BlazingSlowLocalization to render the template based on the
  // message ID and bindings.
  throw new Error("not implemented!");
};

/* Render the webpage! */
BlazingSlow.render();
/* Clear the validation error AFTER render, so that it only displays once. */
delete BlazingSlow.context.validationError;
