#!/bin/bash

# Script pour ajouter automatiquement le composant SEO aux pages React restantes
# Usage: ./add-seo-to-remaining-pages.sh

echo "Ajout du composant SEO aux pages React restantes..."

# Liste des pages à mettre à jour (en plus de celles déjà faites)
pages=(
    "resources/js/pages/APropos.tsx"
    "resources/js/pages/Accompagnement.tsx"
    "resources/js/pages/Actualites.tsx"
    "resources/js/pages/Programme.tsx"
)

# Imports SEO à ajouter
seo_imports="import SEO from '@/components/SEO';\nimport useSEO from '@/hooks/useSEO';"

# Hook SEO à ajouter dans le composant
seo_hook="    // Utiliser les données SEO du contrôleur\n    const seoData = useSEO();\n    "

# Composant SEO à ajouter dans le JSX
seo_component="            <SEO {...seoData} />\n            "

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "Mise à jour de $page..."
        
        # Créer une copie de sauvegarde
        cp "$page" "$page.backup"
        
        # Ajouter les imports SEO après les imports existants
        sed -i "/^import.*from.*react.*$/a\\$seo_imports" "$page"
        
        # Ajouter le hook SEO dans le composant principal
        sed -i "/^export default function.*{$/a\\$seo_hook" "$page"
        
        # Ajouter le composant SEO dans le JSX (après MainLayout)
        sed -i "/<MainLayout>/a\\$seo_component" "$page"
        
        echo "✓ $page mis à jour"
    else
        echo "⚠ $page non trouvé"
    fi
done

echo "Terminé! Les pages restantes ont été mises à jour avec le composant SEO."
echo "Vérifiez les modifications et supprimez les fichiers .backup si tout est correct."
