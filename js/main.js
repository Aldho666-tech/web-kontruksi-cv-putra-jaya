/**
 * CV PUTRA JAYA - GSAP & SPRING MOTION INTERACTION
 * Layout: Elevra-inspired — Hero + Products + About + Steps + CTA
 */

const WA_PHONE_NUMBER = "6281234567890";

/**
 * Format Angka ke Rupiah (Rp XX.XXX.XXX)
 */
function formatRupiah(number) {
  if (!number || number === 0) return null;
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

/**
 * Generate Link WhatsApp dengan Pesan Otomatis
 */
function getWhatsAppUrl(productName) {
  let message = "Halo CV Putra Jaya, saya ingin konsultasi kebutuhan mesin produksi sepatu.";
  if (productName) {
    message = `Halo CV Putra Jaya, saya tertarik dengan ${productName}. Bisa info lebih lanjut?`;
  }
  return `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Template Render Kartu Produk Minimalist Bento
 */
function createProductCardHTML(product) {
  const formattedPrice = formatRupiah(product.price);
  const priceHTML = formattedPrice 
    ? `<div class="product-card-price">${formattedPrice}</div>`
    : `<div class="product-card-price call-for-price">Hubungi untuk harga</div>`;

  const waUrl = getWhatsAppUrl(product.name);
  const modelCode = (product.specs && product.specs.Model) ? product.specs.Model : '';

  return `
    <article class="product-bento-card" data-id="${product.id}">
      <div class="product-card-img-wrap">
        <img 
          src="${product.image}" 
          alt="Mesin ${product.name} CV Putra Jaya" 
          loading="lazy"
          onerror="this.src='images/produk/mesin-cutting-hidrolik.svg'"
        />
        ${modelCode ? `<span class="product-card-model-pill">${modelCode}</span>` : ''}
      </div>
      <div class="product-card-cat-badge">${product.category}</div>
      <h3 class="product-card-name" title="${product.name}">${product.name}</h3>
      ${priceHTML}
      <div class="product-card-btn-row">
        <a 
          href="${waUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-card-wa"
          aria-label="Tanya via WhatsApp untuk ${product.name}"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
          </svg>
          <span class="text-desktop">Chat WA &amp; Pesan</span>
          <span class="text-mobile">Tanya WA</span>
        </a>
        <button 
          type="button" 
          class="btn-card-detail" 
          onclick="openProductModal('${product.id}')"
        >
          <span class="text-desktop">Lihat Spesifikasi Teknis</span>
          <span class="text-mobile">Spesifikasi</span>
        </button>
      </div>
    </article>
  `;
}

/**
 * Render Grid Produk Unggulan di Halaman Beranda (4 Item)
 */
function initFeaturedProducts() {
  const container = document.getElementById('featured-products-grid');
  if (!container || !window.PRODUCTS_DATA) return;

  // Render cards if container is empty
  if (!container.children.length) {
    const featured = window.PRODUCTS_DATA.filter(p => p.featured).slice(0, 4);
    container.innerHTML = featured.map(createProductCardHTML).join('');
  }
  
  if (window.gsap && window.ScrollTrigger) {
    gsap.fromTo('#featured-products-grid .product-bento-card', 
      { y: 24, opacity: 0.8 },
      {
        scrollTrigger: {
          trigger: '#featured-products-grid',
          start: 'top 92%',
          once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all'
      }
    );
  }
}

/**
 * Logika Halaman Katalog Produk (/produk)
 */
let currentCategory = 'Semua';
let searchQuery = '';

function initCatalogPage() {
  const container = document.getElementById('catalog-products-grid');
  if (!container || !window.PRODUCTS_DATA) return;

  const searchInput = document.getElementById('catalog-search');
  const tabs = document.querySelectorAll('.filter-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderFilteredCatalog();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderFilteredCatalog();
    });
  }

  renderFilteredCatalog();
}

function renderFilteredCatalog() {
  const container = document.getElementById('catalog-products-grid');
  if (!container || !window.PRODUCTS_DATA) return;

  const filtered = window.PRODUCTS_DATA.filter(product => {
    const matchCat = currentCategory === 'Semua' || product.category === currentCategory;
    const matchSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery) ||
      (product.description && product.description.toLowerCase().includes(searchQuery)) ||
      (product.specs && Object.values(product.specs).some(v => String(v).toLowerCase().includes(searchQuery)));
    
    return matchCat && matchSearch;
  });

  // Update counter summary text
  const counterEl = document.getElementById('catalog-counter');
  if (counterEl) {
    if (searchQuery) {
      counterEl.textContent = `Menampilkan ${filtered.length} mesin untuk pencarian "${searchQuery}"`;
    } else if (currentCategory !== 'Semua') {
      counterEl.textContent = `Menampilkan ${filtered.length} mesin kategori "${currentCategory}"`;
    } else {
      counterEl.textContent = `Menampilkan semua ${filtered.length} mesin industri`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 64px 20px;">
        <div style="font-size: 42px; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 8px; color: var(--black);">Mesin Tidak Ditemukan</h3>
        <p style="color: var(--muted); margin-bottom: 24px; font-size: 14.5px; max-width: 480px; margin-inline: auto;">
          Kami memiliki banyak stok mesin lain di workshop Cibaduyut yang belum masuk katalog digital.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn-outline-dark" onclick="resetCatalogFilters()">
            Tampilkan Semua Mesin
          </button>
          <a href="${getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            Tanya Stok via WhatsApp
            <span class="btn-arrow-circle">↗</span>
          </a>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(createProductCardHTML).join('');
}

/**
 * Reset Search & Kategori ke Semua Mesin
 */
function resetCatalogFilters() {
  currentCategory = 'Semua';
  searchQuery = '';
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-tab').forEach(t => {
    if (t.getAttribute('data-category') === 'Semua') {
      t.classList.add('active');
      t.setAttribute('aria-selected', 'true');
    } else {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    }
  });

  renderFilteredCatalog();
}

/**
 * MODAL DETAIL SPESIFIKASI PRODUK
 */
function openProductModal(productId) {
  if (!window.PRODUCTS_DATA) return;
  const product = window.PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  const formattedPrice = formatRupiah(product.price);
  const priceDisplay = formattedPrice || "Hubungi untuk harga terbaik";
  const waUrl = getWhatsAppUrl(product.name);
  const modelCode = (product.specs && product.specs.Model) ? product.specs.Model : '';

  let specsRows = '';
  if (product.specs) {
    specsRows = Object.entries(product.specs)
      .map(([key, val]) => `
        <tr>
          <th>${key}</th>
          <td>${val}</td>
        </tr>
      `).join('');
  }

  modal.innerHTML = `
    <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
      <button class="modal-close-btn" onclick="closeProductModal()" aria-label="Tutup Modal Detail">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="modal-content-grid">
        <!-- Kolom Kiri: Visual Mesin -->
        <div class="modal-left-col">
          <div class="modal-img-wrap">
            ${modelCode ? `<span class="modal-model-badge">${modelCode}</span>` : ''}
            <img 
              src="${product.image}" 
              alt="Mesin ${product.name} CV Putra Jaya"
              onerror="this.src='images/produk/mesin-cutting-hidrolik.svg'"
            />
          </div>
          <div class="modal-quick-meta">
            <span class="mqm-tag"><span class="mqm-dot"></span> Stok Fisik di Workshop</span>
            <span class="mqm-tag">✓ Garansi 1 Tahun</span>
          </div>
        </div>

        <!-- Kolom Kanan: Detail & Spesifikasi -->
        <div class="modal-info-col">
          <div class="modal-header-meta">
            <span class="modal-cat-pill">${product.category}</span>
          </div>

          <h2 id="modal-product-title" class="modal-title">${product.name}</h2>
          <div class="modal-price-tag">${priceDisplay}</div>
          
          <p class="modal-desc">${product.description || 'Mesin industri manufaktur sepatu berkualitas tinggi standar pabrik.'}</p>
          
          <div class="modal-specs-section">
            <h4 class="modal-specs-heading">Spesifikasi Teknis:</h4>
            <div class="modal-table-scroll">
              <table class="modal-specs-table">
                <tbody>
                  ${specsRows}
                </tbody>
              </table>
            </div>
          </div>

          <div class="modal-footer-action">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary modal-cta-btn">
              <span>Konsultasi &amp; Pesan via WhatsApp</span>
              <span class="btn-arrow-circle">↗</span>
            </a>
            <p class="modal-guarantee-note">
              * Unit dapat diuji coba langsung di workshop Sentra Cibaduyut sebelum transaksi.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (window.gsap) {
    gsap.fromTo('.modal-container', 
      { scale: 0.94, opacity: 0, y: 15 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
    );
  }
}

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProductModal();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('product-detail-modal');
  if (modal && e.target === modal) {
    closeProductModal();
  }
});

/**
 * Sinkronisasi 3 Tab Navigasi (Desktop & Mobile Floating Bottom Bar)
 * Beranda, Produk, Profil (Sesuai Referensi Gambar)
 */
function initTabsSync() {
  const desktopTabs = document.querySelectorAll('.nav-links-center .nav-item');
  const mobileTabs = document.querySelectorAll('.mobile-bottom-bar .mobile-tab-item');

  function setActiveTab(tabName) {
    desktopTabs.forEach(t => {
      if (t.getAttribute('data-tab') === tabName) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    mobileTabs.forEach(t => {
      if (t.getAttribute('data-tab') === tabName) {
        if (!t.classList.contains('active')) {
          t.classList.add('active');
          if (window.gsap) {
            gsap.fromTo(t, { scale: 0.94 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
          }
        }
      } else {
        t.classList.remove('active');
      }
    });
  }

  function setupTabClicks(tabElements) {
    tabElements.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabType = tab.getAttribute('data-tab');
        const href = tab.getAttribute('href');

        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            setActiveTab(tabType);
          }
        } else if (href === 'index.html' && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/'))) {
          if (window.location.hash) {
            history.pushState("", document.title, window.location.pathname);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveTab('beranda');
          e.preventDefault();
        }
      });
    });
  }

  setupTabClicks(desktopTabs);
  setupTabClicks(mobileTabs);

  // Set active tab based on current page
  if (window.location.pathname.includes('produk.html')) {
    setActiveTab('produk');
  } else {
    setActiveTab('beranda');
  }
}

/**
 * GSAP & ScrollTrigger Animations
 */
function initGSAPAnimations() {
  if (!window.gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Section Entrance Timeline
  if (document.querySelector('.hero-section')) {
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTL
      .from('.hero-section', {
        opacity: 0,
        duration: 0.9
      })
      .from('.hero-headline', {
        y: 32,
        opacity: 0,
        duration: 0.75
      }, '-=0.5')
      .from('.hero-subtext', {
        y: 20,
        opacity: 0,
        duration: 0.55
      }, '-=0.4')
      .from('.hero-actions > *', {
        scale: 0.92,
        opacity: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      }, '-=0.3')
      .from('.hero-floatcard', {
        x: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out'
      }, '-=0.55');
  }

  if (window.ScrollTrigger) {
    // 2. About section reveal
    if (document.querySelector('.about-grid')) {
      gsap.from('.about-text-col', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true },
        x: -40, opacity: 0, duration: 0.85, ease: 'power3.out'
      });
      gsap.from('.about-photo-col', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true },
        x: 40, opacity: 0, duration: 0.85, ease: 'power3.out', delay: 0.15
      });
    }

    // 3. Steps stagger reveal
    if (document.querySelector('.steps-row')) {
      gsap.from('.step-card', {
        scrollTrigger: { trigger: '.steps-row', start: 'top 82%', once: true },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out'
      });
    }

    // 4. CTA band reveal
    if (document.querySelector('.cta-band')) {
      gsap.from('.cta-band-text', {
        scrollTrigger: { trigger: '.cta-band', start: 'top 80%', once: true },
        x: -30, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
      gsap.from('.cta-band-img-wrap', {
        scrollTrigger: { trigger: '.cta-band', start: 'top 80%', once: true },
        x: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1
      });
    }
  }

  // 5. Hover spring on primary/dark buttons
  const actionPills = document.querySelectorAll('.btn-primary, .btn-nav-cta, .btn-dark-pill, .btn-card-wa');
  actionPills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      gsap.to(pill, { scale: 1.03, duration: 0.22, ease: 'back.out(2)' });
    });
    pill.addEventListener('mouseleave', () => {
      gsap.to(pill, { scale: 1, duration: 0.18, ease: 'power2.out' });
    });
  });
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  initTabsSync();
  initFeaturedProducts();
  initCatalogPage();
  initGSAPAnimations();

  // Refresh ScrollTrigger koordinat setelah aset siap
  window.addEventListener('load', () => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  });
});
