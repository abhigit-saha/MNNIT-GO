# 🏛️ College Hunt - Campus Treasure Adventure  
## 🚀 Overview  
**College Hunt** is an innovative gamified platform that transforms college campuses into interactive treasure hunt arenas. Designed initially for MNNIT Allahabad, it combines physical exploration with digital rewards through QR codes, real-time tracking, and vendor partnerships.

## ✨ Key Features  

### 🧭 Core Functionality  
✅ **QR-Code Checkpoints** - Scan hidden codes across campus to progress  
✅ **Live Leaderboard** - Real-time rankings with Redis-powered updates (<500ms)  
✅ **Zone Restrictions** - Map boundaries ensure players stay in hunt areas  
✅ **Multi-Hunt Modes** - Solo, Team, and Special Event configurations  

### 🎁 Reward System  
🛒 **Local Vendor Integration** - Digital coupons for nearby businesses  
🏆 **Automated Prize Distribution** - Instant rewards for top performers  
📈 **Sponsorship Dashboard** - Businesses can track campaign performance  

### 🚧 Future Enhancements  
🔜 **3D Campus Navigation** - Interactive virtual map of MNNIT  
🔜 **AR Puzzle Solving** - Augmented reality clue discovery  
🔜 **Alumni Mode** - Special hunts for former students  
🔜 **Achievement System** - Badges and collectibles  

## 🖥️ Tech Stack  
**Frontend**: React.js + Mapbox GL JS  
**Backend**: Node.js/Express  
**Database**: MongoDB (Primary), Redis (Caching)  
**Real-Time**: Socket.IO  
**Mobile**: PWA Capabilities  

## 🛠️ Installation  
```bash
# Clone the repository
git clone https://github.com/alwaysahustler/college-hunt.git

# Install dependencies
cd college-hunt
npm install

# Configure environment
cp .env.example .env
# Add your Google Maps API key and MongoDB URI

# Start development server
npm run dev
