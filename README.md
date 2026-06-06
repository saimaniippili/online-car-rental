# 🏎️ Elite Fleet - Premium Online Car Rental

> **Live Deployment:** [Link to be added here]()

Welcome to **Elite Fleet**, a cutting-edge luxury car rental platform built with a high-end, premium user experience in mind. Experience the pinnacle of automotive engineering right from your browser with immersive 3D showrooms, seamless booking flows, and an editorial-style interface.

---

## 🛠️ Technologies Used

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Ant Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![Stripe](https://img.shields.io/badge/stripe-%23008CDD.svg?style=for-the-badge&logo=stripe&logoColor=white)

### Backend & Database
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

---

## ✨ Features

- **Immersive 3D Vehicle Showroom:** Built with React Three Fiber (`@react-three/fiber` & `@react-three/drei`), interact with fully 3D rendered premium vehicles (Jeep Gladiator, Porsches, etc.) directly on the homepage and login screens.
- **Cinematic Animations:** Powered by `framer-motion` for buttery smooth reveal animations, hover states, and premium editorial micro-interactions.
- **User Authentication:** Secure registration and login flows.
- **Automated Booking:** Seamlessly pick dates and reserve your dream car using secure payment gateways (Stripe integration).
- **Responsive Luxury Design:** A dark-mode, glassmorphism-heavy UI utilizing bespoke typography (`Syncopate`, `Outfit`, `Inter`) for a high-end brand feel.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI for the database
- Stripe Secret & Publishable keys

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saimaniippili/online-car-rental.git
   cd online-car-rental
   ```

2. Install Backend Dependencies:
   ```bash
   npm install
   ```

3. Install Frontend Dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Setup Environment Variables:
   Create a `.env` file in the root directory (or inject variables directly into the server) and add your MongoDB connection string and Stripe credentials.

5. Run the Application (Concurrent Mode):
   From the root folder, run:
   ```bash
   npm run dev
   ```
   *This will concurrently start the Express server and the React frontend.*

## 📝 License
This project is for demonstration and portfolio purposes. All rights to the 3D models and vehicle brands remain with their respective owners.
