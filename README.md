# etudiant.com — prototype frontend éducatif

## Overview

Prototype d’interface éducative en HTML, CSS et JavaScript. Ce dépôt public contient `rehema.html`, `style.css` et `script.js`. Il ne doit pas être présenté comme l’application RM Study sans preuve établissant ce lien.

## Problem / Solution

Explorer une interface regroupant des cours, un espace d’étude et des interactions pédagogiques. Le prototype permet d’examiner l’organisation visuelle et les comportements locaux avant une éventuelle implémentation serveur.

## Features

La navigation entre sections, le filtrage de cartes de cours, l’horloge, le thème et certains états locaux sont codés côté navigateur. Un minuteur et des interactions de progression sont également présents.

**Simulations :** l’assistant répond à partir de règles et de réponses prédéfinies, sans modèle d’IA connecté. Le salon vocal ne transporte pas d’audio. L’import de document et l’exécution de code ne constituent pas des services serveur opérationnels. Les notifications et points affichés ne prouvent aucun usage réel.

## Technologies / Architecture

- `rehema.html` : structure et contenu de l’interface.
- `style.css` : styles.
- `script.js` : événements, navigation, filtres, stockage local et simulations.

Pas de backend ni de base de données dans ce dépôt ; certaines ressources visuelles dépendent de services externes.

## Installation / Usage

```bash
git clone https://github.com/Rehema-r/etudiant.com.git
cd etudiant.com
python -m http.server 8000 --bind 127.0.0.1
```

Ouvrir `http://localhost:8000/rehema.html`. Aucun package npm n’est requis. Ne pas saisir de données sensibles : ce prototype ne propose pas de garanties de confidentialité ou de persistance serveur.

## Project Status

Prototype frontend. Aucune promesse de service éducatif complet, d’IA intégrée, de plateforme multiutilisateur ou de mise en production.

## My Role

Projet présenté par Rehema Kasongo. L’historique contient aussi des contributions d’un outil de développement assisté ; le travail n’est pas décrit comme intégralement manuel.

## Roadmap

1. Séparer clairement les simulations des fonctions réellement disponibles dans l’interface.
2. Définir le besoin pédagogique et le périmètre d’un éventuel backend.
3. Ajouter des tests de navigation et d’accessibilité.
4. Examiner le rendu des messages et les entrées utilisateur avant toute exposition à des contenus non fiables.

## Limitations / Demo

Aucune démo hébergée n’est confirmée pour ce dépôt. Le code peut être consulté et exécuté localement ; aucune mesure d’audience ni certification n’est annoncée. La documentation ne constitue pas un audit de sécurité.
