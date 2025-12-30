# College Hunt - Campus Treasure Adventure  

## Overview  
**College Hunt** is an innovative gamified platform that transforms college campuses into interactive treasure hunt arenas. Designed initially for MNNIT Allahabad, it combines physical exploration with digital rewards through QR codes, real-time tracking, and vendor partnerships.

## Project Demo Video: https://www.youtube.com/watch?v=C4x8epOaMLo

## Key Features  

### Core Functionality  
**QR-Code Checkpoints** - Scan hidden codes across campus to progress  
**Live Leaderboard** - Real-time rankings with Redis and WebSockets powered updates (<500ms)  
**Zone Restrictions** - Map boundaries ensure players stay in hunt areas  
**Multi-Hunt Modes** - Solo, Team, and Special Event configurations: Room based team collaboration allows for your friends to partake in the hunt alongside you.
**Local Vendor Integration** - Digital coupons for nearby businesses. Secure Coupon generation mechanism using atomic Redis functions ensures that coupon generation is reliable.  
**Automated Prize Distribution** - Instant rewards for top performers  
**Sponsorship Dashboard** - Businesses can track campaign performance  

### Future Enhancements  
**3D Campus Navigation** - Interactive virtual map of MNNIT  
**AR Puzzle Solving** - Augmented reality clue discovery  
**Alumni Mode** - Special hunts for former students  
**Achievement System** - Badges and collectibles  

## Tech Stack  
**Frontend**: React.js + Mapbox GL JS  
**Backend**: Node.js/Express  
**Database**: MongoDB (Primary), Redis (Caching)  
**Real-Time**: Socket.IO    



## Installation  
```bash
# Clone the repository
git clone https://github.com/abhigit-saha/MNNIT-GO

# Install dependencies
cd college-hunt/backend
npm install
cd collegen-hunt/frontend
npm install

# Configure environment variables (rename .env.sample to .env and replace by your own variables)
# Add your Google Maps API key and MongoDB URI

# Start development server
cd ./backend/src
nodemon index.js
# And the localhost frontend
cd ./frontend/src
npm run dev
```

Note: In case of any redis installation issues, try switching to wsl/Linux
