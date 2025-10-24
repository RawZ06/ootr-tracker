# 🎯 OOT Randomizer Tracker — Projet Allsanity Extreme

## 🧠 Contexte

Ce projet vise à créer un **outil web complet** pour suivre la progression dans une seed *Allsanity* du **Ocarina of Time Randomizer** (OoTR).  
L’objectif est de permettre aux joueurs d’enregistrer leurs **entrées découvertes** et **checks complétés**, tout en offrant des fonctions d’import/export pour sauvegarder et reprendre la session à tout moment.

Ce projet s’appuie sur une **seed réelle avec spoiler log** fournie :  
`OoTR_1994978_44A4NP37P1_Spoilers.json`  
👉 Elle sert de base pour construire la **liste des entrées** et des **checks** intégrées à l’application.

---

## ⚙️ Fonctionnalités principales

### 🔍 1. Gestion des Entrées
- Table dynamique listant toutes les entrées du jeu.
- Chaque entrée comporte :
  - Nom d’origine (ex : “Lost Woods Bridge”)
  - Destination réelle (ex : “Hyrule Field”)
  - Type : Interior / Grotto / Dungeon / Overworld / Warp / Boss
  - Conditions (Child / Adult / Items requis)
  - Notes personnalisées

### 🧩 2. Gestion des Checks
- Liste complète des checks : coffres, skulltulas, grottes, shops, etc.
- Statut : Fait ✅ / Bloqué 🔒 / Partiel ⏳ / Important ⚠️
- Item obtenu et condition d’accès.
- Recherche et filtrage par région, type ou logique.

### 💾 3. Système d’import/export
- Sauvegarde locale ou fichier `.json` téléchargeable.
- Rechargement complet de la progression.
- Sauvegarde automatique optionnelle dans le navigateur (LocalStorage).

### 🧠 4. Interface utilisateur
- WebApp moderne (React / Vue / Svelte selon préférence).
- Mode clair/sombre.
- Filtres dynamiques, recherche instantanée.
- Tableau responsive (desktop/mobile).
- Coloration conditionnelle (état des checks/entrées).

### 📊 5. Statistiques
- Pourcentage de progression (checks complétés vs total).
- Nombre d’entrées découvertes.
- Liste d’items de progression obtenus.

## 🧩 Structure des données

### 📘 Exemple de modèle JSON pour sauvegarde

```json
{
  "version": "1.0",
  "seed_id": "44A4NP37P1",
  "created_at": "2025-10-24T21:35:33.555162",
  "entrances": [
    {
      "id": "entrance_001",
      "from": "Kokiri Forest - Link's House",
      "to": "Temple of Time",
      "type": "Interior",
      "age": "Adult",
      "notes": "Spawn adulte"
    }
  ],
  "checks": [
    {
      "id": "check_001",
      "region": "Kokiri Forest",
      "name": "Mido Chest Top Left",
      "status": "done",
      "item": "Prelude of Light",
      "logic": "none",
      "notes": "Early access"
    }
  ],
  "inventory": {
    "hookshot": true,
    "bow": false,
    "bomb_bag": true
  }
}
```

---

## 🧭 Méthodologie de suivi

### Entrances Tracker
| Zone d’origine | Entrée | Sortie (réelle) | Type | Notes |
|----------------|---------|------------------|------|--------|
| Kokiri Forest | Link’s House | Temple of Time | Interior | Spawn adulte |
| Lost Woods | Bridge | Hyrule Field | Overworld | Accès libre |
| Gerudo Valley | Tent | ??? | Interior | À explorer |

### Checks Tracker
| Région | Check | Statut | Item | Condition | Notes |
|--------|--------|--------|------|------------|--------|
| Kokiri Forest | Mido Chest TL | ✅ | Prelude of Light | Aucun | Early |
| Graveyard | Royal Tomb Song | 🔒 | - | Zelda’s Lullaby | À revenir |

Symboles :
- ✅ = fait  
- 🔒 = bloqué  
- ⏳ = partiel  
- ⚠️ = important

---

## 💾 Format d’export/import

Les données sont enregistrées sous forme JSON avec le schéma ci-dessus.  
L’utilisateur peut :
- Exporter → fichier `.json` contenant toute la progression.
- Importer → recharge complète de l’état de jeu.

---

## 🧠 Données d’exemple (basées sur ta seed)

Les données initiales (entrances et checks) peuvent être extraites automatiquement depuis le fichier :  
`OoTR_1994978_44A4NP37P1_Spoilers.json`  

Ce fichier contient :
- 600+ entrées remappées (entrance randomizer total)
- 1500+ checks (Allsanity complet)
- Tous les items de progression, shops, skulltulas, songs, etc.

Le parseur devra générer :
- Un tableau `entrances[]` à partir de la clé `"entrances"`
- Un tableau `checks[]` à partir de la clé `"locations"`

Ces données serviront de base à l’application.

---

## 🚀 Spécifications UI/UX

### Filtres dynamiques
- Filtrer par type d’entrée ou de check.
- Recherche textuelle instantanée.
- Tri alphabétique ou par région.

### Codes couleur
| Couleur | Signification |
|----------|----------------|
| 🟢 Vert | Entrée/Check validé |
| 🟡 Jaune | En attente |
| 🔴 Rouge | Bloqué |
| ⚪ Gris | Inconnu / Non testé |

### Fonctionnalités utilisateur
- Notes libres sur chaque ligne.
- Historique des items de progression.
- Mode focus par région (ex : “Kakariko Village only”).

---

## 💡 Extensions futures

- Synchronisation cloud (via GitHub OAuth ou Firebase).
- Export en format EmoTracker (.json).
- Génération automatique de seed depuis ootrandomizer.com API.
- Intégration d’un “Spoiler Viewer” intégré.

---

## 🤝 Collaboration

Ce projet est conçu pour être développé en collaboration.  
Claude ou tout autre LLM disposant du `README.md` et du fichier seed (`OoTR_1994978_44A4NP37P1_Spoilers.json`) peuvent :

- Générer le modèle de données initial (`entrances`, `checks`).  
- Construire la base de l’interface web.  
- Implémenter les fonctions d’import/export et de sauvegarde.

---

## 📜 Licence

MIT License — libre d’utilisation, modification et distribution.

---

## 🧩 Auteur
Créé par **[ton nom / pseudo]** — Projet de recherche et développement sur le suivi d’une seed *Allsanity* OoT.

---
