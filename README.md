# SILICONIX Silicone Sealant Website

Official website for **SILICONIX Silicone Sealants**, manufactured and distributed by **Royal Enterprises**, Pune, Maharashtra.

Built with a clean, minimal, premium industrial design matching the exact teal-and-orange brand palette.

---

## 🎨 Brand Color Theme

- **Deep Teal**: `#07565A`
- **Orange**: `#F47716`
- **White**: `#FFFFFF`
- **Light Grey**: `#F5F7F7`
- **Dark Text**: `#263536`

---

## 🏢 Business Identity & Contact Details

- **Business Name**: Royal Enterprises
- **Brand**: SILICONIX Silicone Sealants
- **Tagline**: SEAL STRONG. LAST LONG.
- **Main Headline**: "Seal Strong. Last Long."
- **Supporting Headline**: "Reliable silicone sealant solutions for windows, glass, aluminium, construction and industrial applications."
- **Works Address**: Chavan Industry, Shade No. 1, Opposite Vertaxis Futuretech Pvt. Ltd., Dhayari–Narhe Road, Dhayari, Pune – 411041, Maharashtra, India.
- **Phone**: `+91 95450 00176`
- **WhatsApp**: `https://wa.me/919545000176`

---

## 🔒 Admin Access & Security

- **Public View (`/`)**: Completely free of any admin links, settings icons, edit buttons, or dashboard widgets.
- **Admin Direct URL (`/admin`)**:
  - The website owner accesses the control panel directly via `/admin`.
  - Protected with **Firebase Authentication**. Unauthenticated visitors are automatically redirected to the secure Administrator Portal Login.
  - After successful sign-in, the admin dashboard unlocks full control over:
    - Business Contact Details (Phone, Address, WhatsApp message)
    - Customer & OEM Leads Inbox with CSV export
    - Product Management & Image Uploads
    - Headlines & Taglines
- **Security Rules**: Included [`firestore.rules`](./firestore.rules) and [`storage.rules`](./storage.rules) to protect backend operations.

---

## 🚀 Development & Build

```bash
# Start local dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```
