# AID Project Solutions — Web Sitesi

[aidprojectsolutions.framer.website](https://aidprojectsolutions.framer.website/) adresindeki Framer sitesinin
**Next.js** ile yeniden yazılmış, Vercel'e hazır sürümü. Renkler, tipografi, boşluklar ve animasyonlar
orijinal siteden ölçülerek birebir aktarıldı. Site **7 dilde** (İngilizce, Türkçe, Lehçe, Almanca,
Fransızca, İspanyolca, Arapça) ve **açık / koyu temada** görüntülenebilir.

## Teknolojiler

| Alan         | Seçim                                                                                 |
| ------------ | ------------------------------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, React Server Components, statik üretim)                       |
| Dil          | TypeScript (strict)                                                                   |
| Çoklu dil    | `[locale]` URL segmenti + `src/proxy.ts` + tipli çeviri dosyaları (ek paket yok)      |
| Stil         | Tailwind CSS v4 — tasarım token'ları (açık/koyu) `src/app/globals.css` içinde         |
| Animasyon    | Motion (`motion/react`) + saf CSS animasyonları                                       |
| Blog         | MDX (`@next/mdx`) — her yazı `src/content/blog/<yazı>/` altında, dil başına bir dosya |
| İkonlar      | Phosphor Icons (orijinal sitedekiyle aynı set)                                        |
| Form         | Server Action + Zod doğrulama + Resend (e-posta)                                      |
| Kod kalitesi | ESLint (Next.js kuralları), Prettier (+ Tailwind sınıf sıralama)                      |

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
npm run covers       # blog kapak görsellerini üret
```

## Klasör yapısı

```
src/
├── app/
│   ├── [locale]/                # Tüm sayfalar dil segmentinin altında
│   │   ├── layout.tsx           # <html lang/dir>, fontlar, tema betiği, SEO, JSON-LD
│   │   ├── page.tsx             # /                     — giriş (IT / Engineering seçimi)
│   │   ├── it-services/         # /it-services
│   │   ├── engineering-services/# /engineering-services
│   │   ├── blog/                # /blog ve /blog/[slug]
│   │   ├── contact/             # /contact (+ actions.ts: form gönderimi)
│   │   ├── privacy/             # /privacy
│   │   └── not-found.tsx        # Dile göre 404 sayfası
│   ├── globals.css              # Renk token'ları (açık/koyu), gradientler, tipografi, animasyonlar
│   └── sitemap.ts / robots.ts
├── proxy.ts                     # Dil yönlendirmesi (URL ↔ dil)
├── i18n/                        # Dil ayarları, Link bileşeni, yardımcılar
├── components/
│   ├── layout/                  # Navbar, Footer, PageShell, LanguageSwitcher
│   ├── theme/                   # Tema anahtarı ve tema betiği
│   ├── sections/                # Sayfa bölümleri (Hero, About, Stats, Services, CTA…)
│   ├── blog/ contact/           # Sayfaya özel bileşenler
│   └── ui/                      # Button, Badge, Logo, Icon, Select, Reveal…
├── config/site.ts               # Şirket bilgileri, e-posta, telefon, adresler, menü linkleri
├── content/
│   ├── messages/<dil>.ts        # TÜM site metinleri, dil başına bir dosya (en.ts referans)
│   ├── pages/*.ts               # Sayfa yapısı: linkler, ikonlar, görseller, rakamlar
│   ├── blog/<yazı>/<dil>.mdx    # Blog yazıları (en.mdx + çeviriler)
│   └── legal/privacy/<dil>.mdx  # Gizlilik Politikası
├── fonts/                       # Satoshi & Switzer (self-hosted)
└── lib/                         # blog okuma, form şeması, yardımcı fonksiyonlar
scripts/blog-covers.mjs          # Blog kapak görseli üretici
```

**Kural:** Metin değiştirmek için bileşenlere dokunmanıza gerek yok — metinler
`src/content/messages/`, yapı (link, ikon, görsel) `src/content/pages/` ve şirket bilgileri
`src/config/site.ts` içinde.

## Diller

- **Adresler:** İngilizce varsayılan dildir ve mevcut adreslerde kalır (`/it-services`). Diğer
  diller önekle açılır: `/tr/it-services`, `/pl/blog`, `/ar/contact`… `/en/...` adresleri tek
  adrese (`/...`) yönlenir.
- **Varsayılan:** Site her ziyaretçiye İngilizce açılır. Ziyaretçi sağ üstteki dil menüsünden
  (🌐 EN) bir dil seçerse seçim bir çerezde (`NEXT_LOCALE`) saklanır ve site sonraki ziyaretlerde o
  dilde açılır. Menü aynı sayfanın diğer dildeki adresine gider (filtre ve bölüm korunur).
- **Arapça** sağdan sola (RTL) gösterilir: düzen aynalanır, oklar ters döner, Arapça metinler
  için IBM Plex Sans Arabic fontu kullanılır (yalnızca Arapça metin görünce indirilir).
- **SEO:** Her sayfada her dil için `hreflang` bağlantıları ve canonical adres var; `sitemap.xml`
  tüm dilleri listeler.

### Metinleri değiştirmek / çevirmek

- Tüm arayüz ve sayfa metinleri `src/content/messages/<dil>.ts` dosyalarında. `en.ts` referanstır;
  diğer dosyalar aynı yapıyı izlemek zorundadır — bir anahtar eksikse veya yanlış yazıldıysa
  `npm run check` ve build hata verir, böylece hiçbir metin çevrilmeden kalmaz.
- Metinlerdeki `{word}`, `{language}`, `{email}` yer tutuculardır; `<link>…</link>` cümlenin link
  olacak kısmını işaretler (çevirmen linkin yerini cümleye göre değiştirebilir).
- Hero başlığı bir şablondur: `"Your {word} Partner"` / `"{word} Ortağınız"`. `{word}` yerine
  `rotatingWords` listesindeki kelimeler sırayla gelir.

### Yeni dil eklemek

1. `src/i18n/config.ts` → `locales` listesine dil kodunu, `localeInfo` içine adını ekleyin.
2. `src/content/messages/en.ts` dosyasını kopyalayıp `<kod>.ts` olarak çevirin ve
   `src/i18n/server.ts` içindeki listeye ekleyin.
3. İsteğe bağlı: blog yazıları için `<yazı>/<kod>.mdx`, gizlilik için `legal/privacy/<kod>.mdx`
   (yoksa İngilizce metin gösterilir).
4. `next.config.ts` içindeki eski blog adresi yönlendirmesinde dil listesini güncelleyin.

## Açık / koyu tema

- Site **açık temada** açılır; navbar'daki ay/güneş butonu temayı değiştirir ve seçim tarayıcıda
  saklanır. Sayfa yüklenmeden önce çalışan küçük bir betik sayesinde koyu temayı seçen ziyaretçi
  beyaz bir parlama görmez.
- Renkler **anlamsal token'larla** tanımlıdır (`src/app/globals.css`): açık değerler `@theme`
  bloğunda, koyu değerler `:root[data-theme="dark"]` altında. Bileşenlerde sabit renk yerine bu
  sınıfları kullanın:

| Token                                     | Kullanım                                       |
| ----------------------------------------- | ---------------------------------------------- |
| `bg-canvas`                               | Sayfa ve bölüm zemini                          |
| `bg-surface` / `bg-surface-muted`         | Kartlar, rozetler, inputlar / ikincil dolgular |
| `bg-surface-raised`                       | Açılır menüler, seçili segment                 |
| `text-heading` / `text-ink`               | Başlıklar / ana metin (ve koyu butonlar)       |
| `text-body` / `text-prose` / `text-muted` | İkincil metinler                               |
| `text-inverse`                            | `bg-ink` üzerindeki yazı                       |
| `border-line`, `text-brand`, `bg-tint-*`  | Çizgiler, marka rengi, ikon zeminleri          |

- Hero, istatistik bandı, footer ve mobil menü her iki temada da koyudur (orijinal tasarım).
- Özel durumlar için `dark:` varyantı vardır (ör. `dark:text-red-400`).

## Sık yapılan değişiklikler

### Yeni blog yazısı eklemek

1. `src/content/blog/yazi-adresi/` klasörü oluşturun (klasör adı = URL).
2. Kapak görselini üretin (aşağıdaki **Blog kapak görselleri** bölümüne bakın).
3. Klasöre `en.mdx` ekleyin; başına `meta` bloğunu yazın, altına Markdown ile metni:

```mdx
export const meta = {
  title: "Yazı başlığı",
  description: "Arama motorları ve paylaşımlar için kısa özet.",
  date: "2026-10-13",
  division: "engineering", // "it" veya "engineering" — blogdaki sekmeyi belirler
  category: "MEP Design",
  cover: "/images/blog/kapak.jpg",
};

Giriş paragrafı…

## Ara başlık

- **Kalın kısım:** madde metni
```

4. Çeviriler için aynı klasöre `tr.mdx`, `de.mdx`… ekleyin. Çeviri dosyasının `meta` bloğunda
   yalnızca `title`, `description` ve `category` yeterli (tarih, bölüm ve kapak `en.mdx`'ten
   alınır). Çevirisi olmayan dilde yazı İngilizce gösterilir ve üstte "henüz bu dilde mevcut değil"
   notu çıkar.

Yazı otomatik olarak blog listesinde `division` ile seçilen sekmeye (IT Services / Engineering),
ilgili hizmet sayfasındaki "Knowledge Hub" bölümüne (en yeni 3 yazı) ve `sitemap.xml`'e eklenir.
`meta` alanlarından biri eksik/hatalıysa build açıklayıcı bir hata verir.

### Blog kapak görselleri

Knowledge Hub'daki tüm kapaklar aynı görsel dili kullanır: lacivert "blueprint" zemin (hero
gradyanı) üzerinde ince ızgara, iki yumuşak renk ışıması, sol altta ölçek çizgisi ve konuyu anlatan
beyaz çizgi illüstrasyon (bir-iki vurgu rengiyle). Kapaklar elle değil kodla üretilir:

1. `scripts/blog-covers.mjs` içindeki `covers` listesine yeni bir satır ekleyin: dosya adı, iki ışıma
   rengi (`glow`) ve çizim fonksiyonu. Çizim 1600×1067 tuvalde, yaklaşık x 480–1460 / y 330–800
   aralığında kalmalı (önizleme kartları görseli kırptığında kesilmesin). Mevcut çizimler
   (`monitoringArt`, `hvacArt` …) örnek olarak kullanılabilir; vurgu renkleri `ink` listesinde.
2. `npm run covers` çalıştırın — görseller `public/images/blog/` içine yazılır (~100 KB JPG).
3. Yazının `meta.cover` alanına `/images/blog/<dosya-adı>.jpg` yazın.

### Kartları / istatistikleri / linkleri değiştirmek

- Metinler: `src/content/messages/<dil>.ts` (ör. `itServices.services.items.automation.title`).
- Yapı: `src/content/pages/*.ts` — kart sırası, ikonlar, görseller, rakamlar ("15+"), linkler.
  Yeni bir kart eklerken buraya bir satır, her dilin messages dosyasına da metnini ekleyin.
- Sayfa içi gezinme çubuğu (About · Services · …): ilgili sayfa dosyasındaki `sectionNav`.
  Her öğenin `id` değeri, gideceği bölümün `id`'si ile aynı olmalı.
- İletişim bilgileri, üst menü (`mainNavigation`), footer menüsü: `src/config/site.ts`.
- Gizlilik Politikası: `src/content/legal/privacy/<dil>.mdx` (değiştirince
  `src/app/[locale]/privacy/page.tsx` içindeki `privacyPolicyUpdatedAt` tarihini güncelleyin).

### Yeni servis kartı / ikon

`it-services.ts` veya `engineering-services.ts` → `serviceCards` listesine `{ key, icon, tint }`
ekleyin ve her messages dosyasında `services.items.<key>` altına başlık/açıklama yazın. İkonlar
`src/components/ui/icon.tsx` içinde tanımlı; yeni ikon için [phosphoricons.com](https://phosphoricons.com)
üzerinden adını bulup bu dosyaya ve `src/content/types.ts` içindeki `IconName` listesine ekleyin.

### Yeni sayfa eklemek

`src/app/[locale]/yeni-sayfa/page.tsx` oluşturun, metinleri messages dosyalarına ekleyin ve mevcut
bölümleri birleştirin. Linkler için `next/link` yerine `@/i18n/link` kullanın (dil öneki otomatik
eklenir). Sonra `src/app/sitemap.ts` içindeki `staticRoutes` listesine ekleyin.

```tsx
import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { localeAlternates } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "…", alternates: localeAlternates(await getLocale(), "/yeni-sayfa") };
}

export default async function Page() {
  const messages = await getMessages();
  return <PageShell>{/* bölümler… */}</PageShell>;
}
```

### Renk / font / boşluk

Tüm tasarım değerleri `src/app/globals.css` içinde (bkz. **Açık / koyu tema**). Kırılım noktaları
orijinal siteyle aynı: telefon `< 810px`, `tablet:` ≥ 810px, `desktop:` ≥ 1200px. `short:` varyantı,
masaüstü genişliğinde ama kısa (≤ 820px) ekranları (dizüstüler) hedefler.

Bölüm düzeni için ortak yardımcılar:

- `section-x` — yatay kenar boşluğu; içerik en fazla 1360px genişlikte ortalanır.
- `section-y` — tüm bölümlerde aynı dikey ritim (masaüstünde ekran yüksekliğine göre ölçeklenir).
- `section-fit` — gezinme çubuğundan ulaşılan bölümler masaüstünde tam bir ekran yüksekliğindedir
  ve içerik dikeyde ortalanır. Yeni bir bölümü çubuğa eklerken bu sınıfı ve bir `id` verin.
- Sağdan sola düzene uyum için yön sınıflarında mantıksal sürümleri kullanın: `ms-`/`me-`,
  `ps-`/`pe-`, `start-`/`end-`, `text-start`, `border-s` (`ml-`, `left-`, `text-left` yerine).

## Vercel'e yayınlama

1. Kod GitHub'da: [berkerkavci/aid-website](https://github.com/berkerkavci/aid-website). Değişiklikleri
   `git add .`, `git commit -m "…"` ve `git push` ile gönderin.
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
   - `CONTACT_FROM_EMAIL` — doğrulanmış alan adından gönderici, ör. `AID Website <noreply@aidprojectsolutions.com>`

**Alıcı adresi:** Formdaki **Service** açılır menüsü (IT Services / Engineering) mesajın kime
gideceğini belirler: IT → `contactInfo.emails.it`, Engineering → `contactInfo.emails.engineering`
(`src/config/site.ts`). E-posta konusu `[IT Services]` veya `[Engineering]` ile başlar; gövdede
ziyaretçinin dili de yazar. Bir link ile seçim önceden yapılabilir: `/contact?department=it` veya
`/contact?department=engineering` (hizmet sayfalarındaki butonlar bunu kullanır). Hata mesajları
ve onay ekranı ziyaretçinin dilindedir. Eski `CONTACT_TO_EMAIL` değişkeni artık kullanılmıyor.

Anahtar yoksa geliştirme ortamında mesajlar terminale yazılır; production'da kullanıcıya e-posta
adresine yazması söylenir. Form; Zod doğrulaması, bot tuzağı (honeypot), erişilebilir hata
mesajları ve zorunlu Gizlilik Politikası onayı içerir.

### Gizlilik (GDPR / KVKK)

- `/privacy` sayfası GDPR ve KVKK'ya göre hazırlanmış bir başlangıç metnidir ve 7 dilde mevcuttur
  (İngilizce metin esastır). **Yayına almadan önce bir hukukçuya kontrol ettirin** ve şirketlerin
  resmi unvanlarını ekleyin. Türkçe metin KVKK aydınlatma metni olarak da kurgulanmıştır.
- Site izleme/analiz çerezi kullanmaz. Yalnızca ziyaretçinin seçtiği dil (çerez) ve tema (tarayıcı
  depolaması) saklanır; ikisi de zorunlu/işlevsel tercihlerdir. Google Haritası, ziyaretçi
  "Show map" butonuna basana kadar yüklenmez, bu yüzden çerez banner'ı gerekmez. İleride analitik
  ya da çerez kullanan bir servis eklerseniz politikayı ve onay mekanizmasını güncelleyin.

## Değişiklik notları

Yapılan tüm değişiklikler tarih sırasıyla [CHANGELOG.md](CHANGELOG.md) dosyasında listelenir.
Yeni bir değişiklik yaptığınızda oraya kısa bir not eklemeniz önerilir.

## Orijinal siteye göre bilinçli farklar

- Footer'daki Framer şablon metni "© 2025 Your Company, Inc." → "© {yıl} AID Project Solutions".
- Yazım hataları düzeltildi: "Sofware Solutions" → "Software Solutions"; blog adresindeki
  "nnvironments" → "environments" (eski adres kalıcı yönlendirme ile çalışmaya devam eder).
- Menü sadeleştirildi: **IT Services · Engineering · Blog · Contact Us**; bulunduğunuz sayfa
  altı çizili gösterilir. Logo her zaman giriş sayfasına döner.
- 7 dil desteği ve açık / koyu tema eklendi.
- Geniş ekranlarda içerik en fazla 1360px genişliğinde ortalanır; bölüm başlıkları daha geniş ve dengeli.
- Hero'da "Scroll for More" yerine "Get in touch" (ana) ve "Explore" (ikincil) butonları.
- Engineering hizmetleri ikonlu kartlar, standartlar/uzmanlıklar iki ayrı kontrol listesi olarak gösterilir.
- Logo şeridine başlık eklendi; logolar gri tonda, üzerine gelince renklenir ve şerit durur.
- Blog yazılarında "← All articles" linki, "Keep Reading" (ilgili yazılar) ve iletişim bölümü var.
- Gizlilik Politikası sayfası, form onay kutusu ve tıklayınca yüklenen harita eklendi.
- Her sayfaya ayrı başlık/açıklama, canonical URL, hreflang, Open Graph, sitemap, robots ve
  yapılandırılmış veri (JSON-LD) eklendi; animasyonlar işletim sistemindeki "hareketi azalt" ayarına uyuyor.

## Lisanslar

- **Satoshi** ve **Switzer** fontları: Indian Type Foundry, [Fontshare](https://www.fontshare.com)
  ITF Free Font License (ticari kullanım serbest).
- **Inter** ve **IBM Plex Sans Arabic**: SIL Open Font License (Google Fonts üzerinden).
- **Phosphor Icons**: MIT.
- Partner logoları ilgili markalara aittir.
