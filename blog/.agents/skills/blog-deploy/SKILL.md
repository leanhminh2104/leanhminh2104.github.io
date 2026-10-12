---
name: blog-deploy
description: |
  Skill trien khai (deploy) blog leanhminh2104 len GitHub Pages /blog/.
  Bao gom: quy trinh deploy an toan, loc file nhay cam (env, key, token,
  API key hardcode), .gitignore chuan, xu ly loi, kiem tra trang thai,
  va rollback khi can. Local: d:\code\laragon\www\blog
  Git mirror: d:\code\laragon\www\leanhminh2104.github.io
---

# Blog Deploy Skill â€” Trien Khai An Toan Len GitHub Pages

## 1. TONG QUAN HE THONG DEPLOY

```
d:\code\laragon\www\blog\   (Thu muc lam viec chinh)
            |
            | deploy.bat  (1-click deploy)
            |
            v
d:\code\laragon\www\leanhminh2104.github.io\blog\   (Git repo local mirror)
            |
            | git push origin main
            |
            v
GitHub Repo: leanhminh2104/leanhminh2104.github.io
            |
            | GitHub Pages auto-build (~30-60 giay)
            |
            v
https://leanhminh2104.github.io/blog/   (LIVE)
```

Luong deploy:
1. Quet file nhay cam (bao mat)
2. robocopy SOURCE -> GIT_DIR (loai tru file cam)
3. git add blog/
4. git commit -m "..."
5. git push origin main
6. Kiem tra build status

---

## 2. DEPLOY BAT - CACH SU DUNG

File deploy.bat tai: d:\code\laragon\www\blog\deploy.bat

### Chay deploy:
Double-click deploy.bat HOAC chay trong terminal:
```bat
deploy.bat
```

### Cac buoc tu dong cua deploy.bat:

**Buoc 0:** Kiem tra git repo tai d:\code\laragon\www\leanhminh2104.github.io

**Buoc 1 - SCAN FILE NHAY CAM:**
- Tim .env, .env.*, .env.local, .env.production
- Tim file co chua password/secret/api_key/token
- Tim private key (*.pem, *.key, *.p12, *.pfx, id_rsa)
- Tim API key hardcode trong JS/HTML (sk-, ghp_, gho_, AIza, AKIA)
- Neu phat hien: CANH BAO va hoi co tiep tuc khong

**Buoc 2:** Tao thu muc dich neu chua co

**Buoc 3 - ROBOCOPY (loai tru file cam):**
Loai tru cac file: deploy.bat, *.bat, .env, *.log, *.pem, *.key,
*.p12, *.pfx, *.sql, *.bak, *.tmp, Thumbs.db, .DS_Store
Loai tru cac thu muc: .git, node_modules, vendor, .agents

**Buoc 4:** Xem git diff (preview thay doi)

**Buoc 5:** git add + git commit (nhap message)

**Buoc 6:** git push origin main

---

## 3. FILE VA THU MUC BI CHAN (KHONG BAO GIO PUSH)

### A. Loai tru qua robocopy /XF /XD

Nhung file LUON bi loai tru khi deploy:

| File/Pattern | Ly do |
|---|---|
| deploy.bat | Script noi bo, khong can thiet tren GitHub |
| *.bat | Tat ca script batch noi bo |
| .env | Bien moi truong - co the chua password |
| .env.* | Moi bien the .env |
| *.log | Log file dev, lo thong tin |
| *.pem *.key | SSL/TLS private key - cuc ky nguy hiem |
| *.p12 *.pfx | Certificate private |
| id_rsa id_dsa | SSH private key |
| *.sql | Database dump - co du lieu that |
| *.bak *.tmp | File tam, backup |
| Thumbs.db | Windows thumbnail cache |
| .DS_Store | macOS metadata |

Thu muc luon bi loai tru:
| Thu muc | Ly do |
|---|---|
| .git | Git internal folder |
| node_modules | Dependencies lon, khong can |
| vendor | PHP Composer deps |
| .agents | Skill files noi bo |

### B. .gitignore de bao ve kep

Tao file d:\code\laragon\www\leanhminh2104.github.io\.gitignore neu chua co:
```
# Bien moi truong
.env
.env.*
.env.local
.env.production
.env.staging

# Private keys & certificates
*.pem
*.key
*.p12
*.pfx
id_rsa
id_dsa
*.ppk

# Database dumps
*.sql
*.sqlite
*.db

# Log files
*.log
logs/
npm-debug.log*

# Backup files
*.bak
*.tmp
*.orig

# OS files
.DS_Store
.DS_Store?
Thumbs.db
ehthumbs.db
Desktop.ini

# Editor files
.vscode/settings.json
.idea/
*.swp
*.swo

# Node / PHP deps
node_modules/
vendor/

# Build output (neu co)
dist/
build/
.cache/

# Skill files noi bo
.agents/

# Deploy scripts
*.bat
```

Chay sau khi tao .gitignore:
```bash
git -C "d:\code\laragon\www\leanhminh2104.github.io" rm -r --cached .
git -C "d:\code\laragon\www\leanhminh2104.github.io" add .
git -C "d:\code\laragon\www\leanhminh2104.github.io" commit -m "chore: add .gitignore"
```

---

## 4. QUET FILE NHAY CAM TRUOC KHI DEPLOY

### Scan thu cong (PowerShell):

```powershell
# Tim tat ca file .env trong blog
Get-ChildItem -Recurse -Force -Path "d:\code\laragon\www\blog" -Filter ".env*" | Select-Object FullName

# Tim hardcode API key trong JS files
Select-String -Path "d:\code\laragon\www\blog\assets\js\*.js" `
    -Pattern "(sk-|ghp_|gho_|AIza|AKIA|Bearer |password\s*=|secret\s*=)" `
    -CaseSensitive:$false

# Tim hardcode trong HTML files
Select-String -Path "d:\code\laragon\www\blog\*.html" `
    -Pattern "(ghp_|gho_|sk-|AIza|AKIA)" `
    -CaseSensitive:$false

# Tim private key files
Get-ChildItem -Recurse -Path "d:\code\laragon\www\blog" -Include "*.pem","*.key","id_rsa","*.p12"
```

### Cac pattern nguy hiem can kiem tra:

| Pattern | Y nghia |
|---|---|
| ghp_xxxx | GitHub Personal Access Token |
| gho_xxxx | GitHub OAuth Token |
| sk-xxxx | OpenAI API Key |
| AIzaxxxx | Google API Key |
| AKIAxxxx | AWS Access Key ID |
| Bearer xxx | Bearer token bat ky |
| password = "xxx" | Password hardcode |
| secret_key = xxx | Secret key |

### Cach xu ly khi phat hien:

**Neu la file .env:**
1. Them vao .gitignore ngay
2. Xoa khoi git tracking: git rm --cached .env
3. Kiem tra lich su commit: git log --all --full-history -- .env

**Neu la API key hardcode trong JS/HTML:**
1. Thay bang bien moi truong hoac config rieng
2. Thu hoi (revoke) key bi lo ngay lap tuc tren dashboard
3. Tao key moi

**Neu da push nhay cam len GitHub:**
1. Thu hoi key NGAY LAP TUC
2. Dung BFG Repo Cleaner de xoa lich su:
```bash
# Download BFG
java -jar bfg.jar --replace-text passwords.txt repo.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push origin --force
```
3. GitHub co cong cu Secret Scanning se tu dong canh bao

---

## 5. QUY TRINH DEPLOY CHUAN (DAY DU)

### Truoc khi deploy - kiem tra local:

1. Mo blog.test trong trinh duyet, kiem tra trang hien thi dung
2. Test tren mobile (DevTools -> Device Toolbar)
3. Kiem tra console khong co loi JS
4. Kiem tra tat ca link khong bj 404

### Deploy:

**Cach 1: Dung deploy.bat (KHUYEN DUNG)**
```bat
REM Double-click hoac chay trong terminal
d:\code\laragon\www\blog\deploy.bat
```

**Cach 2: Thu cong step by step (Chong conflict 100%)**
```bash
# 1. Cap nhat va lam sach Git mirror truoc (tranh conflict voi GitHub Actions chore commit)
cd d:\code\laragon\www\leanhminh2104.github.io
git fetch origin main
git reset --hard origin/main

# 2. Dong bo files tu source blog sang mirror
robocopy "d:\code\laragon\www\blog" "d:\code\laragon\www\leanhminh2104.github.io\blog" /E /XF "deploy.bat" "*.bat" ".env" "*.log" /XD ".git" "node_modules" ".agents"

# 3. Xem thay doi
git status blog/
git diff --stat blog/

# 4. Add va commit
git add blog/
git commit -m "feat: [mo ta thay doi]"

# 5. Push
git push origin main
```

### Sau khi deploy - kiem tra:

```bash
# Xem trang thai GitHub Pages
gh api repos/leanhminh2104/leanhminh2104.github.io/pages

# Xem commit moi nhat
gh api repos/leanhminh2104/leanhminh2104.github.io/commits/main

# Xem cac file da thay doi trong commit cuoi
git -C "d:\code\laragon\www\leanhminh2104.github.io" log --name-status -1

# Xem tat ca commit gan day
git -C "d:\code\laragon\www\leanhminh2104.github.io" log --oneline -10
```

Kiem tra URL live:
- Trang chu: https://leanhminh2104.github.io/blog/
- Cong nghe: https://leanhminh2104.github.io/blog/tech/
- Cuoc song: https://leanhminh2104.github.io/blog/life/

---

## 6. CAC TINH HUONG LOI THUONG GAP

### Loi: "fatal: not a git repository"
```bash
# Git repo chua duoc clone
git clone https://github.com/leanhminh2104/leanhminh2104.github.io.git "d:\code\laragon\www\leanhminh2104.github.io"
```

### Loi: "Authentication failed"
```bash
# Xac thuc lai GitHub CLI
gh auth login
gh auth setup-git

# Hoac kiem tra credential
git -C "d:\code\laragon\www\leanhminh2104.github.io" config credential.helper
```

### Loi: "Updates were rejected" (conflict)
```bash
cd d:\code\laragon\www\leanhminh2104.github.io

# Keo thay doi tu remote truoc
git pull origin main

# Neu van conflict thi:
git fetch origin
git reset --hard origin/main

# Sau do dong bo lai va push
```

### Loi: "nothing to commit"
```bash
# Kiem tra thay doi thuc su
git -C "d:\code\laragon\www\leanhminh2104.github.io" status -v

# Co the do robocopy khong thay doi gi (file giong nhau)
# Kiem tra so file:
Get-ChildItem -Recurse "d:\code\laragon\www\blog" | Measure-Object
Get-ChildItem -Recurse "d:\code\laragon\www\leanhminh2104.github.io\blog" | Measure-Object
```

### Loi: GitHub Pages khong cap nhat
```bash
# Kiem tra build status
gh api repos/leanhminh2104/leanhminh2104.github.io/pages

# Xem GitHub Actions log
gh run list --repo leanhminh2104/leanhminh2104.github.io

# Doi them 60-120 giay, GitHub Pages co the cham
```

---

## 7. ROLLBACK KHI CO SU CO

### Rollback 1 commit (hoan tac commit cuoi cung):
```bash
cd d:\code\laragon\www\leanhminh2104.github.io

# Xem commit history
git log --oneline -5

# Hoan tac commit cuoi (giu nguyen files local)
git revert HEAD
git push origin main

# HOAC: Xoa commit cuoi (NGUY HIEM - mat du lieu)
# git reset --hard HEAD~1
# git push --force origin main
```

### Rollback ve phien ban cu hon:
```bash
# Xem lich su commit
git log --oneline blog/

# Rollback ve commit cu theo SHA
git checkout [SHA] -- blog/
git commit -m "rollback: hoan ve phien ban [SHA]"
git push origin main
```

### Khoi phuc file bi xoa nham:
```bash
# Tim commit cua file da xoa
git log --all --full-history -- blog/[slug]/index.html

# Khoi phuc file tu commit cu
git checkout [SHA] -- blog/[slug]/index.html
```

---

## 8. TU DONG HOA NANG CAO

### Git hooks - tu dong quet truoc khi push

Tao file d:\code\laragon\www\leanhminh2104.github.io\.git\hooks\pre-push:
```bash
#!/bin/sh
echo "Dang quet file nhay cam..."

# Quet API key trong blog/
if git diff --cached --name-only | xargs grep -l "ghp_\|gho_\|sk-\|AIza\|AKIA" 2>/dev/null; then
    echo "DUNG! Phat hien API key trong files se duoc commit!"
    echo "Hay kiem tra va xoa truoc khi push."
    exit 1
fi

echo "OK - Khong phat hien thong tin nhay cam."
exit 0
```

Them quyen thuc thi:
```bash
# Tren Git Bash (Windows):
chmod +x "d:\code\laragon\www\leanhminh2104.github.io\.git\hooks\pre-push"
```

### GitHub Action - Quet bi mat tu dong

Tao .github/workflows/secret-scan.yml trong repo:
```yaml
name: Security Scan

on:
  push:
    branches: [main]
    paths: ['blog/**']

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Scan for secrets
        run: |
          # Quet API key pattern trong blog
          if grep -r "ghp_\|gho_\|sk-\|AIza\|AKIA" blog/ --include="*.html" --include="*.js" 2>/dev/null; then
            echo "CANH BAO: Phat hien pattern trong giong API key!"
            exit 1
          fi
          echo "OK: Khong phat hien thong tin nhay cam."

      - name: Check file types
        run: |
          # Kiem tra khong co file nguy hiem
          for ext in pem key p12 pfx sql bak; do
            if find blog/ -name "*.${ext}" 2>/dev/null | grep -q .; then
              echo "CANH BAO: Tim thay file .${ext} trong blog/"
              exit 1
            fi
          done
          echo "OK: Khong tim thay file nguy hiem."
```

---

## 9. QUAN LY LICH SU DEPLOY

### Xem lich su commit cua blog:
```bash
git -C "d:\code\laragon\www\leanhminh2104.github.io" log --oneline --all -- blog/
```

### Xem chi tiet thay doi 1 commit:
```bash
git -C "d:\code\laragon\www\leanhminh2104.github.io" show [SHA] --stat
```

### Xem lich su 1 bai viet cu the:
```bash
git -C "d:\code\laragon\www\leanhminh2104.github.io" log --follow blog/tech/laravel-tips/index.html
```

### Xem ai thay doi dong nao trong file:
```bash
git -C "d:\code\laragon\www\leanhminh2104.github.io" blame blog/tech/laravel-tips/index.html
```

### Tao tag cho phien ban blog:
```bash
cd d:\code\laragon\www\leanhminh2104.github.io
git tag -a "blog-v1.0" -m "Blog release v1.0 - Initial launch"
git push origin --tags
```

---

## 10. CHECKLIST DEPLOY AN TOAN

Truoc khi chay deploy.bat:

### Kiem tra bao mat:
- [ ] Khong co file .env trong blog/
- [ ] Khong co API key hardcode trong *.js hoac *.html
- [ ] Khong co file *.pem, *.key, *.sql trong blog/
- [ ] Khong co password trong code HTML/JS

### Kiem tra noi dung:
- [ ] Blog hien thi dung o http://blog.test/
- [ ] Bai viet moi xuat hien tren trang chu
- [ ] Tat ca link hoat dong (khong 404)
- [ ] Console khong co loi JS

### Sau khi deploy:
- [ ] Kiem tra https://leanhminh2104.github.io/blog/ sau 60 giay
- [ ] Test tren mobile
- [ ] Kiem tra gh api repos/.../pages tra ve "built"

---

## 11. CAC LENH HAY DUNG

```bash
# Kiem tra trang thai auth GitHub
gh auth status

# Xem trang thai GitHub Pages
gh api repos/leanhminh2104/leanhminh2104.github.io/pages

# Xem traffic 14 ngay qua
gh api repos/leanhminh2104/leanhminh2104.github.io/traffic/views

# Xem top pages duoc xem nhieu
gh api repos/leanhminh2104/leanhminh2104.github.io/traffic/popular/paths

# Xem cac commit gan day
git -C "d:\code\laragon\www\leanhminh2104.github.io" log --oneline -10

# So sanh 2 commit
git -C "d:\code\laragon\www\leanhminh2104.github.io" diff HEAD~1 HEAD -- blog/

# Xem du lich su commit
git -C "d:\code\laragon\www\leanhminh2104.github.io" log --graph --oneline --all

# Xoa cac file untracked khong can
git -C "d:\code\laragon\www\leanhminh2104.github.io" clean -fd blog/

# Pull thay doi moi nhat tu remote
git -C "d:\code\laragon\www\leanhminh2104.github.io" pull origin main
```
