# NomadLabz Website

Static website for NomadLabz - Deployable on Vercel

## Files Structure

```
.
├── Images/
│   ├── NomadLabz.png
│   └── NomadLabz.svg
├── about.html
├── contact.html
├── index.html
├── main.js
├── package.json
├── portfolio.html
├── services.html
├── solutions.html
├── style.css
└── vercel.json
```

## Deployment Instructions

### Step 1: Push to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `nomadlabz-website` (or any name you prefer)
   - Make it **Public** or **Private** (your choice)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. Push this code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit - Clean website files"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nomadlabz-website.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click **"Add New..."** → **"Project"**
4. Import your repository:
   - Find `nomadlabz-website` (or whatever you named it)
   - Click **"Import"**
5. Configure Project Settings:
   - **Framework Preset:** Select **"Other"**
   - **Root Directory:** Leave as **`./`** (root)
   - **Build Command:** Leave **EMPTY**
   - **Output Directory:** Leave **EMPTY**
   - **Install Command:** Leave **EMPTY**
6. Click **"Deploy"**
7. Wait 1-2 minutes for deployment
8. Your site will be live at: `https://nomadlabz-website.vercel.app` (or similar)

### Step 3: Verify Deployment

- Visit your deployment URL
- Check that `index.html` loads correctly
- Test navigation links

## Troubleshooting

If you see a 404 error:
1. Check Vercel dashboard → Settings → General → Root Directory is `/`
2. Check Build & Development Settings → Framework is "Other"
3. Check that all files are in the root directory (not in a subfolder)
4. Trigger a new deployment from the Deployments tab

