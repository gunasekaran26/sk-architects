SK ARCHITECTS & INTERIORS — STATIC WEBSITE STARTER

Files:
- index.html: Home
- about.html: About
- services.html: Services
- residential.html: Residential interiors
- portfolio.html: Portfolio with category filters and WhatsApp image enquiries
- consultation.html: Consultation form
- contact.html: Contact and enquiry form
- faq.html: FAQ
- assets/css/style.css: responsive styles
- assets/js/main.js: navigation, filters, WhatsApp image enquiries, homepage carousel, FAQ and form guard

IMPORTANT BEFORE LAUNCH
1. Replace the demo WhatsApp number 919000000000 in assets/js/main.js and the WhatsApp links in all HTML pages with the studio’s real WhatsApp number (country code + number, digits only in the wa.me URL). Also replace the phone number links.
2. Replace placeholder contact details and confirm the address/map pin.
3. Replace illustrative Unsplash stock images with client-approved project photos before representing them as the studio's own work.
4. In consultation.html and contact.html, replace REPLACE_WITH_CLIENT_EMAIL in both data-recipient and the FormSubmit action with the client's actual email address. FormSubmit may require a first-time verification email. Test delivery before launch.
5. This version does not include customer uploads or an admin panel. Portfolio updates are manual.
6. This is a static website; the forms use a third-party form/email service and require internet access. Review the provider's terms and privacy implications.
7. Test all pages, links, email delivery, phone/WhatsApp numbers, keyboard navigation and mobile layouts before publishing.
8. The homepage currently has a video placeholder because the studio has not supplied a video yet. Once received, replace the video-placeholder block in index.html with an approved YouTube embed or an HTML5 video element and hosted MP4.
9. The homepage selected-project images form an auto-advancing carousel with previous/next controls. Project cards across the homepage, portfolio and residential page open WhatsApp with a category-specific pre-filled enquiry.
10. The copy is demo content and should be approved by the client before launch.

To preview:
Open index.html in a browser. Some browsers may restrict features when opening local files; a local static server or hosting preview is recommended.


SLIDER UPDATE (v2): The homepage project carousel now shows two cards at a time on desktop/tablet and one card at a time on mobile, so the next/previous controls and 5-second auto-advance visibly move through the three project cards. Hard-refresh the browser after replacing the files (Ctrl+F5).


HOMEPAGE CATEGORY SLIDESHOWS
Three independent slideshows appear on the same homepage:
1. Kitchen: assets/images/kitchen/kitchen-01.jpg, kitchen-02.jpg, kitchen-03.jpg
2. Bedroom: assets/images/bedroom/bedroom-01.jpg, bedroom-02.jpg, bedroom-03.jpg
3. Living Room: assets/images/living-room/living-room-01.jpg, living-room-02.jpg, living-room-03.jpg

Replace/add the client's images using these exact filenames. The current HTML references three slides per category. Each section has its own previous/next controls and auto-advances every 5 seconds. Clicking an image opens WhatsApp with the relevant category enquiry.
Replace the demo WhatsApp number 919000000000 in assets/js/main.js before deployment.


V4 SLIDESHOW DISPLAY FIX
Each category section displays ONE large image at a time. Images slide horizontally within their own Kitchen, Bedroom or Living Room section. Each section has independent Previous/Next controls and auto-advances every 5 seconds.

Add these image files using the exact names:
- assets/images/kitchen/kitchen-01.jpg, kitchen-02.jpg, kitchen-03.jpg
- assets/images/bedroom/bedroom-01.jpg, bedroom-02.jpg, bedroom-03.jpg
- assets/images/living-room/living-room-01.jpg, living-room-02.jpg, living-room-03.jpg

The ZIP contains empty image folders with README instructions, not the client's actual photos. Copy the actual image files into these folders using the exact names above. If a photo is missing, the page displays a placeholder instead of a broken-image icon.
Replace demo WhatsApp number 919000000000 in assets/js/main.js before publishing.


CENTRAL CONTACT NUMBER CONFIGURATION (V5)
All phone and WhatsApp numbers are maintained in ONE file:
assets/js/config.js

Before deployment, update only these values:
- phoneNumber: "+91XXXXXXXXXX" (include +91 for click-to-call)
- whatsappNumber: "91XXXXXXXXXX" (digits only, no + or spaces)

These values are reused automatically for:
- Call the studio link in the top bar on every page
- Phone link in the footer on every page
- WhatsApp link in the footer on every page
- Floating WhatsApp button on every page
- WhatsApp enquiry when a visitor clicks Kitchen, Bedroom or Living Room slideshow images

Do not edit phone numbers separately in HTML or main.js. Keep the config.js script included before main.js on every HTML page.


WHATSAPP PREFILLED MESSAGE URL UPDATE (V6)
Image enquiries now use the WhatsApp API endpoint:
https://api.whatsapp.com/send/?phone=NUMBER&text=ENCODED_MESSAGE&type=phone_number&app_absent=0
The phone number and message are still read from assets/js/config.js and the clicked image category.
