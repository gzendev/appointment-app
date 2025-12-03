# 🏥 Appointment Manager

> A Full Stack application for managing medical appointments following the **HL7 FHIR ** standard with a modern React frontend and NestJS backend.

## 📋 Project Overview

App for scheduling medical appointments with FHIR compliance. Includes a responsive UI for managing patient-doctor appointments with real-time sync between frontend and backend.

**Key Technologies:**
- 🎨 **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Font Awesome
- 🔧 **Backend**: NestJS, TypeScript, Express.js
- 🐳 **Containerization**: Docker & Docker Compose
- 📊 **Data Standard**: HL7 FHIR

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Clone or navigate to the project
cd fhir-appointment-manager

# Start both frontend and backend
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# API: http://localhost:3001/appointments
```

### Option 2: Local Development

**Frontend:**
```bash
npm install
npm run dev
# Runs on http://localhost:3000
```

**Backend:**
```bash
cd backend
npm install
npm run start:dev
# Runs on http://localhost:3001
```

---

## 📚 Features

### 👥 Appointment Management
- ✅ **Create** new appointments with patient & practitioner info
- ✅ **Read** and display all appointments in dashboard
- ✅ **Update** existing appointments
- ✅ **Delete** appointments with confirmation
- ✅ **Sort** appointments by start time

### 🎨 User Interface
- Responsive design (mobile, tablet, desktop)
- Clean, professional interface with Tailwind CSS
- Real-time form validation
- Loading states and error handling
- Icon support (Font Awesome)
- Status badges with color coding

### 🔧 Backend API
- RESTful endpoints for CRUD operations
- CORS enabled for cross-origin requests
- In-memory data storage
- UUID generation for unique identifiers
- Proper HTTP status codes

### 📋 FHIR Compliance
- Follows HL7 FHIR R4 Appointment resource standard
- Proper participant structure
- Status enumeration matching FHIR spec
- ISO 8601 datetime format

---

## 🔌 API Endpoints

All endpoints are prefixed with `/appointments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/` | Retrieve all appointments |
| **POST** | `/` | Create new appointment |
| **PUT** | `/:id` | Update appointment by ID |
| **DELETE** | `/:id` | Delete appointment by ID |

### Request Example

```bash
curl -X POST http://localhost:3001/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Annual Physical",
    "start": "2025-12-03T10:00:00Z",
    "end": "2025-12-03T10:30:00Z",
    "patientName": "John Doe",
    "practitionerName": "Dr. Smith",
    "status": "booked"
  }'
```

---

## 📊 Data Model

### Appointment Schema

```typescript
{
  resourceType: 'Appointment',
  id: string,                    // UUID
  status: AppointmentStatus,     // FHIR status enum
  description: string,           // Reason for visit
  start: string,                 // ISO 8601 datetime
  end: string,                   // ISO 8601 datetime
  created?: string,              // Creation timestamp
  participant: [                 // FHIR participants
    {
      actor: { display: string },
      status: 'accepted' | 'declined' | 'tentative' | 'needs-action'
    }
  ]
}
```

### Supported Status Values

`proposed` | `pending` | `booked` | `arrived` | `fulfilled` | `cancelled` | `noshow` | `entered-in-error` | `checked-in` | `waitlist`

---

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

**Backend:**
```bash
npm run start:dev    # Development with watch mode
npm run build        # Compile TypeScript
npm run start:prod   # Start production server
npm run lint         # Run ESLint
```

---

## 🐳 Docker Deployment

### Build Images

```bash
# Build frontend image
docker build -f Dockerfile.frontend -t fhir-frontend:latest .

# Build backend image
docker build -f backend/Dockerfile -t fhir-backend:latest ./backend
```

### Run with Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services Included:**
- Frontend (port 3000)
- Backend (port 3001)
- Automatic health checks
- Network bridge for communication