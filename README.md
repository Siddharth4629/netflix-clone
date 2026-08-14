# 🎬 Netflix Clone – College Project

An interactive, feature-rich **Netflix Clone** web application created for college submissions, project evaluations, and demonstrations. The project features both the authentic **Netflix Landing Page** and the complete **Netflix Streaming Platform Dashboard** with responsive carousels, hover preview cards, full-screen custom video player, search, user authentication (Sign In & Sign Up), and multi-profile watchlist management.

---

## 🌟 Key Features

### 1. User Authentication & Account Creation (Sign In / Sign Up)
- **Create New Account (Sign Up)**:
  - Full Name, Email, Password, and **Plan Selection** (Mobile ₹149, Basic ₹199, Standard ₹499, Premium 4K ₹649).
  - Automatically creates a new user account, sets up custom user profiles, and logs in immediately.
- **Sign In (Login)**:
  - Enter email and password to log in.
  - **Quick Demo Fill Button**: One-click demo login button for hassle-free presentation during viva examinations.
- **Sign Out (Logout)**:
  - Clicking **"Sign Out of Netflix"** in the profile menu logs out the active session and switches seamlessly to the Netflix Landing Page.

### 2. Multi-Profile Management
- **Switch Profiles**: Click on your avatar in the top right to switch between profiles (e.g. Siddharth, College Buddy, Kids).
- **Add New Profile**: Type a profile name, pick from a selection of colorful Netflix avatars, and toggle "Kids Profile" mode.
- **Delete / Manage Profiles**: Delete unwanted profiles with instant synchronization to `localStorage`.
- Each profile maintains its own distinct **My List** and **Continue Watching** progress!

### 3. Dual View Experience
- **Netflix Landing Page**: Authentic hero header, email membership CTA, feature presentation cards (Watch on TV, Download offline, Watch everywhere, Kids profiles), and an interactive **Frequently Asked Questions (FAQ)** accordion.
- **Streaming Dashboard**: Full cinematic streaming interface with billboard hero banner, category carousels, and search filters.

### 4. Billboard Hero Section
- Auto-playing trailer video with sound mute/unmute toggle.
- Stylized title typography, maturity rating (`16+`), 4K Ultra HD & 5.1 Spatial Audio tags.
- **Play Button** (launches custom video player) and **More Info Button** (opens detailed modal).

### 5. Dynamic Content Rows & Carousels
- **Top 10 in Your Country Today**: Giant numbered rank badges (#1 to #10) with backdrop art.
- **Netflix Originals**: Tall portrait cards with the signature red 'N' corner badge.
- **Continue Watching for Current Profile**: Displays live playback progress bars with remaining time.
- **Trending Now, Action & Thrillers, Sci-Fi & Fantasy, Comedies, and Top Rated**.
- **Smooth Horizontal Carousel Navigation**: Left and right chevron slider controls with smooth scrolling.

### 6. Interactive Hover Preview Cards
- Hovering on any title pops up an animated preview card after a smooth delay.
- Plays a video snippet with quick action buttons:
  - ▶ **Play**: Instantly starts the movie in the video player.
  - ➕ / ✔ **My List**: Adds or removes title from the user's watchlist.
  - 👍 **Like**: Records user rating.
  - ⌵ **More Info**: Expands the full details modal.

### 7. Title Details Modal
- Full cinematic backdrop/video header.
- Detailed synopsis, cast members, genre tags, director/creator, match percentage.
- **Episode Selector** (for TV Shows): Interactive episodes list with thumbnails, durations, and play buttons.
- **"More Like This" Recommendations Grid**: Real-time matching algorithm displaying related movies.

### 8. Full-Screen Custom Video Player
- Custom Netflix-themed video playback UI:
  - Play / Pause (click screen or spacebar)
  - Custom timeline scrubber with hover timestamp tooltip
  - Rewind 10s and Fast-Forward 10s buttons
  - Volume slider and Mute toggle
  - Current time and total duration display (`mm:ss` / `hh:mm:ss`)
  - Playback Speed selector (`0.75x`, `1x`, `1.25x`, `1.5x`, `2x`)
  - Full-screen mode toggle
  - Automatic control overlay fade-out on mouse inactivity
  - Keyboard shortcuts (`Space`, `Left`/`Right` arrows, `M`, `F`, `Escape`)

### 9. Instant Live Search & Navigation Filters
- Search instantly by movie title, genre, director, or cast member.
- Category filters: **Home**, **TV Shows**, **Movies**, **New & Popular**, **My List**.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5 (`header`, `main`, `section`, `nav`, `video`) |
| **Styling** | Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid, Glassmorphism, Animations) |
| **Typography** | Google Fonts (`Inter`, `Outfit`, `Bebas Neue`) |
| **Logic & State** | Vanilla JavaScript (ES6+ Modules, Event Delegation, DOM APIs) |
| **Persistence** | HTML5 `localStorage` API |
| **Media Streams** | HTML5 Video Element & Cloud Video Buckets |

---

## 🚀 How to Run the Project

### Method 1: Direct Double Click (No Setup Required!)
Simply open `index.html` in any web browser (Chrome, Edge, Firefox, Safari).

### Method 2: VS Code Live Server
1. Open the `NETFLIX CLONE` folder in **VS Code**.
2. Right click `index.html` and click **"Open with Live Server"**.

### Method 3: Python Local Server
Run in terminal:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

## 📦 Deployment & CI

This repository includes GitHub Actions workflows:

- **CI**: validates `index.html` with `html-validator` on push and pull requests.
- **Deploy**: publishes the site to GitHub Pages automatically when changes are pushed to `main`.

Once the deploy workflow runs, the live site will be available at:

https://Siddharth4629.github.io/netflix-clone/

