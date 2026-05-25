import re

with open('Tacticus/tacticus.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Padrao quebrado: <a href="<a href="Bellator.html" style="color: inherit; text-decoration: none;">Bellator</a>.html" style="color: inherit; text-decoration: none;"><a href="Bellator.html" style="color: inherit; text-decoration: none;">Bellator</a></a>
# Vamos substituir tudo isso simplesmente por:
# <a href="Bellator.html" style="color: inherit; text-decoration: none;">Bellator</a>

def replace_broken_a(match):
    href = match.group(1)
    text = match.group(2)
    return f'<a href="{href}" style="color: inherit; text-decoration: none;">{text}</a>'

# The structure is: <a href="<a href="FILENAME" ...>...</a>.html" ...><a href="..." ...>TEXT</a></a>
pattern = re.compile(r'<a href="<a href="([^"]+)"[^>]*>[^<]*</a>\.html"[^>]*><a href="[^"]+"[^>]*>([^<]+)</a></a>')
new_content = pattern.sub(replace_broken_a, content)

with open('Tacticus/tacticus.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed tags count:", len(pattern.findall(content)))
