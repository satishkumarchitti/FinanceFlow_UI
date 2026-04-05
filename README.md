# Finance Dashboard

A comprehensive finance dashboard built with React that allows users to track and understand their financial activity. This project demonstrates modern frontend development practices with a focus on clean UI/UX, responsive design, and effective state management.

## 🚀 Features

### Core Requirements
- **Dashboard Overview**: Summary cards showing total balance, income, expenses, and transaction count with visualizations
- **Transactions Section**: Full CRUD operations with filtering, sorting, and search capabilities
- **Role-Based UI**: Three user roles (Viewer, Editor, Admin) with different permission levels
- **Insights Section**: Financial analytics including spending patterns and health tips
- **State Management**: Custom hooks for efficient state management
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### Optional Enhancements
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Data Persistence**: Local storage integration for theme preferences
- **Export Functionality**: CSV export for transaction data
- **Smooth Animations**: Fade-in effects and transitions for better UX

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **State Management**: Custom React Hooks

## 📁 Project Structure

```
finance-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── DashboardOverview.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── BalanceChart.jsx
│   │   │   └── SpendingChart.jsx
│   │   ├── Transactions/
│   │   │   ├── TransactionList.jsx
│   │   │   ├── TransactionFilters.jsx
│   │   │   └── TransactionForm.jsx
│   │   ├── Insights/
│   │   │   └── InsightsSection.jsx
│   │   └── Header/
│   │       └── Header.jsx
│   ├── hooks/
│   │   ├── useFinanceData.js
│   │   ├── useRoleBasedAccess.js
│   │   └── useTheme.js
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
```

The build files will be created in the `build` directory.

## 🎯 How to Use

### Dashboard Overview
- View financial summary cards with key metrics
- Analyze balance trends over time with interactive charts
- Understand spending breakdown by category

### Transactions Management
- **View**: Browse all transactions with detailed information
- **Filter**: Filter by category, type, or search terms
- **Sort**: Sort by date, amount, or description
- **Add/Edit/Delete**: Full CRUD operations (requires appropriate permissions)

### Role-Based Access Control
- **Viewer**: Can only view data and export
- **Editor**: Can view, add, and edit transactions
- **Admin**: Full access including delete operations

Switch between roles using the dropdown in the header to see how the UI adapts to different permission levels.

### Insights
- View highest spending category
- Track monthly expense comparisons
- Get personalized financial health tips
- Monitor average transaction values

### Dark Mode
- Toggle between light and dark themes
- Preference is saved to local storage
- Respects system color scheme preferences

## 🎨 Design Principles

### UI/UX
- **Clean Interface**: Minimal, distraction-free design
- **Consistent Styling**: Unified color scheme and typography
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: Semantic HTML and keyboard navigation
- **Visual Hierarchy**: Clear information architecture

### Code Quality
- **Component-Based Architecture**: Modular and reusable components
- **Custom Hooks**: Encapsulated business logic
- **Prop Drilling Prevention**: Effective state management
- **Error Handling**: Graceful handling of edge cases
- **Performance**: Optimized rendering with useMemo and useCallback

## 📊 Data Model

### Transaction Structure
```javascript
{
  id: number,
  date: string (YYYY-MM-DD),
  description: string,
  amount: number,
  category: string,
  type: 'income' | 'expense'
}
```

### Categories
- Salary, Food, Utilities, Transportation
- Entertainment, Health, Shopping, Education
- Freelance, Investment

## 🔧 Customization

### Adding New Categories
1. Update `categories` array in `src/data/mockData.js`
2. Add corresponding colors to chart components
3. Update form validation if needed

### Modifying Roles
1. Edit permissions in `src/hooks/useRoleBasedAccess.js`
2. Update role options in the Header component
3. Adjust UI elements based on new permissions

### Styling Changes
1. Modify Tailwind configuration in `tailwind.config.js`
2. Update custom CSS variables in `src/index.css`
3. Add new component-specific styles

## 🧪 Testing

The project includes basic testing setup with Create React App. To run tests:

```bash
npm test
```

## 🚀 Deployment

### Netlify
1. Run `npm run build`
2. Upload the `build` directory to Netlify
3. Set up continuous deployment from your repository

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy the application

### Static Hosting
1. Build the project with `npm run build`
2. Upload the `build` folder to any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes. Feel free to use it as a reference or starting point for your own projects.

## 🎯 Learning Outcomes

This project demonstrates proficiency in:

- **React Development**: Components, hooks, state management
- **Modern CSS**: Tailwind CSS, responsive design, dark mode
- **Data Visualization**: Chart integration and customization
- **User Experience**: Role-based UI, filtering, sorting
- **Code Organization**: Modular architecture, separation of concerns
- **Best Practices**: Error handling, performance optimization

## 📞 Support

If you have any questions or need clarification about any part of the code, please don't hesitate to reach out or review the inline comments throughout the codebase.

---

**Built with ❤️ using React and modern web technologies**
