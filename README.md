# Dental Management System

A comprehensive React-based dental practice management application with role-based authentication, patient management, appointment scheduling, and administrative features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Usage Guide](#usage-guide)
- [Mobile Features](#mobile-features)
- [File Handling](#file-handling)
- [Bonus Features](#bonus-features)
- [Known Issues](#known-issues)

## Features

### Authentication System
- **Role-based Access Control**: Admin (Dentist) and Patient roles
- **Hardcoded Login System**: Simulated authentication with email/password
- **Session Management**: localStorage-based session persistence
- **Role-based Navigation**: Different interfaces for Admin and Patient users

### Admin Features

#### Patient Management
- **View All Patients**: Complete patient list with search functionality
- **Add New Patient**: Comprehensive patient registration form
  - Personal details (name, DOB, contact, address)
  - Medical information (blood type, allergies, medical history)
  - Emergency contact information
- **Edit Patient**: Inline editing with real-time updates
- **Delete Patient**: Remove patients with confirmation
- **Search & Filter**: Real-time patient search functionality

#### Appointment Management
- **Create Appointments**: Schedule new appointments with detailed information
- **View All Appointments**: Complete appointment list with status tracking
- **Edit Appointments**: Update appointment details and status
- **Delete Appointments**: Remove appointments with confirmation
- **File Upload and Preview**: Support for images and PDFs and patients can view this attachments
- **Advanced File Upload System**: Support for images and PDFs with mobile-optimized handling
- **Appointment Status Tracking**: Pending, Scheduled, Completed, Cancelled
- **Treatment Records**: Post-appointment treatment details, costs, and follow-up dates

#### Calendar Integration
- **Monthly Calendar View**: Visual appointment scheduling
- **Weekly Calendar View**: Detailed weekly appointment overview
- **Click-to-View**: Interactive calendar with appointment details
- **Real-time Updates**: Calendar syncs with appointment changes

#### Dashboard Analytics
- **Key Performance Indicators (KPIs)**:
  - Next 10 upcoming appointments
  - Top patients by appointment count
  - Pending vs completed treatments
  - Revenue summaries
  
### Patient Features
- **Personal Profile**: View personal information
- **Appointment History**: Complete treatment history with details
- **Appointments**: View appointments
- **Treatment Records**: Access to treatment details, costs, and medical files
- **File Downloads**: Download uploaded medical documents and invoices

## Tech Stack

- **Frontend Framework**: React 18+ (Functional Components)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: Custom CSS with modern design patterns
- **Styling**: Custom CSS with modern design patterns and mobile-first responsive design
- **Icons**: React Icons (Feather Icons, Font Awesome)
- **Build Tool**: Vite
- **Data Storage**: localStorage (No backend required)
- **File Handling**: Blob URLs (URL.createObjectURL) for file previews (no backend, files not persisted after reload)
- **File Handling**: Blob URLs with mobile-optimized preview and download functionality

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mandeep21474/Dental_management.git
   cd Dental_management
   ```

2. **Install dependencies**
   ```bash
   npm install  
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Default Login Credentials

#### Admin Access
- **Email**: `admin@entnt.in`
- **Password**: `admin123`

#### Patient Access (Multiple accounts available)
- **Email**: `john@entnt.in`, `jane@entnt.in`, `michael@entnt.in`, etc.
- **Password**: `patient123`

## Folder Structure

```
dental_management/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Appointmentcard.jsx      # Individual appointment display
│   │   ├── Appointmentcard.jsx      # Individual appointment display with mobile file handling
│   │   ├── Appointments.css         # Appointment page styles
│   │   ├── Appointments.css         # Appointment page styles with mobile responsiveness
│   │   ├── Appointments.jsx         # Main appointments management
│   │   ├── Authentication.css       # Login page styles
│   │   ├── Authentication.jsx       # Login/authentication component
│   │   ├── Calendar.css             # Calendar page styles
│   │   ├── Calendar.jsx             # Calendar view component
│   │   ├── Dashboard.css            # Dashboard styles
│   │   ├── Dashboard.jsx            # Main dashboard with KPIs
│   │   ├── Patientcard.jsx          # Individual patient card
│   │   ├── Patients.css             # Patients page styles
│   │   ├── Patients.jsx             # Patient management
│   │   ├── Profile.css              # Profile page styles
│   │   ├── Profile.css              # Profile page styles with mobile file handling
│   │   ├── Profile.jsx              # Patient profile view
│   │   ├── Profile.jsx              # Patient profile view with mobile optimization
│   │   └── TopPatient.jsx           # Top patient statistics
│   ├── contextapi/
│   │   └── context.jsx              # Authentication context
│   ├── utils/
│   │   ├── mockdata.js              # Initial data and mock records
│   │   └── storage.js               # localStorage operations
│   ├── App.jsx                      # Main app component
│   ├── index.css                    # Global styles
│   └── main.jsx                     # App entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
└── README.md                        # This file
```

## Usage Guide

### For Administrators

1. **Login** with admin credentials
2. **Dashboard**: View KPIs and quick statistics
3. **Patients**: Manage patient records, add/edit/delete patients
4. **Appointments**: Schedule and manage appointments with file uploads
4. **Appointments**: Schedule and manage appointments with enhanced file uploads
5. **Calendar**: Visual appointment scheduling and management

### For Patients

1. **Login** with patient credentials
2. **Profile**: View personal information and medical history
3. **Appointment History**: Access treatment records and medical files

### Key Features Usage

#### File Upload System
- Supported formats: Images (JPG, PNG, GIF, BMP, WEBP) and PDFs
- Uses Blob URLs for instant preview of uploaded files (images and PDFs)
- Files are not persisted after reload; previews are only available in the current session
- Download capability for uploaded files (while session is active)

#### Enhanced File Upload System
- **Supported formats**: Images (JPG, PNG, GIF, BMP, WEBP) and PDFs
- **Mobile-optimized handling**: Automatic detection of mobile devices
- **Smart preview system**: 
  - Desktop: Full file previews (PDFs in iframe, images as thumbnails)
  - Mobile: Download buttons instead of previews for better UX
- **Responsive design**: File sections adapt to screen size without overflow
- **Download capability**: Easy file downloads on all devices

#### Search and Filter
- Real-time search in patient lists
- Filter appointments by status
- Quick navigation between sections

## Mobile Features

### Responsive Design
- **Mobile-first approach**: Optimized for smartphones and tablets
- **Touch-friendly interface**: Large touch targets and intuitive gestures
- **Adaptive layouts**: Components automatically adjust to screen size
- **No horizontal scrolling**: All content fits within viewport

### Mobile-Specific Enhancements
- **Smart file handling**: Download buttons on mobile instead of previews
- **Optimized forms**: Mobile-friendly input fields and buttons
- **Responsive navigation**: Collapsible menus and touch-optimized controls

### Device Detection
- **Automatic mobile detection**: Uses user agent detection for optimal experience
- **Platform-specific optimizations**: Different handling for iOS, Android, and desktop
- **Cross-browser compatibility**: Works consistently across all modern browsers

## File Handling

### Desktop Experience
- **Full file previews**: PDFs display in iframe, images show as thumbnails
- **Real-time upload**: Instant preview of uploaded files
- **Multiple file upload**: Select and upload multiple files simultaneously

### Mobile Experience
- **Download-focused**: Clear download buttons instead of previews
- **Touch-optimized**: Large, easy-to-tap download buttons
- **File type indicators**: Clear indication of file types


### Technical Implementation
- **Blob URL system**: Uses `URL.createObjectURL()` for file previews
- **Session-based storage**: Files persist during current session
- **Memory management**: Proper cleanup of blob URLs
- **Error handling**: Graceful fallbacks for unsupported file types

## Bonus Features

### Enhanced UI/UX
- **Modern Design**: Clean, professional interface with dental-themed color scheme
- **Smooth Animations**: CSS transitions and hover effects
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Interactive Elements**: Hover states, loading indicators, and visual feedback

### Advanced Functionality
- **File Type Validation**: Comprehensive file upload validation with error handling
- **Search & Filter**: Real-time search across patient lists and appointments
- **Data Persistence**: Robust localStorage implementation with data integrity
- **Error Handling**: Graceful error handling and user feedback
- **Loading States**: Visual feedback during data operations

### User Experience Improvements
- **Intuitive Navigation**: Clear navigation structure with role-based access
- **Quick Actions**: Streamlined workflows for common tasks
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile Optimization**: Seamless experience across all devices

## Known Issues

### Current Limitations
1. **File Previews**: Uploaded file previews are only available during the current session; reloading the page will remove access to previews.
2. **File Size Limits**: Large files may cause performance issues due to Base64 encoding
3. **Browser Storage**: localStorage has size limitations (typically 5-10MB)

  
### Future Improvements
- Implement proper backend with database
- Add real authentication system
- Implement cloud file storage
- Add real-time notifications
- Enhance mobile responsiveness
- Add data export/import functionality

## Contributing

This is a demonstration project. For production use, consider:
- Adding proper backend integration
- Implementing real authentication
- Adding data validation and sanitization
- Implementing proper error handling
- Adding unit and integration tests

## License

This project is created for educational and demonstration purposes.

---

**Note**: This application is designed as a frontend-only demonstration. For production deployment, additional backend services, database integration, and security measures would be required.


