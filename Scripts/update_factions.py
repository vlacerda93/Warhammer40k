import os
import re

base_dir = "/home/vinicius/Área de trabalho/Faculdade/Projetos/Warhammer40k"
tacticus_dir = os.path.join(base_dir, "Tacticus")
tacticus_html_path = os.path.join(tacticus_dir, "tacticus.html")

# Read tacticus.html
try:
    with open(tacticus_html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
except FileNotFoundError:
    print(f"Error: Could not find {tacticus_html_path}")
    exit(1)

factions_alliance = {
    "Adepta Sororitas": "Imperial",
    "Adeptus Custodes": "Imperial",
    "Adeptus Mechanicus": "Imperial",
    "Astra Militarum": "Imperial",
    "Black Templars": "Imperial",
    "Blood Angels": "Imperial",
    "Dark Angels": "Imperial",
    "Space Wolves": "Imperial",
    "Ultramarines": "Imperial",
    "Black Legion": "Chaos",
    "Death Guard": "Chaos",
    "Emperor's Children": "Chaos",
    "Thousand Sons": "Chaos",
    "World Eaters": "Chaos",
    "Aeldari": "Xenos",
    "Genestealer Cults": "Xenos",
    "Leagues of Votann": "Xenos",
    "Necrons": "Xenos",
    "Orks": "Xenos",
    "Tau Empire": "Xenos",
    "Tyranids": "Xenos"
}

# Parse characters and their factions
char_faction_map = {}
current_faction = "Unknown"

# We will match Coleção: X
lines = html_content.split('\n')
for line in lines:
    faction_match = re.search(r'Coleção:\s*([^<]+)', line)
    if faction_match:
        current_faction = faction_match.group(1).strip()
        continue
    
    char_match = re.search(r'<h3 class="char-title"[^>]*>(.*?)</h3>', line)
    if char_match:
        # Extract name "Marneus Calgar (Len)" -> "Marneus Calgar"
        name = re.sub(r'\s*\([^)]*\)$', '', char_match.group(1)).strip()
        char_faction_map[name] = current_faction

print(f"Parsed {len(char_faction_map)} characters from tacticus.html")

# Update each HTML file in Tacticus/
for filename in os.listdir(tacticus_dir):
    if filename.endswith(".html") and filename not in ["tacticus.html", "character_template.html", "chat.html"]:
        char_name = filename[:-5] # remove .html
        if char_name in char_faction_map:
            faction = char_faction_map[char_name]
            alliance = factions_alliance.get(faction, "Unknown")
            
            filepath = os.path.join(tacticus_dir, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Replace Adepta Sororitas and Imperial
            content = content.replace("Adepta Sororitas", faction)
            content = content.replace(">Imperial<", f">{alliance}<")
            
            # Also set the document title
            content = re.sub(r'<title>.*?</title>', f'<title>{char_name} - Tacticus Wiki</title>', content)
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            
            # Update the link in tacticus.html to point to this file!
            # Since we are already reading tacticus.html, let's wait and update tacticus.html globally
            
# Update tacticus.html links
# In tacticus.html, the cards are like:
# <div class="char-card" style="border-color: #0066cc;">
#     <div class="char-img" style="background: ..."></div>
#     <h3 class="char-title" ...>Varro Tigurius (Raro)</h3>
# We want to wrap the <div class="char-img"> inside an <a> tag, or wrap the whole card.
# Actually, the user says "quando clickar no personagem vai para a pagina dele".
# Let's use regex to add an <a> tag around the card or inside it.

# A safer approach is to replace: <h3 class="char-title"...>Name (Rar)</h3>
# with <h3 class="char-title"...><a href="Name.html" style="color: inherit; text-decoration: none;">Name (Rar)</a></h3>
def link_replacer(match):
    full_tag = match.group(0)
    name_with_rarity = match.group(1)
    name = re.sub(r'\s*\([^)]*\)$', '', name_with_rarity).strip()
    # Check if we have an html for this name
    if name in char_faction_map:
        link_html = f'<a href="{name}.html" style="color: inherit; text-decoration: none;">{name_with_rarity}</a>'
        return full_tag.replace(name_with_rarity, link_html)
    return full_tag

new_html = re.sub(r'<h3 class="char-title"[^>]*>(.*?)</h3>', link_replacer, html_content)

with open(tacticus_html_path, "w", encoding="utf-8") as f:
    f.write(new_html)

print("Updated HTML files and tacticus.html links successfully!")
