# İnkılap Tarihi Premium - Deployment Guide

## 🚀 GitHub Pages'e Deploy Etme

### 1. GitHub'a Giriş Yap
Terminal'de şu komutu çalıştır:
```bash
gh auth login
```

Seçenekler:
- **Where do you use GitHub?** → GitHub.com
- **What is your preferred protocol?** → HTTPS
- **Authenticate Git with your GitHub credentials?** → Yes
- **How would you like to authenticate?** → Login with a web browser

Ekranda bir kod gösterilecek, onu kopyala ve tarayıcıda GitHub'a giriş yap.

### 2. Repository Oluştur ve Deploy Et
```bash
cd /home/mint/Desktop/exam/inkilap-premium

# Git repo başlat
git init
git add .
git commit -m "Initial commit - İnkılap Tarihi PWA"

# GitHub repo oluştur ve push et
gh repo create inkilap-tarihi-pwa --public --source=. --remote=origin --push

# GitHub Pages'i aktifleştir
gh api repos/:owner/inkilap-tarihi-pwa/pages -X POST -f source[branch]=main -f source[path]=/
```

### 3. Site Linki
Siteniz şu adreste yayında olacak:
```
https://[kullanici-adin].github.io/inkilap-tarihi-pwa/
```

## ✨ PWA Özellikleri

✅ Offline çalışma
✅ Ana ekrana eklenebilir
✅ Mobil ve desktop uyumlu
✅ Hızlı yükleme
✅ Karanlık/Açık tema
✅ İlerleme takibi
✅ 33 kapsamlı quiz sorusu

## 🔄 Güncelleme Yapmak İçin

```bash
cd /home/mint/Desktop/exam/inkilap-premium
git add .
git commit -m "Update: [değişiklik açıklaması]"
git push origin main
```

Birkaç dakika içinde site güncellenecek!
