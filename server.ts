import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Serve robots.txt with text/plain
app.get('/robots.txt', (req, res) => {
  const robotsPath = path.resolve(__dirname, 'public/robots.txt');
  if (fs.existsSync(robotsPath)) {
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(robotsPath);
  } else {
    res.type('text/plain').send("User-agent: *\nAllow: /\nSitemap: https://thecoffeejournal.vercel.app/sitemap.xml\n");
  }
});

// Serve sitemap.xml with application/xml
app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(sitemapPath);
  } else {
    res.status(404).send('Sitemap not found');
  }
});

async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.use('*', (req, res) => {
      // Check if prerendered index exists
      const requestedPath = req.baseUrl || req.originalUrl.split('?')[0];
      const prerenderedFile = path.join(distPath, requestedPath, 'index.html');
      if (fs.existsSync(prerenderedFile)) {
        return res.sendFile(prerenderedFile);
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`☕ The Coffee Journal server running at http://localhost:${PORT}`);
  });
}

startServer();
