# Software Localisation mini-project

Task: Localise this small, web application.

# Getting started

## Start a development server.

You **must** use an HTTP server. If you have Python 3
installed, you can use the following to start an HTTP server in
the current directory:

    python3 -m http.server

or:

    python -m http.server

You can also use an npm package like [sirv][].

## Modifying files

You **must** edit the following files:

 - `index.html`
 - `settings.html`
 - `login.html`
 - `main.js`
 - `app.js`

You SHOULD avoid modifying the files in `vendor/`!

## Tasks

**TIP**: find all within the project for `TODO` to find remaining tasks!

 - Setup Fluent
 - Modify the HTML files to use `data-i18n` instead of `data-template`
 - Add `data-i18n` where appropriate.
 - Create 3 localisations:
    - two distinct English localisations
    - one non-English localisation
 - Finish the `sanitizeName()` in `app.js`
 - Finish the `getFirstLetter()` in `app.js`


# Libraries

All libraries are included in `vendor/`. You do **not** need to install
any additional libraries.

 - [Project Fluent][fluent]
    - [@fluent/bundle][]
    - [@fluent/langneg][]
    - [@fluent/sequence][]
 - [grapheme-splitter][]
 - Blazing Slow (see below)
 - blazing-slow-fluent (see below)

Access all of these from JavaScript using **relative import** syntax:

```js
import { FluentResource, FluentBundle } from "./@fluent/bundle/index.js";
import { negotiateLanguages } from "./@fluent/langneg/index.js";

import GraphemeSplitter from "./vendor/grapheme-splitter.js";

import BlazingSlow from "./vendor/blazing-slow.js";
import BlazingSlowLocalization from "./vendor/blazing-slow-fluent.js";
```

# Submission

Create a zip file containing all files required to run your application.
That is, it should include all the files in this archive (including the
files in `vendor/`, plus any
additional files you may want to include. Note that no additional files
are required for an acceptable submission---it should be possible to
just modify the files included in this zip archive.

# The Blazing Slow web framework

To avoid needing to use a build system or needing to learn an existing
web framework, a drastically simplified web framework has been provided
called Blazing Slow.

Blazing Slow uses [data attributes][] to modify the HTML page upon
calling `BlazingSlow.render()`.

The main relevant features of Blazing Slow are:

## data-template

Interprets the [inner text][innerText] as a template, and replaces it,
substituting variables using `{$thisSyntax}` (identical syntax to
Project Fluent).

Syntax:

```html
<p data-template>
    This is a template that can do {$variable} substitution.
</p>
```

Variables are substituted first from **props** (see below) or **context
variables** (see below)

**A correct submission will have replaced all instances of
`data-template` with `data-i18n`**

## data-i18n="message-id"

Replaces the [inner text][innerText] with the message obtained through
the localisation system (that is, Fluent). The message-id is used to
query the localisation system.

Syntax:

```html
<p data-i18n="example">
    This text will be replaced by the `example = ...` message
    registered by Fluent.
</p>
```

Like `data-template`, variables are substituted first from **props**
(see below) or **context variables** (see below).

## data-prop-<name>="value"

Define a “prop” (property) for this `data-template` or `data-i18n`
element.

Syntax:

```html
<p data-template data-prop=name="Sam">
    Hello, {$name}!
    This will be replaced with "Hello, Sam!"
</p>
```


## BlazingSlow.context

Context variables are global variables that persist, even if you refresh
or navigate away from the current page.

Context variables are accessible in JavaScript by using
`BlazingSlow.context.<name>` where `<name>` is the name of the context
variable.

Context variables are available in templates (both `data-template` and
`data-i18n`) via their name (no need for `BlazingSlow.contex.`), unless
overridden by props (see above).

### Global variables used in `app.js`

   - `givenName` -- (String) the user's given name, cleaned by `sanitizeName()`
   - `surname` -- (String) the user's surname, cleaned by `sanitizeName()`
   - `email` -- (String) the user's email
   - `password` -- (String) the user's password. This is stored in
     plain-text, and not hashed in anyway. **Do not do this in
     production!**
   - `userIsLoggedIn` -- (Boolean) whether the user is logged in or not
   - `favoriteColor` -- (String) the *key* of the user's favourite colour
   - `validationError` -- (String) key of a validation error. The keys
     are:
      - `'bad-login'` user entered their email or password incorrectly
      - `'password-mismatch'` user entered different passwords in the
        "confirm password" field


## blazing-slow-fluent

Allows you to connect Project Fluent to the Blazing Slow web framework.
It replicates the API of [@fluent/react], for better or for worse.

Usage:

```js
import BlazingSlowLocalization from "./vendor/blazing-slow-fluent.js";

// Create a generator that yields localization bundles appropriate for the user.
function* generateBundles() {
  let fluentBundle = ...;
  yield bundle;
}

// Instantiate:
const l10n = new BlazingSlowLocalization(generateBundles());

// Use in your app:
BlazingSlow.renderLocalizedTemplate = function(messageId, bindings) {
   return l10n.render(messageId, bindings);
};
```

[fluent]: https://projectfluent.org/
[grapheme-splitter]: https://www.npmjs.com/package/grapheme-splitter
[sirv]: https://github.com/lukeed/sirv/tree/master/packages/sirv-cli
[data attributes]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
[innerText]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
[@fluent/bundle]: https://projectfluent.org/fluent.js/bundle/
[@fluent/langneg]: https://projectfluent.org/fluent.js/langneg/
[@fluent/sequence]: https://projectfluent.org/fluent.js/sequence/
[@fluent/react]: https://projectfluent.org/fluent.js/react/
