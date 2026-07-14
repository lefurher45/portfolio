# Portfolio — Adolphe PANA

Site React (Vite) statique, thème noir & blanc, sans base de données. Le contenu (compétences, certifications, projets) vit dans des fichiers JSON versionnés dans `src/data/`, éditables directement sur GitHub ou via une page admin intégrée.

## Développement local

```bash
npm install
npm run dev
```

## Déploiement sur Netlify

1. Pousse ce dossier dans un dépôt GitHub.
2. Sur Netlify : **New site from Git** → sélectionne le dépôt. Build command : `npm run build`, publish directory : `dist` (déjà configuré dans `netlify.toml`).
3. Active l'admin sans base de données :
   - **Site settings > Identity > Enable Identity**
   - **Identity > Services > Git Gateway > Enable Git Gateway**
   - Dans **Identity**, invite ton propre email comme utilisateur.
4. Une fois le site en ligne, va sur `tonsite.netlify.app/admin`, connecte-toi avec l'email invité, et tu peux modifier compétences / certifications / projets depuis une interface — chaque sauvegarde fait un commit Git et Netlify rebuild automatiquement.

## Structure du contenu

- `src/data/profile.json` — identité, bio, liens, CV
- `src/data/experience.json` — formation et expérience
- `src/data/skills.json` — compétences, outils, langages
- `src/data/certifications.json` — certifications avec badge/lien/sujets
- `src/data/projects.json` — projets avec photos, description, lien de référence

## À compléter

- `verifyUrl` dans `certifications.json` : lien exact vers le badge Cisco (Credly ou autre).
- Badge image de la certification Cisco (à uploader via `/admin` ou dans `public/uploads`).
- Vrais projets (le fichier contient un exemple à remplacer).
- URL LinkedIn exacte si différente de celle pré-remplie.
- Noms exacts de certains outils de sécurité mentionnés en vocal (à confirmer avant publication).
