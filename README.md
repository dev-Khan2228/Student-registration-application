# Student registration form — EduVerse Academic Portal ⚡

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind / Cyber CSS](https://img.shields.io/badge/Style-Cyber--Glass%20%26%20Neon-00f0ff?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An ultra-modern, high-voltage college admission registration system and student portal built with **React, JavaScript, HTML5, and CSS3**. Features a blurry atmospheric college campus backdrop, cyber-glassmorphism, live status tracking, student authentication, registration editing, and comprehensive institutional policy disclosures.

---

## 🌟 Key Highlights & Features

### 1. 🎓 Student Registration Form (6-Phase Journey)
- **Phase 01 — Personal Profile**: Biometric fingerprint styling, portrait upload (< 5 MB) with instant preview, ID number, DOB, gender, blood group, category.
- **Phase 02 — Contact Telemetry**: Email, 10-digit mobile number, alternate phone, address, city, state, and 6-digit PIN code.
- **Phase 03 — Academic Records**: 10th & 12th school/college details, marks/CGPA, passing years, and competitive entrance exam details.
- **Phase 04 — Course & Discipline**: Application number, degree program, academic year (2026–27), admission route (Merit/Entrance), and AI/Data Science specialization.
- **Phase 05 — Guardian Network**: Father's & Mother's names, occupation, contact mobile, and annual family income bracket.
- **Phase 06 — Verified Protocol & Declarations**: Institutional compliance checkboxes with terms and conditions applied.

### 2. 🔐 Student Login Page
- Dedicated portal authentication screen with secure password masking.
- **One-Click Demo Sign In**: Instant 1-click test button to log in without manual typing.
- Switch between **New Registration** and **Student Login** from the top header navigation.

### 3. 📊 Student Portal & Status Dashboard
- **Prominent Admission Status**:
  $$\text{\textbf{Registration Status: Registration Successful}}$$
  Equipped with a pulsing emerald status beacon, verified badge, and 3-stage admission milestone pipeline:
  1. *Form Submitted* (Completed)
  2. *Documents Verified* (Confirmed)
  3. *Admission Allocated* (Active for 2026–27)
- **Edit Registration Details**: Logged-in students can click **"Edit Registration Details"** to modify personal, contact, academic, course, and parent information with real-time saving and validation.

### 4. 🏛️ Campus Backdrop & Professional Footer
- **Blurry College Campus Backdrop**: Atmospheric collegiate architectural imagery with ambient neon auroras and cyber-grid overlay.
- **Professional Institutional Footer on Every Page**:
  - **Accreditations**: NAAC 'A++' Accredited, AICTE & UGC Recognized, NIRF Top 50 Ranked.
  - **Policies & Compliance**: Terms & Conditions Applied, Student Privacy Policy, Anti-Ragging Mandatory Policy, Fee Refund Rules.
  - **Candidate Support**: Central Admissions Helpdesk, Grievance Redressal, and Helpline.

---

## 🚀 How to Run & Test

### Option A: Instant Browser Testing (Zero Setup Required)
Simply double-click [`preview.html`](./preview.html) or open it in any web browser (Chrome, Edge, Firefox, Safari). It runs 100% offline with full interactivity, theme switching, photo upload, login, and editing!

### Option B: Local Development Server (Vite)
Requirements: [Node.js 18+](https://nodejs.org/)

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📦 How to Post on GitHub (Step-by-Step Guide)

Follow these steps to upload this project to your GitHub account:

### 1. Initialize Git in the Project Directory
Open your terminal (PowerShell, Command Prompt, or Git Bash) inside this project folder:

```bash
# Initialize a new Git repository
git init

# Add all project files
git add .

# Create the initial commit
git commit -m "feat: initial commit - Student registration form with login, status & edit details"
```

### 2. Create a Repository on GitHub
1. Go to [GitHub](https://github.com/) and sign in.
2. Click the **`+`** icon at the top right and select **New repository**.
3. Name your repository (e.g., `student-registration-form` or `eduverse-portal`).
4. Set it to **Public** (recommended) or **Private**.
5. Leave "Initialize this repository with a README" **unchecked** (we already have one).
6. Click **Create repository**.

### 3. Link and Push to GitHub
Copy the commands shown on your GitHub repository page and run them:

```bash
# Rename branch to main
git branch -M main

# Link to your remote GitHub repository (replace with your actual GitHub URL)
git remote add origin https://github.com/YOUR-USERNAME/student-registration-form.git

# Push the code to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages (Optional 1-Click Live Demo)
To make your project accessible online as a live website:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select `main` branch and `/ (root)` folder.
4. Rename `preview.html` to `index.html` or set up GitHub Actions with `npm run build`.
5. Your project will be live at `https://YOUR-USERNAME.github.io/student-registration-form/`!

---

## 📂 Project Structure

```text
EduVerse-Final/
├── .gitignore              # Standard git exclusions (node_modules, dist, etc.)
├── index.html              # Vite entrypoint with Google Fonts preconnect
├── package.json            # React 18, Vite, Lucide React dependencies
├── preview.html            # Standalone, zero-dependency browser runnable file
├── README.md               # Complete documentation & GitHub guide
└── src/
    ├── main.jsx            # React components, auth, status dashboard & edit view
    └── styles.css          # Blurry campus backdrop, cyber-glass tokens & animations
```

---

## 🎓 Viva & Classroom Talking Points

- **React Architecture**: State-driven reactive rendering, multi-view routing (`register`, `login`, `portal`, `edit`) without heavy router dependencies.
- **State Management**: `useState` coordinates the multi-step form wizard, auth session, error tracking, and profile modification.
- **Local Persistence**: `useEffect` automatically serializes form progress, theme preferences, and authentication sessions to `localStorage`.
- **Validation Engine**: Regex checks for email syntax, numeric constraints on mobile numbers (10 digits) and PIN codes (6 digits).
- **Design System**: Frosted glassmorphism (`backdrop-filter: blur()`), responsive CSS Grid/Flexbox, and accessible color contrasts.

---

## 📄 License
This project is licensed under the MIT License — feel free to use it for academic and demonstration purposes.
