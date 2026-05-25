import os
import re

base_dir = "/home/vinicius/Área de trabalho/Faculdade/Projetos/Warhammer40k"
tacticus_dir = os.path.join(base_dir, "Tacticus")

total_chars = 0
translated_chars = 0
not_translated = []
with_errors = []

for filename in os.listdir(tacticus_dir):
    if not filename.endswith(".html") or filename in ["tacticus.html", "character_template.html", "chat.html"]:
        continue
        
    total_chars += 1
    filepath = os.path.join(tacticus_dir, filename)
    
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
        
    if "<!-- TRADUZIDO -->" in html:
        translated_chars += 1
        
        # Check for bad scrapes like "Upgrades marked with C are crafted"
        if "Upgrades marked with C are crafted" in html:
            with_errors.append(filename.replace('.html', '') + " (Erro: Passiva genérica mantida)")
    else:
        not_translated.append(filename.replace('.html', ''))

print("="*40)
print(f"RELATÓRIO DE TRADUÇÃO E INTEGRIDADE")
print("="*40)
print(f"Total de Personagens: {total_chars}")
print(f"Traduzidos com sucesso: {translated_chars} ({(translated_chars/total_chars)*100:.1f}%)")
print(f"Faltam traduzir: {len(not_translated)}")

if len(not_translated) > 0:
    print("\n[!] Lista de Não Traduzidos:")
    for n in not_translated[:10]:
        print(f"  - {n}")
    if len(not_translated) > 10:
        print(f"  ... e mais {len(not_translated) - 10}")

if len(with_errors) > 0:
    print("\n[!] Lista de Erros na Extração da Wiki (Precisam de refino manual/script novo):")
    for e in with_errors[:10]:
        print(f"  - {e}")
    if len(with_errors) > 10:
        print(f"  ... e mais {len(with_errors) - 10}")

print("="*40)
