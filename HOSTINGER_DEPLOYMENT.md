# Hostinger Deployment Checklist

1. Run `npm.cmd run build`.
2. Upload the contents of `dist` to the Hostinger `public_html` folder.
3. Confirm these files are present in `public_html`: `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `favicon.svg`, the `api` folder, and the `assets` folder.
4. Enable SSL in Hostinger and force HTTPS for the domain.
5. Make sure PHP is enabled for the hosting account. The feedback wall uses `public_html/api/feedback.php`, sends feedback email to Guru Kripa, and creates `public_html/api/feedback-data.json` automatically after the first review. This uses Hostinger's included hosting disk, not any separate paid database.
6. If feedback does not save after deployment, set write permission for the `public_html/api` folder from Hostinger File Manager.
7. If Gmail notifications do not arrive, check Hostinger email/PHP mail settings or spam. The website will still show feedback on the page.
8. Test these URLs after upload:
   - `https://gurukripaholiday.com/`
   - `https://gurukripaholiday.com/booking`
   - `https://gurukripaholiday.com/itinerary/heavenly-himachal`
   - `https://gurukripaholiday.com/sitemap.xml`
   - `https://gurukripaholiday.com/api/feedback.php`
9. Add `https://gurukripaholiday.com/sitemap.xml` in Google Search Console after the domain is live.

Do not upload `src`, `node_modules`, or project config files to `public_html` for the production website.
