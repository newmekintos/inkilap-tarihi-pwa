// Detect system theme preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Initialize theme IMMEDIATELY using data-theme attribute
(function() {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Use system preference only if no saved theme
        const systemTheme = detectSystemTheme();
        html.setAttribute('data-theme', systemTheme);
    }
})();

// Listen for system theme changes (only if no manual preference saved)
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const html = document.documentElement;
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Setup theme toggle and other UI after DOM loads - Works in ALL browsers
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle - Chrome, Firefox, Safari, Edge compatible
    // Get fresh reference to avoid timing issues
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Remove any existing listeners (cleanup)
        const newToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newToggle, themeToggle);
        
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle using data-theme attribute
            const htmlElement = document.documentElement;
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            console.log('✅ Theme changed to:', newTheme, '| data-theme attribute:', htmlElement.getAttribute('data-theme'));
        }, { passive: false, capture: true });
        
        console.log('✅ Theme toggle initialized successfully');
    } else {
        console.error('❌ Theme toggle button not found!');
    }

    // PWA Install Button
    let deferredPrompt;
    const installButton = document.getElementById('installButton');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the default browser install prompt
        e.preventDefault();
        deferredPrompt = e;
        
        // Show our custom install button
        installButton.style.display = 'flex';
        console.log('✅ PWA install prompt ready');
    });

    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) {
                console.log('❌ Install prompt not available');
                return;
            }

            // Show the install prompt
            deferredPrompt.prompt();
            
            // Wait for the user's response
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`👤 User response: ${outcome}`);
            
            if (outcome === 'accepted') {
                console.log('✅ PWA installed!');
            }
            
            // Clear the prompt
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }

    // Hide button if already installed
    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA was installed');
        installButton.style.display = 'none';
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }

    // Navigation - Initialize after DOM is ready
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Progress Tracking Function
    function updateProgress() {
        const visitedSections = JSON.parse(localStorage.getItem('visitedSections') || '[]');
        const currentSection = document.querySelector('.content-section.active')?.id;
        
        if (currentSection && !visitedSections.includes(currentSection)) {
            visitedSections.push(currentSection);
            localStorage.setItem('visitedSections', JSON.stringify(visitedSections));
        }
        
        const totalSections = contentSections.length;
        const percentage = (visitedSections.length / totalSections) * 100;
        
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            progressFill.style.width = percentage + '%';
            progressText.textContent = `${visitedSections.length}/${totalSections} Konu`;
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const sectionId = item.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
            
            // Close mobile menu
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('active');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Save current section
            localStorage.setItem('currentSection', sectionId);
            
            // Update progress
            updateProgress();
        });
    });

    // Restore last section
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
        const savedItem = document.querySelector(`[data-section="${savedSection}"]`);
        if (savedItem) {
            savedItem.click();
        }
    }

    // Initial progress update
    updateProgress();
}); // END DOMContentLoaded

// Section-specific Quiz Questions
const quizData = {
    ataturk: [
        {
            question: "Atatürk'ün okuduğu okulları sırasıyla doğru gösteren şık hangisidir?",
            options: [
                "Şemsi Efendi - Mahalle Mektebi - Selanik Askeri Rüştiyesi - Manastır Askeri İdadisi - İstanbul Harp Okulu",
                "Mahalle Mektebi - Selanik Mülkiye Rüştiyesi - Manastır Askeri İdadisi - İstanbul Harp Okulu - İstanbul Harp Akademisi",
                "Mahalle Mektebi - Şemsi Efendi - Selanik Mülkiye Rüştiyesi - Selanik Askeri Rüştiyesi - Manastır Askeri İdadisi - İstanbul Harp Okulu - İstanbul Harp Akademisi",
                "Şemsi Efendi - Selanik Mülkiye Rüştiyesi - İstanbul Harp Okulu - İstanbul Harp Akademisi"
            ],
            correct: 2,
            explanation: "Atatürk'ün eğitim hayatı sırasıyla: Mahalle Mektebi, Şemsi Efendi Okulu, Selanik Mülkiye Rüştiyesi, Selanik Askeri Rüştiyesi, Manastır Askeri İdadisi, İstanbul Harp Okulu ve İstanbul Harp Akademisi'dir."
        },
        {
            question: "Atatürk'ün hayatını etkileyen düşünürlerin tamamı hangi şıkta doğru verilmiştir?",
            options: [
                "Namık Kemal - Tevfik Fikret - Mehmet Akif Ersoy - Voltaire",
                "Ziya Gökalp - Namık Kemal - Mehmet Emin Yurdakul - Tevfik Fikret - J.J. Roussea - Montesquieu - Voltaire",
                "Ziya Gökalp - Mehmet Emin Yurdakul - Montesquieu - Voltaire",
                "Ziya Gökalp - Namık Kemal - Tevfik Fikret - Voltaire - Montesquieu"
            ],
            correct: 1,
            explanation: "Atatürk'ün fikir hayatını etkileyen düşünürler: Ziya Gökalp, Namık Kemal, Mehmet Emin Yurdakul, Tevfik Fikret, J.J. Roussea, Montesquieu ve Voltaire'dir (7 düşünür)."
        },
        {
            question: "Atatürk'ün I. Dünya Savaşı'nda mücadele ettiği cepheler hangi şıkta tam olarak verilmiştir?",
            options: [
                "Kanal - Kafkas - Çanakkale",
                "Kafkas - Çanakkale - İrak-Basra",
                "Çanakkale - Suriye-Filistin - Hicaz-Yemen",
                "Kafkas - Çanakkale - Suriye-Filistin"
            ],
            correct: 3,
            explanation: "Atatürk I. Dünya Savaşı'nda Kafkas Cephesi, Çanakkale Cephesi ve Suriye-Filistin Cephesi'nde mücadele etmiştir."
        },
        {
            question: "Selanik şehrinin Atatürk'ün fikir hayatına etkileri aşağıdakilerden hangisinde doğru verilmiştir?",
            options: [
                "Diplomasi - Sorgulama - Örgütlenme",
                "Farklı kültürleri tanıma - İnançlara hoşgörü - Avrupa gelişmelerini takip - Modernleşme kavramlarını tanıma",
                "Liderlik - Milli bilinç - Askeri disiplin",
                "Batı uygarlığını tanıma - Milliyetçilik - Diplomasi tecrübesi"
            ],
            correct: 1,
            explanation: "Selanik'te Atatürk: farklı kültürleri yakından tanıma fırsatı yakaladı, inançlara ve fikirlere hoşgörülü oldu, Avrupa'daki gelişmeleri yakından takip etti ve modernleşme, yenilik, özgürlük kavramlarını tanıdı."
        },
        {
            question: "Atatürk'ün fikir hayatını etkileyen üç şehir (Selanik, Sofya, Manastır) ve bunların etkileri aşağıdakilerden hangisinde doğru eşleştirilmiştir?",
            options: [
                "Selanik: Diplomasi | Sofya: Modernleşme | Manastır: Batı uygarlığı",
                "Selanik: Askeri eğitim | Sofya: Liderlik | Manastır: Diplomasi",
                "Selanik: Farklı kültürler/Modernleşme | Sofya: Batı uygarlığı/Diplomasi | Manastır: Liderlik/Askeri disiplin",
                "Selanik: Liderlik | Sofya: Askeri disiplin | Manastır: Farklı kültürler"
            ],
            correct: 2,
            explanation: "Selanik: farklı kültürler ve modernleşme, Sofya: Batı uygarlığı ve diplomasi tecrübesi, Manastır: liderlik ve askeri disiplin becerisi kazandırmıştır."
        },
        {
            question: "Sofya ve Manastır şehirlerinin Atatürk'e katkılarının tamamı hangi şıkta doğru verilmiştir?",
            options: [
                "Sofya: Askeri disiplin | Manastır: Batı uygarlığı",
                "Sofya: Batı uygarlığı, Milliyetçilik, Diplomasi | Manastır: Liderlik, Milli bilinç, Batı düşüncesi, Askeri disiplin",
                "Sofya: Liderlik, Sorgulama | Manastır: Diplomasi, Milliyetçilik",
                "Sofya: Modernleşme, Özgürlük | Manastır: Farklı kültürler, Hoşgörü"
            ],
            correct: 1,
            explanation: "Sofya'da Batı uygarlığını tanıma, milliyetçilik güçlenmesi ve diplomasi tecrübesi; Manastır'da liderlik ve sorgulama, milli bilinç, Batı düşüncesi ve askeri disiplin kazanmıştır."
        }
    ],
    ww1: [
        {
            question: "Savaş başlamadan önce İtilaf Devletleri'ni oluşturan ülkeler hangi şıkta doğru verilmiştir?",
            options: [
                "Almanya - Avusturya - İtalya",
                "İngiltere - Fransa - Rusya",
                "İngiltere - Rusya - Japonya",
                "İngiltere - Fransa - İtalya"
            ],
            correct: 1,
            explanation: "Savaş başlamadan önce İtilaf Devletleri: İngiltere, Fransa ve Rusya'dan oluşuyordu."
        },
        {
            question: "Savaş başladıktan sonra İttifak Devletleri'ne katılan ülkelerin tamamı hangi şıkta verilmiştir?",
            options: [
                "Almanya - Osmanlı - Bulgaristan - Romanya",
                "Almanya - Avusturya-Macaristan - İtalya - Bulgaristan",
                "Almanya - Avusturya-Macaristan - Osmanlı Devleti - Bulgaristan",
                "Avusturya-Macaristan - Osmanlı - İtalya"
            ],
            correct: 2,
            explanation: "Savaş başladıktan sonra İttifak Devletleri: Almanya, Avusturya-Macaristan, Osmanlı Devleti ve Bulgaristan'dan oluşuyordu. (İtalya İtilaf'a geçti)"
        },
        {
            question: "Osmanlı'nın saldırı (taarruz) cephelerinin tamamı hangisinde doğru verilmiştir? (K ile başlar)",
            options: [
                "Kafkas - Irak-Basra",
                "Kanal - Suriye-Filistin",
                "Kanal Cephesi - Kafkas Cephesi",
                "Kafkas - Çanakkale"
            ],
            correct: 2,
            explanation: "Osmanlı'nın saldırı cepheleri 'K' harfi ile başlar: Kanal Cephesi ve Kafkas Cephesi. (Hatırlatıcı: Taarruz cephelerimiz 'K' ile başlar)"
        },
        {
            question: "Osmanlı'nın savunma cephelerinin tamamı hangi şıkta doğru verilmiştir?",
            options: [
                "Çanakkale - Galiçya - Romanya",
                "Kafkas - Çanakkale - Suriye-Filistin",
                "Suriye-Filistin - Çanakkale - Irak-Basra - Hicaz-Yemen",
                "Kanal - Çanakkale - Makedonya"
            ],
            correct: 2,
            explanation: "Osmanlı'nın savunma cepheleri: Suriye-Filistin, Çanakkale, Irak-Basra ve Hicaz-Yemen'dir. (Hatırlatıcı: Geriye kalanlar savunma cephesidir)"
        },
        {
            question: "Osmanlı'nın yardım gönderdiği cephelerin tamamı hangisinde verilmiştir? (YA ile biter)",
            options: [
                "Bulgaristan - Yunanistan - Romanya",
                "Kafkas - Kanal - Makedonya",
                "Suriye - Filistin - Hicaz",
                "Makedonya - Galiçya - Romanya"
            ],
            correct: 3,
            explanation: "Yardım gönderdiğimiz cepheler 'YA' ile biter: Makedonya, Galiçya ve Romanya. (Hatırlatıcı: Yardım cephelerinin sonunda yardım'ın 'YA'sı bulunmaktadır)"
        },
        {
            question: "İngiltere ve Fransa'nın I. Dünya Savaşı'na girme nedenlerinin tamamı aşağıdakilerden hangisinde doğru verilmiştir?",
            options: [
                "Sömürge elde etmek - Nüfuz alanını genişletmek",
                "Almanya'nın yayılmacı politikası durdurmak - Mevcut müstemlekelerini korumak - Dünya üzerindeki üstünlüğünü sürdürmek",
                "Balkanlarda genişlemek - Toprak kazanmak",
                "Sıcak denizlere inmek - Siyasi egemenliğini genişletmek"
            ],
            correct: 1,
            explanation: "İngiltere ve Fransa aynı nedenlerle savaşa girdi: Almanya'nın yayılmacı politikası durdurmak, mevcut müstemlekelerini korumak ve dünya üzerindeki üstünlüğünü sürdürmek."
        }
    ],
    balkan: [
        {
            question: "I. Balkan Savaşı'nda Osmanlı Devleti'ne karşı savaşan devletlerin tamamı hangi şıkta verilmiştir?",
            options: [
                "Bulgaristan - Sırbistan - Romanya - Karadağ",
                "Yunanistan - Sırbistan - İtalya - Karadağ",
                "Yunanistan - Bulgaristan - Romanya - Sırbistan",
                "Yunanistan - Bulgaristan - Sırbistan - Karadağ"
            ],
            correct: 3,
            explanation: "I. Balkan Savaşı'nda Osmanlı'ya karşı: Yunanistan, Bulgaristan, Sırbistan ve Karadağ savaştı."
        },
        {
            question: "I. Balkan Savaşı'nda kaybedilen toprakları gösteren B-A-D-E-M kısaltmasının açılımı hangi şıkta tam olarak verilmiştir?",
            options: [
                "Bulgaristan - Arnavutluk - Dobruca - Ege Adaları - Manastır",
                "Bosna - Arnavutluk - Dalmaçya - Ege - Makedonya",
                "Batı Trakya - Arnavutluk - Doğu Trakya (Edirne ve Kırklareli) - Ege Adaları - Makedonya",
                "Batı Trakya - Atina - Doğu Trakya - Edirne - Manastır"
            ],
            correct: 2,
            explanation: "B-A-D-E-M: Batı Trakya, Arnavutluk, Doğu Trakya (Edirne ve Kırklareli), Ege Adaları, Makedonya - I. Balkan Savaşı'nda kaybedilen topraklardır."
        },
        {
            question: "II. Balkan Savaşı'nda Bulgaristan Krallığı'na karşı savaşan devletlerin tamamı hangi şıkta verilmiştir?",
            options: [
                "Sırbistan - Karadağ - Romanya - Rusya",
                "Yunanistan - Sırbistan - Karadağ - İtalya",
                "Romanya - Sırbistan - Yunanistan - Osmanlı",
                "Romanya - Yunanistan - Avusturya - Osmanlı"
            ],
            correct: 2,
            explanation: "II. Balkan Savaşı'nda Bulgaristan Krallığı'na karşı: Romanya, Sırbistan, Yunanistan ve Osmanlı savaştı."
        },
        {
            question: "II. Balkan Savaşı'nda Osmanlı Devleti'nin geri aldığı topraklar hangi şıkta doğru verilmiştir?",
            options: [
                "Makedonya ve Ege Adaları",
                "Edirne ve Makedonya",
                "Batı Trakya ve Arnavutluk",
                "Edirne ve Kırklareli"
            ],
            correct: 3,
            explanation: "II. Balkan Savaşı'nda Osmanlı Devleti Edirne ve Kırklareli'yi geri almıştır."
        },
        {
            question: "I. ve II. Balkan Savaşları'nın sonuçları aşağıdakilerden hangisinde doğru özetlenmiştir?",
            options: [
                "I. Balkan: Hiçbir şey kaybedilmedi | II. Balkan: Arnavutluk kaybedildi",
                "I. Balkan: B-A-D-E-M toprakları kaybedildi | II. Balkan: Edirne ve Kırklareli geri alındı",
                "I. Balkan: Makedonya kazanıldı | II. Balkan: Ege Adaları alındı",
                "I. Balkan: Sadece Edirne kaybedildi | II. Balkan: Tüm topraklar geri alındı"
            ],
            correct: 1,
            explanation: "I. Balkan Savaşı'nda B-A-D-E-M (Batı Trakya, Arnavutluk, Doğu Trakya, Ege Adaları, Makedonya) kaybedildi. II. Balkan Savaşı'nda Edirne ve Kırklareli geri alındı."
        },
        {
            question: "Balkan Savaşları hakkında aşağıdaki bilgilerden hangisi yanlıştır?",
            options: [
                "I. Balkan Savaşı'nda Osmanlı'ya 4 devlet saldırdı",
                "I. Balkan Savaşı'nda Romanya, Osmanlı'ya karşı savaştı",
                "II. Balkan'da Romanya, Bulgaristan'a karşı savaştı",
                "II. Balkan Savaşı'nda Bulgaristan yalnız kaldı"
            ],
            correct: 1,
            explanation: "Romanya I. Balkan Savaşı'nda yer almadı. Romanya, II. Balkan Savaşı'nda Bulgaristan'a karşı savaştı."
        }
    ],
    trablusgarp: [
        {
            question: "Trablusgarp Savaşı'nın nedenlerinin tamamı aşağıdakilerden hangisinde doğru verilmiştir?",
            options: [
                "İtalya'nın Avrupa'da sömürge istemesi - Rusya'nın baskısı - Trablusgarp'ın zengin olması",
                "Habeşistan'ı alma isteği - Balkanlarda genişleme - Akdeniz hakimiyeti",
                "Osmanlı'nın zayıf olması - İtalya'nın petrol istemesi - Almanya'nın desteği",
                "İtalya'nın gelişen sanayisi için hammadde ve pazar arayışı - Osmanlı'nın güçsüz olması - Trablusgarp'ın yakın olması - Habeşistan yenilgisindeki saygınlığı kazanma"
            ],
            correct: 3,
            explanation: "Trablusgarp Savaşı'nın nedenleri: İtalya'nın gelişen sanayisi için hammadde ve pazar arayışı, Osmanlı Devleti'nin güçsüz olması ve bölgeye müdahalesinin zor olması, Trablusgarp'ın coğrafi konumunun İtalya için yakın olması ve İtalya'nın Habeşistan yenilgisindeki saygınlığı kazanma isteği."
        },
        {
            question: "Trablusgarp Savaşı hangi yıl başlamış ve hangi antlaşma ile sonuçlanmıştır?",
            options: [
                "1910 - Londra Antlaşması",
                "1911 - Uşi Antlaşması (1912)",
                "1912 - Bükreş Antlaşması",
                "1911 - Sevr Antlaşması"
            ],
            correct: 1,
            explanation: "Trablusgarp Savaşı 1911 yılında başlamış ve 1912'de Uşi Antlaşması ile sona ermiştir."
        },
        {
            question: "Uşi Antlaşması'nın Osmanlı Devleti için öneminin tamamı hangisinde doğru verilmiştir?",
            options: [
                "Trablusgarp geri alındı - Afrika'da genişleme - İtalya ile ittifak",
                "Osmanlı güçlendi - Yeni topraklar kazandı - İtalya yenildi",
                "Osmanlı'nın topraklarını koruyamayacağı ortaya çıktı - Kuzey Afrika'daki son toprak kaybedildi - Halifelik ikinci defa siyasi güç olarak kullanıldı",
                "Avrupa'da nüfuz arttı - Balkanlar kaybedildi - Halifelik ilk defa kullanıldı"
            ],
            correct: 2,
            explanation: "Uşi Antlaşması'nın önemi: Osmanlı'nın topraklarını koruyamayacağı ortaya çıktı, Kuzey Afrika'daki son toprak parçası kaybedildi ve Halifelik ikinci defa siyasi bir güç olarak kullanıldı."
        },
        {
            question: "Trablusgarp Savaşı sonucunda Osmanlı Devleti'nin kaybettiği bölge hangisidir?",
            options: [
                "Yemen",
                "Makedonya",
                "Trablusgarp (Libya - Kuzey Afrika)",
                "Suriye"
            ],
            correct: 2,
            explanation: "Trablusgarp Savaşı sonucunda Osmanlı, Trablusgarp'ı (Libya) kaybetmiş ve bu Kuzey Afrika'daki son toprağı olmuştur."
        },
        {
            question: "Trablusgarp Savaşı ve Uşi Antlaşması hakkında aşağıdaki bilgilerden hangisi yanlıştır?",
            options: [
                "Kuzey Afrika'daki son toprak kaybedildi",
                "Savaş 1911'de başladı",
                "İtalya ile yapıldı",
                "Halifelik ilk defa siyasi güç olarak kullanıldı"
            ],
            correct: 3,
            explanation: "Halifelik ikinci defa siyasi güç olarak kullanıldı, ilk defa değil."
        }
    ],
    mondros: [
        {
            question: "Mondros Mütarekesi'nin 7. maddesinin içeriği ve yorumu aşağıdakilerden hangisinde doğru verilmiştir?",
            options: [
                "Donanma teslim edilecek | Yorum: Denizlerde hakimiyet kaybedildi",
                "Osmanlı ordusu terhis edilecek | Yorum: Savunmasız kaldı",
                "İtilaf Devletleri güvenliğini tehdit eden bölgeleri işgal edebilecek | Yorum: İşgallerin hukuki dayanağı oluşturuldu",
                "Silahlar toplanacak | Yorum: Direniş imkansız hale geldi"
            ],
            correct: 2,
            explanation: "7. Madde: İtilaf Devletleri güvenliğini tehdit eden herhangi bir bölgede karışıklık çıkması halinde o bölgeyi işgal edebilecek. Yorum: Bu madde İtilaf Devletleri'nin yapacağı işgallerin hukuki dayanağını oluşturmuştur. Osmanlı toprakları işgale açık hale gelmiştir."
        },
        {
            question: "Mondros Mütarekesi'nin 24. maddesinde geçen Vilayet-i Sitte'nin tamamı hangi şıkta doğru verilmiştir?",
            options: [
                "Van - Bitlis - Muş - Diyarbakır - Mardin - Urfa",
                "Sivas - Malatya - Diyarbakır - Elazığ - Erzurum - Van",
                "Erzurum - Van - Bitlis - Sivas - Diyarbakır - Elazığ",
                "Erzurum - Van - Bitlis - Kars - Ardahan - Erzincan"
            ],
            correct: 2,
            explanation: "24. Madde'de geçen Vilayet-i Sitte (Altı İl): Erzurum, Van, Bitlis, Sivas, Diyarbakır ve Elazığ'dır."
        },
        {
            question: "Mondros Mütarekesi'nin 24. maddesinin içeriği ve yorumu hangisinde doğru verilmiştir?",
            options: [
                "Ermeniler bu bölgeye yerleştirilecek | Yorum: Nüfus değişimi",
                "Vilayet-i Sitte'de karışıklık çıkarsa İtilaf Devletleri işgal edecek | Yorum: Ermeni Devleti (Megali Armenia) kurmaya yöneliktir",
                "Altı il Rusya'ya verilecek | Yorum: Toprak kaybı",
                "Doğu Anadolu boşaltılacak | Yorum: Göç başladı"
            ],
            correct: 1,
            explanation: "24. Madde: Vilayet-i Sitte'de (Erzurum, Van, Bitlis, Sivas, Diyarbakır, Elazığ) herhangi bir karışıklık çıkarsa İtilaf Devletleri buralara işgal edecek. Yorum: Bu madde Doğu Anadolu'da Ermeni Devletini (Megali Armenia) kurmaya yöneliktir."
        },
        {
            question: "Mondros Mütarekesi hangi tarihte imzalanmıştır ve hangi devletin ateşkesidir?",
            options: [
                "29 Eylül 1918 - Bulgaristan",
                "3 Kasım 1918 - Avusturya-Macaristan",
                "11 Kasım 1918 - Almanya",
                "30 Ekim 1918 - Osmanlı Devleti"
            ],
            correct: 3,
            explanation: "Mondros Mütarekesi 30 Ekim 1918 tarihinde Osmanlı Devleti tarafından imzalanmıştır."
        },
        {
            question: "Mondros Mütarekesi'nin 7. ve 24. maddeleri hakkında aşağıdakilerden hangisi yanlıştır?",
            options: [
                "24. Madde Ermeni Devleti kurmaya yöneliktir",
                "7. Madde'de 6 il ismi sayılmıştır",
                "24. Madde Vilayet-i Sitte'yi kapsıyor",
                "7. Madde işgallerin hukuki dayanağını oluşturdu"
            ],
            correct: 1,
            explanation: "7. Madde'de il isimleri sayılmamıştır, sadece güvenlik tehdidi olan bölgelerin işgal edilebileceği belirtilmiştir. 6 il (Vilayet-i Sitte) 24. Madde'de geçer."
        }
    ],
    kuvay: [
        {
            question: "Kuva-yi Milliye'nin tam tanımı aşağıdakilerden hangisinde doğru verilmiştir?",
            options: [
                "Yabancı devletlerden gelen destek kuvvetleri",
                "Osmanlı Devleti'nin kurduğu düzenli ordu",
                "Ankara Hükümeti'nin resmi askeri gücü",
                "Düşman işgallerine karşı yurdun çeşitli bölgelerinde Anadolu halkı tarafından kurulan bölgesel silahlı direniş örgütü"
            ],
            correct: 3,
            explanation: "Kuva-yi Milliye: Düşman işgallerine karşı yurdun çeşitli bölgelerinde Anadolu halkı tarafından kurulan bölgesel silahlı direniş örgütüdür."
        },
        {
            question: "Kuva-yi Milliye'nin faydalarının tamamı hangi şıkta doğru verilmiştir?",
            options: [
                "Düzenli ordu kurmak - Silah üretmek",
                "Düzenli ordu kuruluncaya kadar savunma - Düşmanı oyalama - Zaman kazandırma - Milli Mücadele ruhu - Milli birlik ve dayanışma",
                "Ateşkes imzalamak - Barış sağlamak",
                "Sadece düşmanı yenmek - Toprak kazanmak"
            ],
            correct: 1,
            explanation: "Kuva-yi Milliye'nin faydaları: Düzenli ordu kuruluncaya kadar ülkenin savunmasını sağladılar, düşmanın ilerlemesi zorlaştırıldı ve oyaladılar, örgütlenme sürecinde zaman kazandırdılar, Milli Mücadele ruhunun ortaya çıkmasını sağladılar, milli birlik ve dayanışmayı artırdılar."
        },
        {
            question: "I. Dünya Savaşı'nı bitiren ateşkesleri kronolojik sırayla doğru gösteren şık hangisidir?",
            options: [
                "11 Kasım Rethondes - 3 Kasım Villa Guisti - 30 Ekim Mondros - 29 Eylül Selanik",
                "29 Eylül Selanik - 11 Kasım Rethondes - 30 Ekim Mondros - 3 Kasım Villa Guisti",
                "30 Ekim Mondros - 29 Eylül Selanik - 11 Kasım Rethondes - 3 Kasım Villa Guisti",
                "29 Eylül 1918 Bulgaristan (Selanik) - 30 Ekim 1918 Osmanlı (Mondros) - 3 Kasım 1918 Avusturya-Macaristan (Villa Guisti) - 11 Kasım 1918 Almanya (Rethondes)"
            ],
            correct: 3,
            explanation: "Savaşı bitiren ateşkesler kronolojik sırayla: 29 Eylül 1918 Bulgaristan (Selanik Ateşkesi), 30 Ekim 1918 Osmanlı Devleti (Mondros Ateşkesi), 3 Kasım 1918 Avusturya-Macaristan (Villa Guisti Ateşkesi), 11 Kasım 1918 Almanya (Rethondes Ateşkesi)."
        },
        {
            question: "Savaşı bitiren 4 ateşkesin devlet ve ateşkes isimleri eşleştirmesinde hangisi yanlıştır?",
            options: [
                "Almanya - Rethondes Ateşkesi",
                "Avusturya-Macaristan - Rethondes Ateşkesi",
                "Bulgaristan - Selanik Ateşkesi",
                "Osmanlı - Mondros Ateşkesi"
            ],
            correct: 1,
            explanation: "Avusturya-Macaristan'ın ateşkesi Villa Guisti (Wila Guisti) Ateşkesi'dir, Rethondes değil. Rethondes Almanya'nın ateşkesidir."
        },
        {
            question: "Kuva-yi Milliye ve I. Dünya Savaşı ateşkesleri hakkında aşağıdakilerden hangisi doğrudur?",
            options: [
                "Kuva-yi Milliye yabancı güçlerdir ve ateşkes sayısı 3'tür",
                "Kuva-yi Milliye düzenli ordudur ve son ateşkes Selanik'tir",
                "Kuva-yi Milliye halk tarafından kuruldu ve 4 ateşkes kronolojik sırayla: Selanik-Mondros-Villa Guisti-Rethondes",
                "Kuva-yi Milliye devlet tarafından kuruldu ve ilk ateşkes Mondros'tur"
            ],
            correct: 2,
            explanation: "Kuva-yi Milliye Anadolu halkı tarafından kurulan bölgesel direniş örgütüdür. Savaşı bitiren 4 ateşkes kronolojik olarak: Selanik (Bulgaristan), Mondros (Osmanlı), Villa Guisti (Avusturya-Macaristan), Rethondes (Almanya)."
        }
    ]
};

// Quiz Functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quiz-btn') || e.target.closest('.quiz-btn')) {
        const btn = e.target.classList.contains('quiz-btn') ? e.target : e.target.closest('.quiz-btn');
        const quizType = btn.getAttribute('data-quiz');
        startQuiz(quizType);
    }
});

function startQuiz(quizType) {
    const questions = quizData[quizType];
    if (!questions) return;

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;

    const quizBox = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    quizBox.style.cssText = `
        background: var(--bg-secondary);
        border: 2px solid var(--border);
        border-radius: ${isMobile ? '16px' : '20px'};
        padding: ${isMobile ? '24px' : '40px'};
        max-width: ${isMobile ? '95%' : '700px'};
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow-lg);
    `;

    function renderQuestion() {
        answered = false;
        const q = questions[currentQuestion];
        
        quizBox.innerHTML = `
            <div style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <span style="color: var(--primary); font-weight: 700; font-size: 14px;">Soru ${currentQuestion + 1}/${questions.length}</span>
                    <span style="color: var(--text-secondary); font-size: 14px;">Puan: ${score}</span>
                </div>
                <div style="background: var(--bg-tertiary); height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, var(--primary), var(--accent)); height: 100%; width: ${((currentQuestion) / questions.length) * 100}%; transition: width 0.3s ease;"></div>
                </div>
            </div>
            
            <h3 style="font-size: ${isMobile ? '18px' : '22px'}; color: var(--text-primary); margin-bottom: ${isMobile ? '20px' : '24px'}; line-height: 1.5;">${q.question}</h3>
            
            <div class="quiz-options" style="display: flex; flex-direction: column; gap: ${isMobile ? '10px' : '12px'}; margin-bottom: ${isMobile ? '20px' : '24px'};">
                ${q.options.map((opt, idx) => `
                    <button class="quiz-option" data-index="${idx}" style="
                        padding: ${isMobile ? '14px 16px' : '16px 20px'};
                        background: var(--bg-tertiary);
                        border: 2px solid var(--border);
                        border-radius: ${isMobile ? '10px' : '12px'};
                        text-align: left;
                        cursor: pointer;
                        font-size: ${isMobile ? '15px' : '16px'};
                        color: var(--text-primary);
                        transition: all 0.2s ease;
                        font-weight: 500;
                        line-height: 1.4;
                        min-height: ${isMobile ? '52px' : '56px'};
                        display: flex;
                        align-items: center;
                    ">${opt}</button>
                `).join('')}
            </div>
            
            <div id="explanation" style="display: none; padding: 16px; background: var(--bg-tertiary); border-left: 4px solid var(--secondary); border-radius: 8px; margin-bottom: 20px;">
                <strong style="color: var(--primary);">💡 Açıklama:</strong>
                <p style="color: var(--text-secondary); margin: 8px 0 0;">${q.explanation}</p>
            </div>
            
            <button id="nextBtn" style="display: none; width: 100%; padding: 16px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer;">
                ${currentQuestion < questions.length - 1 ? 'Sonraki Soru →' : 'Sonuçları Gör 🎉'}
            </button>
            
            <button id="closeQuiz" style="width: 100%; padding: 12px; background: transparent; color: var(--text-secondary); border: 2px solid var(--border); border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 12px;">
                Çıkış
            </button>
        `;

        // Add option click handlers
        const options = quizBox.querySelectorAll('.quiz-option');
        options.forEach(btn => {
            btn.addEventListener('click', function() {
                if (answered) return;
                answered = true;

                const selected = parseInt(this.getAttribute('data-index'));
                const isCorrect = selected === q.correct;

                if (isCorrect) {
                    this.style.background = 'linear-gradient(135deg, #06d6a0, #05a882)';
                    this.style.color = 'white';
                    this.style.borderColor = '#05a882';
                    score++;
                } else {
                    this.style.background = 'linear-gradient(135deg, #e63946, #c41e3a)';
                    this.style.color = 'white';
                    this.style.borderColor = '#c41e3a';
                    
                    // Show correct answer
                    options[q.correct].style.background = 'linear-gradient(135deg, #06d6a0, #05a882)';
                    options[q.correct].style.color = 'white';
                    options[q.correct].style.borderColor = '#05a882';
                }

                // Disable all options
                options.forEach(opt => opt.style.cursor = 'not-allowed');

                // Show explanation and next button
                document.getElementById('explanation').style.display = 'block';
                document.getElementById('nextBtn').style.display = 'block';
            });

            // Hover effect
            btn.addEventListener('mouseenter', function() {
                if (!answered) {
                    this.style.borderColor = 'var(--primary)';
                    this.style.transform = 'translateX(4px)';
                }
            });
            btn.addEventListener('mouseleave', function() {
                if (!answered) {
                    this.style.borderColor = 'var(--border)';
                    this.style.transform = 'translateX(0)';
                }
            });
        });

        // Next button - use setTimeout to ensure DOM is ready
        setTimeout(() => {
            const nextBtn = quizBox.querySelector('#nextBtn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        renderQuestion();
                    } else {
                        showResults();
                    }
                });
            }

            // Close button
            const closeBtn = quizBox.querySelector('#closeQuiz');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
            }
        }, 10);
    }

    function showResults() {
        const percentage = Math.round((score / questions.length) * 100);
        let message = '';
        let emoji = '';

        if (percentage >= 80) {
            message = 'Mükemmel! 🎉';
            emoji = '🌟';
        } else if (percentage >= 60) {
            message = 'İyi çalışma! 👍';
            emoji = '✨';
        } else if (percentage >= 40) {
            message = 'Fena değil, biraz daha çalış! 💪';
            emoji = '📚';
        } else {
            message = 'Daha çok çalışman gerekiyor! 📖';
            emoji = '💡';
        }

        quizBox.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: ${isMobile ? '64px' : '80px'}; margin-bottom: ${isMobile ? '16px' : '20px'};">${emoji}</div>
                <h2 style="font-size: ${isMobile ? '24px' : '32px'}; color: var(--primary); margin-bottom: 12px; line-height: 1.3;">${message}</h2>
                <div style="font-size: ${isMobile ? '36px' : '48px'}; font-weight: 800; color: var(--text-primary); margin: ${isMobile ? '20px' : '24px'} 0;">
                    ${score} / ${questions.length}
                </div>
                <div style="font-size: ${isMobile ? '18px' : '24px'}; color: var(--text-secondary); margin-bottom: ${isMobile ? '24px' : '32px'};">
                    Başarı Oranı: %${percentage}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
                    <div style="padding: 20px; background: var(--bg-tertiary); border-radius: 12px;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">Doğru</div>
                        <div style="font-size: 32px; font-weight: 800; color: var(--success);">${score}</div>
                    </div>
                    <div style="padding: 20px; background: var(--bg-tertiary); border-radius: 12px;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 4px;">Yanlış</div>
                        <div style="font-size: 32px; font-weight: 800; color: var(--primary);">${questions.length - score}</div>
                    </div>
                </div>
                
                <button id="retryQuiz" style="width: 100%; padding: 16px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; margin-bottom: 12px;">
                    🔄 Tekrar Dene
                </button>
                
                <button id="closeResults" style="width: 100%; padding: 12px; background: transparent; color: var(--text-secondary); border: 2px solid var(--border); border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer;">
                    Kapat
                </button>
            </div>
        `;

        setTimeout(() => {
            const retryBtn = quizBox.querySelector('#retryQuiz');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                    startQuiz(quizType);
                });
            }

            const closeBtn = quizBox.querySelector('#closeResults');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
            }
        }, 10);
    }

    renderQuestion();
    modal.appendChild(quizBox);
    document.body.appendChild(modal);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
setTimeout(() => {
    const cards = document.querySelectorAll('.glass-card, .city-card, .alliance-card, .war-box, .article-card, .ceasefire-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });
}, 100);

console.log('✅ İnkılap Tarihi Premium - Yüklendi! Başarılar! 🎓');
