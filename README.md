# For Alicia — Valentine's Photo Gallery
https://tinyurl.com/yc5mckth

## Adding Music

1. **Put your audio files in the `audio/` folder.**  
   Use MP3 format (recommended) or WAV. Name them however you like (e.g. `song1.mp3`, `our-song.mp3`).

2. **Update the playlist in `music.js`**  
   Open `music.js` and find the `playlist` array at the top. Add your tracks like this:

   ```javascript
   const playlist = [
     { src: 'audio/song1.mp3', title: 'Song Title 1' },
     { src: 'audio/song2.mp3', title: 'Song Title 2' },
     { src: 'audio/our-song.mp3', title: 'Our Special Song' },
   ];
   ```

   - Change `src` to match your actual filename
   - Change `title` to whatever you want displayed

3. **The player**  
   A music player bar appears at the bottom of the page. Click the music icon to expand it. It includes:
   - Play/pause
   - Previous/next track
   - Shuffle mode
   - Current track name and time display

   The player is non-invasive—it stays collapsed at the bottom until you expand it.