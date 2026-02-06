# For Alicia — Valentine's Photo Gallery

A Valentine's day–themed photo gallery website. Add your own photos and open `index.html` in a browser (or use a local server) to view it.

## Adding your photos

1. **Put image files in the `photos/` folder.**  
   Name them `1.jpg`, `2.jpg`, `3.jpg`, etc. (or use `.png` — just match the extensions in `index.html`).

2. **Update the gallery in `index.html`**  
   There are 6 placeholder items by default. For each photo you have, keep a block like this:

   ```html
   <div class="gallery-item">
     <img src="photos/1.jpg" alt="A moment together">
   </div>
   ```

   - Change `photos/1.jpg` to the correct filename for each image.
   - Remove any `<div class="gallery-item">...</div>` blocks you don’t need (e.g. if you only have 4 photos, delete the 5th and 6th).
   - To add more than 6 photos, copy a `gallery-item` block and set the `src` to the new file (e.g. `photos/7.jpg`).

3. **Run it**  
   Open `index.html` in your browser. For best results (especially with many/large images), use a local server, e.g.:

   ```bash
   npx serve .
   ```

   Then visit the URL it prints (usually `http://localhost:3000`).

## Features

- Hero section with “For Alicia” and a short tagline
- Responsive photo grid with hover effects
- Click any photo to open a lightbox (with previous/next and Escape to close)
- Valentine’s color palette and typography
- No build step — plain HTML, CSS, and JavaScript

Enjoy.
