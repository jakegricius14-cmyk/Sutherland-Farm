# Sutherland Farm website

A simple, fast website for Sutherland Farm: Siberian Hardneck garlic grown in Carstairs, Alberta.

Plain HTML, CSS and JavaScript. No framework and no build step, so it can be hosted for free (for example on GitHub Pages).

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `our-story.html` | Our Story |
| `the-garlic.html` | The Garlic |
| `how-to-order.html` | How to Order |

Every page ends with the 2027 waitlist form. Styles are in `css/style.css`, the menu and form code is in `js/main.js`, and photos are in `images/`.

## Common edits

- **Prices, text, phone number:** search the four `.html` files and change the words directly.
- **Facebook / Instagram links:** in the footer of each page, replace `href="#"` on the links marked `data-social`.
- **Colours:** at the top of `css/style.css` (`--cream`, `--ink`, `--kraft`).

## Connecting the waitlist to Google Sheets

The form sends each signup to a Google Form, which saves it in a Google Sheet automatically.

1. Make a Google Form with four short-answer questions: Name, Phone or email, Town, What would you like.
2. In the form's **Responses** tab, click **Link to Sheets** to create the sheet.
3. Click the three-dot menu, then **Get pre-filled link**, fill in every question with any text, and click **Get link**. The link contains `entry.123456789=` for each question.
4. Open `js/main.js`. Set `action` to the form address with `/viewform` changed to `/formResponse`, and put each `entry.` number next to the matching field.

Until this is done, the form still checks answers and shows the thank-you message, but nothing is saved.

## Testing

Open the site through a local web server, not by double-clicking the file:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000. Check it on a real phone too, including opening the link inside Facebook and Instagram.
