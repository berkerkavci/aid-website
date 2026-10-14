# Değişiklik Notları

Bu dosya sitedeki önemli değişiklikleri tarih sırasıyla listeler (en yeni en üstte).

## 2026-10-14 — Engineering içeriği ve iletişim formunda hizmet seçimi

### Engineering sayfası

- **Hizmet kartları:** 9 hizmet kartı IT Services kartlarıyla aynı tasarıma getirildi (renkli ikon,
  başlık ve kısa açıklama; masaüstünde 3 sütun, tablette 2, mobilde 1). Not: 9 açıklamalı kart
  nedeniyle bu bölüm masaüstünde tek ekrandan uzun; kaydırılarak okunur.
- **Explore Us kartları MEP'e uyarlandı:** IT sayfasından kopyalanan Automation / Monitoring /
  DevOps kartlarının yerine firmanın yaptığı işlere göre **MEP System Design**, **3D Coordination &
  BIM** ve **Project Delivery & Quality** kartları geldi.
- **Knowledge Hub eklendi:** Engineering sayfasında en yeni 3 MEP yazısı ve "View all articles"
  (`/blog?division=engineering`) linki. Gezinme çubuğu: About · Services · Capabilities ·
  Knowledge Hub · Contact. Bölüm, beyaz Capabilities bölümünden ayrışsın diye hafif mor zeminli.
- İletişim bölümü metni "IT challenges" yerine MEP'e uygun hale getirildi.

### Blog

- **4 yeni Engineering yazısı** (her biri kendi kapak görseliyle):
  - MEP 3D Coordination: Eliminating Clashes Before Construction
  - Designing Fire Protection Systems to NFPA and EN Standards
  - Energy-Efficient HVAC Design for Modern Buildings
  - Why Commissioning Matters: Delivering MEP Systems That Perform as Designed
- Knowledge Hub sayfasının açıklaması iki bölümü de kapsayacak şekilde güncellendi.

### İletişim formu

- **Service açılır menüsü:** Ziyaretçi mesajın **IT Services** mi **Engineering** mi için olduğunu
  seçer (zorunlu alan). Seçenekler ikon ve kısa açıklama ile gösterilir; klavye ile tam kullanılır
  (ok tuşları, Enter, Escape, harfle atlama) ve ekran okuyucularla uyumludur (WAI-ARIA combobox).
- **Doğru ekibe yönlendirme:** IT mesajları `bkavci@`, Engineering mesajları `gkavci@` adresine gider;
  e-posta konusu `[IT Services]` / `[Engineering]` ile başlar. `CONTACT_TO_EMAIL` değişkeni artık
  kullanılmıyor (alıcılar `src/config/site.ts` içinde).
- **Ön seçim:** Hizmet sayfalarındaki "Get in touch" ve "Contact Us" butonları formu ilgili hizmet
  seçili olarak açar (`/contact?department=engineering`).

## 2026-10-14 — Blog kategorileri ve hero düzeltmeleri

- **Blog iki bölüme ayrıldı:** Knowledge Hub sayfasında hap şeklinde segmented control
  (IT Services · Engineering); mobilde tam genişlik. Seçim adreste saklanır
  (`/blog?division=engineering`), link paylaşılabilir. Erişilebilir sekme yapısı (ok tuşları,
  Home/End). Henüz yazı olmayan bölüm için "yakında" boş durumu.
- Her blog yazısının `meta` bloğuna zorunlu `division: "it" | "engineering"` alanı eklendi.
- IT sayfasındaki Knowledge Hub yalnızca IT yazılarını gösterir; yazı sayfasındaki
  "← All articles" doğru sekmeye döner, "Keep Reading" önce aynı bölümün yazılarını önerir.
- **Hero:** İkinci buton "Explore" oldu ve hero'nun altındaki ilk bölüme (About) gider.
- **Düzeltme:** Sayfa içi butonlar (ör. "Explore") ikinci tıklamada da çalışıyor.

## 2026-10-14 — İletişim formu geri bildirimi

- **Başarılı gönderim:** Form gönderildikten sonra formun yerine net bir onay ekranı geliyor
  (yeşil onay ikonu, "Thank you!", 1 iş günü içinde dönüş notu ve "Send another message" butonu).
  Ekran otomatik olarak onaya kayar ve odak onay başlığına taşınır (ekran okuyucular duyurur).
- **Hata durumu:** Gönder butonunun üstünde kırmızı, ikonlu uyarı kutusu; doğrulama hatasında
  imleç otomatik olarak ilk hatalı alana gider.
- **Yayın:** Site Vercel'e taşındı (www.aidprojectsolutions.com), e-postalar Resend
  (`notify.aidprojectsolutions.com`, AB bölgesi) üzerinden gönderiliyor.

## 2026-10-13 — Tasarım, kullanılabilirlik ve yasal uyum güncellemesi

### Yerleşim ve tasarım

- **Geniş ekran düzeni:** İçerik en fazla 1360px genişliğinde ortalanıyor; arka planlar kenardan
  kenara uzanmaya devam ediyor. 1920px gibi geniş ekranlarda kartların uçlara yayılması ve
  başlıkların dar sütunda 3 satıra bölünmesi giderildi.
- **Her bölüm bir ekran:** Gezinme çubuğundan ulaşılan bölümler (About, Services, Knowledge Hub,
  Capabilities, Contact) masaüstünde tam bir ekran yüksekliğinde; içerik dikeyde ortalanıyor.
  1440×800, 1536×730, 1680×920 ve 1920×940/1000 ekranlarda her bölüm tek ekrana sığıyor.
- **Ortak dikey ritim:** Tüm bölümler aynı boşluk sistemini (`section-y`) kullanıyor. Masaüstünde
  boşluklar ekran yüksekliğine göre ölçekleniyor; kısa dizüstü ekranlar (≤ 820px) için kompakt
  tipografi ölçeği (`short:` varyantı) eklendi.
- **Bölüm başlıkları:** Daha geniş ve dengeli satır kırılımı (`text-balance`); başlık altına
  isteğe bağlı "tümünü gör" linki eklenebiliyor.
- **Kartlar:** IT servis kartları yatay düzende (ikon solda); Engineering hizmetleri 3×3 ikonlu
  kartlar; About kartları ve blog önizleme kartları daha kompakt.
- **Capabilities:** Standartlar ve uzmanlık alanları iki ayrı kontrol listesi kartında, iki sütun.
  Bloga yönlendiren ilgisiz "View All" butonu kaldırıldı.
- **Logo şeridi:** "Technologies we work with" başlığı eklendi; logolar gri tonda, üzerine gelince
  renkleniyor ve şerit duruyor.

### Navigasyon

- **Ana menü sadeleştirildi:** IT Services · Engineering · Blog · Contact Us. Logo her zaman
  giriş sayfasına döner; bulunduğunuz sayfa menüde altı çizili gösterilir.
- **Sayfa içi gezinme çubuğu:** Hizmet sayfalarında hero'nun altında, kaydırınca menünün altına
  yapışan çubuk (IT: About · Services · Knowledge Hub · Contact; Engineering: About · Services ·
  Capabilities · Contact). Okunan bölüm otomatik vurgulanır (scroll-spy); mobilde yatay kayar.
  Her bölümün paylaşılabilir adresi vardır (ör. `/it-services#blog`).
- **Bağlantıyla açılış:** `#bölüm` içeren bir linkle açılan sayfa ilgili bölüme kayar.
- **Blog yazıları:** Üstte "← All articles" linki; sonda "Keep Reading" (ilgili yazılar) ve
  iletişim bölümü.
- **Odak halkası:** Tarayıcının varsayılan siyah çerçevesi yerine zemine uyumlu, klavye
  kullanıcıları için görünür odak halkası.

### Dönüşüm

- Hero'da "Scroll for More" yerine **Get in touch** (ana) ve **Explore services** (ikincil) butonları.
- İletişim sayfasına "We typically reply within one business day." notu.

### Yasal uyum (GDPR / KVKK)

- **Gizlilik Politikası** sayfası (`/privacy`) eklendi; footer'dan bağlantılı ve sitemap'te.
  Metin `src/content/legal/privacy.mdx` içinde — yayından önce hukukçu kontrolü önerilir.
- İletişim formuna zorunlu "Gizlilik Politikası'nı okudum" onay kutusu eklendi (sunucu tarafında
  da doğrulanıyor).
- Google Haritası artık ziyaretçi "Show map" butonuna basana kadar yüklenmiyor (onaysız veri
  aktarımı ve çerez yok).

### Düzeltmeler

- Dar ekranlarda (≤ 360px) uzun e-posta adresinin iletişim kartlarını ve footer'ı taşırması
  giderildi.

### Teknik

- Yeni bileşenler: `SectionNav`, `MapEmbed`, `useActiveSection` (scroll-spy).
- Kullanılmayan `ServicesList` bileşeni kaldırıldı; Engineering hizmetleri `ServicesGrid` kullanıyor.
- Menü yapılandırması `src/config/site.ts` içinde `mainNavigation`, `footerNavigation` ve
  `legalNavigation` olarak sadeleştirildi.

## 2026-10-13 — İlk sürüm

- Framer sitesi (aidprojectsolutions.framer.website) Next.js 16 + TypeScript + Tailwind CSS v4 ile
  birebir yeniden yazıldı: giriş sayfası, IT Services, Engineering Services, Blog (MDX),
  blog yazıları ve İletişim.
- Renkler, tipografi (Satoshi, Switzer, Inter), boşluklar ve animasyonlar orijinalden ölçülerek
  aktarıldı.
- İletişim formu (Server Action + Zod + Resend), SEO (metadata, Open Graph, JSON-LD, sitemap,
  robots), güvenlik başlıkları ve Vercel uyumlu yapı.
