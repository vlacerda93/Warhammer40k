import urllib.request
import json
import os
import re

base_dir = "/home/vinicius/Área de trabalho/Faculdade/Projetos/Warhammer40k"
pages_dir = os.path.join(base_dir, "Tacticus")
template_path = os.path.join(pages_dir, "character_template.html")

missing_chars = {
    "Demetrian Titus": "Titus",
    "Helbrecht": "High Marshal Helbrecht",
    "Godswyl": "Sword Brother Godswyl",
    "Burchard": "Brother Burchard",
    "Jaeger": "Brother Jaeger",
    "Thoread": "Ancient Thoread",
    "Parasite": "Parasite of Mortrex",
    "Yarrick": "Commissar Yarrick",
    "Creed": "Castellan Creed",
    "Thaddeus": "Thaddeus Noble",
    "Sibyll": "Sibyll Devine",
    "Malleus": "Malleus Rocket Launcher",
    "Khârn": "Kharn",
    "Nauseous": "Nauseous Rotbone",
    "Âmmuk": "Ammuk",
    "Ûthar": "Uthar the Destined",
    "Haarken": "Haarken Worldclaimer"
}

with open(template_path, "r", encoding="utf-8") as f:
    template = f.read()

def get_wiki_data(wiki_page_name):
    url = f"https://tacticus.wiki.gg/api.php?action=parse&page={urllib.parse.quote(wiki_page_name)}&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Warhammer40kLocalDBBot/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            if "error" in data:
                print(f"Error fetching {wiki_page_name}: {data['error']['info']}")
                return None
            return data["parse"]["text"]["*"]
    except Exception as e:
        print(f"Request failed for {wiki_page_name}: {e}")
        return None

def extract_text(html, tag, class_name):
    match = re.search(f'<{tag}[^>]*class="[^"]*{class_name}[^"]*"[^>]*>(.*?)</{tag}>', html, re.IGNORECASE | re.DOTALL)
    if match:
        text = re.sub(r'<[^>]+>', '', match.group(1)).strip()
        return text
    return "Lore indisponível."

def extract_ability(html, ability_type):
    # This is a very rough regex for abilities
    if ability_type == "active":
        match = re.search(r'id="Active_Ability"(.*?)</table', html, re.IGNORECASE | re.DOTALL)
    else:
        match = re.search(r'id="Passive_Ability"(.*?)</table', html, re.IGNORECASE | re.DOTALL)
    
    if match:
        # Find the first paragraph or span that looks like a description, but avoid the upgrades stuff.
        # Often the ability name is in a th or b tag.
        text = re.sub(r'<[^>]+>', ' ', match.group(1))
        # clean up spaces
        text = re.sub(r'\s+', ' ', text).strip()
        # Remove "Upgrades marked with C..."
        text = text.replace("Upgrades marked with C are crafted. See the individual items for details.", "").strip()
        return text[:150] + "..." if len(text) > 150 else text
    return "Descrição da habilidade indisponível."

for display_name, wiki_name in missing_chars.items():
    print(f"Scraping {display_name} (Wiki: {wiki_name})...")
    html_data = get_wiki_data(wiki_name)
    if not html_data:
        continue
    
    lore = extract_text(html_data, "div", "quote")
    active_desc = extract_ability(html_data, "active")
    passive_desc = extract_ability(html_data, "passive")
    
    page_html = template.replace("Vindicta", display_name)
    page_html = page_html.replace("PURIFICADORA - FOGO SAGRADO", "Tacticus Hero")
    
    # Overwrite the lore
    page_html = re.sub(r'<div style="font-style: italic;[^>]*>.*?</div>', 
                       f'<div style="font-style: italic; color: #aaa; margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6; border-left: 3px solid #ffaa00; padding-left: 15px;">"{lore}"</div>', 
                       page_html, flags=re.DOTALL)
                       
    page_html = page_html.replace("Stand Vigil", active_desc)
    # the passive description had the crafted text in template, let's just replace the whole p block
    page_html = re.sub(r'<p>Upgrades marked with C are crafted.*?</p>', f'<p>{passive_desc}</p>', page_html, flags=re.DOTALL)
    
    output_path = os.path.join(pages_dir, f"{display_name}.html")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(page_html)
        
    print(f"Successfully generated {display_name}.html")
