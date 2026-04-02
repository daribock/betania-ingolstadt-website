# Betania Ingolstadt Website 🏛️

![Betania Ingolstadt](https://img.shields.io/badge/Church-Betania%20Ingolstadt-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TinaCMS](https://img.shields.io/badge/TinaCMS-Headless%20CMS-blue?style=for-the-badge)

Modern, bilingual church website for Betania Ingolstadt built with Next.js,
TinaCMS, and Tailwind CSS. Features a fully manageable content system with
German, Romanian, and English language support.

## ✨ Features

### 🌐 **Multilingual Support**

- **German (Deutsch)** - Primary language
- **Romanian (Română)** - Secondary language
- **English (English)** - Additional locale
- Dynamic routing with `/de`, `/ro`, and `/en` prefixes
- Integrated translation system using `next-intl`

### 📝 **Content Management**

- **TinaCMS** - Visual editing with live preview
- **Markdown + JSON** content stored in Git
- **Block-based** page building system
- **Global settings** management per language

### 🎨 **Modern Design**

- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Responsive design** - Mobile-first approach
- **Orange branding** - Church identity colors

### 🏗️ **Page Types & Blocks**

- **Home** - Hero, services, events, call-to-action
- **About** - Church history and mission
- **Contact** - Location, contact form, and service times

### 📦 **Available Content Blocks**

- `Hero` - Main landing section with call-to-action buttons
- `PageHeader` - Page titles with background images
- `Services` - Church service times and descriptions
- `Events` - Upcoming church events integration
- `ContactForm` - Contact information and email form
- `LocationSection` - Address and map integration
- `CallToAction` - Action buttons and social links
- `Content` - Rich text and markdown content
- `Video` - Embedded video content

## TODO

- [ ] Add FAQ section
- [ ] Add online donation system
- [ ] Implement newsletter sign-up
- [ ] Add sermon archive
- [ ] Create ministry pages
- [ ] Add photo gallery

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (Active LTS)
- **npm**
- **Git** for version control
- **TinaCMS account** for content management

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/daribock/betania-ingolstadt-website.git
   cd betania-ingolstadt-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your TinaCMS credentials:

   ```env
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
   TINA_TOKEN=your_token
   NEXT_PUBLIC_TINA_BRANCH=main
   NEXT_PUBLIC_ENABLED_LOCALES=de,ro,en
   NEXT_PUBLIC_ENABLE_LOCALE_SWITCHER=true
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### 🌐 Local Development URLs

- **Website**: http://localhost:3000
- **German**: http://localhost:3000/de
- **Romanian**: http://localhost:3000/ro
- **English**: http://localhost:3000/en
- **CMS Admin**: http://localhost:3000/admin

## 🏗️ Project Structure

```
betania-ingolstadt-website/
├── app/                          # Next.js app directory
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx           # Layout with i18n
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   └── contact/             # Contact page
├── components/                   # React components
│   ├── blocks/                  # TinaCMS content blocks
│   │   ├── hero.tsx            # Hero section
│   │   ├── contact-form.tsx    # Contact form
│   │   ├── services.tsx        # Service times
│   │   └── ...                 # Other blocks
│   ├── layout/                 # Layout components
│   │   ├── nav/                # Navigation components
│   │   └── section.tsx         # Section wrapper
│   └── ui/                     # shadcn/ui components
├── content/                     # Content files
│   ├── global/                 # Global settings
│   │   ├── de/index.json       # German global data
│   │   ├── ro/index.json       # Romanian global data
│   │   └── en/index.json       # English global data
│   ├── pages/                  # Page content
│   │   ├── de/                 # German pages
│   │   ├── ro/                 # Romanian pages
│   │   └── en/                 # English pages
├── messages/                    # Translation files
│   ├── de.json                 # German translations
│   └── ro.json                 # Romanian translations
├── tina/                       # TinaCMS configuration
│   ├── config.tsx              # Main Tina config
│   ├── collection/             # Content schemas
│   └── __generated__/          # Generated types
└── public/                     # Static assets
```

## 🎯 Content Management

### Adding New Content Blocks

1. **Create the component** in `components/blocks/`
2. **Define the schema** with the TinaCMS template
3. **Add to blocks index** in `components/blocks/index.tsx`
4. **Register in the page collection** in `tina/collection/page.ts`
5. **Rebuild TinaCMS** with `npm run build:tina`

### Global Settings

Global settings are managed per language in:

- `content/global/de/index.json` - German settings
- `content/global/ro/index.json` - Romanian settings
- `content/global/en/index.json` - English settings

Includes:

- Header navigation
- Contact information
- Service times
- Social media links
- Footer content

### Translations

Add new translations in:

- `messages/de.json` - German translations
- `messages/ro.json` - Romanian translations

Use in components:

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('SectionName');
return <h1>{t('title')}</h1>;
```

## 🛠️ Development

### Build Commands

```bash
# Development server
npm run dev

# Build TinaCMS
npm run build:tina

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type checking
npm run lint:tsc
```

### Adding New Languages

1. **Add locale** to `i18n/routing.ts`
2. **Create translation file** in `i18n/locales/[locale].json`
3. **Add global settings** in `content/global/[locale]/index.json`
4. **Create page content** in `content/pages/[locale]/`

## 📚 Resources

### TinaCMS

- [Documentation](https://tina.io/docs/)
- [Discord Community](https://discord.gg/zumN63Ybpf)
- [GitHub](https://github.com/tinacms/tinacms)

### Next.js

- [Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### Internationalization

- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 📄 License

Licensed under the [Apache 2.0 license](./LICENSE).

---

**Built with ❤️ for Betania Ingolstadt Community**
