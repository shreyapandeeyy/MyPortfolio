# How to Run DeskFolio

This document outlines the steps to successfully run the DeskFolio project locally.

## Prerequisites

- Node.js (version 18 or higher)
- Yarn package manager

## Steps to Run

### 1. Install Dependencies
```bash
yarn install
```

### 2. Run Prebuild Scripts
This step is **critical** and must be done before starting the development server. The prebuild scripts generate required files that the application needs to run properly.

```bash
yarn build:prebuild
```

This command runs several scripts:
- `scripts/robots.js` - Generates robots.txt
- `scripts/rssBuilder.js` - Builds RSS feed
- `scripts/searchIndex.js` - Creates search index
- `scripts/preloadIcons.js` - Preloads desktop icons (generates `public/.index/desktopIcons.json`)
- `scripts/cacheShortcuts.js` - Caches shortcuts
- `yarn build:fs:public` - Generates file system JSON files

### 3. Start Development Server
```bash
yarn dev
```

## Access the Application

Once the development server is running, you can access the application at:

- **Local:** http://localhost:3000
- **Network:** http://192.168.189.1:3000

## Troubleshooting

### Common Issues

1. **Module not found: Can't resolve 'public/.index/desktopIcons.json'**
   - **Solution:** Run `yarn build:prebuild` before starting the dev server
   - This error occurs when the prebuild scripts haven't been executed

2. **Port 3000 already in use**
   - **Solution:** Kill any existing processes on port 3000 or use a different port
   - To kill processes: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`

3. **Dependencies not installed**
   - **Solution:** Run `yarn install` first

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn build:prebuild` - Run prebuild scripts (required before dev/build)
- `yarn test` - Run tests
- `yarn e2e` - Run end-to-end tests

## Notes

- The project is a desktop environment that runs entirely in the browser
- It includes various apps like BoxedWine, Browser, File Explorer, Terminal, and more
- The prebuild step is essential and must be run before starting the development server
