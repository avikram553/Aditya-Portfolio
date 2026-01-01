# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle scroll and hover animations using Framer Motion
- **Sticky Navigation**: Easy navigation with smooth scrolling to sections
- **Project Modal**: Click on projects to view detailed information
- **Contact Form**: Functional contact form with validation
- **Accessibility**: Semantic HTML, ARIA labels, and reduced motion support
- **SEO Optimized**: Proper meta tags and semantic structure

## 📋 Sections

1. **Hero**: Eye-catching introduction with call-to-action buttons
2. **About**: Personal introduction with profile section
3. **Experience**: Timeline of work history with detailed descriptions
4. **Skills**: Visual representation of technical skills with proficiency levels
5. **Projects**: Showcase of work with modal details
6. **Contact**: Contact form and direct contact information
7. **Footer**: Social links and additional information

## 🛠️ How to Customize Content

### 1. Personal Information

Edit `src/components/Hero.tsx`:
```typescript
// Change your name and role
<h1>Hi, I'm <span className="text-primary">Your Name</span></h1>
<p>Full Stack Developer crafting beautiful and functional digital experiences</p>
```

Edit `src/components/Navigation.tsx`:
```typescript
// Update site name
<motion.a href="#">Your Name</motion.a>
```

### 2. About Section

Edit `src/components/About.tsx`:
- Replace the emoji with your profile image
- Update the paragraphs with your bio

### 3. Experience

Edit `src/components/Experience.tsx`:
```typescript
const experiences = [
  {
    role: "Your Job Title",
    company: "Company Name",
    period: "Start Date - End Date",
    description: [
      "Achievement or responsibility 1",
      "Achievement or responsibility 2",
      // Add more as needed
    ],
  },
  // Add more experiences
];
```

### 4. Skills

Edit `src/components/Skills.tsx`:
```typescript
const skills = [
  { name: "Skill Name", level: 95 }, // level 0-100
  // Add more skills
];
```

### 5. Projects

Edit `src/components/Projects.tsx`:
```typescript
const projects = [
  {
    title: "Project Name",
    description: "Short description",
    image: "🔗", // Replace with emoji or later add image path
    tags: ["Tech1", "Tech2", "Tech3"],
    details: "Detailed project description for modal",
    github: "https://github.com/yourusername/project",
    demo: "https://project-demo.com",
  },
  // Add more projects
];
```

### 6. Contact Information

Edit `src/components/Contact.tsx`:
```typescript
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
  },
  // Update phone and location
];
```

### 7. Footer & Social Links

Edit `src/components/Footer.tsx`:
```typescript
const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  // Update with your social profiles
];
```

### 8. SEO & Meta Tags

Edit `index.html`:
```html
<title>Your Name - Your Role</title>
<meta name="description" content="Your custom description" />
<meta property="og:title" content="Your Name - Your Role" />
```

## 🎨 Customizing Design

### Colors

Edit `src/index.css` to change the color scheme:
```css
:root {
  --primary: 185 70% 45%;  /* Main accent color */
  --secondary: 185 45% 92%; /* Secondary color */
  /* Adjust other colors as needed */
}
```

### Fonts

To use custom fonts, add them to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Then update `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ['Your Font', 'sans-serif'],
    },
  },
}
```

## 🖼️ Adding Images

### Profile Picture
Replace the emoji in `src/components/About.tsx` with an image:
```tsx
<img 
  src="/path-to-your-image.jpg" 
  alt="Your Name"
  className="rounded-2xl w-full h-full object-cover"
/>
```

### Project Thumbnails
Replace emojis in `src/components/Projects.tsx`:
```tsx
<img 
  src="/path-to-project-image.jpg" 
  alt="Project Name"
  className="w-full h-full object-cover"
/>
```

Place images in the `public` folder or `src/assets` folder.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Netlify
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

### Lovable
Click the "Publish" button in the top right of the Lovable editor.

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Reduced motion support for users with motion sensitivity

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues, please open an issue on GitHub or contact via the form on the website.

---

**Note**: Remember to update all placeholder content (Your Name, your.email@example.com, etc.) with your actual information before deploying!
