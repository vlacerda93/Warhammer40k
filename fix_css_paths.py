import os
import re

directories = ['Aeldari', 'Drukhari', 'Orks', 'Caos', 'Tyranids', 'Necrons', 'Tau']

for dir_name in directories:
    if not os.path.exists(dir_name): continue
    for file_name in os.listdir(dir_name):
        if file_name.endswith('.html'):
            filepath = os.path.join(dir_name, file_name)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # fix style.css
            content = content.replace('href="../style.css"', 'href="../Styles/style.css"')
            # fix personagens.css
            content = content.replace('href="../personagens.css"', 'href="../Styles/personagens.css"')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
print("CSS paths fixed.")
