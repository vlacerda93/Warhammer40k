import os
import re
import time
from deep_translator import GoogleTranslator

base_dir = "/home/vinicius/Área de trabalho/Faculdade/Projetos/Warhammer40k"
tacticus_dir = os.path.join(base_dir, "Tacticus")
translator = GoogleTranslator(source='en', target='pt')

def translate_text(text):
    if not text or text.strip() == "" or text.strip() in ["Descrição da habilidade indisponível.", "Lore indisponível.", "Upgrades marked with C are crafted. See the individual items for details."]:
        return text
    try:
        translated = translator.translate(text)
        time.sleep(0.5) # Anti-rate limit
        return translated
    except Exception as e:
        print(f"Erro na tradução: {e}")
        return text

total_files = 0
translated_count = 0

for filename in os.listdir(tacticus_dir):
    if not filename.endswith(".html") or filename in ["tacticus.html", "character_template.html", "chat.html"]:
        continue
        
    filepath = os.path.join(tacticus_dir, filename)
    
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
        
    if "<!-- TRADUZIDO -->" in html:
        continue
        
    total_files += 1
    print(f"Traduzindo {filename}...")
    
    # 1. Extrair Lore
    lore_match = re.search(r'<div style="font-style: italic; color: #aaa; margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6; border-left: 3px solid #[a-f0-9]+; padding-left: 15px;">(.*?)</div>', html, re.DOTALL)
    if lore_match:
        lore_orig = lore_match.group(1).strip()
        # Se lore tem aspas no começo e fim, tira, traduz, põe
        if lore_orig.startswith('"') and lore_orig.endswith('"'):
            text_to_translate = lore_orig[1:-1]
            translated_lore = '"' + translate_text(text_to_translate) + '"'
        else:
            translated_lore = translate_text(lore_orig)
        html = html.replace(lore_orig, translated_lore)

    # 2. Extrair Habilidades (Active e Passive)
    # Procurar o <div class="ability-card">
    # Tem dois: um com Habilidade Ativa e outro Passiva
    
    # Ativa
    ativa_match = re.search(r'<h4>🔥 Habilidade Ativa:.*?</h4>\s*<p>(.*?)</p>', html, re.DOTALL)
    if ativa_match:
        ativa_orig = ativa_match.group(1).strip()
        translated_ativa = translate_text(ativa_orig)
        html = html.replace(f"<p>{ativa_orig}</p>", f"<p>{translated_ativa}</p>")

    # Passiva
    passiva_match = re.search(r'<h4>🛡️ Habilidade Passiva:.*?</h4>\s*<p>(.*?)</p>', html, re.DOTALL)
    if passiva_match:
        passiva_orig = passiva_match.group(1).strip()
        translated_passiva = translate_text(passiva_orig)
        html = html.replace(f"<p>{passiva_orig}</p>", f"<p>{translated_passiva}</p>")
        
    # Adicionar a tag de controle no final
    html += "\n<!-- TRADUZIDO -->"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)
        
    translated_count += 1

print(f"\nConcluído! {translated_count} de {total_files} arquivos foram traduzidos nesta rodada.")
