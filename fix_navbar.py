import os, glob

files = glob.glob('*.html')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<link rel="stylesheet" href="./navbar.css">' in content:
        # Remove it from wherever it is
        content = content.replace('  <link rel="stylesheet" href="./navbar.css">\n', '')
        content = content.replace('<link rel="stylesheet" href="./navbar.css">\n', '')
        content = content.replace('<link rel="stylesheet" href="./navbar.css">', '')
        
        # Insert it safely after styles.css (or legal.css)
        if '<noscript><link rel="stylesheet" href="./legal.css"></noscript>' in content:
            target = '<noscript><link rel="stylesheet" href="./legal.css"></noscript>'
            content = content.replace(target, target + '\n  <link rel="stylesheet" href="./navbar.css">')
        elif '<noscript><link rel="stylesheet" href="./styles.css"></noscript>' in content:
            target = '<noscript><link rel="stylesheet" href="./styles.css"></noscript>'
            content = content.replace(target, target + '\n  <link rel="stylesheet" href="./navbar.css">')
        else:
            # just put it before Meta pixel
            content = content.replace('<!-- Meta Pixel Code -->', '<link rel="stylesheet" href="./navbar.css">\n  <!-- Meta Pixel Code -->')
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed {file}')
