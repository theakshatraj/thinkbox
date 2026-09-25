<div align="center">

# Thinkbox

### AI-Powered Personal Cloud Storage

A modern personal cloud storage platform that helps you **upload, organize, search, manage, and understand your files with AI.**


## Overview

**Thinkbox** is a personal cloud storage application built around a simple idea:

> **Your files shouldn't just be stored — they should be understood.**

Thinkbox combines traditional cloud storage capabilities with an AI-powered processing layer that analyzes uploaded files and generates useful metadata such as:

* AI-generated summaries
* Tags
* File categories
* AI processing status
* Extracted file content

The goal is to make your files easier to **find, understand, and manage** without requiring users to manually organize everything.

---

## ✨ Features

### 🔐 Authentication

Secure user authentication powered by Appwrite.

* User registration
* Login
* Logout
* OTP-based authentication
* Session management

### 📁 File Management

Manage your personal files from a centralized dashboard.

* Upload files
* View files
* Rename files
* Delete files
* Download files
* Open files
* Organize files by type

Supported categories include:

* 📄 Documents
* 🖼️ Images
* 🎥 Videos
* 🎵 Audio
* 📦 Other files

### 🤖 AI File Understanding

Thinkbox automatically processes uploaded files through an AI pipeline.

The AI layer can generate:

* **Summary**
* **Tags**
* **Category**
* **Extracted content**
* **Processing status**

Files move through an AI processing lifecycle such as:

```text
Pending
   ↓
Processing
   ↓
Completed
```

This creates the foundation for smarter search and organization.

### 🔎 Global Search

Search across your files using:

* File names
* File metadata
* AI-generated information

### ↕️ Sorting

Sort files using different criteria:

* Newest
* Oldest
* Name A → Z
* Name Z → A
* Largest
* Smallest

### 📤 File Sharing

Share files with other users and manage access to shared files.

### 📊 Dashboard

The dashboard provides an overview of your storage.

It includes:

* Total storage usage
* Storage breakdown by file type
* Recent files
* File statistics

### 📱 Responsive UI

Thinkbox is designed to work across:

* Desktop
* Tablet
* Mobile

The interface focuses on a clean and minimal file-management experience.

---

## 🧠 AI Architecture

Thinkbox separates **file storage** from **AI processing**.

```text
                 ┌─────────────────┐
                 │   User Upload   │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Appwrite Storage│
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ File Metadata   │
                 │   Database      │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ AI Processing   │
                 │     Layer       │
                 └────────┬────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
          Extraction   Analysis    Metadata
              │           │           │
              └───────────┼───────────┘
                          ▼
                 ┌─────────────────┐
                 │ AI Metadata     │
                 │                 │
                 │ • Summary       │
                 │ • Tags          │
                 │ • Category      │
                 └─────────────────┘
```

### Storage vs Database

Thinkbox maintains two different identifiers for an uploaded file:

```text
Storage File ID
      │
      └── Appwrite Storage
          └── Actual uploaded file

Database Document ID
      │
      └── Appwrite Database
          └── File metadata + AI information
```

Keeping these IDs separate allows the AI processing layer to correctly retrieve the original file from Appwrite Storage while updating the corresponding database document.

---

## 🛠️ Tech Stack

| Technology       | Purpose                            |
| ---------------- | ---------------------------------- |
| **Next.js 15**   | Full-stack React framework         |
| **React 19**     | User interface                     |
| **TypeScript**   | Type-safe development              |
| **Appwrite**     | Authentication, database & storage |
| **Tailwind CSS** | Styling                            |
| **shadcn/ui**    | UI components                      |
| **OpenAI**       | AI-powered file understanding      |
| **pdf-parse**    | PDF content extraction             |
| **Mammoth**      | DOCX content extraction            |
| **Turbopack**    | Development bundler                |

---

## 🚀 Getting Started

Follow these steps to run Thinkbox locally.

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [Git](https://git-scm.com/)
* An [Appwrite](https://appwrite.io/) project
* An OpenAI API key

---

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd thinkbox
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure Appwrite

Create an Appwrite project and configure:

* Authentication
* Database
* Files collection
* Users collection
* Storage bucket

Make sure your storage bucket allows the permissions required by your application.

---

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT=""
NEXT_PUBLIC_APPWRITE_DATABASE=""
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=""
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=""
NEXT_PUBLIC_APPWRITE_BUCKET=""
NEXT_APPWRITE_KEY=""

OPENAI_API_KEY=""
```

Replace the empty values with your project credentials.

> **Important:** Never commit `.env.local` or expose your Appwrite API key and OpenAI API key publicly.

---

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🗄️ Appwrite Database

The `files` collection stores metadata associated with uploaded files.

A typical file document contains information such as:

```text
File
├── name
├── type
├── size
├── extension
├── bucketFileId
├── owner
├── users
├── path
├── aiStatus
├── aiSummary
├── aiTags
└── aiCategory
```

### Important ID distinction

The project uses two different IDs:

| ID             | Used for                                           |
| -------------- | -------------------------------------------------- |
| `bucketFileId` | Identifies the actual file inside Appwrite Storage |
| `$id`          | Identifies the database document                   |

The AI processing pipeline uses the **storage file ID** to retrieve the uploaded file and the **database document ID** to update its AI metadata.

---

## 🤖 AI Processing Flow

When a user uploads a file:

```text
User uploads file
        │
        ▼
Appwrite Storage
        │
        ├── Storage File ID
        │
        ▼
Create database document
        │
        ├── Database Document ID
        │
        ▼
AI Processing
        │
        ├── Retrieve file
        ├── Extract content
        ├── Analyze content
        └── Generate metadata
        │
        ▼
Update database document
        │
        ├── Summary
        ├── Tags
        ├── Category
        └── AI Status
```

This processing happens separately from the normal file upload flow.

---

## 📂 Supported File Types

Thinkbox currently categorizes files into:

### Documents

```text
PDF
DOC
DOCX
TXT
XLS
XLSX
CSV
RTF
ODS
PPT
PPTX
MD
HTML
EPUB
```

### Images

```text
JPG
JPEG
PNG
GIF
BMP
SVG
WEBP
```

### Video

```text
MP4
AVI
MOV
MKV
WEBM
```

### Audio

```text
MP3
WAV
OGG
FLAC
```

Additional formats can be added through the file-type utilities.

---

## 🔒 Security

Thinkbox uses Appwrite for authentication, database access, and file storage.

Keep the following values private:

```env
NEXT_APPWRITE_KEY
OPENAI_API_KEY
```

Do not commit environment files containing secrets:

```text
.env
.env.local
.env.production
```

Add them to `.gitignore` if they aren't already present.

---

## 🧪 Development

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## 🗺️ Roadmap

Thinkbox is being developed toward a more intelligent personal file-management platform.

Potential future improvements include:

* [ ] Semantic AI search
* [ ] Natural-language file search
* [ ] Improved document understanding
* [ ] AI-powered file recommendations
* [ ] Automatic folder organization
* [ ] Duplicate file detection
* [ ] Advanced sharing controls
* [ ] File version history
* [ ] Background job processing
* [ ] More file format support
* [ ] AI-powered chat with files

---

## 🎯 Project Goals

Thinkbox aims to move beyond traditional cloud storage.

Instead of:

```text
Upload → Store → Search manually
```

The goal is:

```text
Upload
   ↓
Understand
   ↓
Organize
   ↓
Search intelligently
   ↓
Find what you need
```

---

<div align="center">

### Thinkbox

**Store less manually. Understand more automatically.**

Built with ❤️ using Next.js, Appwrite and AI.

</div>
