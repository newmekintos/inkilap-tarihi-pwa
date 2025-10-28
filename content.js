const contentData = {
    ataturk: `
        <div class="section-header">
            <h2 class="section-title">Atatürk'ün Hayatı</h2>
            <p class="section-description">Mustafa Kemal Atatürk'ün hayatı, eğitimi ve fikir dünyası</p>
            <button class="quiz-btn" data-quiz="ataturk">📝 Bu Konuyu Test Et</button>
        </div>

        <div class="cards-grid">
            <div class="glass-card">
                <div class="card-header">
                    <span class="card-icon">🏫</span>
                    <h3>Okuduğu Okullar</h3>
                </div>
                <ul class="card-list">
                    <li>Mahalle Mektebi</li>
                    <li>Şemsi Efendi Okulu</li>
                    <li>Selanik Mülkiye Rüştiyesi</li>
                    <li>Selanik Askeri Rüştiyesi</li>
                    <li>Manastır Askeri İdadisi</li>
                    <li>İstanbul Harp Okulu</li>
                    <li>İstanbul Harp Akademisi</li>
                </ul>
            </div>

            <div class="glass-card">
                <div class="card-header">
                    <span class="card-icon">💭</span>
                    <h3>Hayatını Etkileyen Düşünürler</h3>
                </div>
                <ul class="card-list">
                    <li>Ziya Gökalp</li>
                    <li>Namık Kemal</li>
                    <li>Mehmet Emin Yurdakul</li>
                    <li>Tevfik Fikret</li>
                    <li>J.J. Roussea</li>
                    <li>Montesquieu</li>
                    <li>Voltaire</li>
                </ul>
            </div>

            <div class="glass-card">
                <div class="card-header">
                    <span class="card-icon">⚔️</span>
                    <h3>I. Dünya Savaşı Cepheleri</h3>
                </div>
                <ul class="card-list">
                    <li>Kafkas Cephesi</li>
                    <li>Çanakkale Cephesi</li>
                    <li>Suriye - Filistin Cephesi</li>
                </ul>
            </div>
        </div>

        <div class="section-block">
            <h3 class="block-title">Fikir Hayatını Etkileyen Şehirler</h3>
            
            <div class="city-cards">
                <div class="city-card selanik">
                    <div class="city-header">
                        <h4>SELANİK</h4>
                        <div class="city-badge">🏛️</div>
                    </div>
                    <ul class="city-list">
                        <li>Farklı kültürleri yakından tanıma fırsatı yakalaması</li>
                        <li>İnançlara ve fikirlere hoşgörülü olması</li>
                        <li>Avrupa'daki gelişmeleri ve yenilikleri yakından takip etmesi</li>
                        <li>Modernleşme, yenilik ve özgürlük kavramlarını tanıması</li>
                    </ul>
                </div>

                <div class="city-card sofya">
                    <div class="city-header">
                        <h4>SOFYA</h4>
                        <div class="city-badge">🏰</div>
                    </div>
                    <ul class="city-list">
                        <li>Batı uygarlığını yakından tanıması</li>
                        <li>Milliyetçilik anlayışının güçlenmesi</li>
                        <li>Diplomasi tecrübesi kazanması</li>
                    </ul>
                </div>

                <div class="city-card manastir">
                    <div class="city-header">
                        <h4>MANASTIR</h4>
                        <div class="city-badge">🎖️</div>
                    </div>
                    <ul class="city-list">
                        <li>Liderlik ve sorgulama yeteneğinin gelişmesi</li>
                        <li>Milli bilinç ve vatan sevgisinin gelişmesi</li>
                        <li>Batı düşüncesiyle tanışması</li>
                        <li>Askeri disiplin ve örgütlenme becerisi kazanması</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    
    ww1: `
        <div class="section-header">
            <h2 class="section-title">I. Dünya Savaşı</h2>
            <p class="section-description">Cepheler, ittifaklar ve savaşın sebepleri</p>
            <button class="quiz-btn" data-quiz="ww1">📝 Bu Konuyu Test Et</button>
        </div>

        <div class="alliance-grid">
            <div class="alliance-card itilaf">
                <div class="alliance-header">
                    <h3>İtilaf Devletleri 🛡️</h3>
                </div>
                <div class="timeline-section">
                    <div class="timeline-item">
                        <h4>Savaş Öncesi</h4>
                        <p>İngiltere, Fransa, Rusya</p>
                    </div>
                    <div class="timeline-item">
                        <h4>Savaş Sonrası</h4>
                        <p>İngiltere, Fransa, Rusya, Sırbistan, İtalya, Yunanistan, Romanya, Japonya, Brezilya, ABD</p>
                    </div>
                </div>
            </div>

            <div class="alliance-card ittifak">
                <div class="alliance-header">
                    <h3>İttifak Devletleri ⚔️</h3>
                </div>
                <div class="timeline-section">
                    <div class="timeline-item">
                        <h4>Savaş Öncesi</h4>
                        <p>Almanya, Avusturya - Macaristan, İtalya</p>
                    </div>
                    <div class="timeline-item">
                        <h4>Savaş Sonrası</h4>
                        <p>Almanya, Avusturya - Macaristan, Osmanlı Devleti, Bulgaristan</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-block">
            <h3 class="block-title">Devletlerin Savaşa Girme Nedenleri</h3>
            <div class="reasons-grid">
                <div class="reason-card"><strong>🇬🇧 İngiltere:</strong> Almanya'nın yayılmacı politikası durdurmak, mevcut müstemlekelerini korumak, dünya üzerindeki üstünlüğünü sürdürmek</div>
                <div class="reason-card"><strong>🇫🇷 Fransa:</strong> Almanya'nın yayılmacı politikası durdurmak, mevcut müstemlekelerini korumak, dünya üzerindeki üstünlüğünü sürdürmek</div>
                <div class="reason-card"><strong>🇷🇺 Rusya:</strong> Sıcak denizlere inmek ve siyasi egemenliğini genişletmek</div>
                <div class="reason-card"><strong>🇩🇪 Almanya:</strong> Sömürge elde etmek ve siyasi nüfuz alanını genişletmek</div>
                <div class="reason-card"><strong>🇦🇹 Avusturya-Macaristan:</strong> Balkanlarda genişlemek</div>
                <div class="reason-card"><strong>🇹🇷 Osmanlı Devleti:</strong> Kaybettiği toprakları geri almak ve siyasi yalnızlıktan kurtulmak</div>
                <div class="reason-card"><strong>🇧🇬 Bulgaristan:</strong> II. Balkan savaşı sonrası kaybettiği toprakları geri almak</div>
                <div class="reason-card"><strong>🇯🇵 Japonya:</strong> Uzak Doğu'da Alman sömürgelerini ele geçirmek</div>
            </div>
        </div>

        <div class="section-block">
            <h3 class="block-title">Osmanlı Cepheleri</h3>
            <div class="fronts-container">
                <div class="front-box attack">
                    <h4>SALDIRI</h4>
                    <p class="front-hint">"K" ile başlar</p>
                    <ul>
                        <li>Kanal Cephesi</li>
                        <li>Kafkas Cephesi</li>
                    </ul>
                </div>
                <div class="front-box defense">
                    <h4>SAVUNMA</h4>
                    <p class="front-hint">Geriye kalanlar</p>
                    <ul>
                        <li>Suriye-Filistin</li>
                        <li>Çanakkale</li>
                        <li>Irak-Basra</li>
                        <li>Hicaz-Yemen</li>
                    </ul>
                </div>
                <div class="front-box help">
                    <h4>YARDIM</h4>
                    <p class="front-hint">"YA" ile biter</p>
                    <ul>
                        <li>Makedonya</li>
                        <li>Galiçya</li>
                        <li>Romanya</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    
    balkan: `
        <div class="section-header">
            <h2 class="section-title">Balkan Savaşları</h2>
            <p class="section-description">I. ve II. Balkan Savaşları</p>
            <button class="quiz-btn" data-quiz="balkan">📝 Bu Konuyu Test Et</button>
        </div>

        <div class="war-comparison">
            <div class="war-box war-1">
                <div class="war-header">
                    <h3>I. Balkan Savaşı ⚔️</h3>
                </div>
                <div class="war-content">
                    <div class="war-sides">
                        <strong>Osmanlı Devleti</strong>
                        <p>← Yunanistan, Bulgaristan, Sırbistan, Karadağ</p>
                    </div>
                    <div class="war-result lost">
                        <h4>Kaybedilen Topraklar</h4>
                        <div class="badem-hint">B-A-D-E-M</div>
                        <ul>
                            <li><strong>B</strong>atı Trakya</li>
                            <li><strong>A</strong>rnavutluk</li>
                            <li><strong>D</strong>oğu Trakya (Edirne ve Kırklareli)</li>
                            <li><strong>E</strong>ge Adaları</li>
                            <li><strong>M</strong>akedonya</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="war-box war-2">
                <div class="war-header">
                    <h3>II. Balkan Savaşı 🛡️</h3>
                </div>
                <div class="war-content">
                    <div class="war-sides">
                        <strong>Bulgaristan Krallığı</strong>
                        <p>← Romanya, Sırbistan, Yunanistan, Osmanlı</p>
                    </div>
                    <div class="war-result won">
                        <h4>Geri Alınan Topraklar</h4>
                        <ul>
                            <li>✓ Edirne</li>
                            <li>✓ Kırklareli</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    trablusgarp: `
        <div class="section-header">
            <h2 class="section-title">Trablusgarp Savaşı (1911)</h2>
            <p class="section-description">Osmanlı-İtalya Savaşı ve Uşi Antlaşması</p>
            <button class="quiz-btn" data-quiz="trablusgarp">📝 Bu Konuyu Test Et</button>
        </div>

        <div class="cards-grid">
            <div class="glass-card accent">
                <div class="card-header">
                    <span class="card-icon">📋</span>
                    <h3>Savaşın Nedenleri</h3>
                </div>
                <ul class="card-list">
                    <li>İtalya'nın gelişen sanayisi için hammadde ve pazar arayışına girmesi</li>
                    <li>Osmanlı Devleti'nin güçsüz olması ve bölgeye müdahalesinin zor olması</li>
                    <li>Trablusgarp'ın coğrafi konumunun İtalya için yakın olması</li>
                    <li>İtalya'nın Habeşistan yenilgisinde yitirmiş olduğu saygınlığı yeniden kazanma isteği</li>
                </ul>
            </div>

            <div class="glass-card accent">
                <div class="card-header">
                    <span class="card-icon">📜</span>
                    <h3>1912 - Uşi Antlaşması</h3>
                </div>
                <h4>Antlaşmanın Önemi:</h4>
                <ul class="card-list">
                    <li>Osmanlı'nın topraklarını koruyamayacağı ortaya çıktı</li>
                    <li>Kuzey Afrika'daki son toprak parçası kaybedildi</li>
                    <li>Halifelik ikinci defa siyasi bir güç olarak kullanıldı</li>
                </ul>
            </div>
        </div>
    `,
    
    mondros: `
        <div class="section-header">
            <h2 class="section-title">Mondros Mütarekesi</h2>
            <p class="section-description">I. Dünya Savaşı'nı bitiren ateşkes</p>
            <button class="quiz-btn" data-quiz="mondros">📝 Bu Konuyu Test Et</button>
        </div>

        <div class="mondros-articles">
            <div class="article-card">
                <div class="article-number">7</div>
                <div class="article-content">
                    <h3>7. Madde</h3>
                    <p class="article-text">İtilaf Devletleri güvenliğini tehdit eden herhangi bir bölgede karışıklık çıkması halinde o bölgeyi işgal edebilecek.</p>
                    <div class="article-interpretation">
                        <strong>💡 Yorum:</strong> Bu madde İtilaf Devletleri'nin yapacağı işgallerin hukuki dayanağını oluşturmuştur.
                    </div>
                </div>
            </div>

            <div class="article-card">
                <div class="article-number">24</div>
                <div class="article-content">
                    <h3>24. Madde</h3>
                    <p class="article-text">Vilayet-i Sitte'de (Erzurum, Van, Bitlis, Sivas, Diyarbakır, Elazığ) herhangi bir karışıklık çıkarsa İtilaf Devletleri buralara işgal edecek.</p>
                    <div class="article-interpretation">
                        <strong>💡 Yorum:</strong> Bu madde Doğu Anadolu'da Ermeni Devletini kurmaya yöneliktir.
                    </div>
                </div>
            </div>
        </div>
    `,
    
    kuvay: `
        <div class="section-header">
            <h2 class="section-title">Kuva-yi Milliye Hareketi</h2>
            <p class="section-description">Ulusal direniş örgütlenmesi</p>
            <button class="quiz-btn" data-quiz="kuvay">📝 Bu Konuyu Test Et</button>
        </div>

        <div class="cards-grid">
            <div class="glass-card">
                <div class="card-header">
                    <span class="card-icon">📖</span>
                    <h3>Tanım</h3>
                </div>
                <p class="card-text">Düşman işgallerine karşı yurdun çeşitli bölgelerinde Anadolu halkı tarafından kurulan bölgesel silahlı direniş örgütüne <strong>Kuvayi Milliye</strong> denir.</p>
            </div>

            <div class="glass-card">
                <div class="card-header">
                    <span class="card-icon">✅</span>
                    <h3>Faydaları</h3>
                </div>
                <ul class="card-list">
                    <li>Düzenli ordu kuruluncaya kadar ülkenin savunmasını sağladılar</li>
                    <li>Düşmanın ilerlemesi zorlaştırıldı ve oyaladılar</li>
                    <li>Örgütlenme sürecinde zaman kazandırdılar</li>
                    <li>Milli Mücadele ruhunun ortaya çıkmasını sağladılar</li>
                    <li>Milli birlik ve dayanışmayı artırdılar</li>
                </ul>
            </div>
        </div>

        <div class="section-block">
            <h3 class="block-title">Savaşı Bitiren Ateşkesler</h3>
            <div class="ceasefire-timeline">
                <div class="ceasefire-card">
                    <div class="ceasefire-date">29 Eylül 1918</div>
                    <div class="ceasefire-country">Bulgaristan</div>
                    <div class="ceasefire-name">Selanik Ateşkesi</div>
                </div>
                <div class="ceasefire-card highlight">
                    <div class="ceasefire-date">30 Ekim 1918</div>
                    <div class="ceasefire-country">Osmanlı Devleti</div>
                    <div class="ceasefire-name">Mondros Ateşkesi</div>
                </div>
                <div class="ceasefire-card">
                    <div class="ceasefire-date">3 Kasım 1918</div>
                    <div class="ceasefire-country">Avusturya - Macaristan</div>
                    <div class="ceasefire-name">Villa Guisti Ateşkesi</div>
                </div>
                <div class="ceasefire-card">
                    <div class="ceasefire-date">11 Kasım 1918</div>
                    <div class="ceasefire-country">Almanya</div>
                    <div class="ceasefire-name">Rethondes Ateşkesi</div>
                </div>
            </div>
        </div>
    `
};

// Load content on page load
document.addEventListener('DOMContentLoaded', () => {
    Object.keys(contentData).forEach(key => {
        const section = document.querySelector(`[data-content="${key}"]`);
        if (section) {
            section.innerHTML = contentData[key];
        }
    });
});
