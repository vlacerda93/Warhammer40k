import os

# Fix Chaos and Tyranides
directories = ['Chaos', 'Tyranides']
for dir_name in directories:
    if not os.path.exists(dir_name): continue
    for file_name in os.listdir(dir_name):
        if file_name.endswith('.html'):
            filepath = os.path.join(dir_name, file_name)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            content = content.replace('href="../style.css"', 'href="../Styles/style.css"')
            content = content.replace('href="../personagens.css"', 'href="../Styles/personagens.css"')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

# Fix chat.html paths
chat_path = 'Pages/chat.html'
if os.path.exists(chat_path):
    with open(chat_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # It might be referring to chat.css and chat.js locally
    content = content.replace('href="chat.css"', 'href="../Styles/chat.css"')
    content = content.replace('href="./chat.css"', 'href="../Styles/chat.css"')
    content = content.replace('src="chat.js"', 'src="../Scripts/chat.js"')
    content = content.replace('src="./chat.js"', 'src="../Scripts/chat.js"')
    
    # Or to styles globally
    content = content.replace('href="style.css"', 'href="../Styles/style.css"')
    
    with open(chat_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("All fixed.")
