# Zuba Broadband Data Usage Management - Deployment Guide

## 🚀 Project Overview

A complete Next.js application for managing client data usage with authentication, filtering, reporting, and data visualization capabilities.

## 📁 Project Structure

```
zuba-broadband-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── AuthProvider.jsx    # Authentication context
│   │   ├── Login.jsx          # Login page
│   │   ├── Signup.jsx         # Signup page
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── DataUsageChart.jsx # Chart components
│   │   ├── ClientsTable.jsx   # Data table
│   │   ├── UsageFilters.jsx   # Advanced filters
│   │   ├── SimpleDemo.jsx     # Demo with UI components
│   │   └── BasicTest.jsx      # Basic functionality test
│   ├── lib/
│   │   └── supabase.js        # Supabase configuration
│   ├── App.jsx               # Main app component
│   ├── App.css               # Tailwind CSS styles
│   └── main.jsx              # Entry point
├── database-schema.sql        # Supabase database schema
├── .env.local                # Environment variables (template)
└── package.json              # Dependencies
```

## 🛠 Features Implemented

### ✅ Authentication System
- User registration and login
- Protected routes
- Session management with Supabase Auth

### ✅ Dashboard & Data Management
- Client data usage tracking
- Monthly usage reports
- Real-time statistics display
- Interactive data tables

### ✅ Advanced Features
- **Filtering**: By client, date range, usage amount
- **Data Visualization**: Interactive charts with Recharts
- **Export**: CSV download functionality
- **Responsive Design**: Mobile and desktop compatible

### ✅ UI/UX
- Modern design with shadcn/ui components
- Professional color scheme (dark blue, orange accents)
- Loading states and error handling
- Intuitive navigation

## 🔧 Environment Setup

### 1. Install Dependencies
```bash
cd zuba-broadband-dashboard
pnpm install
```

### 2. Environment Variables
Create `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Setup
1. Create a new Supabase project at https://supabase.com
2. Run the SQL schema from `database-schema.sql` in your Supabase SQL editor
3. Enable Row Level Security (RLS) policies
4. Copy your project URL and anon key to `.env.local`

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables in Vercel**:
   - Go to your Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 2: Netlify
1. **Build the project**:
   ```bash
   pnpm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your Git repository
   - Set environment variables in Netlify dashboard

### Option 3: Manual Hosting
1. **Build for production**:
   ```bash
   pnpm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 🧪 Testing Locally

### Development Server
```bash
pnpm run dev --host
```
Access at: http://localhost:5173

### Available Routes
- `/` - Redirects to demo
- `/demo` - Demo with sample data
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - Main dashboard (requires authentication)
- `/test` - Basic functionality test

## 📊 Database Schema

The application uses the following main tables:

### `clients`
- Client information (name, email, contact details)

### `data_usage`
- Daily usage records for Kit 1 and Kit 2
- Linked to clients via foreign key
- Automatic total calculation

### Sample Data
The schema includes sample data for Bank of Kigali and other clients for testing.

## 🔐 Authentication Flow

1. **Registration**: Users can create accounts via `/signup`
2. **Login**: Authentication via `/login`
3. **Protected Routes**: Dashboard requires authentication
4. **Session Management**: Automatic session handling with Supabase

## 📈 Key Components

### Dashboard Features
- **Stats Cards**: Total clients, usage, monthly data
- **Interactive Charts**: Line and bar charts for usage trends
- **Data Table**: Sortable, filterable usage records
- **Export**: CSV download functionality

### Filtering System
- Client selection
- Date range filtering
- Usage amount filtering
- Real-time filter application

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Color Scheme**: Professional blue and orange theme

## 🔧 Customization

### Adding New Features
1. Create new components in `src/components/`
2. Add routes in `App.jsx`
3. Update database schema if needed
4. Test locally before deployment

### Modifying Styles
- Update `src/App.css` for global styles
- Modify component-specific styles inline
- Customize shadcn/ui theme in `components.json`

## 📝 Notes

- The application includes a demo mode with sample data
- Full functionality requires Supabase setup
- All components are responsive and mobile-friendly
- CSV export works with filtered data
- Charts automatically update based on data changes

## 🆘 Troubleshooting

### Common Issues
1. **Blank page**: Check environment variables
2. **Auth errors**: Verify Supabase configuration
3. **Build errors**: Ensure all dependencies are installed
4. **Chart not loading**: Check Recharts compatibility

### Support
- Check browser console for errors
- Verify Supabase connection
- Test with demo mode first
- Ensure environment variables are set correctly

