# Deploying MajestyDesigns

## The Short Version

The website is ready to go: everything lives in the `dist/` folder. There is no code to compile, no server, no database. Upload `dist/` to any static hosting service and you're live. The whole site is one HTML file and a folder of images and videos—nothing fancy.

## Cloudflare Pages (Recommended)

Cloudflare Pages is the best option for this portfolio: it's free, no commercial restrictions, no bandwidth caps on static files, and you get a free custom domain and SSL certificate.

**Steps:**

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create** → **Pages** → **Upload assets**
3. Drag and drop the `dist` folder
4. Click **Deploy**
5. Once deployed, go to **Custom domains** and add your domain (e.g., `yourname.com`)

This portfolio uses 244 files and the largest file is 2.0 MB. Cloudflare's free plan supports 20,000 files and allows files up to 25 MB each, so you're comfortably within the limits.

## Vercel Drop

[vercel.com/drop](https://vercel.com/drop) is the fastest way to get live in seconds: drag the `dist` folder (or a zip of it) onto the page, name your project, and click Deploy.

**Important:** Vercel's free Hobby plan is restricted to non-commercial personal use. Their policy explicitly includes "advertising the sale of a product or service" as commercial—and this portfolio says "Open for freelance work year-round," so technically it would need their Pro plan at $20/month per seat. For that reason, **Cloudflare Pages is the better choice** if you're actively seeking clients.

If you do use Vercel, note that every drag-and-drop deploy creates a *new* project. For updates, you'd either re-deploy (creating another project) or connect your Git repository for automatic deployments.

## Netlify Drop

[app.netlify.com/drop](https://app.netlify.com/drop) is another drag-and-drop option. Netlify's free plan includes a bandwidth allowance (from memory, 100 GB/month; check their pricing page for current limits).

Like Vercel, each new upload creates a new deployment, though you can connect a Git repository later for continuous updates.

## Custom Domain

All three services let you attach a custom domain for free—you only pay your domain registrar. A typical `.com` domain costs roughly $10–15/year (check at purchase, as prices vary).

## Updating Later

If you make changes to the site:

- **Cloudflare**: you can re-upload into the same project; the new files overwrite the old ones
- **Vercel and Netlify**: each drag-and-drop deploy creates a new project; to update the same project, connect a Git repository instead for automatic deployments on every push

## Viewing Offline

Open `dist/index.html` directly in your browser. Everything works with no internet connection except the Google Fonts, which will fall back to close system fonts on your machine.

## Bandwidth Reality Check

Here's what visitors will download:

- **First paint**: approximately 0.56 MB
- **Full page read**: roughly 2.9 MB
- **Entire page plus all video reels**: about 7 MB

These numbers are modest by modern standards and well within any free hosting plan's allowance.

## Troubleshooting

**Images are blank after deploying**  
The `assets` folder did not travel with `index.html`. They must sit side by side: `dist/index.html` and `dist/assets/`. Check that your upload included both.

**Fonts look wrong offline**  
Expected. The Google Fonts require a network connection. When offline, the browser falls back to system fonts, which won't be the same. The live site will display correctly.

**I made changes to `src/` but they're not showing**  
The `dist/index.html` file is generated. Run `./build.sh` in the project root to rebuild it, then re-upload the new `dist/` folder.
