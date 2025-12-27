# 🚀 Complete Step-by-Step Deployment Guide

## ✅ What We've Done
- Created a clean directory: `D:\Nomad-Labs\NomadLabz-Website-Clean`
- Copied all your website files (no WordPress files)
- Initialized a fresh Git repository
- Created proper configuration files

## 📋 Step-by-Step Instructions

### STEP 1: Create GitHub Repository

1. **Open your browser** and go to: https://github.com/new

2. **Fill in the form:**
   - **Repository name:** `nomadlabz-website` (or any name you like)
   - **Description:** (optional) "NomadLabz Company Website"
   - **Visibility:** Choose **Public** or **Private**
   - ⚠️ **IMPORTANT:** Do NOT check any of these:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - Click **"Create repository"**

3. **Copy the repository URL** (you'll see it on the next page)
   - It will look like: `https://github.com/YOUR_USERNAME/nomadlabz-website.git`

---

### STEP 2: Push Code to GitHub

1. **Open PowerShell or Command Prompt**

2. **Navigate to the clean directory:**
   ```bash
   cd D:\Nomad-Labs\NomadLabz-Website-Clean
   ```

3. **Make initial commit:**
   ```bash
   git commit -m "Initial commit - Clean website files"
   ```

4. **Rename branch to main:**
   ```bash
   git branch -M main
   ```

5. **Add your GitHub repository as remote:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nomadlabz-website.git
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

6. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

7. **Enter your GitHub credentials** when prompted

---

### STEP 3: Deploy to Vercel

1. **Go to Vercel:**
   - Open: https://vercel.com
   - Click **"Sign Up"** or **"Log In"**
   - **Sign in with GitHub** (use the same GitHub account)

2. **Create New Project:**
   - Click **"Add New..."** button (top right)
   - Click **"Project"**

3. **Import Repository:**
   - You'll see a list of your GitHub repositories
   - Find **`nomadlabz-website`** (or whatever you named it)
   - Click **"Import"** next to it

4. **Configure Project Settings:**
   
   **IMPORTANT - Follow these settings exactly:**
   
   - **Framework Preset:** 
     - Click the dropdown
     - Select **"Other"** (at the bottom of the list)
   
   - **Root Directory:**
     - Leave as **`./`** (this means root directory)
     - **DO NOT** change this
   
   - **Build Command:**
     - **LEAVE EMPTY** (delete anything that's there)
   
   - **Output Directory:**
     - **LEAVE EMPTY** (delete anything that's there)
   
   - **Install Command:**
     - **LEAVE EMPTY** (delete anything that's there)

5. **Deploy:**
   - Click the big **"Deploy"** button
   - Wait 1-2 minutes
   - You'll see a progress bar

6. **Get Your Live URL:**
   - Once deployment completes, you'll see:
     - ✅ "Congratulations! Your project has been deployed"
   - Your site URL will be shown (e.g., `https://nomadlabz-website.vercel.app`)
   - Click **"Visit"** to open your live site!

---

### STEP 4: Verify Everything Works

1. **Visit your site URL** (from step 3.6)
2. **Check the homepage** loads correctly
3. **Test navigation:**
   - Click "About" → should go to `/about`
   - Click "Services" → should go to `/services`
   - Click "Contact" → should go to `/contact`
   - etc.

---

## 🎉 Success!

Your website is now live! 

### Future Updates:
- Make changes to files in `D:\Nomad-Labs\NomadLabz-Website-Clean`
- Run these commands:
  ```bash
  cd D:\Nomad-Labs\NomadLabz-Website-Clean
  git add .
  git commit -m "Update website"
  git push
  ```
- Vercel will **automatically redeploy** your site!

---

## ❌ Troubleshooting

### If you see 404 error:

1. **Check Vercel Dashboard:**
   - Go to your project → **Settings** → **General**
   - Verify **Root Directory** is `/` or empty
   
2. **Check Build Settings:**
   - Go to **Settings** → **Build & Development Settings**
   - Framework Preset should be **"Other"**
   - All build commands should be **EMPTY**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click the **"..."** menu on latest deployment
   - Click **"Redeploy"**

### If GitHub push fails:

- Make sure you've created the repository first
- Check the repository URL is correct
- Make sure you're signed into GitHub

### If Vercel can't find your repo:

- Make sure you signed in with the same GitHub account
- Check the repository is Public (or you've given Vercel access)

---

## 📞 Need Help?

If you get stuck at any step, let me know which step and what error message you see!

