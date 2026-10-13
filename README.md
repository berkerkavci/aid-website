# AID Project Solutions — Web Sitesi

[aidprojectsolutions.framer.website](https://aidprojectsolutions.framer.website/) adresindeki Framer sitesinin
**Next.js** ile yeniden yazılmış, Vercel'e hazır sürümü. Renkler, tipografi, boşluklar ve animasyonlar
orijinal siteden ölçülerek birebir aktarıldı.

## Teknolojiler

| Alan         | Seçim                                                              |
| ------------ | ------------------------------------------------------------------ |
| Framework    | Next.js 16 (App Router, React Server Components, statik üretim)    |
| Dil          | TypeScript (strict)                                                |
| Stil         | Tailwind CSS v4 — tasarım token'ları `src/app/globals.css` içinde  |
| Animasyon    | Motion (`motion/react`) + saf CSS animasyonları                    |
| Blog         | MDX (`@next/mdx`) — her yazı `src/content/blog/` altında bir dosya |
| İkonlar      | Phosphor Icons (orijinal sitedekiyle aynı set)                     |
| Form         | Server Action + Zod doğrulama + Resend (e-posta)                   |
| Kod kalitesi | ESLint (Next.js kuralları), Prettier (+ Tailwind sınıf sıralama)   |

## Gereksinimler

- **Node.js 24 LTS** — Windows'ta: `winget install OpenJS.NodeJS.LTS`

## Komutlar

```bash
npm install          # bağımlılıkları kur
npm run dev          # geliştirme sunucusu → http://localhost:3000
npm run build        # production build
npm run start        # build'i yerelde çalıştır
npm run check        # typecheck + lint + format kontrolü (commit öncesi)
npm run format       # tüm dosyaları Prettier ile formatla
```

## Klasör yapısı

```
src/
├── app/                      # Sayfalar (URL = klasör adı)
│   ├── page.tsx              # /                     — giriş (IT / Engineering seçimi)
│   ├── it-services/          # /it-services
│   ├── engineering-services/ # /engineering-services
│   ├── blog/                 # /blog ve /blog/[slug]
│   ├── contact/              # /contact (+ actions.ts: form gönderimi)
│   ├── globals.css           # Renkler, gradientler, tipografi ölçeği, animasyonlar
│   ├── layout.tsx            # Fontlar, SEO metadata, JSON-LD
│   ├── sitemap.ts / robots.ts
│   └── not-found.tsx
├── components/
│   ├── layout/               # Navbar, Footer, PageShell
│   ├── sections/             # Sayfa bölümleri (Hero, About, Stats, Services, CTA…)
│   ├── blog/ contact/        # Sayfaya özel bileşenler
│   └── ui/                   # Button, Badge, Logo, Icon, Reveal (animasyon)…
├── config/site.ts            # Şirket bilgileri, e-posta, telefon, adresler, menü linkleri
├── content/
│   ├── pages/*.ts            # Sayfa metinleri (başlıklar, kartlar, istatistikler…)
│   └── blog/*.mdx            # Blog yazıları
├── fonts/                    # Satoshi & Switzer (self-hosted)
└── lib/                      # blog okuma, form şeması, yardımcı fonksiyonlar
```

**Kural:** Metin değiştirmek için bileşenlere dokunmanıza gerek yok — `src/content/` ve
`src/config/site.ts` dosyalarını düzenlemeniz yeterli.

## Sık yapılan değişiklikler

### Yeni blog yazısı eklemek

1. `src/content/blog/yazi-adresi.mdx` dosyası oluşturun (dosya adı = URL).
2. Kapak görselini `public/images/blog/` içine koyun.
3. Dosyanın başına `meta` bloğunu ekleyin, altına Markdown ile yazın:

```mdx
export const meta = {
  title: "Yazı başlığı",
  description: "Arama motorları ve paylaşımlar için kısa özet.",
  date: "2026-10-13",
  category: "Automation",
  cover: "/images/blog/kapak.jpg",
};

Giriş paragrafı…

## Ara başlık

- **Kalın kısım:** madde metni
```

Yazı otomatik olarak blog listesine, IT sayfasındaki "Knowledge Hub" bölümüne (en yeni 3 yazı) ve
`sitemap.xml`'e eklenir. `meta` alanlarından biri eksik/hatalıysa build açıklayıcı bir hata verir.

### Metinleri / kartları / istatistikleri değiştirmek

- IT sayfası: `src/content/pages/it-services.ts`
- Engineering sayfası: `src/content/pages/engineering-services.ts`
- Giriş sayfası: `src/content/pages/home.ts`
- İletişim bilgileri, menü, footer: `src/config/site.ts`

### Yeni servis kartı / ikon

`it-services.ts` → `services.items` dizisine bir nesne ekleyin. İkonlar
`src/components/ui/icon.tsx` içinde tanımlı; yeni ikon için [phosphoricons.com](https://phosphoricons.com)
üzerinden adını bulup bu dosyaya ve `src/content/types.ts` içindeki `IconName` listesine ekleyin.

### Yeni sayfa eklemek

`src/app/yeni-sayfa/page.tsx` oluşturun ve mevcut bölümleri birleştirin:

```tsx
import { PageShell } from "@/components/layout/page-shell";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata = { title: "Yeni Sayfa", alternates: { canonical: "/yeni-sayfa" } };

export default function Page() {
  return (
    <PageShell>
      {/* bölümler… */}
      <CtaSection intro={{ title: "…" }} button={{ label: "Contact Us", href: "/contact" }} />
    </PageShell>
  );
}
```

Sonra `src/app/sitemap.ts` içindeki `staticRoutes` listesine ekleyin.

### Renk / font / boşluk

Tüm tasarım değerleri `src/app/globals.css` içindeki `@theme` bloğunda (ör. `--color-brand`,
`--color-ink`). Kırılım noktaları orijinal siteyle aynı: telefon `< 810px`, `tablet:` ≥ 810px,
`desktop:` ≥ 1200px.

## Vercel'e yayınlama

1. Projeyi GitHub'a gönderin:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<kullanici>/aid-website.git
   git push -u origin main
   ```
2. [vercel.com/new](https://vercel.com/new) → depoyu seçin → **Deploy**. Framework (Next.js) ve
   Node sürümü (24.x, `package.json` → `engines`) otomatik algılanır; ekstra ayar gerekmez.
3. **Settings → Environment Variables** bölümüne `.env.example` dosyasındaki değişkenleri ekleyin.
4. **Settings → Domains** üzerinden alan adınızı bağlayın ve `NEXT_PUBLIC_SITE_URL`'i o adrese ayarlayın.

Sonraki her `git push` otomatik deploy olur; pull request'ler için ayrı önizleme linki üretilir
(önizlemeler `robots.txt` ile arama motorlarına kapalıdır).

### İletişim formu (Resend)

Form, [Resend](https://resend.com) üzerinden e-posta gönderir:

1. Resend'de hesap açın, alan adınızı (aidprojectsolutions.com) doğrulayın, bir API anahtarı oluşturun.
2. Vercel'de şu değişkenleri tanımlayın:
   - `RESEND_API_KEY` — API anahtarı
   - `CONTACT_TO_EMAIL` — mesajların gideceği adres
   - `CONTACT_FROM_EMAIL` — doğrulanmış alan adından gönderici, ör. `AID Website <noreply@aidprojectsolutions.com>`

Anahtar yoksa geliştirme ortamında mesajlar terminale yazılır; production'da kullanıcıya e-posta
adresine yazması söylenir. Form; Zod doğrulaması, bot tuzağı (honeypot) ve erişilebilir hata
mesajları içerir.

## Orijinal siteye göre bilinçli farklar

- Footer'daki Framer şablon metni "© 2025 Your Company, Inc." → "© {yıl} AID Project Solutions".
- Yazım hataları düzeltildi: "Sofware Solutions" → "Software Solutions"; blog adresindeki
  "nnvironments" → "environments" (eski adres kalıcı yönlendirme ile çalışmaya devam eder).
- Engineering sayfasındaki menü linkleri artık IT sayfasına değil, kendi bölümlerine gidiyor.
- Engineering sayfasındaki boş logo şeridi ve istatistik bölümündeki fazladan çizgiler kaldırıldı.
- Her sayfaya ayrı başlık/açıklama, canonical URL, Open Graph, sitemap, robots ve yapılandırılmış veri
  (JSON-LD) eklendi; animasyonlar işletim sistemindeki "hareketi azalt" ayarına uyuyor.

Engineering sayfasındaki "About" kartları ve CTA metni orijinalde de IT sayfasıyla aynı; içerik hazır
olduğunda `engineering-services.ts` içinden güncelleyebilirsiniz.

## Lisanslar

- **Satoshi** ve **Switzer** fontları: Indian Type Foundry, [Fontshare](https://www.fontshare.com)
  ITF Free Font License (ticari kullanım serbest).
- **Inter**: SIL Open Font License (Google Fonts üzerinden).
- **Phosphor Icons**: MIT.
- Partner logoları ilgili markalara aittir.
