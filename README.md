# 🏛️ Sijilat Knowledge Hub (MOIC)

A professional, bilingual (English/Arabic), secure, and high-end knowledge management and support system built with a modern **Glassmorphism UI**. Designed for the Ministry of Industry and Commerce (MOIC) ecosystem to streamline technical support, document reports, track audit logs, and provide intelligent analytics.



---

## ✨ Features

- **Bilingual Support (i18n)**: Fully supports English (LTR) and Arabic (RTL) with dynamic language switching and persistent session storage.
- **Glassmorphism Design System**: Crafted with Tailwind CSS, custom backdrops (`Sol.png`), smooth responsive navigation, and custom typography.
- **Support System & Knowledge Base**: Smart search with weighted sorting, category filtering, file attachments (Images/PDFs), and full CRUD operations.
- **Reports Module**: Independent reporting ecosystem mirroring the support architecture for logging daily operations, incidents, and performance metrics.
- **Admin Dashboard & Analytics**: Exclusive administrative interface providing live metrics, total count cards, category distribution, and real-time activity charts.
- **Audit Logging**: Comprehensive tracking of all create, update, and delete actions with timestamps.
- **Secure Authentication**: Session-based admin authentication protected via environment variables.

---

## 🛠️ Tech Stack

- **Back-End**: Node.js, Express.js
- **Database**: SQLite (`sqlite3`)
- **Template Engine**: Embedded JavaScript (EJS)
- **Styling**: Tailwind CSS, FontAwesome 6
- **Localization**: `i18n`
- **Session & Uploads**: `express-session`, `multer`

---

## 🚀 Getting Started & Installation

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
- Node.js (v16 or higher recommended)
- Git

### 1. Clone the Repository
```bash
git clone [https://github.com/AliAbdulla2002/Sijilat-knowledge-system](https://github.com/AliAbdulla2002/Sijilat-knowledge-system)
cd Sijilat-knowledge-system
```


### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a file named .env in the root directory (you can copy .env.example as a template):

```bash
cp .env.example .env
```
Open the .env file and fill in your credentials:

```bash
PORT=3000
ADMIN_USER=admin
ADMIN_PASS=your_secure_password
SESSION_SECRET=your_generated_random_secret_key
```

### 3. Configure Environment Variables
For development (using node directly):

```bash
node server.js
```

The application will be running at http://localhost:3000.


## 📂 Project Structure:

Sijilat_Hub_V2/
├── database/         # SQLite database initialization & files
├── locales/          # Localization JSON files (ar.json, en.json)
├── public/           # Static assets (images, uploads, etc.)
├── routes/           # Express route handlers (admin, support, reports)
├── utils/            # Helper scripts and dictionaries
├── views/            # EJS templates and partials
├── .env.example      # Example environment variables template
├── .gitignore        # Git ignore rules
├── package.json      # Project dependencies and scripts
└── server.js         # Main application entry point


## 🛡️ Security Best Practices


* The .env file and database files are ignored by default via .gitignore to protect sensitive credentials and local data.

* Ensure you use a strong ADMIN_PASS and a secure SESSION_SECRET in production environments.

# 👨‍💻 Author
## Ali Saleh Abdulla

Software Engineer & UX/UI Designer Specializing in Information Systems

