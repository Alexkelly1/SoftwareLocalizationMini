import BlazingSlow from "./vendor/blazing-slow.js";
import GraphemeSplitter from "./vendor/grapheme-splitter.js";

/* == Constants == */

const root = document.documentElement;

// Color selections for "favorite color" feature.
const COLORS = {
  blue: "#1565c0",
  red: "#c62828",
  green: "#2e7d32",
  purple: "#7b1fa2",
};

/* == Functions == */

/**
 * Sanitize a given name/surname before putting it in the database.
 */
function sanitizeName(name) {
  // TODO: sanitize name before inserting into the database.
  return name;
}

/**
 * Get the first letter from the user's given name.
 */
function getFirstLetter(name) {
  // TODO: return the "first character" from BlazingSlow.context.givenName.
  return "E";
}

/* == Framework setup == */

// The app crashes if this context variable isn't defined, so define it right now:
if (BlazingSlow.context.userIsLoggedIn == null) {
  BlazingSlow.context.userIsLoggedIn = false;
}

// Setup favorite color:
setAccentColor(BlazingSlow.context.favoriteColor ?? "purple");

// Setup login/register
BlazingSlow.functions.setupLogin = (loginForm) => {
  loginForm.addEventListener("submit", (event) => {
    // Don't actually submit anything: 🙃
    event.preventDefault();

    // Act as if we're ACTUALLY submitting something to the form.
    const email = loginForm.elements.namedItem("email").value;
    const password = loginForm.elements.namedItem("password").value;

    if (
      email !== BlazingSlow.context.email ||
      password !== BlazingSlow.context.password
    ) {
      BlazingSlow.context.validationError = "bad-login";
      BlazingSlow.context.userIsLoggedIn = false;
      window.location.reload();
      return;
    }

    BlazingSlow.context.userIsLoggedIn = true;
    window.location = loginForm.action;
  });
};

BlazingSlow.functions.setupLogoutButton = (button) => {
  button.addEventListener("click", (_event) => {
    BlazingSlow.context.userIsLoggedIn = false;
    // Go to the home page as if we've logged out.
    window.location = "/";
  });
};

BlazingSlow.functions.setupRegister = (registerForm) => {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = registerForm.elements.namedItem("email").value;
    const givenName = registerForm.elements.namedItem("given").value;
    const surname = registerForm.elements.namedItem("surname").value;
    const password = registerForm.elements.namedItem("password").value;
    const confirmPassword =
      registerForm.elements.namedItem("confirm-password").value;

    if (password !== confirmPassword) {
      BlazingSlow.context.userIsLoggedIn = false;
      BlazingSlow.context.validationError = "password-mismatch";
      window.location.reload();
      return;
    }

    BlazingSlow.context.email = email;
    BlazingSlow.context.givenName = sanitizeName(givenName);
    BlazingSlow.context.surname = sanitizeName(surname);
    BlazingSlow.context.password = password;

    BlazingSlow.context.userIsLoggedIn = true;

    window.location = registerForm.action;
  });
};

// Setup settings page
BlazingSlow.functions.setupChangeName = (form) => {
  // Initial setup:
  const givenNameElement = form.elements.namedItem("given");
  givenNameElement.value = BlazingSlow.context.givenName;
  const surnameElement = form.elements.namedItem("surname");
  surnameElement.value = BlazingSlow.context.surname;

  // Setup form submission:
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    BlazingSlow.context.givenName = sanitizeName(givenNameElement.value);
    BlazingSlow.context.surname = sanitizeName(surnameElement.value);

    window.location = form.action;
  });
};

BlazingSlow.functions.setupFavoriteColor = (form) => {
  // Make sure the form is showing the user's chosen favorite color.
  const favoriteColor = BlazingSlow.context.favoriteColor ?? "purple";
  const buttonCollection = form.elements.namedItem("color");
  buttonCollection.value = favoriteColor;

  form.addEventListener("change", (_event) => {
    const color = form.elements.namedItem("color").value;
    BlazingSlow.context.favoriteColor = color;
    setAccentColor(color);
  });
};

BlazingSlow.functions.setupMonogram = (element) => {
  element.innerText = getFirstLetter(BlazingSlow.context.givenName);
};

/**
 * Set the page's accent color based on the given color ID (a key from the
 * COLORS object).
 */
function setAccentColor(colorId) {
  const actualColor = COLORS[colorId];
  root.style.setProperty("--accent-color", actualColor);
}
