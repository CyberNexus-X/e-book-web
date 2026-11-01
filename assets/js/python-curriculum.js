/**
 * 30-Day Python Mastery Course Data
 * Extracted & Enriched from 90_day_python.xlsx (Days 1 - 30)
 * Skill Library - Free Interactive Python Bootcamp
 */

const PYTHON_COURSE = [
  {
    "day": 1,
    "week": 1,
    "phase": "Beginner",
    "topic": "Pehla program",
    "concept": "print() se pehli line",
    "demo": "Strings aur quotes (' vs \" vs ''')",
    "mistake": "Variables spelling aur variable par quotes lagana",
    "quiz": "Comments (#)",
    "interview": "Quiz: naam + language print",
    "readTime": "12 mins",
    "contentHtml": "<h2>🚀 Day 1: Pehla Python Program - print() aur Strings</h2>\n<p>Python ki shaandar duniya me aapka swagat hai! Aaj aap apne programming safar ki pehli seedhi chadhne ja rahe hain. Kisi bhi nayi language ko seekhte waqt sabse pehla milestone hota hai screen par apna pehla message display karna, aur Python me yeh kaam behad aasan aur intuitive hai.</p>\n\n<h3>1. 💡 Concept: print() se pehli line</h3>\n<p>Python ko 1991 me Guido van Rossum ne banaya tha, aur unka sabse bada maqsad yeh tha ki code padhna aur likhna English ki tarah bilkul aasan ho. Doosri languages jaise C ya Java me ek simple line print karne ke liye 5 se 7 lines ka boilerplate code likhna padta hai, lekin Python me sirf ek line kaafi hoti hai: <code>print(\"Hello World!\")</code>.</p>\n\n<p><strong>Analogy:</strong> Socho Python interpreter ek obedient robot dost hai jo aapke diye gaye instructions ko line by line follow karta hai. Jab aap use bolte ho <code>print()</code>, toh aap asal me robot ko keh rahe ho: <em>\"Bhai, parentheses ke andar jo kuch bhi likha hai, use screen par laakar dikha do!\"</em></p>\n\n<p>Ab samajhte hain ki <code>print()</code> function kaise kaam karta hai aur iske core elements kya hain:</p>\n<ul>\n  <li><strong>Function Name:</strong> <code>print</code> ek built-in function hai jo Python me pehle se bana-banaya milta hai. Python case-sensitive hai, isliye yeh hamesha lowercase me hi likha jana chahiye.</li>\n  <li><strong>Parentheses <code>()</code>:</strong> Function ke aage round brackets lagte hain. Iske andar hum jo data bhejte hain, use technical terms me <strong>arguments</strong> kaha jata hai.</li>\n  <li><strong>Quotes ka Rule:</strong> Jab hum computer ko koi text (text string) print karne ko kehte hain, toh use quotes me pack karna zaroori hota hai taaki Python ko pata chale ki yeh plain text hai, koi command ya variable nahi.</li>\n  <li><strong>Single vs Double Quotes:</strong> Python me <code>'Hello'</code> aur <code>\"Hello\"</code> me koi farak nahi hai. Dono bilkul barabar kaam karte hain. Double quotes tab bohot useful hote hain jab text ke andar apostrophe ho, jaise <code>\"It's a great day\"</code>.</li>\n  <li><strong>Triple Quotes (<code>'''</code> ya <code>\"\"\"</code>):</strong> Agar aapko multiple lines ka paragraph ya formatted art print karna hai bina baar baar <code>print()</code> likhe, toh triple quotes ka use kiya jata hai.</li>\n  <li><strong>sep aur end parameters:</strong> <code>print()</code> ke paas do hidden superpowers hain. <code>sep</code> batata hai ki multiple items ke beech kya aayega (default space hai), aur <code>end</code> batata hai ki line ke aakhri me kya aayega (default newline <code>\n</code> hai).</li>\n</ul>\n\n<p>Programming me <strong>Comments</strong> ek bohot zaroori tool hain. Jab aap kisi line ke shuru me <code>#</code> symbol lagate hain, toh Python interpreter us line ko bilkul ignore kar deta hai. Yeh comments hamare khud ke samajhne ke liye aur team members ko code explain karne ke liye likhe jaate hain.</p>\n\n<h3>2. 💻 Live Demo: Strings, Quotes aur Formatting</h3>\n<p>Neeche diye gaye code ko dhyaan se dekhein aur dekhein ki quotes aur parameters kaise behave karte hain:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>day1_quotes_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Single quotes aur Double quotes dono perfectly valid hain:\nprint('Namaste Doston!')\nprint(\"Python seekhna behad aasan hai.\")\n\n# Handling quotes inside strings:\nprint(\"Python developer ne kaha: 'Keep coding daily!'\")\nprint('It's a wonderful journey to master programming.')\n\n# Multiple items print karna with sep parameter:\nprint(\"Python\", \"JavaScript\", \"C++\", sep=\" | \")\n\n# end parameter ka magic (agli line me jaane ke bajaye same line me continue):\nprint(\"Loading Python modules...\", end=\" \")\nprint(\"Done!\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Namaste Doston!<br>Python seekhna behad aasan hai.<br>Python developer ne kaha: 'Keep coding daily!'<br>It's a wonderful journey to master programming.<br>Python | JavaScript | C++<br>Loading Python modules... Done!</div>\n</div>\n\n<p>Ab dekhte hain triple quotes aur comments ka practical istemaal ek professional banner create karne ke liye:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>day1_banner_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># ==========================================\n# Script: Day 1 Welcome Dashboard\n# Developer: Python Learner\n# Purpose: Multi-line strings & clean structure\n# ==========================================\n\nprint(\"\"\"\n========================================\n   PYTHON 30-DAY BOOTCAMP: DAY 1\n========================================\nTarget: Master the Core Fundamentals\nStatus: In Progress 🚀\nRule: Code every day without skipping!\n========================================\n\"\"\")\n\n# Variables ko introduce karte hain (bina quotes ke print karna):\nuser_name = \"Rahul Sharma\"\nday_number = 1\n\nprint(\"Welcome\", user_name, \"to Day\", day_number, \"of Python Mastery!\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>========================================<br>   PYTHON 30-DAY BOOTCAMP: DAY 1<br>========================================<br>Target: Master the Core Fundamentals<br>Status: In Progress 🚀<br>Rule: Code every day without skipping!<br>========================================<br><br>Welcome Rahul Sharma to Day 1 of Python Mastery!</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Variable par quotes lagana aur Case-sensitivity</div>\n  <p>Beginners aksar variable ki value print karte waqt variable ke naam par quotes laga dete hain, ya Python ke lowercase functions ko Capital letter se likh dete hain.</p>\n  <p><strong>Galti 1: Variable name par quotes lagana:</strong><br>\n  ❌ <strong>Wrong:</strong><br>\n  <code>my_name = \"Aman\"</code><br>\n  <code>print(\"my_name\")  # Output aayega: my_name (literal text!)</code><br>\n  ✅ <strong>Correct:</strong><br>\n  <code>my_name = \"Aman\"</code><br>\n  <code>print(my_name)    # Output aayega: Aman (variable ki stored value!)</code></p>\n  <p><strong>Galti 2: Case sensitivity bhool jana:</strong><br>\n  ❌ <code>Print(\"Hello\")</code> ya <code>PRINT(\"Hello\")</code> &rarr; <code>NameError: name 'Print' is not defined</code>.<br>\n  ✅ <code>print(\"Hello\")</code> &rarr; Python me keywords aur built-in functions case-sensitive hote hain, small letters me likhein!</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: First Code Quiz</div>\n  <p><strong>Real Life Scenario:</strong> Production backend applications me <code>print()</code> statements debugging, log verification, aur server start hone par diagnostics print karne ke liye sabse pehla tool hote hain. Jab server run hota hai, console par banner print karke bataya jata hai ki API live hai ya database connected hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"What does the print() function actually return in Python?\"</em><br>\n  <strong>Answer:</strong> Python me <code>print()</code> function screen par text display karta hai, lekin iska return value hamesha <code>None</code> hota hai. Agar aap <code>x = print(\"Hi\")</code> likhenge, toh screen par \"Hi\" print hoga aur variable <code>x</code> ke andar <code>None</code> store hoga.</p>\n  <p><strong>Mini Practice Task:</strong> Ek aisi Python script likhiye jo aapka naam, aapka target domain (e.g. Data Science, Web Dev, ya AI), aur aapka target package ek stylish box ke format me print kare.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me console par text display karne ke liye kaunsa built-in function use hota hai?",
        "options": [
          "echo()",
          "console.log()",
          "print()",
          "printf()"
        ],
        "correct": 2,
        "explanation": "Python me screen par text ya values print karne ke liye standard built-in function print() hai."
      },
      {
        "q": "Agar x = 'Kaif' ho, toh print('x') ka output kya hoga?",
        "options": [
          "Kaif",
          "x",
          "NameError",
          "SyntaxError"
        ],
        "correct": 1,
        "explanation": "Quotes lagane par Python use string literal maanta hai, isliye variable ki value nahi balki literal letter 'x' print hoga."
      },
      {
        "q": "Python me single-line comment lagane ke liye kis symbol ka upayog kiya jata hai?",
        "options": [
          "//",
          "/*",
          "#",
          "--"
        ],
        "correct": 2,
        "explanation": "# symbol se shuru hone wali line ko Python interpreter comment maankar ignore kar deta hai."
      },
      {
        "q": "print('Apple', 'Banana', sep='-') likhne par output kya aayega?",
        "options": [
          "Apple Banana",
          "Apple-Banana",
          "Apple - Banana",
          "AppleBanana-"
        ],
        "correct": 1,
        "explanation": "sep parameter batata hai ki multiple values ke beech kaunsa separator character use hoga. Yahan '-' use hua hai."
      },
      {
        "q": "Print('Hello Python') likhne par interpreter kya response dega?",
        "options": [
          "Hello Python print hoga",
          "SyntaxError aayega",
          "NameError: name 'Print' is not defined",
          "Warning aayegi"
        ],
        "correct": 2,
        "explanation": "Python case-sensitive language hai. Built-in function ka naam lowercase 'print' hai, 'Print' naam ka koi function defined nahi hai."
      }
    ]
  },
  {
    "day": 2,
    "week": 1,
    "phase": "Beginner",
    "topic": "Data types",
    "concept": "int, float, str, bool kya hain",
    "demo": "type() se data type check",
    "mistake": "\"5\" aur 5 mein farak",
    "quiz": "Quiz: guess the type",
    "interview": "Real life: data types kahan use hote",
    "readTime": "12 mins",
    "contentHtml": "<h2>🏷️ Day 2: Data Types - int, float, str, bool</h2>\n<p>Programming me har cheez data ke ird-gird ghoomti hai. User ka naam, bank balance, mobile number, ya online status — yeh sab alag alag kism ke data hain. Aaj hum Python ke 4 fundamental data types aur unke behavioral differences ko deeply samjhenge.</p>\n\n<h3>1. 💡 Concept: 4 Core Primitive Data Types</h3>\n<p>Python ek dynamically typed programming language hai. Iska matlab yeh hai ki aapko C++ ya Java ki tarah variable banate waqt uska type pehle se declare karne ki zaroorat nahi padti (jaise <code>int age = 20;</code>). Python itna smart hai ki variable me store hone wali value ko dekhkar khud hi uska data type decide kar leta hai.</p>\n\n<p><strong>Analogy:</strong> Apne kitchen ke containers (dabbey) ke baare me socho. Ek dabba namak ke liye hai, ek doodh ke liye bottle hai, ek masala box hai, aur ek light switch hai jo ya toh ON hota hai ya OFF. Aap namak ke dabbe me doodh nahi daalte! Theek waise hi, computer memory me alag-alag type ke data ko alag-alag tarike se organize aur store karta hai.</p>\n\n<p>Aaiye Python ke 4 core building blocks ko detail me dekhte hain:</p>\n<ul>\n  <li><strong>1. Integer (<code>int</code>):</strong> Poore numbers jisme koi decimal (point) nahi hota. Jaise <code>10</code>, <code>-50</code>, <code>0</code>, <code>999999999</code>. Python 3 me integer ki koi fixed memory limit nahi hoti; yeh aapke computer ki available RAM tak kitna bhi bada number store kar sakta hai!</li>\n  <li><strong>2. Floating Point (<code>float</code>):</strong> Wo numbers jinme decimal point hota hai. Jaise <code>3.14</code>, <code>-0.005</code>, <code>99.99</code>. Agar aap sirf <code>5.0</code> bhi likhte hain, toh Python use integer nahi balki <code>float</code> maanta hai kyunki point laga hua hai. Scientific notation jaise <code>2.5e3</code> (yani 2500.0) bhi float hota hai.</li>\n  <li><strong>3. String (<code>str</code>):</strong> Text ya characters ka sequence jo single, double ya triple quotes ke andar band ho. Jaise <code>\"Python\"</code>, <code>'Aman123'</code>, <code>\"₹500\"</code>. String me numbers, alphabets, special characters aur emojis sabhi aa sakte hain.</li>\n  <li><strong>4. Boolean (<code>bool</code>):</strong> Sach ya Jhooth! Iske paas sirf do possible values hoti hain: <code>True</code> ya <code>False</code>. Dhyaan rahe ki <code>True</code> aur <code>False</code> ka pehla letter hamesha Capital hona chahiye. Python ke andar, <code>bool</code> asal me <code>int</code> ka subclass hai jahan <code>True == 1</code> aur <code>False == 0</code> hota hai.</li>\n</ul>\n\n<p>Kisi bhi variable ya value ka data type check karne ke liye Python humein <code>type()</code> function provide karta hai. Jab aap <code>type(variable_name)</code> likhte hain, toh yeh batata hai ki variable kis class/type se belong karta hai.</p>\n\n<h3>2. 💻 Live Demo: type() Function aur Operations</h3>\n<p>Neeche diye gaye live code me dekhein ki alag-alag data types kaise declare kiye jaate hain aur <code>type()</code> function unhe kaise pehchanta hai:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>datatypes_inspection.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Variables declaration:\nuser_age = 24                # int\nwallet_balance = 1450.75     # float\nuser_name = \"Mohd Kaif\"      # str\nis_logged_in = True          # bool\n\n# Har variable ka type inspect karte hain:\nprint(\"user_age:\", user_age, \"->\", type(user_age))\nprint(\"wallet_balance:\", wallet_balance, \"->\", type(wallet_balance))\nprint(\"user_name:\", user_name, \"->\", type(user_name))\nprint(\"is_logged_in:\", is_logged_in, \"->\", type(is_logged_in))\n\n# Dynamic re-assignment (Python me type badal sakta hai!):\ndata = 100\nprint(\"Pehle data ka type:\", type(data))\ndata = \"Ab main text ban gaya!\"\nprint(\"Baad me data ka type:\", type(data))</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>user_age: 24 -&gt; &lt;class 'int'&gt;<br>wallet_balance: 1450.75 -&gt; &lt;class 'float'&gt;<br>user_name: Mohd Kaif -&gt; &lt;class 'str'&gt;<br>is_logged_in: True -&gt; &lt;class 'bool'&gt;<br>Pehle data ka type: &lt;class 'int'&gt;<br>Baad me data ka type: &lt;class 'str'&gt;</div>\n</div>\n\n<p>Ab dekhte hain ki alag-alag data types aapas me interact karte waqt kaise behave karte hain:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>datatypes_behavior.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># 1. Number addition vs String repetition:\nnum_a = 10\nnum_b = 20\nprint(\"Numbers addition:\", num_a + num_b)\n\ntext = \"Python! \"\nprint(\"String repetition (*):\", text * 3)\n\n# 2. Float aur Int ka operation hamesha Float banta hai:\ntotal = 10 + 5.5\nprint(\"10 + 5.5 =\", total, \"Type:\", type(total))\n\n# 3. Booleans asal me internally integers hote hain:\nprint(\"True + True =\", True + True)       # 1 + 1 = 2\nprint(\"True + False =\", True + False)     # 1 + 0 = 1\nprint(\"False * 50 =\", False * 50)         # 0 * 50 = 0</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Numbers addition: 30<br>String repetition (*): Python! Python! Python! <br>10 + 5.5 = 15.5 Type: &lt;class 'float'&gt;<br>True + True = 2<br>True + False = 1<br>False * 50 = 0</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: \"5\" (String) aur 5 (Integer) ka Farak</div>\n  <p>Beginners ki sabse common confusion hoti hai quotes ke andar likhe gaye numbers. Agar kisi number par quotes lag gaye, toh wo math calculation ke kaabil nahi rehta, wo plain text (string) ban jata hai!</p>\n  <p><strong>Galti: String concatenation vs Mathematical addition:</strong><br>\n  ❌ <code>a = \"5\"; b = \"5\"; print(a + b)</code> &rarr; Output aayega <code>\"55\"</code> (dono text aapas me chipak gaye, judey nahi!)<br>\n  ✅ <code>a = 5; b = 5; print(a + b)</code> &rarr; Output aayega <code>10</code> (asli mathematical addition!)<br>\n  ❌ <code>print(\"5\" + 5)</code> &rarr; <code>TypeError: can only concatenate str (not \"int\") to str</code>. Python text aur number ko bina conversion ke add nahi kar sakta!</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Data Types in the Real World</div>\n  <p><strong>Real Life Application:</strong> Ek E-commerce company (jaise Amazon ya Flipkart) me product database ka schema design karte waqt data types sabse zaroori hote hain:<br>\n  - <code>product_name = \"Wireless Mouse\"</code> &rarr; <code>str</code><br>\n  - <code>price = 799.50</code> &rarr; <code>float</code><br>\n  - <code>stock_quantity = 45</code> &rarr; <code>int</code><br>\n  - <code>is_in_stock = True</code> &rarr; <code>bool</code><br>\n  Agar price ko string bana diya jaye toh discount calculate nahi ho payega!</p>\n  <p><strong>Interview Question:</strong> <em>\"Why does Python consider bool as an int subclass? What is isinstance(True, int)?\"</em><br>\n  <strong>Answer:</strong> Python ki history me shuruat me alag boolean type nahi tha; 0 aur 1 use hote the. Jab PEP 285 ke tehat <code>bool</code> introduce hua, backward compatibility ke liye use <code>int</code> ka subclass banaya gaya. Isliye <code>isinstance(True, int)</code> hamesha <code>True</code> return karta hai, aur <code>True == 1</code> evaluate hota hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me 45.0 ka data type kya hai?",
        "options": [
          "int",
          "float",
          "number",
          "decimal"
        ],
        "correct": 1,
        "explanation": "Decimal point lagte hi Python number ko float consider karta hai, chahe point ke baad zero hi kyun na ho."
      },
      {
        "q": "print(type('123')) ka output kya hoga?",
        "options": [
          "<class 'int'>",
          "<class 'str'>",
          "<class 'number'>",
          "<class 'text'>"
        ],
        "correct": 1,
        "explanation": "Quotes ke andar likha gaya koi bhi number string (<class 'str'>) ban jata hai."
      },
      {
        "q": "Python me True + True ka result kya hoga?",
        "options": [
          "True",
          "2",
          "TrueTrue",
          "TypeError"
        ],
        "correct": 1,
        "explanation": "Python me bool int ka subclass hai jisme True ki numeric value 1 hoti hai. 1 + 1 = 2 hota hai."
      },
      {
        "q": "'Code' * 3 run karne par kya display hoga?",
        "options": [
          "Code3",
          "Code Code Code",
          "CodeCodeCode",
          "TypeError"
        ],
        "correct": 2,
        "explanation": "String ko integer se multiply karne par string repetition hoti hai, bina space ke 3 baar repeat hoga."
      },
      {
        "q": "Neeche diye gaye me se kaunsa boolean variable ka valid declaration hai?",
        "options": [
          "is_active = true",
          "is_active = True",
          "is_active = TRUE",
          "is_active = 'True'"
        ],
        "correct": 1,
        "explanation": "Python me boolean keywords ka pehla letter strictly Capital hota hai: True ya False."
      }
    ]
  },
  {
    "day": 3,
    "week": 1,
    "phase": "Beginner",
    "topic": "input() aur type casting",
    "concept": "input() se user se data lo",
    "demo": "int(input()) live demo",
    "mistake": "input hamesha string deta hai",
    "quiz": "Quiz: age calculator",
    "interview": "Interview: type casting kya hai",
    "readTime": "12 mins",
    "contentHtml": "<h2>📥 Day 3: User Input aur Type Casting</h2>\n<p>Ab tak hamare saare programs static the — jo values humne code ke andar likh di thin, program sirf unhi par chal raha tha. Lekin real-world applications user ke sath baat karti hain. Aaj hum apne programs ko interactive banana seekhenge aur data type conversion (Type Casting) ke raaz kholenge.</p>\n\n<h3>1. 💡 Concept: input() function aur Type Casting</h3>\n<p>User se keyboard ke through data lene ke liye Python me built-in function hota hai <code>input()</code>. Jab interpreter <code>input()</code> line par pahunchta hai, toh program execution temporary pause ho jata hai aur computer user ke keyboard press karne ka intezar karta hai. Jaise hi user kuch likhkar <strong>Enter</strong> press karta hai, wo data program me capture ho jata hai.</p>\n\n<p><strong>Analogy:</strong> Socho ek Bank ATM machine. Jab aap machine ke samne khade hote ho, screen aapse poochti hai: <em>\"Enter your PIN:\"</em>. Jab tak aap PIN enter karke green button nahi dabate, machine ruki rehti hai. Yahi kaam <code>input()</code> function karta hai.</p>\n\n<p>Lekin yahan aata hai sabse bada golden rule jise har Python developer ko yaad rakhna chahiye:</p>\n<p><strong>🚨 THE GOLDEN RULE OF input():</strong><br>\n<code>input()</code> function hamesha aur hamesha data ko <strong>String (text)</strong> ke roop me return karta hai! Chahe user keyboard se <code>500</code> likhe, <code>0.05</code> likhe, ya apna naam <code>Rahul</code> likhe — Python ke liye wo ek string hi hai (yani <code>\"500\"</code>).</p>\n\n<p>Agar aap user se do numbers lekar unhe add karna chahte hain, toh <code>\"10\" + \"20\"</code> karne se <code>\"1020\"</code> ban jayega, <code>30</code> nahi! Isi problem ko solve karne ke liye hum use karte hain <strong>Type Casting</strong> (Data Type Conversion).</p>\n\n<p>Type Casting do tarah ki hoti hai:</p>\n<ul>\n  <li><strong>1. Explicit Type Casting (Manual Conversion):</strong> Jab programmer khud function use karke data type badalta hai. Jaise:\n    <ul>\n      <li><code>int(\"45\")</code> &rarr; String <code>\"45\"</code> ko Integer <code>45</code> me convert karta hai.</li>\n      <li><code>float(\"99.5\")</code> &rarr; String ko decimal number <code>99.5</code> me badalta hai.</li>\n      <li><code>str(100)</code> &rarr; Number <code>100</code> ko wapas text <code>\"100\"</code> banata hai.</li>\n      <li><code>bool(\"\")</code> &rarr; Empty string <code>False</code> banti hai, jabki non-empty string <code>True</code> banti hai.</li>\n    </ul>\n  </li>\n  <li><strong>2. Implicit Type Casting (Automatic Conversion):</strong> Jab Python interpreter bina data loss ke khud-b-khud type adjust kar leta hai. Jaise integer <code>5</code> aur float <code>2.5</code> ko add karne par Python result ko automatically <code>float</code> (<code>7.5</code>) bana deta hai.</li>\n</ul>\n\n<h3>2. 💻 Live Demo: Interactive Age Calculator aur Bill Splitter</h3>\n<p>Aaiye dekhte hain ki user input lekar use mathematical operations me kaise use kiya jata hai:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>age_calculator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># User se naam aur birth year input lete hain:\nuser_name = input(\"Apna naam enter karein: \")\nbirth_year_str = input(\"Apna birth year enter karein (e.g. 2002): \")\n\n# Type casting: string ko int me convert karna:\nbirth_year = int(birth_year_str)\n\ncurrent_year = 2026\nage = current_year - birth_year\nyears_to_sixty = 60 - age\n\nprint(\"----------------------------------------\")\nprint(\"Namaste\", user_name + \"!\")\nprint(\"Aapki current age lagbhag\", age, \"saal hai.\")\nprint(\"Aapke retirement (60 age) me abhi\", years_to_sixty, \"saal baaki hain.\")\nprint(\"----------------------------------------\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Apna naam enter karein: Kaif<br>Apna birth year enter karein (e.g. 2002): 2002<br>----------------------------------------<br>Namaste Kaif!<br>Aapki current age lagbhag 24 saal hai.<br>Aapke retirement (60 age) me abhi 36 saal baaki hain.<br>----------------------------------------</div>\n</div>\n\n<p>Ab dekhte hain single-line nesting jisme hum <code>int(input())</code> ya <code>float(input())</code> ek sath likhte hain:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>restaurant_bill_splitter.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Directly float aur int input lena (Clean Industry Pattern):\ntotal_bill = float(input(\"Total restaurant bill amount enter karein (Rs): \"))\ntip_percent = float(input(\"Tip percentage kitna dena chahte hain (e.g. 10 ya 15): \"))\nnum_people = int(input(\"Kitne dost milkar bill pay kar rahe hain: \"))\n\n# Bill calculation logic:\ntip_amount = total_bill * (tip_percent / 100)\nfinal_total = total_bill + tip_amount\nper_person_share = final_total / num_people\n\nprint(\"\n========== BILL SUMMARY ==========\")\nprint(\"Food Amount: Rs.\", total_bill)\nprint(\"Tip Added:   Rs.\", tip_amount)\nprint(\"Total Bill:  Rs.\", final_total)\nprint(\"Each Friend Pays: Rs.\", round(per_person_share, 2))\nprint(\"==================================\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Total restaurant bill amount enter karein (Rs): 2500<br>Tip percentage kitna dena chahte hain (e.g. 10 ya 15): 10<br>Kitne dost milkar bill pay kar rahe hain: 4<br><br>========== BILL SUMMARY ==========<br>Food Amount: Rs. 2500.0<br>Tip Added:   Rs. 250.0<br>Total Bill:  Rs. 2750.0<br>Each Friend Pays: Rs. 687.5<br>==================================</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: input() ko direct add karna aur ValueError</div>\n  <p>Two major traps jo har naya programmer face karta hai:</p>\n  <p><strong>Trap 1: Type casting bhool jana:</strong><br>\n  ❌ <code>n1 = input(\"Num 1: \"); n2 = input(\"Num 2: \"); print(n1 + n2)</code><br>\n  Agar user <code>10</code> aur <code>20</code> daalta hai, toh output <code>30</code> nahi balki <code>\"1020\"</code> aayega kyunki string concatenate ho gayi!<br>\n  ✅ <code>n1 = int(input(\"Num 1: \")); n2 = int(input(\"Num 2: \")); print(n1 + n2)</code> &rarr; Ab aayega sahi answer <code>30</code>.</p>\n  <p><strong>Trap 2: Invalid string ko int me cast karna (ValueError):</strong><br>\n  ❌ <code>val = int(\"hello\")</code> ya <code>val = int(\"12.5\")</code> &rarr; <code>ValueError: invalid literal for int() with base 10</code>.<br>\n  Agar decimal string hai, toh pehle <code>float(\"12.5\")</code> karna hoga, phir chahein toh <code>int(float(\"12.5\"))</code> kar sakte hain!</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Type Casting Deep Dive</div>\n  <p><strong>Real Life Application:</strong> Web frameworks jaise Django ya FastAPI me jab user form submit karta hai ya URL query parameters aate hain (e.g. <code>?page=2&limit=50</code>), toh web server ke paas saara data pehle string format me hi aata hai. Backend controllers use validate aur type cast karke integer me convert karte hain database query chalane se pehle.</p>\n  <p><strong>Interview Question:</strong> <em>\"What will bool('False') evaluate to in Python, and why?\"</em><br>\n  <strong>Answer:</strong> <code>bool('False')</code> hamesha <code>True</code> evaluate hoga! Reason yeh hai ki Python me koi bhi non-empty string truthy hoti hai. Python string ke andar likhe text ka meaning nahi samajhta; wo sirf dekhta hai ki string me characters hain ya nahi. Sirf empty string <code>bool(\"\")</code> hi <code>False</code> return karti hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "input() function user se data lekar kis type me return karta hai?",
        "options": [
          "int",
          "str",
          "float",
          "Jo data user ne enter kiya ho usi type me"
        ],
        "correct": 1,
        "explanation": "input() hamesha aur hamesha string (<class 'str'>) return karta hai, chahe user number hi kyun na type kare."
      },
      {
        "q": "Agar user 5 aur 5 enter kare, toh input() ke direct addition ka result kya hoga?",
        "options": [
          "10",
          "'55'",
          "TypeError",
          "5.0"
        ],
        "correct": 1,
        "explanation": "Dono inputs strings hain ('5'), aur strings par '+' operator concatenation karta hai, isliye '55' banega."
      },
      {
        "q": "int(8.99) likhne par result kya aayega?",
        "options": [
          "9",
          "8",
          "8.0",
          "ValueError"
        ],
        "correct": 1,
        "explanation": "int() function float number ke decimal part ko truncate (chhod) deta hai, rounding nahi karta. Isliye 8 aayega."
      },
      {
        "q": "bool('False') ka output kya hoga?",
        "options": [
          "False",
          "True",
          "None",
          "Error"
        ],
        "correct": 1,
        "explanation": "Python me non-empty string hamesha True hoti hai. Sirf empty string bool('') hi False hoti hai."
      },
      {
        "q": "Agar user input me 'abc' likhe aur code int(input()) ho, toh kaunsa error aayega?",
        "options": [
          "TypeError",
          "ValueError",
          "NameError",
          "SyntaxError"
        ],
        "correct": 1,
        "explanation": "Jab kisi aisi string ko int() me convert kiya jaye jisme digits na hon, toh Python ValueError raise karta hai."
      }
    ]
  },
  {
    "day": 4,
    "week": 1,
    "phase": "Beginner",
    "topic": "Arithmetic operators",
    "concept": "+ - * / basics",
    "demo": "// aur % ka magic",
    "mistake": "/ vs // confusion",
    "quiz": "Quiz: even ya odd",
    "interview": "Real life: bill split calculator",
    "readTime": "12 mins",
    "contentHtml": "<h2>➗ Day 4: Arithmetic Operators aur Math Magic</h2>\n<p>Calculations computer science ki neev hain. Chahe gaming physics ho, rocket trajectories hon, ya simple shopping cart total — sabhi me arithmetic operators ka use hota hai. Aaj hum Python ke sabhi 7 math operators, unki precedence, aur <code>//</code> aur <code>%</code> ke zabardast magic ko samjhenge.</p>\n\n<h3>1. 💡 Concept: The 7 Arithmetic Operators & Operator Precedence</h3>\n<p>Operators wo special symbols hote hain jo values (operands) par mathematical ya logical calculation perform karte hain. Python me 7 basic arithmetic operators hote hain:</p>\n\n<ul>\n  <li><strong>1. Addition (<code>+</code>):</strong> Do numbers ko jodta hai. (e.g. <code>10 + 5 = 15</code>)</li>\n  <li><strong>2. Subtraction (<code>-</code>):</strong> Ek number se doosre number ko ghatata hai. (e.g. <code>20 - 7 = 13</code>)</li>\n  <li><strong>3. Multiplication (<code>*</code>):</strong> Numbers ko guna karta hai. (e.g. <code>6 * 4 = 24</code>)</li>\n  <li><strong>4. Float Division (<code>/</code>):</strong> Normal division karta hai. <strong>CRITICAL NOTE:</strong> Python me <code>/</code> hamesha aur hamesha ek <code>float</code> return karta hai, chahe number poora divide hi kyun na ho jaye! Jaise <code>4 / 2</code> ka result <code>2.0</code> aayega, integer <code>2</code> nahi.</li>\n  <li><strong>5. Floor Division (<code>//</code>):</strong> Integer division karta hai. Yeh division ke baad decimal part ko drop karke sirf quotient (poora hissa) deta hai. Jaise <code>10 // 3 = 3</code>. Negative numbers me yeh hamesha lower side round karta hai (e.g. <code>-7 // 2 = -4</code>).</li>\n  <li><strong>6. Modulus / Remainder (<code>%</code>):</strong> Division ka bacha hua sheshphal (remainder) return karta hai. Jaise <code>10 % 3 = 1</code> kyunki 3x3=9 hota hai aur 1 bach jata hai. Even/Odd check karne aur time conversion ke liye yeh best operator hai.</li>\n  <li><strong>7. Exponentiation / Power (<code>**</code>):</strong> Kisi number ki power calculate karta hai. Jaise <code>2 ** 3</code> ka matlab hai $2^3 = 8$.</li>\n</ul>\n\n<p><strong>BODMAS / PEMDAS (Operator Precedence):</strong><br>\nJab ek complex expression me multiple operators hote hain, toh Python unhe is priority order me solve karta hai:</p>\n<ol>\n  <li><strong>P - Parentheses <code>()</code>:</strong> Sabse pehle brackets ke andar ka hissa solve hota hai.</li>\n  <li><strong>E - Exponents <code>**</code>:</strong> Power calculation doosre number par aati hai (aur yeh right-to-left evaluate hoti hai!).</li>\n  <li><strong>MD - Multiplication & Division (<code>*</code>, <code>/</code>, <code>//</code>, <code>%</code>):</strong> In sabki priority barabar hoti hai, aur yeh left-to-right solve hote hain.</li>\n  <li><strong>AS - Addition & Subtraction (<code>+</code>, <code>-</code>):</strong> Sabse aakhri me left-to-right solve hote hain.</li>\n</ol>\n\n<h3>2. 💻 Live Demo: // aur % ka Magic aur Practical Calculations</h3>\n<p>Aaiye dekhte hain ki floor division aur modulus real-life problems ko kaise चुटकियों me solve karte hain:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>time_and_coins_converter.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Scenario 1: Total seconds ko Minutes aur Seconds me badalna:\ntotal_seconds = 375   # Jaise ek video ka duration 375 seconds hai\n\nminutes = total_seconds // 60   # Poore minutes kitne hue\nremaining_seconds = total_seconds % 60   # Bache hue seconds\n\nprint(f\"Total: {total_seconds}s = {minutes} minutes aur {remaining_seconds} seconds\")\n\n# Scenario 2: Even ya Odd number check karna:\nnum = 17\nif num % 2 == 0:\n    print(num, \"ek Even number hai.\")\nelse:\n    print(num, \"ek Odd number hai.\")\n\n# Scenario 3: Bank Cash Dispenser (500 aur 100 ke kitne note denge):\nwithdraw_amount = 3800\nnotes_500 = withdraw_amount // 500\nleftover = withdraw_amount % 500\nnotes_100 = leftover // 100\n\nprint(f\"Amount {withdraw_amount} ke liye: {notes_500} notes of 500 aur {notes_100} notes of 100\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Total: 375s = 6 minutes aur 15 seconds<br>17 ek Odd number hai.<br>Amount 3800 ke liye: 7 notes of 500 aur 3 notes of 100</div>\n</div>\n\n<p>Ab dekhte hain operator precedence aur powers ka mathematical demonstration:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>precedence_and_powers.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Expression without parentheses:\nres1 = 10 + 5 * 2\nprint(\"10 + 5 * 2 =\", res1)  # Multiplication pehle hua: 10 + 10 = 20\n\n# Expression with parentheses:\nres2 = (10 + 5) * 2\nprint(\"(10 + 5) * 2 =\", res2)  # Bracket pehle hua: 15 * 2 = 30\n\n# Exponentiation right-to-left associativity:\n# 2 ** 3 ** 2 ka matlab 2 ** (3 ** 2) = 2 ** 9 = 512\npower_res = 2 ** 3 ** 2\nprint(\"2 ** 3 ** 2 =\", power_res)\n\n# Floor division with negative numbers:\nprint(\"7 // 2 =\", 7 // 2)      # 3\nprint(\"-7 // 2 =\", -7 // 2)    # -4 (towards negative infinity!)</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>10 + 5 * 2 = 20<br>(10 + 5) * 2 = 30<br>2 ** 3 ** 2 = 512<br>7 // 2 = 3<br>-7 // 2 = -4</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: / vs // ka Confusion aur BODMAS Trap</div>\n  <p>Beginners do badi galtiyan karte hain:</p>\n  <p><strong>Galti 1: Average nikaalte waqt brackets bhool jana:</strong><br>\n  ❌ <code>maths = 80; science = 90; avg = maths + science / 2</code><br>\n  Kyunki <code>/</code> ki priority <code>+</code> se zyada hai, Python pehle <code>90 / 2 = 45</code> karega aur phir <code>80 + 45 = 125</code> nikaal dega! Marks 100 me se 125 ban gaye!<br>\n  ✅ <code>avg = (maths + science) / 2</code> &rarr; Sahi result aayega <code>85.0</code>.</p>\n  <p><strong>Galti 2: / vs // ka farak na samajhna:</strong><br>\n  Agar aapko kisi list ka middle index nikaalna hai aur aapne <code>mid = len(items) / 2</code> likh diya, toh yeh float <code>2.5</code> ban jayega, aur list indexing me float use karne par <code>TypeError: list indices must be integers or slices, not float</code> aayega! Hamesha index ke liye <code>//</code> use karein.</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Modulus and Negative Division</div>\n  <p><strong>Real Life Application:</strong> E-commerce websites me <strong>Pagination</strong> (pages banana):<br>\n  Agar total 105 products hain aur har page par 10 products aate hain, toh total pages kitne honge?<br>\n  <code>pages = 105 // 10 + (1 if 105 % 10 != 0 else 0)</code> &rarr; 10 + 1 = 11 pages honge!</p>\n  <p><strong>Interview Question:</strong> <em>\"Why does -7 // 2 result in -4 and not -3 in Python, whereas in languages like C/C++ it produces -3?\"</em><br>\n  <strong>Answer:</strong> Python strictly 'floor division' rule follow karta hai jahan result ko hamesha <em>floor</em> (downwards towards negative infinity) kiya jata hai. Mathematical rule yeh hai ki <code>a = (a // b) * b + (a % b)</code>. Python me modulus <code>a % b</code> hamesha divisor <code>b</code> ke sign ka hota hai. Isliye <code>-7 // 2 = -4</code> aur <code>-7 % 2 = 1</code>, jo formula satisfy karta hai: <code>(-4 * 2) + 1 = -7</code>.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me 15 // 4 ka result kya hoga?",
        "options": [
          "3.75",
          "3",
          "4",
          "3.0"
        ],
        "correct": 1,
        "explanation": "Floor division (//) decimal hisse ko hata deta hai aur lower whole integer (3) return karta hai."
      },
      {
        "q": "15 % 4 ka result kya hoga?",
        "options": [
          "3",
          "1",
          "3.75",
          "0"
        ],
        "correct": 0,
        "explanation": "15 ko 4 se divide karne par 4x3 = 12 hota hai, aur remainder 15 - 12 = 3 bachta hai."
      },
      {
        "q": "2 ** 3 ** 2 ka output kya hoga?",
        "options": [
          "64",
          "512",
          "36",
          "TypeError"
        ],
        "correct": 1,
        "explanation": "Exponentiation right-to-left evaluate hoti hai: pehle 3 ** 2 = 9 hoga, phir 2 ** 9 = 512 hoga."
      },
      {
        "q": "Python me 8 / 2 ka return data type aur value kya hogi?",
        "options": [
          "int (4)",
          "float (4.0)",
          "int (4.0)",
          "None"
        ],
        "correct": 1,
        "explanation": "Single slash (/) hamesha float return karta hai, chahe division completely divisible ho (4.0)."
      },
      {
        "q": "10 + 20 * 2 / 2 - 5 ka output kya hoga?",
        "options": [
          "25.0",
          "15.0",
          "30.0",
          "20.0"
        ],
        "correct": 0,
        "explanation": "BODMAS rule: 20 * 2 = 40; 40 / 2 = 20.0; 10 + 20.0 = 30.0; 30.0 - 5 = 25.0."
      }
    ]
  },
  {
    "day": 5,
    "week": 1,
    "phase": "Beginner",
    "topic": "Comparison aur logical operators",
    "concept": "Comparison operators basics",
    "demo": "and, or, not live",
    "mistake": "= vs == assignment vs equality",
    "quiz": "Quiz: True ya False?",
    "interview": "Interview: truthy aur falsy values",
    "readTime": "12 mins",
    "contentHtml": "<h2>⚖️ Day 5: Comparison aur Logical Operators</h2>\n<p>Coding sirf math calculations karna nahi hai, balki decisions lena hai. Kya user logged in hai? Kya user ki age 18 se zyada hai? Kya account balance sufficient hai? Aise sabhi sawaalon ka jawaab dene ke liye Python me Comparison aur Logical operators use hote hain.</p>\n\n<h3>1. 💡 Concept: Comparison, Boolean Logic aur Short-Circuiting</h3>\n<p>Comparison operators do values ki tulna (compare) karte hain aur hamesha ek <strong>Boolean (True ya False)</strong> result return karte hain. Python me 6 standard comparison operators hote hain:</p>\n\n<ul>\n  <li><code>==</code> (Equal to): Check karta hai ki dono sides barabar hain ya nahi (e.g. <code>5 == 5 &rarr; True</code>).</li>\n  <li><code>!=</code> (Not Equal to): Check karta hai ki dono sides alag hain ya nahi (e.g. <code>5 != 3 &rarr; True</code>).</li>\n  <li><code>&gt;</code> (Greater than): Bada hai (e.g. <code>10 &gt; 5 &rarr; True</code>).</li>\n  <li><code>&lt;</code> (Less than): Chhota hai (e.g. <code>3 &lt; 8 &rarr; True</code>).</li>\n  <li><code>&gt;=</code> (Greater than or Equal to): Bada ya barabar hai.</li>\n  <li><code>&lt;=</code> (Less than or Equal to): Chhota ya barabar hai.</li>\n</ul>\n\n<p><strong>Python Chained Comparisons:</strong><br>\nPython me ek bohot khoobsurat feature hai jo doosri languages me nahi hota: Chained Comparisons! Aap school math ki tarah likh sakte hain: <code>18 &lt;= age &lt;= 60</code>. Python ise internally <code>(18 &lt;= age) and (age &lt;= 60)</code> me convert karke evaluate karta hai.</p>\n\n<p>Jab humein multiple conditions ko aapas me combine karna hota hai, tab hum use karte hain <strong>Logical Operators</strong>:</p>\n<ul>\n  <li><strong><code>and</code>:</strong> Dono conditions True honi chahiye! Agar ek bhi False hui, toh poora result <code>False</code> ho jayega.</li>\n  <li><strong><code>or</code>:</strong> Dono me se koi EK bhi condition True hui, toh result <code>True</code> ho jayega. Dono False hone par hi <code>False</code> aayega.</li>\n  <li><strong><code>not</code>:</strong> Result ko ulat deta hai! True ko <code>False</code> aur False ko <code>True</code> bana deta hai.</li>\n</ul>\n\n<p><strong>Short-Circuit Evaluation:</strong><br>\nPython smart evaluation karta hai. Agar <code>False and ...</code> ho, toh Python doosri condition ko check hi nahi karta kyunki answer anyway False hona hai. Theek waise hi, agar <code>True or ...</code> ho, toh Python aage dekhe bina turant True return kar deta hai.</p>\n\n<p><strong>Truthy aur Falsy Values:</strong><br>\nPython me har object ki ek inherent truth value hoti hai. Neeche di gayi values ko Python <strong>Falsy</strong> maanta hai:</p>\n<ul>\n  <li>Numbers: <code>0</code>, <code>0.0</code></li>\n  <li>Empty collections/strings: <code>\"\"</code> (empty string), <code>[]</code> (empty list), <code>()</code> (empty tuple), <code>{}</code> (empty dict)</li>\n  <li>Special constants: <code>None</code>, <code>False</code></li>\n</ul>\n<p>Inke alawa Python me bachi hui har cheez (jaise koi bhi non-zero number ya koi bhi text) <strong>Truthy</strong> maani jaati hai!</p>\n\n<h3>2. 💻 Live Demo: Loan Eligibility aur Short-Circuit Fallbacks</h3>\n<p>Aaiye dekhte hain comparison aur logical operators ka real-world decision system:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>loan_eligibility.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Applicant profile data:\napplicant_age = 28\nmonthly_salary = 55000\ncredit_score = 760\nhas_criminal_record = False\n\n# Comparison & Logical condition:\nis_age_valid = 21 <= applicant_age <= 60\nis_income_good = monthly_salary >= 40000\nis_cibil_good = credit_score > 700\nis_background_clean = not has_criminal_record\n\n# Final loan approval logic:\nloan_approved = is_age_valid and is_income_good and is_cibil_good and is_background_clean\n\nprint(\"--- LOAN ELIGIBILITY REPORT ---\")\nprint(\"Age Valid:\", is_age_valid)\nprint(\"Income Criteria Met:\", is_income_good)\nprint(\"Credit Score Clean:\", is_cibil_good)\nprint(\"Background Clean:\", is_background_clean)\nprint(\"FINAL DECISION (Loan Approved?):\", loan_approved)</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>--- LOAN ELIGIBILITY REPORT ---<br>Age Valid: True<br>Income Criteria Met: True<br>Credit Score Clean: True<br>Background Clean: True<br>FINAL DECISION (Loan Approved?): True</div>\n</div>\n\n<p>Ab dekhte hain Truthy/Falsy values aur Short-circuit evaluation ka professional coding pattern:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>short_circuit_fallbacks.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Default fallback technique with 'or':\n# Agar user ne naam khali chhoda (\"\"), toh default \"Guest\" le lo:\nuser_input = \"\"\ndisplay_name = user_input or \"Guest User\"\nprint(\"Display Name:\", display_name)\n\n# Short-circuiting with actual values (Python returns operand itself!):\n# 'and' pehla Falsy ya last Truthy value return karta hai:\nprint(\"'Python' and 'Django':\", \"Python\" and \"Django\")  # 'Django'\nprint(\"0 and 'Python':\", 0 and \"Python\")                # 0\n\n# 'or' pehla Truthy value return karta hai:\nprint(\"'' or 'Default':\", \"\" or \"Default\")              # 'Default'\nprint(\"'Admin' or 'Guest':\", \"Admin\" or \"Guest\")        # 'Admin'</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Display Name: Guest User<br>'Python' and 'Django': Django<br>0 and 'Python': 0<br>'' or 'Default': Default<br>'Admin' or 'Guest': Admin</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: = vs == (Assignment vs Equality)</div>\n  <p>Yeh programming history ki sabse famous galti hai jo bade-bade developers bhi jaldbazi me kar baithte hain:</p>\n  <p><strong>Farak samjhein:</strong><br>\n  - Single equal <code>=</code> ka matlab hai <strong>Assignment</strong>: Right side ki value ko Left side ke variable ke dabbe me store kar do!<br>\n  - Double equal <code>==</code> ka matlab hai <strong>Comparison</strong>: Check karo ki kya dono sides barabar hain?</p>\n  <p>❌ <strong>Wrong Code:</strong><br>\n  <code>status = \"active\"</code><br>\n  <code># if status = \"active\":  # SyntaxError: invalid syntax. Maybe you meant '=='?</code></p>\n  <p>✅ <strong>Correct Code:</strong><br>\n  <code>if status == \"active\":</code><br>\n  <code>    print(\"User is allowed to enter.\")</code></p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Truthy, Falsy & Short-Circuiting</div>\n  <p><strong>Real Life Application:</strong> Web applications me user permissions check karna:<br>\n  <code>can_access_dashboard = is_logged_in and (is_admin or has_editor_role)</code><br>\n  Parentheses lagakar logic group karna zaroori hai taaki order of evaluation crystal clear rahe.</p>\n  <p><strong>Interview Question:</strong> <em>\"What does the expression `True and 5 or 0` return in Python, and why?\"</em><br>\n  <strong>Answer:</strong> It returns <code>5</code>. Kyunki operator precedence me <code>and</code> ki priority <code>or</code> se zyada hoti hai. Pehle <code>True and 5</code> evaluate hoga. <code>and</code> dono operands dekhta hai aur last Truthy value <code>5</code> return karta hai. Phir <code>5 or 0</code> evaluate hoga, aur <code>or</code> pehla truthy milte hi <code>5</code> return kar deta hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me 10 == '10' ka result kya aayega?",
        "options": [
          "True",
          "False",
          "TypeError",
          "None"
        ],
        "correct": 1,
        "explanation": "Python strongly typed hai; integer 10 aur string '10' do alag types hain, isliye == False return karega."
      },
      {
        "q": "Neeche diye gaye me se kaunsi value Python me Falsy maani jaati hai?",
        "options": [
          "[0]",
          "'False'",
          "0",
          "-1"
        ],
        "correct": 2,
        "explanation": "Numeric value 0 falsy hoti hai. [0] ek non-empty list hai aur 'False' ek non-empty string hai jo truthy hoti hain."
      },
      {
        "q": "Expression: not (5 > 2 and 3 < 1) ka result kya hoga?",
        "options": [
          "True",
          "False",
          "Error",
          "None"
        ],
        "correct": 0,
        "explanation": "5 > 2 True hai lekin 3 < 1 False hai. True and False = False. Ab not(False) = True ho jayega."
      },
      {
        "q": "display = '' or 'Admin' ka output kya hoga?",
        "options": [
          "''",
          "Admin",
          "True",
          "False"
        ],
        "correct": 1,
        "explanation": "or operator pehla Truthy value return karta hai. Empty string falsy hai, isliye 'Admin' return hoga."
      },
      {
        "q": "Chained comparison: 10 < 20 < 30 ka result kya hoga?",
        "options": [
          "True",
          "False",
          "SyntaxError",
          "20"
        ],
        "correct": 0,
        "explanation": "Python isise (10 < 20) and (20 < 30) evaluate karta hai, dono True hain toh final result True hai."
      }
    ]
  },
  {
    "day": 6,
    "week": 1,
    "phase": "Beginner",
    "topic": "String methods",
    "concept": "upper, lower, title",
    "demo": "strip, replace, split demo",
    "mistake": "Strings immutable hain",
    "quiz": "Quiz: naam ko capitalize karo",
    "interview": "Real life: username cleaner",
    "readTime": "12 mins",
    "contentHtml": "<h2>🔤 Day 6: String Methods aur Immutability ka Sach</h2>\n<p>Modern applications me lagbhag 70% data text form me hota hai — user emails, passwords, search queries, chat messages, aur blog posts. Aaj hum seekhenge ki Python ke built-in methods se raw aur messy text data ko kaise clean, transform aur manipulate kiya jata hai.</p>\n\n<h3>1. 💡 Concept: Methods kya hain aur The Law of Immutability</h3>\n<p>Method ek aisa function hota hai jo kisi specific data type (jaise string ya list) se juda hota hai. Isko call karne ke liye hum <strong>dot notation</strong> use karte hain: <code>variable.method_name()</code>.</p>\n\n<p><strong>🚨 THE LAW OF IMMUTABILITY (Strings Badli Nahi Ja Sakti!):</strong><br>\nPython me Strings <strong>Immutable</strong> (aprivartaniya) hoti hain! Iska matlab yeh hai ki ek baar string memory me ban gayi, toh aap uske kisi character ko directly modify nahi kar sakte (jaise <code>text[0] = 'X'</code> likhne par <code>TypeError</code> aayega). Jab bhi aap koi string method (jaise <code>.upper()</code> ya <code>.replace()</code>) chalate hain, toh Python purani string ko chheda bina ek <strong>nayi string</strong> create karke return karta hai!</p>\n\n<p>Aaiye Python ke sabse popular aur powerful string methods ko categorize karke samajhte hain:</p>\n\n<ul>\n  <li><strong>Case Conversion Methods:</strong>\n    <ul>\n      <li><code>.upper()</code>: Saare characters ko Capital (UPPERCASE) me convert karta hai.</li>\n      <li><code>.lower()</code>: Sabhi characters ko Small (lowercase) me badalta hai (case-insensitive comparison ke liye standard technique).</li>\n      <li><code>.title()</code>: Har word ke pehle letter ko Capital aur baki ko small karta hai (e.g. <code>\"mohd kaif\".title() &rarr; \"Mohd Kaif\"</code>).</li>\n      <li><code>.capitalize()</code>: Sirf poore sentence ke pehle character ko Capital karta hai.</li>\n    </ul>\n  </li>\n  <li><strong>Whitespace Trimming & Cleaning:</strong>\n    <ul>\n      <li><code>.strip()</code>: String ke aage aur peeche ke faltu spaces, newlines, ya tabs ko remove karta hai.</li>\n      <li><code>.lstrip()</code> / <code>.rstrip()</code>: Sirf left ya sirf right side ke whitespace ko hatata hai.</li>\n    </ul>\n  </li>\n  <li><strong>Search, Replace & Splitting:</strong>\n    <ul>\n      <li><code>.replace(old, new)</code>: Purane substring ko naye substring se badal deta hai.</li>\n      <li><code>.split(separator)</code>: Ek lambi string ko tukdon me todkar ek <strong>List</strong> bana deta hai. Default separator space hota hai.</li>\n      <li><code>separator.join(list)</code>: List of strings ko aapas me jodkar ek single string banata hai.</li>\n      <li><code>.find(sub)</code>: Substring ka starting index dhoondta hai (agar na mile toh <code>-1</code> return karta hai).</li>\n      <li><code>.startswith()</code> / <code>.endswith()</code>: Check karta hai ki string kisi specific word/extension se shuru ya khatam hoti hai ya nahi (returns True/False).</li>\n    </ul>\n  </li>\n</ul>\n\n<h3>2. 💻 Live Demo: Text Cleaning Pipeline aur CSV Parsing</h3>\n<p>Neeche diye gaye code me dekhein ki registration form ke dirty text ko kaise sanitize kiya jata hai:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>text_cleaner_pipeline.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Dirty user input with irregular spaces and mixed cases:\nraw_user_name = \"   mOhD   kAiF   \"\nraw_email = \"   Mohd.Kaif@GMAIL.COM   \"\n\n# 1. Cleaning the name:\ncleaned_name = raw_user_name.strip().title()\n\n# 2. Sanitizing the email (trim + lowercase):\ncleaned_email = raw_email.strip().lower()\n\n# 3. Verification:\nis_gmail = cleaned_email.endswith(\"@gmail.com\")\n\nprint(\"--- SANITIZED USER PROFILE ---\")\nprint(\"Original Name:\", repr(raw_user_name))\nprint(\"Cleaned Name: \", repr(cleaned_name))\nprint(\"Cleaned Email:\", cleaned_email)\nprint(\"Is Verified Gmail:\", is_gmail)</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>--- SANITIZED USER PROFILE ---<br>Original Name: '   mOhD   kAiF   '<br>Cleaned Name:  'Mohd   Kaif'<br>Cleaned Email: mohd.kaif@gmail.com<br>Is Verified Gmail: True</div>\n</div>\n\n<p>Ab dekhte hain <code>.split()</code> aur <code>.join()</code> ka real-world magic (CSV parsing aur URL slug banana):</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>split_and_slug_generator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Scenario 1: Comma-separated values (CSV) ko process karna:\nskills_input = \"Python, Django, Machine Learning, SQL, Docker\"\nskills_list = [skill.strip() for skill in skills_input.split(\",\")]\nprint(\"Parsed Skills List:\", skills_list)\n\n# Scenario 2: Blog title se SEO URL Slug create karna:\nblog_title = \"10 Tips To Master Python Fast in 2026\"\n\n# Step a: lowercase me convert karo\n# Step b: spaces par split karke words ki list banao\nwords = blog_title.lower().split()\n\n# Step c: words ko hyphen '-' se join karo\nurl_slug = \"-\".join(words)\n\nprint(\"Original Title:\", blog_title)\nprint(\"SEO URL Slug:  \", f\"https://myblog.com/posts/{url_slug}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Parsed Skills List: ['Python', 'Django', 'Machine Learning', 'SQL', 'Docker']<br>Original Title: 10 Tips To Master Python Fast in 2026<br>SEO URL Slug:   https://myblog.com/posts/10-tips-to-master-python-fast-in-2026</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Strings Immutable Hain (Re-assignment Bhool Jana)</div>\n  <p>Har beginner kam se kam ek baar yeh galti zaroor karta hai:</p>\n  <p><strong>Galti: Method call karke re-assign na karna:</strong><br>\n  ❌ <strong>Wrong:</strong><br>\n  <code>name = \"aman sharma\"</code><br>\n  <code>name.upper()   # Yeh method nayi string return karta hai, purani wahi rehti hai!</code><br>\n  <code>print(name)    # Output: aman sharma (kuch nahi badla!)</code><br>\n  ✅ <strong>Correct:</strong><br>\n  <code>name = \"aman sharma\"</code><br>\n  <code>name = name.upper()  # Nayi returned string ko wapas variable me store karo</code><br>\n  <code>print(name)          # Output: AMAN SHARMA</code></p>\n  <p>❌ <strong>Character assignment ki galti:</strong><br>\n  <code>s = \"Python\"; s[0] = \"J\"</code> &rarr; <code>TypeError: 'str' object does not support item assignment</code>. Nayi string banane ke liye replace ya slicing use karein: <code>\"J\" + s[1:]</code>.</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Why Strings are Immutable in Python</div>\n  <p><strong>Real Life Application:</strong> Social media usernames (jaise Twitter handle ya Instagram username) ko normalize karna: <code>clean_username = username.strip().lstrip('@').lower()</code>. Chahe user <code>@Kaif_Dev</code> likhe ya <code>kaif_dev</code>, database me clean standardized entry jaati hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"Why are strings designed to be immutable in Python?\"</em><br>\n  <strong>Answer:</strong> Iske 3 main technical reasons hain:<br>\n  1. <strong>Memory Optimization (String Interning):</strong> Python memory bachane ke liye identical strings ka ek hi copy store karta hai. Agar string mutable hoti, toh ek jagah change karne se doosri jagah ka data silently corrupt ho jata.<br>\n  2. <strong>Security:</strong> Network connections, file paths aur database queries me strings use hoti hain. Agar string mutable hoti toh pass hone ke baad manipulate ki ja sakti thi.<br>\n  3. <strong>Dictionary Keys (Hashability):</strong> Dictionaries me keys immutable honi chahiye taaki unka hash code kabhi change na ho.</p>\n</div>",
    "mcqs": [
      {
        "q": "text = 'python'.upper() ke baad text ki value kya hogi?",
        "options": [
          "'python'",
          "'PYTHON'",
          "'Python'",
          "None"
        ],
        "correct": 1,
        "explanation": "upper() method string ke sabhi characters ko uppercase me convert karke nayi string return karta hai."
      },
      {
        "q": "s = '  hello  '; s.strip() ka output kya hoga?",
        "options": [
          "'  hello  '",
          "'hello'",
          "'hello  '",
          "'  hello'"
        ],
        "correct": 1,
        "explanation": "strip() method string ke dono ends (leading aur trailing) se whitespace hata deta hai."
      },
      {
        "q": "'a-b-c'.split('-') ka return data type aur value kya hogi?",
        "options": [
          "str ('abc')",
          "list (['a', 'b', 'c'])",
          "tuple (('a', 'b', 'c'))",
          "set ({'a', 'b', 'c'})"
        ],
        "correct": 1,
        "explanation": "split() method string ko delimiter ke basis par todkar elements ki list return karta hai."
      },
      {
        "q": "Agar text = 'banana' ho, toh text.replace('a', 'o') ka result kya hoga?",
        "options": [
          "'bonana'",
          "'bonono'",
          "'banana'",
          "'o'"
        ],
        "correct": 1,
        "explanation": "replace('a', 'o') string ke andar aane wale sabhi 'a' ko 'o' se replace kar dega ('bonono')."
      },
      {
        "q": "Python me 'Coding'[0] = 'k' likhne par kya hoga?",
        "options": [
          "String 'koding' ban jayegi",
          "TypeError aayega",
          "SyntaxError aayega",
          "Warning aayegi"
        ],
        "correct": 1,
        "explanation": "Strings immutable hoti hain, isliye direct index assignment allow nahi hota aur TypeError raise hota hai."
      }
    ]
  },
  {
    "day": 7,
    "week": 1,
    "phase": "Beginner",
    "topic": "f-strings aur slicing",
    "concept": "f-string se formatting",
    "demo": "Slicing [start:end:step]",
    "mistake": "Index 0 se start hota",
    "quiz": "Quiz: string reverse karo",
    "interview": "Interview: s[::-1] kaise kaam karta",
    "readTime": "12 mins",
    "contentHtml": "<h2>✂️ Day 7: f-Strings Formatting aur String Slicing</h2>\n<p>Kisi bhi programming project me string formatting aur substrings ko cut (slice) karna sabse frequently use hone wale tasks hain. Aaj hum Python 3.6 ke game-changing feature <strong>f-strings</strong> aur Python ki signature technique <strong>slicing <code>[start:end:step]</code></strong> ko master karenge.</p>\n\n<h3>1. 💡 Concept: Modern Formatting aur Slicing Syntax</h3>\n<p>Pehle Python me strings format karne ke liye <code>%</code> operator ya <code>.format()</code> method use hota tha jo kafi clumsy aur lamba tha. Python 3.6 me introduce hua <strong>Formatted String Literals (f-strings)</strong>, jisme string ke aage sirf <code>f</code> lagana hota hai aur variables ya expressions ko curly braces <code>{}</code> ke andar likh diya jata hai.</p>\n\n<p><strong>f-Strings ki Superpowers:</strong></p>\n<ul>\n  <li><strong>Direct Variables:</strong> <code>f\"Hello, {name}!\"</code></li>\n  <li><strong>Inline Math:</strong> <code>f\"Total price with 18% GST: Rs. {price * 1.18}\"</code></li>\n  <li><strong>Function Calls:</strong> <code>f\"Welcome, {user.upper()}!\"</code></li>\n  <li><strong>Format Specifiers:</strong>\n    <ul>\n      <li>Decimal places control: <code>{pi:.2f}</code> &rarr; <code>3.14</code> (sirf 2 decimal places)</li>\n      <li>Thousands separator: <code>{1000000:,}</code> &rarr; <code>1,000,000</code> (comma separation)</li>\n      <li>Zero padding: <code>{roll_no:04d}</code> &rarr; <code>0007</code> (4 digits tak zero fill)</li>\n      <li>Width & Alignment: <code>{name:&lt;15}</code> (left align), <code>{name:&gt;15}</code> (right align)</li>\n    </ul>\n  </li>\n</ul>\n\n<p><strong>String Slicing (String ke Tukde Karna):</strong><br>\nSlicing ka syntax hota hai: <code>string[start : stop : step]</code></p>\n<ul>\n  <li><strong>0-Based Indexing:</strong> Python me counting <code>0</code> se shuru hoti hai! Pehla character index 0 par hota hai. Negative indexing peeche se shuru hoti hai: <code>-1</code> aakhri character hota hai.</li>\n  <li><strong>start (Inclusive):</strong> Wo index jahan se slice shuru hoga (yeh character include hota hai). Default <code>0</code> hai.</li>\n  <li><strong>stop (Exclusive):</strong> Wo index jahan slice khatam hoga. <strong>DHYAAN DEIN:</strong> Stop index wala character include NAHI hota! Yeh <code>stop - 1</code> par ruk jata hai.</li>\n  <li><strong>step (Jump):</strong> Har baar kitne characters aage badhna hai. Default <code>1</code> hai. Agar step <code>2</code> ho toh ek chhodkar agla character aayega. Agar step <code>-1</code> ho toh string ulti (reverse) chalegi!</li>\n</ul>\n\n<h3>2. 💻 Live Demo: Invoice Generation aur Slicing Masterclass</h3>\n<p>Aaiye dekhte hain f-strings ka professional use ek clean invoice summary print karne ke liye:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>invoice_formatter.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>item_name = \"Mechanical Keyboard\"\nunit_price = 3499.50\nquantity = 2\ngst_rate = 0.18\n\nsubtotal = unit_price * quantity\ngst_amount = subtotal * gst_rate\ngrand_total = subtotal + gst_amount\ninvoice_id = 42\n\n# f-strings with formatting specifiers:\nprint(f\"{'INVOICE':^40}\")\nprint(\"=\" * 40)\nprint(f\"Invoice No : INV-{invoice_id:05d}\")\nprint(f\"Product    : {item_name}\")\nprint(f\"Price x Qty: Rs. {unit_price:.2f} x {quantity}\")\nprint(f\"Subtotal   : Rs. {subtotal:,.2f}\")\nprint(f\"GST (18%)  : Rs. {gst_amount:,.2f}\")\nprint(\"-\" * 40)\nprint(f\"GRAND TOTAL: Rs. {grand_total:,.2f}\")\nprint(\"=\" * 40)</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>                INVOICE                 <br>========================================<br>Invoice No : INV-00042<br>Product    : Mechanical Keyboard<br>Price x Qty: Rs. 3499.50 x 2<br>Subtotal   : Rs. 6,999.00<br>GST (18%)  : Rs. 1,259.82<br>----------------------------------------<br>GRAND TOTAL: Rs. 8,258.82<br>========================================</div>\n</div>\n\n<p>Ab dekhte hain string slicing ke essential tricks (Palindromes, masking, domain extraction):</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>slicing_masterclass.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>text = \"PYTHON_DEVELOPER\"\n\n# 1. Basic slicing:\nprint(\"First 6 characters [0:6]:\", text[0:6])       # PYTHON\nprint(\"Omit start [:6]:          \", text[:6])        # PYTHON\nprint(\"From index 7 to end [7:]: \", text[7:])        # DEVELOPER\n\n# 2. Negative slicing:\nprint(\"Last 3 letters [-3:]:     \", text[-3:])       # PER\nprint(\"Except last 3 [:-3]:      \", text[:-3])       # PYTHON_DEVELO\n\n# 3. Step parameter:\nprint(\"Every 2nd char [::2]:     \", text[::2])       # PTO_EEPE\n\n# 4. Reverse string magic [::-1]:\nprint(\"Reversed text [::-1]:     \", text[::-1])      # REPOLEVED_NOHTYP\n\n# 5. Palindrome Checker:\nword = \"radar\"\nis_palindrome = word == word[::-1]\nprint(f\"Is '{word}' a Palindrome? {is_palindrome}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>First 6 characters [0:6]: PYTHON<br>Omit start [:6]:           PYTHON<br>From index 7 to end [7:]:  DEVELOPER<br>Last 3 letters [-3:]:      PER<br>Except last 3 [:-3]:       PYTHON_DEVELO<br>Every 2nd char [::2]:      PTO_EEPE<br>Reversed text [::-1]:      REPOLEVED_NOHTYP<br>Is 'radar' a Palindrome? True</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Off-By-One Indexing aur IndexError</div>\n  <p>String indexing me beginners do bohot common galtiyan karte hain:</p>\n  <p><strong>Galti 1: Off-by-One Error (Stop index ko include samajhna):</strong><br>\n  Agar <code>s = \"HELLO\"</code> hai aur aap pehle 3 letters chahte hain, toh <code>s[0:2]</code> likhne par sirf <code>\"HE\"</code> aayega kyunki stop index 2 exclude ho jata hai! Sahi tarika: <code>s[0:3]</code> (indices 0, 1, 2 include honge).</p>\n  <p><strong>Galti 2: Single Indexing vs Slicing me IndexError ka difference:</strong><br>\n  - Direct index: <code>s = \"Hi\"; print(s[10])</code> &rarr; <code>IndexError: string index out of range</code> (program crash!)<br>\n  - Slicing: <code>s = \"Hi\"; print(s[10:20])</code> &rarr; Output: <code>\"\"</code> (Empty string! Slicing out of bounds hone par crash nahi karti balki graceful empty slice return karti hai).</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Data Masking aur s[::-1] Deep Dive</div>\n  <p><strong>Real Life Application:</strong> Sensitive user information ko mask karna (Security compliance):<br>\n  <code>card_number = \"4532890123459876\"</code><br>\n  <code>masked_card = f\"{'X' * 12}{card_number[-4:]}\"</code> &rarr; <code>XXXXXXXXXXXX9876</code><br>\n  Yeh technique har fintech app (Paytm, PhonePe, Google Pay) use karti hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"How does s[::-1] reverse a string in Python under the hood?\"</em><br>\n  <strong>Answer:</strong> Slicing syntax <code>s[start:stop:step]</code> me jab start aur stop omit (khali) hote hain aur step negative hota hai (<code>-1</code>), toh Python automatically start ko <code>len(s) - 1</code> (aakhri character) aur stop ko string ke shuruat se pehle tak set kar deta hai. Step <code>-1</code> hone ki wajah se interpreter har step par pichhle index par jump karta hai, effectively poori string ko reverse karke return karta hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "word = 'DEVELOPER'; print(word[2:5]) ka output kya hoga?",
        "options": [
          "'VEL'",
          "'EVE'",
          "'DEVE'",
          "'VELOP'"
        ],
        "correct": 0,
        "explanation": "Indices 2, 3, 4 include honge: index 2='V', 3='E', 4='L'. Isliye 'VEL' aayega."
      },
      {
        "q": "f-string me 3.14159 ko 2 decimal places tak dikhane ke liye kya format specifier use hoga?",
        "options": [
          "{val:2d}",
          "{val:.2f}",
          "{val:%2f}",
          "{val:.2}"
        ],
        "correct": 1,
        "explanation": ":.2f format specifier floating point number ko strictly 2 decimal places tak round karta hai."
      },
      {
        "q": "s = 'PYTHON'; s[::-1] ka result kya hoga?",
        "options": [
          "'PYTHON'",
          "'NOHTYP'",
          "Error",
          "'N'"
        ],
        "correct": 1,
        "explanation": "Step -1 lagane se poori string right-to-left reverse ho jaati hai ('NOHTYP')."
      },
      {
        "q": "Agar text = 'Code' ho, toh text[-1] ki value kya hogi?",
        "options": [
          "'C'",
          "'d'",
          "'e'",
          "IndexError"
        ],
        "correct": 2,
        "explanation": "Negative indexing peeche se shuru hoti hai. -1 aakhri character ('e') ko point karta hai."
      },
      {
        "q": "s = 'Data'; s[10:20] run karne par kya hoga?",
        "options": [
          "IndexError: string index out of range",
          "Empty string ''",
          "None",
          "'Data'"
        ],
        "correct": 1,
        "explanation": "Python me slicing kabhi out of range IndexError raise nahi karti, range ke bahar hone par empty string return karti hai."
      }
    ]
  },
  {
    "day": 8,
    "week": 2,
    "phase": "Beginner",
    "topic": "if-else",
    "concept": "if-else ka logic",
    "demo": "Pass ya fail program",
    "mistake": "Indentation error",
    "quiz": "Quiz: bada number batao",
    "interview": "Real life: login check",
    "readTime": "12 mins",
    "contentHtml": "<h2>🚦 Day 8: Conditional Logic - if-else aur Indentation</h2>\n<p>Ab tak hamara code ek hi track par seedha chal raha tha. Lekin real-world software ko raste chunne hote hain — agar user ka password sahi hai toh dashboard dikhao, warna error dikhao. Aaj hum programming ke decision-making brain: <code>if-else</code> aur Python ke sabse unique feature <strong>Indentation</strong> ko deeply master karenge.</p>\n\n<h3>1. 💡 Concept: Control Flow aur Python ki Indentation</h3>\n<p>Jab kisi condition ke True ya False hone par code ke alag-alag hisse execute hote hain, toh use <strong>Branching</strong> ya <strong>Control Flow</strong> kehte hain. Normally Python program top-to-bottom ek line ke baad doosri line execute karta hai, lekin conditional statements humein raste badalne ki azadi dete hain.</p>\n\n<p><strong>Real-World Analogy:</strong> Railway track ka switch socho! Agar switch right me set hai, toh train platform 1 par jayegi; agar switch left me hai, toh train platform 2 par jayegi. Theek waise hi, <code>if condition:</code> yeh switch hai. Agar condition <code>True</code> hai, toh <code>if</code> ka block chalega; agar condition <code>False</code> hai, toh <code>else</code> ka block chalega.</p>\n\n<p><strong>Syntax of if-else:</strong></p>\n<pre>if condition:\n    # Code block tab chalega jab condition True ho (4 spaces indent)\n    # Aap yahan multiple lines of code likh sakte hain\nelse:\n    # Code block tab chalega jab condition False ho (4 spaces indent)\n    # Default fallback actions yahan perform hote hain</pre>\n\n<p><strong>🚨 PYTHON KI INDENTATION (Whitespace Matters!):</strong><br>\nC, C++, Java aur JavaScript me code block define karne ke liye curly braces <code>{ }</code> ka use kiya jata hai. Lekin Python me koi curly braces nahi hote! Python me code block define karne ke liye <strong>Indentation (Whitespace / Spaces)</strong> ka istemaal hota hai.</p>\n<ul>\n  <li>PEP 8 standard ke mutabiq har indented level ke liye <strong>strictly 4 spaces</strong> use kiye jaane chahiye.</li>\n  <li>Tab aur spaces ko mix karna Python me strictly mana hai (Python 3 me TabError raise hota hai). Apne editor (jaise VS Code) ko 4 spaces per tab par set karein.</li>\n  <li><code>if</code> aur <code>else</code> statement ke aakhir me colon <code>:</code> lagana mandatory hai. Yeh colon Python ko batata hai: <em>\"Bhai, ab yahan se ek naya code block shuru ho raha hai!\"</em></li>\n  <li>Jab indentation wapas left boundary par aa jaati hai, toh Python samajh jaata hai ki conditional block khatam ho chuka hai aur normal sequential code continue hoga.</li>\n</ul>\n\n<p><strong>Ternary Operator (Single-line conditional):</strong><br>\nPython me chhoti conditions ke liye ek concise syntax hota hai: <code>value_if_true if condition else value_if_false</code>. Jaise <code>status = \"Adult\" if age &gt;= 18 else \"Minor\"</code>. Yeh code readability badhata hai aur unnecessary multi-line boilerplate ko reduce karta hai.</p>\n\n<h3>2. 💻 Live Demo: Student Pass/Fail aur ATM Cash Withdrawal</h3>\n<p>Aaiye dekhte hain examination result evaluation ka clean program:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>exam_result_evaluator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>student_name = \"Pooja Verma\"\nmarks_obtained = 76\npassing_marks = 40\n\nprint(f\"Evaluating Result for: {student_name}\")\nprint(f\"Marks Scored: {marks_obtained}/100\")\n\n# Conditional logic:\nif marks_obtained >= passing_marks:\n    print(\"STATUS: CONGRATULATIONS! Aap PASS ho gaye hain. 🎉\")\n    if marks_obtained >= 75:\n        print(\"DISTINCTION: Aapne 75%+ score karke Distinction score kiya hai!\")\nelse:\n    marks_needed = passing_marks - marks_obtained\n    print(\"STATUS: Regret! Aap FAIL ho gaye hain.\")\n    print(f\"Pass hone ke liye aapko {marks_needed} marks aur chahiye the.\")\n\n# Ternary operator for quick certificate badge:\nbadge = \"Gold Performer\" if marks_obtained >= 75 else \"Participant\"\nprint(f\"Award Badge: {badge}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Evaluating Result for: Pooja Verma<br>Marks Scored: 76/100<br>STATUS: CONGRATULATIONS! Aap PASS ho gaye hain. 🎉<br>DISTINCTION: Aapne 75%+ score karke Distinction score kiya hai!<br>Award Badge: Gold Performer</div>\n</div>\n\n<p>Ab dekhte hain real-world ATM withdrawal machine ka security aur balance check logic:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>atm_withdrawal_simulator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>account_balance = 15000.0\nwithdrawal_amount = 4000.0\ndaily_atm_limit = 10000.0\n\nprint(f\"Current Balance: Rs. {account_balance}\")\nprint(f\"Withdrawal Request: Rs. {withdrawal_amount}\")\n\n# ATM processing rules:\nif withdrawal_amount > daily_atm_limit:\n    print(\"TRANSACTION DECLINED: Daily limit (Rs. 10,000) exceed ho gayi hai!\")\nelif withdrawal_amount > account_balance:\n    print(\"TRANSACTION DECLINED: Insufficient balance! Account me itne paise nahi hain.\")\nelse:\n    account_balance -= withdrawal_amount\n    print(\"TRANSACTION SUCCESSFUL: Cash dispensed please collect Rs.\", withdrawal_amount)\n    print(f\"Remaining Account Balance: Rs. {account_balance}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Current Balance: Rs. 15000.0<br>Withdrawal Request: Rs. 4000.0<br>TRANSACTION SUCCESSFUL: Cash dispensed please collect Rs. 4000.0<br>Remaining Account Balance: Rs. 11000.0</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: IndentationError aur Missing Colon :</div>\n  <p>Beginners aksar in do errors me phans jate hain:</p>\n  <p><strong>Galti 1: Colon <code>:</code> bhool jana:</strong><br>\n  ❌ <code>if age &gt;= 18</code> &rarr; <code>SyntaxError: expected ':'</code>.<br>\n  Har <code>if</code>, <code>elif</code>, <code>else</code>, <code>for</code>, <code>while</code>, aur <code>def</code> ke baad colon lagana zaroori hai!</p>\n  <p><strong>Galti 2: Indentation ka mismatch (IndentationError):</strong><br>\n  ❌ <strong>Wrong:</strong><br>\n  <code>if age &gt;= 18:</code><br>\n  <code>print(\"Allowed\")  # IndentationError: expected an indented block after 'if' statement</code><br>\n  ✅ <strong>Correct:</strong><br>\n  <code>if age &gt;= 18:</code><br>\n  <code>    print(\"Allowed\")  # Sahi 4 spaces ka indent!</code></p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Secure Login Verification System</div>\n  <p><strong>Real Life Application:</strong> Web backend authentication system me credentials match karna:<br>\n  <code>if entered_user == db_user and hash_func(entered_pass) == db_password_hash:</code><br>\n  <code>    generate_session_token()</code><br>\n  <code>else:</code><br>\n  <code>    record_failed_attempt()</code></p>\n  <p><strong>Interview Question:</strong> <em>\"Why did Python choose significant whitespace (indentation) instead of curly braces {}?\"</em><br>\n  <strong>Answer:</strong> Python ke creator Guido van Rossum chahte the ki code hamesha clean, uniform aur readable ho. C ya Java me log alag-alag indentation styles use karte hain jisse code messy ho jata hai. Python ne indentation ko syntax ka hissa banakar do faayde achieve kiye: 1) Har Python developer ka code ek jaisa dikhta hai, 2) Curly braces aur semicolons ka extra visual clutter khatam ho gaya.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me code block define karne ke liye kiska upayog hota hai?",
        "options": [
          "Curly braces { }",
          "Indentation (whitespace)",
          "Square brackets [ ]",
          "Begin aur End keywords"
        ],
        "correct": 1,
        "explanation": "Python me code blocks strictly Indentation (whitespace) se define hote hain, PEP 8 ke hisaab se 4 spaces standard hain."
      },
      {
        "q": "if statement ke baad kaunsa symbol lagana mandatory hai?",
        "options": [
          "; (semicolon)",
          ": (colon)",
          "-> (arrow)",
          ", (comma)"
        ],
        "correct": 1,
        "explanation": "Har conditional block shuru karne ke liye statement ke end me colon (:) lagana compulsory hai."
      },
      {
        "q": "x = 10; res = 'Even' if x % 2 == 0 else 'Odd' me res ki value kya hogi?",
        "options": [
          "'Even'",
          "'Odd'",
          "True",
          "False"
        ],
        "correct": 0,
        "explanation": "10 % 2 == 0 True hai, isliye ternary operator ka pehla part 'Even' assign hoga."
      },
      {
        "q": "Agar if statement ke neeche bina indentation ke code likh diya jaye, toh kaunsa error aayega?",
        "options": [
          "TypeError",
          "SyntaxError / IndentationError",
          "NameError",
          "ValueError"
        ],
        "correct": 1,
        "explanation": "Python expects an indented block after a colon; otherwise IndentationError raise hota hai."
      },
      {
        "q": "else block kab execute hota hai?",
        "options": [
          "Hamesha execute hota hai",
          "Jab if condition True ho",
          "Jab if condition False evaluate ho",
          "Jab error aati hai"
        ],
        "correct": 2,
        "explanation": "else block tabhi trigger hota hai jab usse judi hui if condition False evaluate ho."
      }
    ]
  },
  {
    "day": 9,
    "week": 2,
    "phase": "Beginner",
    "topic": "elif aur nested if",
    "concept": "elif kab use karein",
    "demo": "Grade calculator demo",
    "mistake": "Multiple if vs elif",
    "quiz": "Quiz: leap year",
    "interview": "Interview: nested if vs and",
    "readTime": "12 mins",
    "contentHtml": "<h2>🪜 Day 9: Multi-branching - elif aur Nested if</h2>\n<p>Zindagi aur software development me decisions sirf \"Haan ya Na\" (if-else) tak seemit nahi hote. Traffic light me 3 rang hote hain, student grades me A, B, C, D, F hote hain, aur e-commerce shipping me multiple weight tiers hote hain. Aaj hum multi-condition decision making ke liye <code>elif</code> ladder aur <code>nested if</code> structures ko detail me samjhenge.</p>\n\n<h3>1. 💡 Concept: elif Ladder aur Nested Conditions</h3>\n<p>Jab aapke paas 2 se zyada mutually exclusive (aapas me ek doosre ko kaatne wale) vikalp hon, tab hum <code>elif</code> ka use karte hain. <code>elif</code> asal me <strong>\"else if\"</strong> ka short form hai.</p>\n\n<p><strong>The Golden Execution Rule of elif Ladder:</strong><br>\nPython <code>if-elif-elif-else</code> ladder ko upar se neeche (top-to-bottom) ek-ek karke check karta hai. <strong>JAISE HI</strong> koi ek condition <code>True</code> evaluate hoti hai, Python us condition ka code block run karta hai aur <strong>BAKI SAARI ELIF AUR ELSE CONDITIONS KO IGNORE (SKIP)</strong> karke turant ladder se bahar nikal jata hai!</p>\n\n<p>Agar koi bhi condition True nahi hoti, tab aakhri me default safety net ke roop me <code>else</code> block execute hota hai.</p>\n\n<p><strong>Nested if (Ek if ke andar doosra if):</strong><br>\nJab ek decision kisi pichhle decision par depend karta hai, toh use <strong>Nested if</strong> kehte hain. Jaise:</p>\n<pre>if user_is_registered:\n    if account_is_active:\n        if balance_is_sufficient:\n            allow_payment()</pre>\n\n<p><strong>Nested if vs Logical <code>and</code>:</strong><br>\nAap soch sakte hain: <em>\"Bhai, teen if lagane ke bajaye <code>if cond1 and cond2 and cond3:</code> kyun na likh dein?\"</em><br>\n- Jab aapko user ko specific aur alag-alag error message dena ho (jaise \"Aap registered nahi hain\" vs \"Aapka account suspended hai\"), tab <strong>Nested if</strong> best hota hai.<br>\n- Jab aapko sirf ek simple pass/fail check karna ho aur specific message na dena ho, tab <strong>compound <code>and</code></strong> zyada clean aur compact hota hai.</p>\n\n<h3>2. 💻 Live Demo: Academic Grade Calculator aur Leap Year Logic</h3>\n<p>Aaiye dekhte hain ek comprehensive school/college grade calculator program with boundary validation:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>grade_calculator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>student_score = 86.5\n\nprint(f\"Processing Grades for Score: {student_score}\")\n\n# Input validation first:\nif student_score < 0 or student_score > 100:\n    print(\"ERROR: Score 0 se 100 ke beech hona chahiye!\")\nelif student_score >= 90:\n    grade = \"A+\"\n    feedback = \"Outstanding Performance! University Ranker. 🏆\"\nelif student_score >= 80:\n    grade = \"A\"\n    feedback = \"Excellent work! Keep it up. 🌟\"\nelif student_score >= 70:\n    grade = \"B\"\n    feedback = \"Good job, but scope for improvement. 👍\"\nelif student_score >= 60:\n    grade = \"C\"\n    feedback = \"Average performance, needs hard work. 📚\"\nelif student_score >= 40:\n    grade = \"D\"\n    feedback = \"Just passed. Needs serious focus! ⚠️\"\nelse:\n    grade = \"F\"\n    feedback = \"Failed. Must appear for re-examination. ❌\"\n\nprint(f\"Final Grade: {grade}\")\nprint(f\"Remarks    : {feedback}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Processing Grades for Score: 86.5<br>Final Grade: A<br>Remarks    : Excellent work! Keep it up. 🌟</div>\n</div>\n\n<p>Ab dekhte hain programming interviews ka sabse classic problem: <strong>Leap Year Algorithm</strong> (Nested if vs logical condition):</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>leap_year_algorithm.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>year = 2024\n\nprint(f\"Checking Year: {year}\")\n\n# Gregorian Calendar Leap Year Rules:\n# 1. Year must be divisible by 4\n# 2. But if divisible by 100, it is NOT a leap year UNLESS also divisible by 400\n\nif year % 4 == 0:\n    if year % 100 == 0:\n        if year % 400 == 0:\n            is_leap = True\n        else:\n            is_leap = False\n    else:\n        is_leap = True\nelse:\n    is_leap = False\n\nprint(f\"Method 1 (Nested if) - Is Leap Year? {is_leap}\")\n\n# Method 2: Professional Single Line with 'and' / 'or':\nis_leap_pro = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nprint(f\"Method 2 (Clean Boolean) - Is Leap Year? {is_leap_pro}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Checking Year: 2024<br>Method 1 (Nested if) - Is Leap Year? True<br>Method 2 (Clean Boolean) - Is Leap Year? True</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Multiple if Statements vs elif Ladder</div>\n  <p>Beginners aksar <code>elif</code> ke badle har jagah naya <code>if</code> likh dete hain. Isse disastrous results aate hain!</p>\n  <p><strong>Galti: Har condition par independent if lagana:</strong><br>\n  ❌ <strong>Wrong Code:</strong><br>\n  <code>score = 95</code><br>\n  <code>if score &gt;= 90: grade = \"A\"</code><br>\n  <code>if score &gt;= 80: grade = \"B\"  # Yeh bhi chal jayega!</code><br>\n  <code>if score &gt;= 70: grade = \"C\"  # Yeh bhi chal jayega!</code><br>\n  <code>print(grade)  # Output: C (95 wale topper ko Grade C mil gaya!)</code><br>\n  Kyunki har <code>if</code> independent hai, Python sabhi ko run karta hai aur aakhri wala pichhle results ko overwrite kar deta hai!</p>\n  <p>✅ <strong>Correct Code:</strong><br>\n  <code>if score &gt;= 90: grade = \"A\"</code><br>\n  <code>elif score &gt;= 80: grade = \"B\"</code><br>\n  <code>elif score &gt;= 70: grade = \"C\"</code><br>\n  <code>print(grade)  # Output: A (pehle match par baaki sab skip!)</code></p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Nested if vs and Logic</div>\n  <p><strong>Real Life Application:</strong> Cinema Ticket Pricing System:<br>\n  Ticket price age group aur weekend ke basis par calculate hoti hai. Children ke liye Rs. 150, Senior Citizens ke liye Rs. 180, aur Adults ke liye Rs. 250. Agar Friday/Saturday/Sunday hai, toh Rs. 50 extra weekend surcharge add hota hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"What is the maximum number of blocks that can execute in a single if-elif-else construct?\"</em><br>\n  <strong>Answer:</strong> Exactly <strong>ONE</strong> block (ya ZERO agar <code>else</code> part na ho aur koi bhi condition True na ho). Ek baar kisi bhi block ka trigger ho gaya, toh interpreter poore construct se exit ho jata hai. Yeh performance optimize karta hai kyunki un-necessary condition evaluation se bachat hoti hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me 'else if' ke liye kaunsa keyword use hota hai?",
        "options": [
          "else if",
          "elseif",
          "elif",
          "else_if"
        ],
        "correct": 2,
        "explanation": "Python me strictly 'elif' keyword use hota hai multi-condition branching ke liye."
      },
      {
        "q": "Ek if-elif-elif-else ladder me zyada se zyada kitne blocks execute ho sakte hain?",
        "options": [
          "Sabhi blocks",
          "Keval 1 block",
          "2 blocks",
          "Jitne True hon utne"
        ],
        "correct": 1,
        "explanation": "Ladder me pehli matching True condition ka block run hota hai aur baaki saare skip ho jaate hain (sirf 1 block)."
      },
      {
        "q": "Kya if-elif structure ke end me else block lagana mandatory (compulsory) hai?",
        "options": [
          "Haan, bina else ke syntax error aayega",
          "Nahi, else optional hota hai",
          "Sirf Python 3 me mandatory hai",
          "None"
        ],
        "correct": 1,
        "explanation": "else block optional hota hai; agar aap nahi lagate aur koi condition match nahi hoti toh code bina error ke aage badh jata hai."
      },
      {
        "q": "Kaunsa year leap year hai?",
        "options": [
          "1900",
          "2000",
          "2021",
          "2023"
        ],
        "correct": 1,
        "explanation": "Century years (ending in 00) tabhi leap year hote hain jab wo 400 se divisible hon. 2000 % 400 == 0 True hai (1900 leap year nahi tha)."
      },
      {
        "q": "score = 85 ke liye: if score > 80: print('X'); elif score > 70: print('Y') ka output kya hoga?",
        "options": [
          "X aur Y dono",
          "Sirf X",
          "Sirf Y",
          "Kuch nahi"
        ],
        "correct": 1,
        "explanation": "Pehla if True ho gaya, isliye 'X' print hoga aur elif block skip ho jayega."
      }
    ]
  },
  {
    "day": 10,
    "week": 2,
    "phase": "Beginner",
    "topic": "for loop aur range()",
    "concept": "for loop basics",
    "demo": "range(start, stop, step)",
    "mistake": "range(5) mein 5 nahi aata",
    "quiz": "Quiz: 1 se 10 tak sum",
    "interview": "Real life: table generator",
    "readTime": "12 mins",
    "contentHtml": "<h2>🔁 Day 10: for Loop aur range() Function</h2>\n<p>Insaan repetitive tasks karte-karte thak jaata hai aur galtiyan karne lagta hai, lekin computer bina thake ek hi kaam ko karodon baar micro-seconds me repeat kar sakta hai. Yahi programming ka asli superpower hai: <strong>Loops (Punaravriti)</strong>. Aaj hum Python ke sabse versatile aur elegant tool <strong>for loop</strong> aur <strong>range()</strong> function ko master karenge.</p>\n\n<h3>1. 💡 Concept: Iteration, Sequences aur range() ka Deep Dive</h3>\n<p>Python ka <code>for</code> loop traditional C ya Java ke loop se bohot alag aur powerful hai. C me humein counter variable banana padta hai (<code>for (int i=0; i&lt;10; i++)</code>). Lekin Python ka <code>for</code> loop asal me ek <strong>for-each iterator</strong> hai jo kisi bhi sequence (jaise string, list, tuple, ya range) ke har element par ek-ek karke traverse karta hai.</p>\n\n<p><strong>Factory Conveyor Belt Analogy:</strong> Socho ek factory me conveyor belt chal rahi hai aur uspe se ek-ek box guzar raha hai. Quality inspector (aapka for loop) har aate hue box ko uthata hai, uspe inspection stamp lagata hai, aur agli box ka intezar karta hai. Jab saari boxes khatam ho jaati hain, conveyor belt ruk jaati hai.</p>\n\n<p><strong>range() Function ke 3 Roop (Forms):</strong><br>\nJab humein numbers ki sequence generate karni hoti hai, toh hum <code>range()</code> function use karte hain:</p>\n<ul>\n  <li><strong>1. <code>range(stop)</code>:</strong> Zero se shuru hokar <code>stop - 1</code> tak jata hai. Jaise <code>range(5)</code> generate karega: <code>0, 1, 2, 3, 4</code> (total 5 numbers, lekin 5 include nahi hoga!).</li>\n  <li><strong>2. <code>range(start, stop)</code>:</strong> Diye gaye <code>start</code> index se shuru hokar <code>stop - 1</code> tak jata hai. Jaise <code>range(1, 6)</code> generate karega: <code>1, 2, 3, 4, 5</code>.</li>\n  <li><strong>3. <code>range(start, stop, step)</code>:</strong> Diye gaye step interval ke hisaab se jump karta hai.\n    <ul>\n      <li><code>range(2, 11, 2)</code> &rarr; <code>2, 4, 6, 8, 10</code> (Even numbers)</li>\n      <li><code>range(10, 0, -1)</code> &rarr; <code>10, 9, 8, 7, 6, 5, 4, 3, 2, 1</code> (Reverse countdown!)</li>\n    </ul>\n  </li>\n</ul>\n\n<p><strong>Memory Efficiency of range():</strong><br>\nPython 3 me <code>range()</code> poori list ko memory me store nahi karta! Yeh ek <strong>Lazy Sequence Object</strong> hai jo agla number tabhi calculate karta hai jab loop use maangta hai. Chahe aap <code>range(1000000000)</code> likhein, yeh aapke computer ki 1 KB RAM bhi extra consume nahi karega!</p>\n\n<p><strong>The Accumulator Pattern:</strong><br>\nProgramming me loop ke zariye total sum, product ya count jama karne ko accumulator pattern kehte hain. Loop shuru hone se pehle ek variable banate hain (e.g. <code>total = 0</code>), aur loop ke andar har step par <code>total += value</code> karte rehte hain.</p>\n\n<h3>2. 💻 Live Demo: Table Generator aur Accumulator Operations</h3>\n<p>Aaiye dekhte hain kisi bhi number ka clean mathematical table generator program:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>multiplication_table.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>table_num = 7\n\nprint(f\"=== MULTIPLICATION TABLE OF {table_num} ===\")\n\n# range(1, 11) ka matlab 1 se lekar 10 tak chalega:\nfor i in range(1, 11):\n    product = table_num * i\n    print(f\"{table_num} x {i:2d} = {product:3d}\")\n\nprint(\"=================================\")\n\n# Characters par loop chalana (String iteration):\nword = \"PYTHON\"\nprint(\"Iterating over word:\")\nfor char in word:\n    print(f\"Letter: {char}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>=== MULTIPLICATION TABLE OF 7 ===<br>7 x  1 =   7<br>7 x  2 =  14<br>7 x  3 =  21<br>7 x  4 =  28<br>7 x  5 =  35<br>7 x  6 =  42<br>7 x  7 =  49<br>7 x  8 =  56<br>7 x  9 =  63<br>7 x 10 =  70<br>=================================<br>Iterating over word:<br>Letter: P<br>Letter: Y<br>Letter: T<br>Letter: H<br>Letter: O<br>Letter: N</div>\n</div>\n\n<p>Ab dekhte hain Accumulator Pattern: 1 se 10 tak numbers ka sum aur vowels count karne ka algorithm:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>accumulator_and_vowel_counter.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Scenario 1: 1 se 100 tak ke sabhi Even numbers ka sum nikaalna:\neven_sum = 0\nfor n in range(2, 101, 2):\n    even_sum += n\n\nprint(f\"Sum of even numbers from 2 to 100: {even_sum}\")\n\n# Scenario 2: Sentence me vowels (a, e, i, o, u) count karna:\nsentence = \"Python Programming is Super Fun\"\nvowels = \"aeiouAEIOU\"\nvowel_count = 0\n\nfor ch in sentence:\n    if ch in vowels:\n        vowel_count += 1\n\nprint(f\"Sentence: '{sentence}'\")\nprint(f\"Total Vowels Found: {vowel_count}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Sum of even numbers from 2 to 100: 2550<br>Sentence: 'Python Programming is Super Fun'<br>Total Vowels Found: 9</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: range(5) me 5 Kabhi Nahi Aata!</div>\n  <p>Beginners ki sabse badi galti hoti hai stop boundary ko inclusive samajhna:</p>\n  <p><strong>Galti 1: Stop boundary bhool jana:</strong><br>\n  ❌ Agar aapko 1 se 10 tak count karna hai aur aapne <code>for i in range(1, 10):</code> likha, toh loop <strong>sirf 9 tak</strong> chalega! 10 include nahi hoga!<br>\n  ✅ Sahi code: <code>for i in range(1, 11):</code> (hamesha target se 1 number zyada stop value dein).</p>\n  <p><strong>Galti 2: Direct print(range(5)) karna:</strong><br>\n  ❌ <code>print(range(5))</code> &rarr; Output: <code>range(0, 5)</code> (yeh list nahi dikhayega kyunki yeh generator object hai).<br>\n  Agar numbers dekhne hain, toh list me cast karein: <code>list(range(5)) &rarr; [0, 1, 2, 3, 4]</code>.</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Batch Processing & Enumerate</div>\n  <p><strong>Real Life Application:</strong> Bulk SMS / Email Dispatch System:<br>\n  Ek e-commerce platform par promotional sale ke waqt 50,000 customers ki list par <code>for customer in customer_list:</code> loop chalakar personalized discount codes dispatch kiye jaate hain.</p>\n  <p><strong>Interview Question:</strong> <em>\"How do you get both the index and value when looping over a sequence in Python?\"</em><br>\n  <strong>Answer:</strong> Python me <code>enumerate()</code> function use kiya jata hai. Yeh function index aur value dono ka pair return karta hai:<br>\n  <code>for idx, fruit in enumerate(['Apple', 'Banana', 'Mango'], start=1):</code><br>\n  <code>    print(f\"{idx}. {fruit}\")</code><br>\n  Yeh manual counter variable banane se bachata hai aur idiomatic Python code maana jata hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "range(1, 6) konse numbers generate karega?",
        "options": [
          "1, 2, 3, 4, 5, 6",
          "1, 2, 3, 4, 5",
          "0, 1, 2, 3, 4, 5",
          "2, 3, 4, 5, 6"
        ],
        "correct": 1,
        "explanation": "range(start, stop) start se lekar stop-1 tak numbers generate karta hai, isliye 1 se 5 tak aayenge."
      },
      {
        "q": "range(10, 0, -2) ka sequence kya hoga?",
        "options": [
          "10, 8, 6, 4, 2, 0",
          "10, 8, 6, 4, 2",
          "10, 9, 8, 7",
          "Error"
        ],
        "correct": 1,
        "explanation": "Start 10 hai, step -2 hai, aur stop 0 exclusive hai, isliye 10, 8, 6, 4, 2 generate honge."
      },
      {
        "q": "Python me for i in range(5): loop kitni baar execute hoga?",
        "options": [
          "4 baar",
          "5 baar",
          "6 baar",
          "Infinite baar"
        ],
        "correct": 1,
        "explanation": "range(5) values 0, 1, 2, 3, 4 generate karta hai, jo total 5 values hain, isliye loop 5 baar chalega."
      },
      {
        "q": "Python 3 me range(100) memory me kya return karta hai?",
        "options": [
          "100 elements ki list",
          "Ek lazy range object (generator)",
          "Ek tuple",
          "Dictionary"
        ],
        "correct": 1,
        "explanation": "Python 3 me range() ek immutable sequence type object return karta hai jo numbers on-demand calculate karta hai."
      },
      {
        "q": "Loop chalate waqt index aur value dono ek sath prapt karne ke liye kaunsa function use hota hai?",
        "options": [
          "range()",
          "enumerate()",
          "zip()",
          "items()"
        ],
        "correct": 1,
        "explanation": "enumerate() built-in function sequence ke har item ke sath uska index (index, item) tuple format me deta hai."
      }
    ]
  },
  {
    "day": 11,
    "week": 2,
    "phase": "Beginner",
    "topic": "while loop, break, continue",
    "concept": "while loop basics",
    "demo": "break aur continue demo",
    "mistake": "Infinite loop galti",
    "quiz": "Quiz: number guessing",
    "interview": "Interview: for vs while",
    "readTime": "12 mins",
    "contentHtml": "<h2>🔄 Day 11: while Loops, break, continue aur pass</h2>\n<p>Kal humne <code>for</code> loop dekha jisme humein pehle se pata hota tha ki loop kitni baar chalega (definite iteration). Lekin real life me hum aksar aisi conditions me kaam karte hain jahan humein pehle se pata nahi hota ki kaam kitni baar repeat hoga — jaise jab tak user sahi password na daal de, ya jab tak internet dobara connect na ho jaye. Aisi indefinite situations ke liye Python me <strong>while loop</strong> use hota hai.</p>\n\n<h3>1. 💡 Concept: Conditional Loops aur Loop Control Statements</h3>\n<p><strong>Water Tank Analogy:</strong> Apne ghar ki paani ki tanki ke baare me socho. Jab aap water pump switch ON karte ho, toh aap ek rule lagate ho: <em>\"Jab tak tanki full na ho jaye, tab tak pump chalte rehna chahiye!\"</em> Theek yahi kaam <code>while</code> loop karta hai: jab tak condition <code>True</code> rehti hai, loop ka block baar-baar chalta rehta hai. Jaise hi condition <code>False</code> hoti hai, loop turant ruk jata hai.</p>\n\n<p><strong>while Loop ka Basic Structure:</strong></p>\n<pre># 1. Initialization (shuruat)\ncounter = 1\n\n# 2. Condition check\nwhile counter <= 5:\n    print(\"Iteration:\", counter)\n    counter += 1  # 3. Updation / Increment (warna infinite loop ban jayega!)</pre>\n\n<p><strong>Loop Control Keywords:</strong></p>\n<ul>\n  <li><strong><code>break</code> (Emergency Brake):</strong> Loop ko turant terminate (khatam) karke loop ke bahar phek deta hai. Baaki ki iterations bilkul nahi chalti.</li>\n  <li><strong><code>continue</code> (Skip to Next):</strong> Current iteration ko wahin par chhod deta hai aur agle cycle (iteration) par jump kar jata hai. Iske neeche likha code current cycle ke liye skip ho jata hai.</li>\n  <li><strong><code>pass</code> (Do Nothing):</strong> Yeh ek placeholder statement hai. Jab syntactically code block likhna zaroori ho lekin aap abhi koi logic nahi likhna chahte, tab <code>pass</code> use hota hai taaki koi error na aaye.</li>\n  <li><strong><code>while True</code> Pattern:</strong> Industry me infinite loop banakar andar specific condition par <code>break</code> lagana ek standard design pattern hai (menu-driven CLI apps aur background workers ke liye).</li>\n  <li><strong>Python's Unique <code>while...else</code> Construct:</strong> Python me loop ke sath <code>else</code> block bhi lag sakta hai! Yeh <code>else</code> block tabhi chalta hai jab loop poori tarah naturally finish ho bina <code>break</code> encounter kiye.</li>\n</ul>\n\n<h3>2. 💻 Live Demo: Number Guessing Game aur Menu Driven System</h3>\n<p>Aaiye dekhte hain <code>while</code> loop aur <code>break</code> ka use karke ek interactive number guessing game:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>number_guessing_game.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Secret number logic simulation:\nsecret_number = 7\nattempts = 0\nmax_attempts = 5\nguesses_list = [3, 9, 5, 7]  # Simulated user inputs\n\nprint(\"=== NUMBER GUESSING CHALLENGE ===\")\nprint(f\"Rules: 1 se 10 ke beech guess karo. Maximum attempts: {max_attempts}\n\")\n\nguess_index = 0\nwhile guess_index < len(guesses_list):\n    guess = guesses_list[guess_index]\n    guess_index += 1\n    attempts += 1\n    \n    print(f\"Attempt {attempts}: User ne guess kiya -> {guess}\")\n    \n    if guess == secret_number:\n        print(f\"BINGO! Sahi pakde hain! 🎉 Number tha {secret_number}.\")\n        print(f\"Aapne {attempts} attempts me challenge clear kar liya.\")\n        break  # Game jeet gaye, loop se turant bahar!\n    elif guess < secret_number:\n        print(\"Hint: Thoda BADA number socho!\")\n    else:\n        print(\"Hint: Thoda CHHOTA number socho!\")\nelse:\n    # Yeh tabhi chalega jab break hit na ho:\n    print(\"Game Over! Aapke saare attempts khatam ho gaye.\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>=== NUMBER GUESSING CHALLENGE ===<br>Rules: 1 se 10 ke beech guess karo. Maximum attempts: 5<br><br>Attempt 1: User ne guess kiya -&gt; 3<br>Hint: Thoda BADA number socho!<br>Attempt 2: User ne guess kiya -&gt; 9<br>Hint: Thoda CHHOTA number socho!<br>Attempt 3: User ne guess kiya -&gt; 5<br>Hint: Thoda BADA number socho!<br>Attempt 4: User ne guess kiya -&gt; 7<br>BINGO! Sahi pakde hain! 🎉 Number tha 7.<br>Aapne 4 attempts me challenge clear kar liya.</div>\n</div>\n\n<p>Ab dekhte hain <code>continue</code> ka use karke invalid data ko filter karna aur process karna:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>skip_negatives_continue.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Bank transactions batch processing:\n# Negative amounts (refund/penalty) ko skip karke sirf valid credits ka total:\ntransactions = [500, -20, 1200, 0, -150, 3400, 800]\ntotal_credits = 0\nindex = 0\n\nprint(\"Processing Credit Transactions:\")\n\nwhile index < len(transactions):\n    amount = transactions[index]\n    index += 1\n    \n    # 0 ya negative transactions ko skip karo:\n    if amount <= 0:\n        print(f\"Skipping invalid/negative entry: Rs. {amount}\")\n        continue  # Agli entry par jump karo, neeche ka code skip!\n    \n    print(f\"Adding credit transaction: Rs. {amount}\")\n    total_credits += amount\n\nprint(\"---------------------------------------\")\nprint(f\"Total Valid Credits Processed: Rs. {total_credits}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Processing Credit Transactions:<br>Adding credit transaction: Rs. 500<br>Skipping invalid/negative entry: Rs. -20<br>Adding credit transaction: Rs. 1200<br>Skipping invalid/negative entry: Rs. 0<br>Skipping invalid/negative entry: Rs. -150<br>Adding credit transaction: Rs. 3400<br>Adding credit transaction: Rs. 800<br>---------------------------------------<br>Total Valid Credits Processed: Rs. 5900</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: The Dreaded Infinite Loop!</div>\n  <p>Beginners ki sabse khatarnak galti hoti hai loop counter ko update karna bhool jana:</p>\n  <p><strong>Galti: Counter increment na karna:</strong><br>\n  ❌ <strong>Wrong Code:</strong><br>\n  <code>count = 1</code><br>\n  <code>while count &lt;= 5:</code><br>\n  <code>    print(count)  # count hamesha 1 hi rahega, loop kabhi nahi rukega! CPU 100% hang!</code><br>\n  (Agar aap galti se terminal me infinite loop chala dein, toh turant <strong>Ctrl + C</strong> press karke process kill karein!)<br>\n  ✅ <strong>Correct Code:</strong><br>\n  <code>count = 1</code><br>\n  <code>while count &lt;= 5:</code><br>\n  <code>    print(count)</code><br>\n  <code>    count += 1    # Counter ko badhana mandatory hai!</code></p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: for vs while Loops Comparison</div>\n  <p><strong>Real Life Application:</strong> Network API Polling aur Retry Mechanism:<br>\n  Jab payment gateway (Razorpay ya Stripe) se webhook response aane me delay hota hai, toh backend server <code>while attempts &lt; 5:</code> loop chalata hai, har 2 second me status check karta hai, aur payment success hote hi <code>break</code> kar deta hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"When should you choose a `for` loop over a `while` loop and vice versa?\"</em><br>\n  <strong>Answer:</strong><br>\n  - <strong>`for` loop:</strong> Jab aapko pehle se pata ho ki loop kitni baar chalna hai (definite number of iterations), ya jab aap kisi known sequence (list, string, dictionary, generator) ke har element par traverse kar rahe hon. Idiomatic Python me `for` loop hamesha preferred hota hai.<br>\n  - <strong>`while` loop:</strong> Jab loop kisi external state ya condition par depend karta ho jiska pehle se pata na ho (indefinite iteration), jaise user input jab tak valid na ho, game loop jab tak player alive ho, ya socket connection jab tak open rahe.</p>\n</div>",
    "mcqs": [
      {
        "q": "while loop kab tak execute hota rehta hai?",
        "options": [
          "Hamesha 10 baar chalta hai",
          "Jab tak uski condition True rehti hai",
          "Jab tak uski condition False rehti hai",
          "Sirf ek baar"
        ],
        "correct": 1,
        "explanation": "while loop har iteration ke shuru me condition evaluate karta hai aur jab tak condition True rehti hai chalta rehta hai."
      },
      {
        "q": "Loop ke andar 'break' keyword chalne par kya hota hai?",
        "options": [
          "Current iteration skip hoti hai",
          "Poora loop turant terminate hokar bahar aa jata hai",
          "Loop dobara shuru hota hai",
          "Program pause ho jata hai"
        ],
        "correct": 1,
        "explanation": "break keyword loop ko immediately stop karke loop ke bahar flow transfer kar deta hai."
      },
      {
        "q": "Loop ke andar 'continue' keyword ka role kya hai?",
        "options": [
          "Loop ko band karna",
          "Bachi hui iteration ko skip karke agle cycle par jump karna",
          "Program ko restart karna",
          "Error raise karna"
        ],
        "correct": 1,
        "explanation": "continue keyword current iteration ke bache hue code ko skip karke loop ke agle cycle par bhej deta hai."
      },
      {
        "q": "while...else construct me else block kab execute hota hai?",
        "options": [
          "Jab loop break se terminate ho",
          "Jab loop bina break ke naturally finish ho jaye",
          "Hamesha execute hota hai",
          "Kabhi execute nahi hota"
        ],
        "correct": 1,
        "explanation": "Python me loop ka else block tabhi run hota hai jab loop normal condition False hone par khatam ho (break na laga ho)."
      },
      {
        "q": "Terminal me chal rahe infinite loop ko forcibly terminate karne ka keyboard shortcut kya hai?",
        "options": [
          "Ctrl + Z",
          "Ctrl + C",
          "Alt + F4",
          "Esc"
        ],
        "correct": 1,
        "explanation": "Ctrl + C terminal par KeyboardInterrupt signal bhejta hai jisse running process turant stop ho jaati hai."
      }
    ]
  },
  {
    "day": 12,
    "week": 2,
    "phase": "Beginner",
    "topic": "Lists basics",
    "concept": "List kya hai",
    "demo": "Indexing aur negative index",
    "mistake": "IndexError kyun aata",
    "quiz": "Quiz: list ka last item",
    "interview": "Real life: shopping list",
    "readTime": "12 mins",
    "contentHtml": "<h2>📋 Day 12: Python Lists - Basics aur Indexing</h2>\n<p>Ab tak humne ek variable me ek hi value store ki (jaise <code>name = \"Kaif\"</code> ya <code>age = 24</code>). Lekin real-world applications me humein hazaron data items ka collection store karna hota hai — jaise 100 students ke marks, shopping cart ke 10 items, ya YouTube search results ke 50 videos. Aise collections ko manage karne ke liye Python ka sabse popular aur versatile data structure hai: <strong>List</strong>.</p>\n\n<h3>1. 💡 Concept: Collections, Lists aur Indexing Mastery</h3>\n<p><strong>Train Compartment Analogy:</strong> Socho ek lambi train jisme alag-alag dabbe (compartments) jude hue hain. Har dabbe ka ek number hai (index), aur har dabbe me alag-alag passenger baith sakte hain. Aap kisi bhi dabbe ka darwaza kholkar passenger ko badal sakte ho ya naya dabba peeche jod sakte ho. Yahi hoti hai Python List!</p>\n\n<p><strong>Python List ki Core Properties:</strong></p>\n<ul>\n  <li><strong>1. Ordered (Krambaddh):</strong> Items jis kram (order) me daale gaye hain, wo order hamesha preserve rehta hai. Pehla item hamesha pehle rahega jab tak aap use intentionally na badlein.</li>\n  <li><strong>2. Mutable (Parivartaniya):</strong> Strings ki tarah lists freeze nahi hotin! Aap list ke kisi bhi item ko badal sakte hain (modify), naye items add kar sakte hain, ya delete kar sakte hain bina nayi list banaye.</li>\n  <li><strong>3. Heterogeneous (Vividh Data):</strong> Ek hi list ke andar alag-alag data types ke items ek sath reh sakte hain — jaise integer, float, string, boolean, aur yahan tak ki doosri list bhi: <code>[101, \"Aman\", 94.5, True, [\"Maths\", \"Science\"]]</code>.</li>\n  <li><strong>4. Allows Duplicates:</strong> List me same value multiple baar aa sakti hai: <code>[\"Apple\", \"Banana\", \"Apple\"]</code>.</li>\n</ul>\n\n<p><strong>Indexing & Slicing in Lists:</strong><br>\nList square brackets <code>[ ]</code> se banti hai. Har item ka ek unique position number hota hai jise index kehte hain:</p>\n<ul>\n  <li><strong>Positive Indexing:</strong> Left-to-right <code>0</code> se shuru hota hai (first element is at <code>0</code>, second at <code>1</code>, last at <code>len - 1</code>).</li>\n  <li><strong>Negative Indexing:</strong> Right-to-left <code>-1</code> se shuru hota hai (last element is at <code>-1</code>, second-to-last at <code>-2</code>).</li>\n  <li><strong>Modifying Elements:</strong> <code>fruits[0] = \"Mango\"</code> karne se index 0 par purani value replace ho jaati hai.</li>\n  <li><strong>Built-in Utility Functions:</strong> <code>len(list)</code> (total items), <code>sum(list)</code> (total sum), <code>min(list)</code> (smallest), <code>max(list)</code> (largest).</li>\n  <li><strong>Membership Operator:</strong> <code>\"Milk\" in shopping_list</code> returns <code>True</code> ya <code>False</code>.</li>\n</ul>\n\n<h3>2. 💻 Live Demo: Shopping Cart aur Student Marks Analyzer</h3>\n<p>Aaiye dekhte hain e-commerce shopping cart ka interactive management program:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>shopping_cart_basics.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># List creation with mixed items:\ncart_items = [\"Laptop\", \"Wireless Mouse\", \"USB-C Cable\", \"Notebook\"]\n\nprint(\"Initial Cart Items:\", cart_items)\nprint(\"Total Items in Cart:\", len(cart_items))\n\n# Accessing items via indexing:\nprint(\"Pehla Item (index 0): \", cart_items[0])\nprint(\"Aakhri Item (index -1):\", cart_items[-1])\nprint(\"Second Last (index -2):\", cart_items[-2])\n\n# Item modify karna (Mutability proof!):\nprint(\"\nUser ne USB-C Cable ko replace kiya Gaming Mousepad se:\")\ncart_items[2] = \"Gaming Mousepad\"\nprint(\"Updated Cart:\", cart_items)\n\n# Checking if item exists (Membership test):\nitem_to_check = \"Laptop\"\nif item_to_check in cart_items:\n    print(f\"'{item_to_check}' cart me maujood hai!\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Initial Cart Items: ['Laptop', 'Wireless Mouse', 'USB-C Cable', 'Notebook']<br>Total Items in Cart: 4<br>Pehla Item (index 0):  Laptop<br>Aakhri Item (index -1): Notebook<br>Second Last (index -2): USB-C Cable<br><br>User ne USB-C Cable ko replace kiya Gaming Mousepad se:<br>Updated Cart: ['Laptop', 'Wireless Mouse', 'Gaming Mousepad', 'Notebook']<br>'Laptop' cart me maujood hai!</div>\n</div>\n\n<p>Ab dekhte hain numeric data par statistical operations (Sum, Average, Min, Max):</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>student_marks_analyzer.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># 6 subjects ke marks store karna:\nmarks = [85, 92, 78, 64, 95, 88]\n\ntotal_subjects = len(marks)\ntotal_marks = sum(marks)\naverage_marks = total_marks / total_subjects\nhighest_score = max(marks)\nlowest_score = min(marks)\n\nprint(f\"{'REPORT CARD SUMMARY':^35}\")\nprint(\"=\" * 35)\nprint(f\"Total Subjects : {total_subjects}\")\nprint(f\"All Marks      : {marks}\")\nprint(f\"Grand Total    : {total_marks} / {total_subjects * 100}\")\nprint(f\"Class Average  : {average_marks:.2f}%\")\nprint(f\"Highest Score  : {highest_score}\")\nprint(f\"Lowest Score   : {lowest_score}\")\nprint(\"=\" * 35)</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>        REPORT CARD SUMMARY        <br>===================================<br>Total Subjects : 6<br>All Marks      : [85, 92, 78, 64, 95, 88]<br>Grand Total    : 502 / 600<br>Class Average  : 83.67%<br>Highest Score  : 95<br>Lowest Score   : 64<br>===================================</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: IndexError: list index out of range</div>\n  <p>Har beginner ka sabse frequently encountered crash error hai IndexError:</p>\n  <p><strong>Galti: Length aur Last Index me confusion:</strong><br>\n  Agar kisi list me 4 items hain (<code>len = 4</code>), toh valid indices hote hain <code>0, 1, 2, 3</code>. Agar aap <code>list[4]</code> likhenge toh Python crash ho jayega!<br>\n  ❌ <code>fruits = [\"Apple\", \"Mango\", \"Banana\"]</code><br>\n  <code>print(fruits[3])  # IndexError: list index out of range!</code> (List me sirf 3 items hain, index 0, 1, 2 tak hi valid hai!)<br>\n  ✅ <strong>Rule:</strong> Last element access karne ke liye hamesha <strong><code>list[-1]</code></strong> use karein, ya <code>list[len(list) - 1]</code> likhein!</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Lists Under the Hood</div>\n  <p><strong>Real Life Application:</strong> Task Management Queue & Music Playlist:<br>\n  Spotify me \"Up Next\" queue ek list hoti hai. Jaise hi koi gana bajta hai, list se uthaya jata hai; jab user \"Add to Queue\" dabata hai toh list me add ho jata hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"How are Python lists implemented in memory? Are they linked lists or arrays?\"</em><br>\n  <strong>Answer:</strong> Python lists internally <strong>Dynamic Arrays of Pointers</strong> (contiguous memory references) ke roop me implement hoti hain (CPython me <code>PyListObject</code>). Yeh linked list nahi hoti! Iska faayda yeh hai ki kisi bhi index ko access karna (<code>list[i]</code>) constant time <strong>$O(1)$</strong> operation hota hai. Jab list full hoti hai, Python extra memory over-allocate karta hai taaki bar-bar resizing na karni pade.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me ek empty list banane ka sahi syntax kya hai?",
        "options": [
          "my_list = {}",
          "my_list = []",
          "my_list = ()",
          "my_list = list() ya [] dono"
        ],
        "correct": 3,
        "explanation": "[] aur list() dono empty list banane ke valid tarike hain ({} empty dictionary banata hai)."
      },
      {
        "q": "nums = [10, 20, 30, 40, 50]; print(nums[-1]) ka output kya hoga?",
        "options": [
          "10",
          "40",
          "50",
          "IndexError"
        ],
        "correct": 2,
        "explanation": "Negative indexing me -1 hamesha list ke sabse aakhri element (50) ko point karta hai."
      },
      {
        "q": "Agar list ki length 5 ho, toh uske aakhri element ka positive index kya hoga?",
        "options": [
          "5",
          "4",
          "0",
          "-5"
        ],
        "correct": 1,
        "explanation": "0-based indexing ki wajah se n elements wali list ka aakhri element n - 1 (5 - 1 = 4) index par hota hai."
      },
      {
        "q": "Kya Python list ke andar alag-alag data types (jaise int, str, float) ek sath store ho sakte hain?",
        "options": [
          "Nahi, sirf identical types",
          "Haan, list heterogeneous hoti hai",
          "Sirf numbers allow hote hain",
          "SyntaxError aayega"
        ],
        "correct": 1,
        "explanation": "Python lists heterogeneous hoti hain, inme kisi bhi data type ke elements ek sath store kiye ja sakte hain."
      },
      {
        "q": "colors = ['Red', 'Green']; colors[0] = 'Blue' ke baad colors ki value kya hogi?",
        "options": [
          "['Red', 'Green']",
          "['Blue', 'Green']",
          "TypeError",
          "['Blue', 'Red', 'Green']"
        ],
        "correct": 1,
        "explanation": "Lists mutable hoti hain, isliye direct index assignment se value successfully update hokar ['Blue', 'Green'] ho jayegi."
      }
    ]
  },
  {
    "day": 13,
    "week": 2,
    "phase": "Beginner",
    "topic": "List methods",
    "concept": "append, insert, remove",
    "demo": "pop, sort, reverse demo",
    "mistake": "sort() None return karta",
    "quiz": "Quiz: list se duplicates",
    "interview": "Interview: append vs extend",
    "readTime": "12 mins",
    "contentHtml": "<h2>🛠️ Day 13: List Methods - Modification, Sorting aur Searching</h2>\n<p>List create karna seekhne ke baad agla step hai list ko professionally manipulate karna. Real apps me items dynamically add hote hain, delete hote hain, aur alphabetical ya numerical order me sort kiye jaate hain. Aaj hum Python ke built-in list methods ko deeply explore karenge.</p>\n\n<h3>1. 💡 Concept: List Mutation Methods Overview</h3>\n<p>List methods ko unke purpose ke hisaab se 3 major categories me divide kiya ja sakta hai:</p>\n\n<p><strong>Category 1: Naye Elements Add Karna:</strong></p>\n<ul>\n  <li><code>.append(item)</code>: Element ko list ke <strong>sabse aakhir</strong> me add karta hai. Yeh sabse tez ($O(1)$) operation hai.</li>\n  <li><code>.insert(index, item)</code>: Diye gaye specific index par item insert karta hai. Baaki ke elements right side shift ho jaate hain ($O(n)$ time lagta hai).</li>\n  <li><code>.extend(iterable)</code>: Ek doosri list ya sequence ke saare items ko kholkar (unpack karke) current list ke peeche jod deta hai.</li>\n</ul>\n\n<p><strong>Category 2: Elements Remove Karna:</strong></p>\n<ul>\n  <li><code>.remove(value)</code>: Diye gaye value ki <strong>pehli occurrence</strong> ko delete karta hai. Agar value list me na ho, toh <code>ValueError</code> raise hota hai.</li>\n  <li><code>.pop([index])</code>: Diye gaye index ke element ko <strong>remove karta hai AUR use return bhi karta hai</strong>! Agar index na diya jaye, toh yeh by default last element ko pop karta hai.</li>\n  <li><code>.clear()</code>: List ke saare elements ko delete karke list ko poori tarah empty <code>[]</code> bana deta hai.</li>\n</ul>\n\n<p><strong>Category 3: Ordering aur Searching:</strong></p>\n<ul>\n  <li><code>.sort()</code>: Original list ko in-place sort (ascending order) karta hai. <strong>CRITICAL NOTE:</strong> Yeh method original list ko modify karta hai aur <strong><code>None</code> return karta hai</strong>! Agar descending order chahiye toh <code>.sort(reverse=True)</code> pass karein.</li>\n  <li><code>sorted(list)</code>: Yeh ek built-in function hai jo original list ko chhede bina ek <strong>nayi sorted list</strong> return karta hai.</li>\n  <li><code>.reverse()</code>: List ke items ko in-place ulti direction me reverse kar deta hai.</li>\n  <li><code>.index(value)</code>: Value ka index position return karta hai.</li>\n  <li><code>.count(value)</code>: Value list me kitni baar aayi hai wo count return karta hai.</li>\n</ul>\n\n<h3>2. 💻 Live Demo: Todo Task Manager aur Leaderboard Sorting</h3>\n<p>Aaiye dekhte hain ek dynamic Todo List application ka complete CRUD workflow:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>todo_task_manager.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>tasks = [\"Review Python notes\", \"Practice 5 MCQs\", \"Attend gym session\"]\nprint(\"Initial Tasks:\", tasks)\n\n# 1. append(): Naya routine task add karna:\ntasks.append(\"Read documentation\")\nprint(\"\nAfter append():\", tasks)\n\n# 2. insert(): Top priority urgent task sabse upar (index 0) daalna:\ntasks.insert(0, \"URGENT: Submit college project\")\nprint(\"After insert(0):\", tasks)\n\n# 3. pop(): Sabse aakhri completed task ko nikaal kar complete status lena:\ncompleted = tasks.pop()\nprint(f\"Completed Task (via pop): '{completed}'\")\nprint(\"Tasks Remaining:\", tasks)\n\n# 4. remove(): Specific task name se delete karna:\ntasks.remove(\"Attend gym session\")\nprint(\"After remove('Attend gym session'):\", tasks)</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Initial Tasks: ['Review Python notes', 'Practice 5 MCQs', 'Attend gym session']<br><br>After append(): ['Review Python notes', 'Practice 5 MCQs', 'Attend gym session', 'Read documentation']<br>After insert(0): ['URGENT: Submit college project', 'Review Python notes', 'Practice 5 MCQs', 'Attend gym session', 'Read documentation']<br>Completed Task (via pop): 'Read documentation'<br>Tasks Remaining: ['URGENT: Submit college project', 'Review Python notes', 'Practice 5 MCQs', 'Attend gym session']<br>After remove('Attend gym session'): ['URGENT: Submit college project', 'Review Python notes', 'Practice 5 MCQs']</div>\n</div>\n\n<p>Ab dekhte hain Leaderboard Sorting: In-place <code>sort()</code> vs <code>sorted()</code> ka comparison:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>leaderboard_sorting.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>game_scores = [450, 120, 890, 320, 990, 710]\nprint(\"Original Scores:\", game_scores)\n\n# Technique 1: sorted() function (Original list safe rehti hai):\nsorted_copy = sorted(game_scores, reverse=True)\nprint(\"Top Scores (High to Low via sorted()):\", sorted_copy)\nprint(\"Original Scores still untouched:     \", game_scores)\n\n# Technique 2: .sort() method (In-place modification):\ngame_scores.sort(reverse=True)\nprint(\"Original list modified directly via sort():\", game_scores)\n\n# .count() aur .index() ka use:\nprint(\"Kitne players ne 990 score kiya?\", game_scores.count(990))\nprint(\"Highest score 990 kis rank/index par hai?\", game_scores.index(990))</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Original Scores: [450, 120, 890, 320, 990, 710]<br>Top Scores (High to Low via sorted()): [990, 890, 710, 450, 320, 120]<br>Original Scores still untouched:      [450, 120, 890, 320, 990, 710]<br>Original list modified directly via sort(): [990, 890, 710, 450, 320, 120]<br>Kitne players ne 990 score kiya? 1<br>Highest score 990 kis rank/index par hai? 0</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: list = list.sort() (The NoneType Trap!)</div>\n  <p>Yeh mistake beginner Python developers ki top 3 galtiyon me aati hai:</p>\n  <p><strong>Galti: sort() ke return value ko variable me re-assign karna:</strong><br>\n  Kyunki <code>.sort()</code> list ko in-place modify karta hai, yeh <code>None</code> return karta hai!<br>\n  ❌ <strong>Wrong Code:</strong><br>\n  <code>nums = [3, 1, 2]</code><br>\n  <code>nums = nums.sort()  # nums ke andar None chala gaya! Poori list barbaad!</code><br>\n  <code>print(nums)         # Output: None</code><br>\n  ✅ <strong>Correct Code:</strong><br>\n  <code>nums = [3, 1, 2]</code><br>\n  <code>nums.sort()         # Re-assign mat karo, direct call karo</code><br>\n  <code>print(nums)         # Output: [1, 2, 3]</code><br>\n  (Ya agar nayi list chahiye toh <code>nums = sorted(nums)</code> likhein!)</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: append() vs extend() Difference</div>\n  <p><strong>Real Life Application:</strong> Shopping Cart Merger:<br>\n  Jab user guest mode se login karta hai, toh guest cart items ko user ke saved database cart ke sath merge karne ke liye <code>user_cart.extend(guest_cart)</code> use hota hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"What is the difference between append() and extend() when passing a list?\"</em><br>\n  <strong>Answer:</strong><br>\n  - <code>list.append([1, 2])</code> poori list ko as a single object aakhri me insert karta hai, jisse <strong>nested list</strong> ban jaati hai (e.g. <code>[a, b, [1, 2]]</code>).<br>\n  - <code>list.extend([1, 2])</code> list ke andar ke elements ko unpack karke individually append karta hai (e.g. <code>[a, b, 1, 2]</code>). List ki overall length extend me 2 se badhti hai, jabki append me sirf 1 se badhti hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "numbers = [1, 2]; numbers.append([3, 4]) ke baad len(numbers) kya hogi?",
        "options": [
          "4",
          "3",
          "2",
          "TypeError"
        ],
        "correct": 1,
        "explanation": "append() ne [3, 4] ko as a single sub-list element add kiya, isliye total 3 elements honge: 1, 2, aur [3, 4]."
      },
      {
        "q": "numbers = [1, 2]; numbers.extend([3, 4]) ke baad numbers ki value kya hogi?",
        "options": [
          "[1, 2, [3, 4]]",
          "[1, 2, 3, 4]",
          "[3, 4, 1, 2]",
          "[1, 2]"
        ],
        "correct": 1,
        "explanation": "extend() list ke elements ko unpack karke flat list banata hai: [1, 2, 3, 4]."
      },
      {
        "q": "my_list = [10, 20, 30]; res = my_list.sort() me res ki value kya hogi?",
        "options": [
          "[10, 20, 30]",
          "[30, 20, 10]",
          "None",
          "True"
        ],
        "correct": 2,
        "explanation": ".sort() method in-place sort karta hai aur koi nayi list nahi balki strictly None return karta hai."
      },
      {
        "q": "pop() method bina kisi argument ke pass kiye list ke kis element ko remove karta hai?",
        "options": [
          "Pehle element ko (index 0)",
          "Aakhri element ko (index -1)",
          "Random element ko",
          "Kisi ko nahi"
        ],
        "correct": 1,
        "explanation": "pop() default argument ke bina list ke sabse aakhri element ko remove aur return karta hai."
      },
      {
        "q": "items = ['a', 'b', 'c']; items.remove('z') run karne par kya hoga?",
        "options": [
          "None return hoga",
          "False return hoga",
          "ValueError: list.remove(x): x not in list",
          "IndexError"
        ],
        "correct": 2,
        "explanation": "remove() method agar di gayi value list me nahi milti toh ValueError raise karta hai."
      }
    ]
  },
  {
    "day": 14,
    "week": 2,
    "phase": "Beginner",
    "topic": "Functions",
    "concept": "def se function banao",
    "demo": "Parameters aur return",
    "mistake": "print vs return",
    "quiz": "Quiz: square function",
    "interview": "Interview: function kyun zaroori",
    "readTime": "12 mins",
    "contentHtml": "<h2>🧩 Day 14: Functions - def, Parameters aur return</h2>\n<p>Software engineering ka sabse bada golden rule hai: <strong>DRY — Don't Repeat Yourself</strong>. Agar aapko ek hi calculation ya task ko program me 10 alag-alag jagah karna pade, toh 10 baar same code copy-paste karna sabse bekar practice hai. Iska solution hain <strong>Functions</strong>: reusable code blocks jo programming ko clean, modular aur scalable banate hain.</p>\n\n<h3>1. 💡 Concept: Modular Programming aur Functions ki Anatomy</h3>\n<p><strong>Juicer / Mixer Grinder Analogy:</strong> Apne kitchen ke juicer ke baare me socho! Juicer ek function hai. Jab aapko juice chahiye, aap juicer ko call karte ho. Aap uske andar fal (fruits) daalte ho — yeh hain <strong>Parameters / Arguments</strong> (Inputs). Juicer fruits ko grind karta hai — yeh hai <strong>Function Execution</strong>. Phir glass me fresh juice nikal kar aapke haath me deta hai — yeh hai <strong>Return Value</strong> (Output)! Ek baar juicer khareed liya, toh roz naya juicer banane ki zaroorat nahi padti; roz bas fruits badlo aur juice pao!</p>\n\n<p><strong>Function Syntax in Python:</strong></p>\n<pre>def function_name(parameter1, parameter2):\n    # Function body (logic)\n    result = parameter1 + parameter2\n    return result  # Result caller ko wapas bhejna</pre>\n\n<p><strong>Key Concepts Breakdown:</strong></p>\n<ul>\n  <li><strong><code>def</code> Keyword:</strong> Python ko batata hai ki hum ek naya function define kar rahe hain. Iske aage function name aur parentheses <code>()</code> lagte hain.</li>\n  <li><strong>Parameters vs Arguments:</strong>\n    <ul>\n      <li><em>Parameters:</em> Wo variable names jo function define karte waqt brackets me likhe jaate hain (e.g. <code>def add(a, b):</code> me <code>a</code> aur <code>b</code> parameters hain).</li>\n      <li><em>Arguments:</em> Wo actual values jo function ko call karte waqt pass ki jaati hain (e.g. <code>add(10, 20)</code> me <code>10</code> aur <code>20</code> arguments hain).</li>\n    </ul>\n  </li>\n  <li><strong>Default Parameters:</strong> Agar caller koi argument na de, toh fallback default value use ho: <code>def greet(name=\"Dost\"):</code>. Default parameters hamesha non-default parameters ke baad aane chahiye.</li>\n  <li><strong>The <code>return</code> Statement:</strong> Function ke andar calculate hui value ko caller tak pahunchane ka kaam karta hai. <code>return</code> statement execute hote hi function turant terminate ho jata hai.</li>\n  <li><strong>Variable Scope (Local vs Global):</strong> Function ke andar banaye gaye variables <strong>Local</strong> hote hain; wo function khatam hote hi memory se delete ho jaate hain aur function ke bahar access nahi kiye ja sakte. Function ke bahar banaye gaye variables <strong>Global</strong> hote hain.</li>\n</ul>\n\n<h3>2. 💻 Live Demo: Math Toolkit aur Salary Tax Calculator</h3>\n<p>Aaiye dekhte hain reusable mathematical functions ka toolkit:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>math_toolkit.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Reusable functions:\ndef calculate_square(num):\n    \"\"\"Number ka square calculate karta hai.\"\"\"\n    return num ** 2\n\ndef calculate_circle_area(radius, pi=3.14159):\n    \"\"\"Circle ka area nikaalta hai (default pi value ke sath).\"\"\"\n    return pi * (radius ** 2)\n\ndef is_prime(number):\n    \"\"\"Check karta hai ki number prime hai ya nahi.\"\"\"\n    if number < 2:\n        return False\n    for i in range(2, int(number ** 0.5) + 1):\n        if number % i == 0:\n            return False\n    return True\n\n# Testing our toolkit:\nsq = calculate_square(7)\narea = calculate_circle_area(5)\ncheck_17 = is_prime(17)\ncheck_20 = is_prime(20)\n\nprint(f\"Square of 7: {sq}\")\nprint(f\"Area of circle (radius 5): {area:.2f}\")\nprint(f\"Is 17 Prime? {check_17}\")\nprint(f\"Is 20 Prime? {check_20}\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Square of 7: 49<br>Area of circle (radius 5): 78.54<br>Is 17 Prime? True<br>Is 20 Prime? False</div>\n</div>\n\n<p>Ab dekhte hain corporate salary breakdown function jo multiple values return karta hai:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>salary_calculator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>def calculate_net_salary(employee_name, gross_salary, tax_rate=0.10, bonus=5000):\n    tax_deducted = gross_salary * tax_rate\n    net_in_hand = gross_salary - tax_deducted + bonus\n    # Multiple values returned as a clean tuple:\n    return net_in_hand, tax_deducted\n\n# Function call and tuple unpacking:\nemp = \"Rahul Verma\"\ngross = 65000\nin_hand, tax = calculate_net_salary(emp, gross, tax_rate=0.12, bonus=8000)\n\nprint(f\"=== SALARY SLIP: {emp.upper()} ===\")\nprint(f\"Gross Salary : Rs. {gross:,.2f}\")\nprint(f\"Tax Deducted : Rs. {tax:,.2f}\")\nprint(f\"Net In-Hand  : Rs. {in_hand:,.2f}\")\nprint(\"==================================\")</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>=== SALARY SLIP: RAHUL VERMA ===<br>Gross Salary : Rs. 65,000.00<br>Tax Deducted : Rs. 7,800.00<br>Net In-Hand  : Rs. 65,200.00<br>==================================</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: print() vs return ka Confusion</div>\n  <p>Beginners aksar sochte hain ki <code>print()</code> aur <code>return</code> ek hi cheez hain. Yeh bilkul galat hai!</p>\n  <p><strong>Farak samjhein:</strong><br>\n  - <code>print()</code> sirf screen par text dikhata hai. Yeh function se koi value bahar doosre calculation ke liye pass nahi karta!<br>\n  - <code>return</code> value ko function se bahar caller ko deta hai taaki use variable me store karke aage use kiya ja sake.</p>\n  <p>❌ <strong>Wrong Code (Using print instead of return):</strong><br>\n  <code>def add(a, b): print(a + b)</code><br>\n  <code>result = add(5, 5)  # Screen par 10 print ho jayega</code><br>\n  <code>total = result * 2  # TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'!</code><br>\n  (Kyunki function ne return nahi kiya, isliye <code>result</code> me <code>None</code> store hua!)</p>\n  <p>✅ <strong>Correct Code:</strong><br>\n  <code>def add(a, b): return a + b</code><br>\n  <code>result = add(5, 5)  # result me 10 aayega</code><br>\n  <code>total = result * 2  # total = 20, perfectly works!</code></p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Why Functions are Essential</div>\n  <p><strong>Real Life Application:</strong> Payment Gateway Checkout:<br>\n  Ek function <code>process_payment(user_id, amount, card_token)</code> hota hai. Chahe user website se buy kare, mobile app se buy kare, ya recurring subscription le — har jagah wahi same function execute hota hai.</p>\n  <p><strong>Interview Question:</strong> <em>\"What happens if a Python function has no return statement? Can a function return multiple values?\"</em><br>\n  <strong>Answer:</strong><br>\n  1. Agar function me koi <code>return</code> na ho, toh Python function ke aakhir me automatically <strong><code>return None</code></strong> execute kar deta hai.<br>\n  2. Haan! Python me ek function multiple values comma laga kar return kar sakta hai (e.g. <code>return x, y, z</code>). Internally Python unhe ek <strong>Tuple</strong> me pack kar deta hai, jise caller ek hi line me unpack kar sakta hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "Python me function define karne ke liye kaunsa keyword use hota hai?",
        "options": [
          "function",
          "def",
          "fun",
          "define"
        ],
        "correct": 1,
        "explanation": "Python me functions 'def' (define) keyword ke sath banaye jaate hain."
      },
      {
        "q": "def add(a, b=5): return a + b me add(10) ka output kya hoga?",
        "options": [
          "10",
          "15",
          "5",
          "TypeError"
        ],
        "correct": 1,
        "explanation": "b parameter ki default value 5 hai. a=10 pass karne par 10 + 5 = 15 return hoga."
      },
      {
        "q": "Agar kisi function me return statement na ho, toh function kya return karega?",
        "options": [
          "0",
          "False",
          "None",
          "Error"
        ],
        "correct": 2,
        "explanation": "Bina return statement wale functions Python me implicitly None return karte hain."
      },
      {
        "q": "def calc(x): return x * 2, x * 3 ka return data type kya hoga?",
        "options": [
          "list",
          "tuple",
          "set",
          "int"
        ],
        "correct": 1,
        "explanation": "Comma separated values return karne par Python unhe automatically Tuple me pack kar deta hai."
      },
      {
        "q": "Function ke andar define kiye gaye variable ko function ke bahar print karne par kya hoga?",
        "options": [
          "Variable print ho jayega",
          "NameError: name is not defined",
          "None print hoga",
          "Warning aayegi"
        ],
        "correct": 1,
        "explanation": "Function ke andar ke variables Local Scope me hote hain aur bahar exist nahi karte, isliye NameError aayega."
      }
    ]
  },
  {
    "day": 15,
    "week": 3,
    "phase": "Beginner",
    "topic": "Mini project + recap",
    "concept": "Phase 1 recap",
    "demo": "Calculator project",
    "mistake": "Beginner ki top 3 galtiyan",
    "quiz": "Quiz: Phase 1 challenge",
    "interview": "Number guessing game",
    "readTime": "15 mins",
    "contentHtml": "<h2>🏆 Day 15: Phase 1 Milestone Recap + Mini Projects</h2>\n<p>BOHOT BOHOT BADHAI! 🥳 Aapne Python 30-Day Bootcamp ka pehla aur sabse critical phase — <strong>Phase 1: Beginner Fundamentals (Days 1 to 15)</strong> safaltapoorvak complete kar liya hai! Aapne zero se shuru karke variables, data types, arithmetic logic, conditionals, loops, lists, aur functions tak ka safar tai kiya hai. Aaj hum sabhi concepts ko ek sath jodkar do complete, production-style mini projects create karenge.</p>\n\n<h3>1. 💡 Concept: Connecting the Dots - Phase 1 Architecture</h3>\n<p>Aaiye dekhte hain ki pichhle 14 dino me humne kya kya superpowers acquire ki hain aur wo aapas me kaise connect hoti hain:</p>\n\n<ul>\n  <li><strong>Days 1-3 (Inputs & Storage):</strong> User se data lena (<code>input()</code>), screen par display karna (<code>print()</code>), unhe sahi dibbon me pack karna (<code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>), aur type casting.</li>\n  <li><strong>Days 4-5 (Calculation & Logic):</strong> Math operations (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code>, <code>**</code>) aur comparison & boolean logic (<code>==</code>, <code>!=</code>, <code>and</code>, <code>or</code>, <code>not</code>).</li>\n  <li><strong>Days 6-7 (Text Mastery):</strong> String methods (<code>strip</code>, <code>lower</code>, <code>split</code>, <code>join</code>) aur modern formatting with f-strings & slicing <code>[::-1]</code>.</li>\n  <li><strong>Days 8-9 (Decision Making):</strong> Branching pathways using <code>if</code>, <code>elif</code>, <code>else</code>, and nested conditions.</li>\n  <li><strong>Days 10-11 (Automation & Repetition):</strong> <code>for</code> loops with <code>range()</code> for definite tasks, and <code>while</code> loops with <code>break</code> & <code>continue</code> for dynamic tasks.</li>\n  <li><strong>Days 12-13 (Collections):</strong> Managing ordered, mutable data using Lists and list methods (<code>append</code>, <code>pop</code>, <code>sort</code>).</li>\n  <li><strong>Day 14 (Modularity):</strong> Reusable, clean architecture using functions (<code>def</code>, parameters, <code>return</code>).</li>\n</ul>\n\n<p><strong>Professional Developer Mindset:</strong><br>\nEk achha programmer code likhne se pehle problem ko chhote-chhote logical functions me todta hai (Decomposition). Har function ka ek hi specific kaam hona chahiye (Single Responsibility Principle). User input ko hamesha sanitize aur validate karna chahiye taaki program crash na ho.</p>\n\n<h3>2. 💻 Live Demo: Modular Calculator & Smart Guessing Game</h3>\n<p>Project 1: Full-featured Menu-Driven CLI Calculator with input validation and loop:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>cli_modular_calculator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre># Calculator Core Math Functions:\ndef add(a, b): return a + b\ndef subtract(a, b): return a - b\ndef multiply(a, b): return a * b\ndef divide(a, b):\n    if b == 0:\n        return \"Error: Division by zero impossible!\"\n    return a / b\ndef power(a, b): return a ** b\ndef modulo(a, b): return a % b\n\ndef run_calculator():\n    print(\"=\" * 40)\n    print(\"      PYTHON MODULAR CALCULATOR 🧮\")\n    print(\"=\" * 40)\n    \n    # Simulated execution test batch:\n    operations = [\n        (\"1\", 25, 15),   # Addition\n        (\"4\", 100, 4),   # Division\n        (\"4\", 50, 0),    # Zero division test\n        (\"5\", 2, 8),     # Power test\n    ]\n    \n    for choice, num1, num2 in operations:\n        print(f\"\nInput: Option {choice} with operands ({num1}, {num2})\")\n        if choice == \"1\":\n            print(f\"Result: {num1} + {num2} = {add(num1, num2)}\")\n        elif choice == \"2\":\n            print(f\"Result: {num1} - {num2} = {subtract(num1, num2)}\")\n        elif choice == \"3\":\n            print(f\"Result: {num1} * {num2} = {multiply(num1, num2)}\")\n        elif choice == \"4\":\n            print(f\"Result: {num1} / {num2} = {divide(num1, num2)}\")\n        elif choice == \"5\":\n            print(f\"Result: {num1} ** {num2} = {power(num1, num2)}\")\n        else:\n            print(\"Invalid Choice!\")\n\nrun_calculator()</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>========================================<br>      PYTHON MODULAR CALCULATOR 🧮<br>========================================<br><br>Input: Option 1 with operands (25, 15)<br>Result: 25 + 15 = 40<br><br>Input: Option 4 with operands (100, 4)<br>Result: 100 / 4 = 25.0<br><br>Input: Option 4 with operands (50, 0)<br>Result: 50 / 0 = Error: Division by zero impossible!<br><br>Input: Option 5 with operands (2, 8)<br>Result: 2 ** 8 = 256</div>\n</div>\n\n<p>Project 2: Advanced Number Guessing Game with Scoring, Hints, and Multi-level Architecture:</p>\n\n<div class=\"py-code-block\">\n  <div class=\"py-code-header\"><span>smart_number_guesser.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n  <div class=\"py-code-content\"><pre>def evaluate_guess(target, guess):\n    \"\"\"Compares user guess with target and gives hint.\"\"\"\n    if guess == target:\n        return \"MATCH\"\n    elif guess < target:\n        return \"TOO_LOW\"\n    else:\n        return \"TOO_HIGH\"\n\ndef play_game(target_num, guesses):\n    print(f\"=== GAME START (Target: Hidden, Max Attempts: {len(guesses)}) ===\")\n    score = 100\n    attempts_taken = 0\n    \n    for g in guesses:\n        attempts_taken += 1\n        status = evaluate_guess(target_num, g)\n        \n        if status == \"MATCH\":\n            print(f\"Attempt {attempts_taken}: Guess {g} -> CORRECT! 🎉 You won!\")\n            print(f\"Final Performance Score: {score} / 100\n\")\n            return True\n        elif status == \"TOO_LOW\":\n            print(f\"Attempt {attempts_taken}: Guess {g} -> Too Low! Go higher.\")\n            score -= 15\n        else:\n            print(f\"Attempt {attempts_taken}: Guess {g} -> Too High! Go lower.\")\n            score -= 15\n            \n    print(\"Game Over! All attempts exhausted.\")\n    return False\n\n# Running test simulation: Target is 42, guesses provided:\nsimulated_guesses = [20, 60, 35, 42]\nplay_game(target_num=42, guesses=simulated_guesses)</pre></div>\n  <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>=== GAME START (Target: Hidden, Max Attempts: 4) ===<br>Attempt 1: Guess 20 -&gt; Too Low! Go higher.<br>Attempt 2: Guess 60 -&gt; Too High! Go lower.<br>Attempt 3: Guess 35 -&gt; Too Low! Go higher.<br>Attempt 4: Guess 42 -&gt; CORRECT! 🎉 You won!<br>Final Performance Score: 55 / 100</div>\n</div>\n\n<div class=\"py-callout py-callout-warning\">\n  <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Beginner Phase ki Top 3 Galtiyan</div>\n  <p>Pehle 15 dino me har developer in teen traps se guzarta hai. Inhe pehchano aur master bano:</p>\n  <p><strong>1. Modifying a List while Iterating over it:</strong><br>\n  ❌ <code>for item in my_list: my_list.remove(item)</code> &rarr; Loop skips elements kyunki list ka index shift ho jata hai! Hamesha list copy par loop chalayein: <code>for item in my_list[:]:</code> ya list comprehension use karein.</p>\n  <p><strong>2. Forgetting Variable Scope:</strong><br>\n  Function ke andar create kiye gaye variable ko bahar print karne ki koshish karna <code>NameError</code> deta hai.</p>\n  <p><strong>3. Comparing floating point numbers with ==:</strong><br>\n  Binary representation ki wajah se <code>0.1 + 0.2 == 0.3</code> Python me <code>False</code> hota hai (0.30000000000000004)! Floating point comparisons ke liye <code>round(a + b, 2) == 0.3</code> ya <code>math.isclose()</code> use karein.</p>\n</div>\n\n<div class=\"py-callout\">\n  <div class=\"py-callout-title\">💼 4. Real Life / Interview: Structuring Projects for Portfolio</div>\n  <p><strong>Real Life Application:</strong> GitHub Portfolio Building:<br>\n  Aapne jo projects banaye hain, unhe ek proper GitHub repository me organize karein: ek <code>main.py</code>, clear functions, proper docstrings <code>\"\"\"docstring\"\"\"</code>, aur ek attractive <code>README.md</code> jisme program ka screenshot aur features list hon. Interviewers code complexity se zyada code ki clarity aur structuring ko value dete hain.</p>\n  <p><strong>Interview Question:</strong> <em>\"What is PEP 8 and why is it considered the holy grail of Python programming?\"</em><br>\n  <strong>Answer:</strong> PEP 8 (Python Enhancement Proposal 8) Python ka official Style Guide hai. Yeh standard guidelines deta hai jaise: variable aur function names ke liye <code>snake_case</code> use karna, class names ke liye <code>PascalCase</code>, indentation ke liye strictly 4 spaces, imports ko file ke top par organize karna, aur lines ko 79-88 characters tak limit rakhna. PEP 8 follow karne se aapka code enterprise-grade aur easily maintainable banta hai.</p>\n</div>",
    "mcqs": [
      {
        "q": "0.1 + 0.2 == 0.3 ka result Python me kya evaluate hota hai?",
        "options": [
          "True",
          "False",
          "TypeError",
          "None"
        ],
        "correct": 1,
        "explanation": "Floating point precision limitation ke chalte 0.1 + 0.2 evaluate hota hai 0.30000000000000004, isliye == False deta hai."
      },
      {
        "q": "Python me functions aur variables ke naam likhne ke liye kaunsa naming convention PEP 8 standard hai?",
        "options": [
          "camelCase",
          "snake_case",
          "kebab-case",
          "PascalCase"
        ],
        "correct": 1,
        "explanation": "PEP 8 ke mutabiq functions aur variable names lowercase words separated by underscores (snake_case) me hone chahiye."
      },
      {
        "q": "List par loop chalate waqt items remove karne ka sabse safe tarika kya hai?",
        "options": [
          "Direct loop chalakar remove karna",
          "List ki shallow copy (list[:]) par loop chalana",
          "while True chalana",
          "Items ko None set karna"
        ],
        "correct": 1,
        "explanation": "List ki copy par loop chalane se iteration safe rehti hai aur index shifting se elements skip nahi hote."
      },
      {
        "q": "Phase 1 ke baad, kaunsa data structure Ordered aur Mutable dono properties rakhta hai?",
        "options": [
          "String",
          "List",
          "Tuple",
          "Integer"
        ],
        "correct": 1,
        "explanation": "Python List ordered (index-based) aur mutable (modifiable) dono hoti hai."
      },
      {
        "q": "Functions ka sabse mukhya labh (primary benefit) kya hai?",
        "options": [
          "Computer ki speed badhana",
          "Code Reusability aur Modularity (DRY principle)",
          "Memory usage 0 karna",
          "Loops ko replace karna"
        ],
        "correct": 1,
        "explanation": "Functions ka primary purpose code duplication rokna aur reusable modular components create karna hai."
      }
    ]
  },
  {
    "day": 16,
    "week": 3,
    "phase": "Intermediate",
    "topic": "Tuples",
    "concept": "Tuple kya hai",
    "demo": "Packing aur unpacking",
    "mistake": "Single item tuple ki galti",
    "quiz": "Quiz: values swap karo",
    "interview": "Interview: list vs tuple",
    "readTime": "14 mins",
    "contentHtml": "\n          <h2>📦 Day 16: Tuples - Immutability, Packing &amp; Unpacking</h2>\n          <p>Python me Lists sikhne ke baad agla sabse ahem data structure hai <strong>Tuple</strong>. Dekhne me ye bilkul list jaisa lagta hai, lekin iski sabse badi superpower aur pehchan hai iska <strong>Immutable</strong> (aprivartaniya) hona. Aaj hum samjhenge ki software engineering me immutability kitni zaroori hai aur tuple packing-unpacking se clean code kaise likhte hain.</p>\n\n          <h3>1. 💡 Concept: Tuple kya hai aur ye List se alag kyun hai?</h3>\n          <p>Real-life analogy se shuru karte hain: Maan lijiye aapke paas ek pencil se likhi hui shopping list hai. Raaste me aapko yaad aaya ki doodh ke saath bread bhi leni hai, toh aapne pencil se use usi list par likh diya ya koi cheez kaat di. Ye hai <strong>List</strong> (Mutable - jise badla ja sake). Ab sochiye aapka <em>Aadhaar Card</em> ya <em>Passport Number</em>, ya kisi jagah ke <em>GPS Coordinates (Latitude, Longitude)</em>. Kya aap chahenge ki koi program galti se beech execution me Delhi ke coordinates badal kar Mumbai kar de? Bilkul nahi! Aise permanent data ke liye Python ne banaya hai <strong>Tuple</strong>.</p>\n\n          <p>Tuple ko define karne ke liye normal parentheses <code>()</code> ka use hota hai, jabki list me square brackets <code>[]</code> use hote the. Ek baar tuple ban gaya, toh na aap usme naya item add kar sakte hain (no <code>append</code>), na item hata sakte hain (no <code>remove</code> ya <code>pop</code>), aur na hi kisi index ki value change kar sakte hain.</p>\n\n          <p><strong>Tuples ke Main Characteristics:</strong></p>\n          <ul>\n            <li><strong>Immutable:</strong> Ek baar create hone ke baad elements replace, add ya delete nahi kiye ja sakte.</li>\n            <li><strong>Ordered &amp; Indexed:</strong> Elements ka ek specific order hota hai aur unhe 0 se shuru hone wale index se access kiya jata hai (negative indexing bhi supported hai).</li>\n            <li><strong>Heterogeneous:</strong> Ek hi tuple ke andar numbers, strings, booleans aur yahan tak ki lists bhi store ho sakti hain.</li>\n            <li><strong>Memory Efficient &amp; Faster:</strong> Kyunki Python ko pata hai ki tuple ka size kabhi change nahi hoga, interpreter iske liye ek fixed, compact memory block allocate karta hai. Is wajah se tuples lists ke mukable fast iterate hote hain.</li>\n            <li><strong>Dictionary Keys ke roop me use:</strong> Tuples immutable hote hain isliye wo <em>hashable</em> hote hain. Aap tuple ko dictionary ki key bana sakte hain, jabki list ko nahi bana sakte!</li>\n          </ul>\n\n          <p><strong>Tuple Packing aur Unpacking kya hai?</strong></p>\n          <p>Jab aap multiple values ko bina brackets ke ya parentheses ke saath ek variable me assign karte hain, Python unhe automatically ek tuple me \"pack\" kar deta hai. Jaise: <code>point = 10, 20</code>. Aur jab aap us tuple ke har element ko individual variables me extract karte hain, use \"unpacking\" kehte hain: <code>x, y = point</code>. Ye Python ka sabse expressive feature hai jo do numbers ko bina kisi tisre variable ke swap karne me madad karta hai: <code>a, b = b, a</code>.</p>\n\n          <h3>2. 💻 Live Demo: Tuple Operations, Packing &amp; Unpacking</h3>\n          <p>Neeche diye gaye pehle demo me dekhiye ki tuple kaise banta hai, index se access kaise hota hai, aur jab hum use modify karne ki koshish karte hain toh Python kaise error raise karta hai:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>tuple_basics.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># 1. Tuple Creation &amp; Indexing\ncoordinates = (28.6139, 77.2090)  # New Delhi GPS\nprint(\"Coordinates:\", coordinates)\nprint(\"Latitude:\", coordinates[0])\nprint(\"Longitude:\", coordinates[1])\n\n# 2. Slicing in Tuples\ncolors = (\"Red\", \"Green\", \"Blue\", \"Yellow\", \"Purple\")\nprint(\"RGB Colors:\", colors[:3])\n\n# 3. Tuple Methods: count() aur index()\nmarks = (90, 85, 90, 78, 90, 95)\nprint(\"90 kitni baar aaya?:\", marks.count(90))\nprint(\"85 ka pehla index:\", marks.index(85))\n\n# 4. Immutability Test (Attempting modification)\ntry:\n    coordinates[0] = 30.0000  # Will raise TypeError!\nexcept TypeError as error:\n    print(\"Caught expected error:\", error)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Coordinates: (28.6139, 77.209)<br>Latitude: 28.6139<br>Longitude: 77.209<br>RGB Colors: ('Red', 'Green', 'Blue')<br>90 kitni baar aaya?: 3<br>85 ka pehla index: 1<br>Caught expected error: 'tuple' object does not support item assignment</div>\n          </div>\n\n          <p>Ab dekhte hain Tuple Packing, Unpacking, Variable Swapping aur Extended Unpacking (asterisk <code>*</code> operator) ka real practical power:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>tuple_packing_unpacking.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># 1. Tuple Packing: comma lagate hi tuple ban jata hai\nuser_data = \"Kaif\", 24, \"Full Stack Developer\"\nprint(\"Packed data type:\", type(user_data))\nprint(\"Packed tuple:\", user_data)\n\n# 2. Tuple Unpacking: har element alag variable me\nname, age, role = user_data\nprint(f\"Name: {name} | Age: {age} | Role: {role}\")\n\n# 3. Magic Value Swapping (Interview Favorite!)\nx = 100\ny = 999\nprint(f\"Before swap: x={x}, y={y}\")\nx, y = y, x  # Right side packs into (999, 100), left side unpacks!\nprint(f\"After swap:  x={x}, y={y}\")\n\n# 4. Extended Unpacking with * (rest operator)\nscores = (98, 92, 88, 84, 76, 70)\ntopper, runner_up, *others = scores\nprint(\"Topper:\", topper)\nprint(\"Runner Up:\", runner_up)\nprint(\"Remaining scores as list:\", others)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Packed data type: &lt;class 'tuple'&gt;<br>Packed tuple: ('Kaif', 24, 'Full Stack Developer')<br>Name: Kaif | Age: 24 | Role: Full Stack Developer<br>Before swap: x=100, y=999<br>After swap:  x=999, y=100<br>Topper: 98<br>Runner Up: 92<br>Remaining scores as list: [88, 84, 76, 70]</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Single Item Tuple ki Galti</div>\n            <p>Naye Python programmers ki sabse aam galti: Wo sochte hain ki parentheses <code>()</code> lagane se tuple banta hai. Agar aap sirf ek item likh kar brackets laga denge, toh Python use normal mathematical parenthesis maan leta hai, tuple nahi!</p>\n            <p>❌ <strong>Wrong Code:</strong><br>\n            <code>single_item = (\"Python\")</code><br>\n            <code>print(type(single_item))  # &lt;class 'str'&gt; (Ye string hai, tuple nahi!)</code><br>\n            <code>num = (50) # &lt;class 'int'&gt;</code></p>\n            <p>✅ <strong>Correct Code:</strong><br>\n            <code>single_item = (\"Python\",)  # Trailing comma zaroori hai!</code><br>\n            <code>print(type(single_item))  # &lt;class 'tuple'&gt;</code><br>\n            <em>Golden Rule:</em> Python me tuple parentheses se nahi, <strong>comma (,)</strong> se banta hai!</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: List vs Tuple Deep Dive</div>\n            <p><strong>Top Interview Question: List aur Tuple me farak kya hai, aur hume kab kaunsa use karna chahiye?</strong></p>\n            <ul>\n              <li><strong>Mutability:</strong> List mutable hoti hai (items change, add, delete ho sakte hain). Tuple immutable hota hai (data read-only rehta hai).</li>\n              <li><strong>Memory &amp; Speed:</strong> Tuples memory efficient hote hain. Same data ke liye tuple list se lagbhag 20-30% kam RAM leta hai aur fast iterate hota hai.</li>\n              <li><strong>Dictionary Keys:</strong> Tuples hashable hote hain isliye wo dictionary keys ya sets ke elements ban sakte hain. List unhashable hoti hai isliye key nahi ban sakti.</li>\n              <li><strong>Tricky Question:</strong> <em>\"Kya tuple ke andar rakhi list modify ho sakti hai?\"</em><br>\n              Haan! Tuple khud immutable hai yaani uska reference change nahi ho sakta, lekin agar uske andar koi mutable object (jaise list) baitha hai: <code>t = (1, [2, 3])</code>, toh aap <code>t[1].append(4)</code> kar sakte hain! Tuple abhi bhi usi list ko point kar raha hai, par list ke andar ka data badal gaya.</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Ek single element ka tuple banane ka sahi tareeqa kya hai?",
        "options": [
          "t = (10)",
          "t = (10,)",
          "t = tuple(10)",
          "t = [10]"
        ],
        "correct": 1,
        "explanation": "Python me single element tuple banane ke liye trailing comma (,) lagana zaroori hai jaise (10,)."
      },
      {
        "q": "t = (1, 2, 3); t[0] = 99 likhne par interpreter kya output dega?",
        "options": [
          "t = (99, 2, 3)",
          "SyntaxError",
          "TypeError: 'tuple' object does not support item assignment",
          "ValueError"
        ],
        "correct": 2,
        "explanation": "Tuples immutable hote hain, isliye index assignment karne par Python TypeError raise karta hai."
      },
      {
        "q": "a, *b, c = (10, 20, 30, 40, 50) run karne par variable 'b' ki value kya hogi?",
        "options": [
          "(20, 30, 40)",
          "[20, 30, 40]",
          "20",
          "[30, 40]"
        ],
        "correct": 1,
        "explanation": "Extended unpacking me asterisk (*) operator bache hue elements ko ek list ke roop me collect karta hai, isliye [20, 30, 40] banega."
      },
      {
        "q": "Python me a, b = b, a se values bina third variable ke swap kyun ho jati hain?",
        "options": [
          "Compiler magic ki wajah se",
          "Right side me pehle tuple pack hota hai phir left side me unpack hota hai",
          "Ye sirf integers par chalta hai",
          "Memory swap function call hota hai"
        ],
        "correct": 1,
        "explanation": "Right side (b, a) ek temporary tuple banata hai aur phir unpacking ke zariye wo a aur b me assign ho jata hai."
      },
      {
        "q": "List ko Dictionary ki key kyun nahi banaya ja sakta jabki Tuple ko banaya ja sakta hai?",
        "options": [
          "List bahut badi hoti hai",
          "List unhashable (mutable) hoti hai jabki tuple hashable (immutable) hota hai",
          "Python dictionary sirf strings allow karti hai",
          "Ye Python 2 ka feature tha jo hata diya gaya"
        ],
        "correct": 1,
        "explanation": "Dictionary keys hashable honi chahiye. Mutable hone ki wajah se list ka hash calculate nahi kiya ja sakta, jabki immutable tuple hashable hota hai."
      }
    ]
  },
  {
    "day": 17,
    "week": 3,
    "phase": "Intermediate",
    "topic": "Dictionary basics",
    "concept": "Key-value pairs",
    "demo": "Dict banao aur access karo",
    "mistake": "KeyError se bacho",
    "quiz": "Quiz: student marks dict",
    "interview": "Real life: phonebook",
    "readTime": "14 mins",
    "contentHtml": "\n          <h2>📖 Day 17: Dictionary Basics - Key-Value Pairs &amp; Safe Access</h2>\n          <p>Real-world software development me sabse zyada use hone wala data structure hai <strong>Dictionary</strong> (Dict). Ab tak humne jo Lists aur Tuples dekhe, unme data ko index number (0, 1, 2...) se access kiya jata tha. Lekin agar aapko kisi user ki email dhoondhni ho, toh index 3 yaad rakhna mushkil hai. Yahan aati hai Dictionary, jahan har value ka ek meaningful label hota hai jise hum <strong>Key</strong> kehte hain.</p>\n\n          <h3>1. 💡 Concept: Key-Value Pairs aur Hashing ka Magic</h3>\n          <p>Real-life analogy: Sochiyie ek physical Oxford English Dictionary. Agar aapko \"Serendipity\" ka matlab dhoondhna hai, toh aap page number 1 se shuru karke 500 pages nahi palat-te. Aap sidhe letter 'S' par jakar word dhoondhte hain. Yahan <strong>Word</strong> hai \"Key\" aur uska <strong>Meaning</strong> hai \"Value\". Isi tarah aapke smartphone ki Contacts List me <strong>Dost ka Naam</strong> Key hai aur uska <strong>Mobile Number</strong> Value hai.</p>\n\n          <p>Python me Dictionary curly braces <code>{}</code> me likhi jaati hai, jahan key aur value ke beech colon <code>:</code> hota hai aur pairs comma <code>,</code> se alag hote hain: <code>user = {\"name\": \"Kaif\", \"role\": \"Engineer\"}</code>.</p>\n\n          <p><strong>Dictionary ke Important Rules:</strong></p>\n          <ul>\n            <li><strong>Keys must be Unique:</strong> Ek dictionary me do same keys nahi ho sakti. Agar aap duplicate key denge, toh nayi value purani value ko overwrite (replace) kar degi.</li>\n            <li><strong>Keys must be Immutable:</strong> Keys sirf hashable data types ho sakti hain jaise <code>str</code>, <code>int</code>, <code>float</code>, ya <code>tuple</code>. Aap List ya doosri Dict ko key nahi bana sakte!</li>\n            <li><strong>Values can be Anything:</strong> Value ke upar koi restriction nahi hai — wo number, string, list, tuple ya yahan tak ki ek poori nested dictionary bhi ho sakti hai.</li>\n            <li><strong>O(1) Search Time (Instant Lookup):</strong> Internally Python dictionary <em>Hash Table</em> data structure use karti hai. Chahe aapki dictionary me 10 items hon ya 10 lakh items, kisi key ki value dhoondhne me lagbhag ek jaisa (constant O(1)) time lagta hai!</li>\n          </ul>\n\n          <p><strong>Data Access aur Safe Retrieval:</strong></p>\n          <p>Value access karne ke do mukhya tareeqe hain: Square brackets <code>user[\"name\"]</code> aur <code>get()</code> method jaise <code>user.get(\"name\")</code>. Square brackets tab use hote hain jab aap 100% sure hon ki key exist karti hai. Agar key nahi mili, toh program crash ho jayega aur <code>KeyError</code> aayega. Wahin <code>get()</code> method safe hota hai: agar key nahi milti toh wo crash karne ke bajaye <code>None</code> ya aapka diya hua default message return karta hai.</p>\n\n          <h3>2. 💻 Live Demo: Student Database &amp; Safe Access</h3>\n          <p>Is pehle demo me dekhiye ki dictionary kaise create ki jaati hai, uske andar values kaise add, update aur delete ki jaati hain:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>student_dict.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># 1. Creating a Dictionary\nstudent = {\n    \"roll_no\": 101,\n    \"name\": \"Mohd Kaif\",\n    \"course\": \"Python Masterclass\",\n    \"marks\": [88, 92, 79],\n    \"is_enrolled\": True\n}\n\nprint(\"Original Student Profile:\")\nprint(student)\n\n# 2. Accessing Values\nprint(\"\nStudent Name:\", student[\"name\"])\nprint(\"First Subject Marks:\", student[\"marks\"][0])\n\n# 3. Adding a new Key-Value pair\nstudent[\"email\"] = \"kaif@example.com\"\n\n# 4. Modifying existing Key\nstudent[\"is_enrolled\"] = False\n\n# 5. Deleting a key using del aur pop()\ndeleted_course = student.pop(\"course\")\nprint(f\"Removed course: '{deleted_course}'\")\n\nprint(\"\nUpdated Student Profile:\")\nprint(student)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Original Student Profile:<br>{'roll_no': 101, 'name': 'Mohd Kaif', 'course': 'Python Masterclass', 'marks': [88, 92, 79], 'is_enrolled': True}<br><br>Student Name: Mohd Kaif<br>First Subject Marks: 88<br>Removed course: 'Python Masterclass'<br><br>Updated Student Profile:<br>{'roll_no': 101, 'name': 'Mohd Kaif', 'marks': [88, 92, 79], 'is_enrolled': False, 'email': 'kaif@example.com'}</div>\n          </div>\n\n          <p>Ab dekhte hain production code me hone wale crashes ko rokne ke liye <code>get()</code> method aur <code>in</code> operator ka practical use:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>safe_dict_access.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>user_profile = {\n    \"username\": \"code_ninja\",\n    \"membership\": \"Gold\",\n    \"points\": 450\n}\n\n# Method 1: Using 'in' keyword to check existence\nif \"phone\" in user_profile:\n    print(\"Phone Number:\", user_profile[\"phone\"])\nelse:\n    print(\"Notice: 'phone' key missing hai!\")\n\n# Method 2: Using get() with Custom Default fallback\nphone = user_profile.get(\"phone\", \"Not Provided\")\nprint(\"User Phone (Safe):\", phone)\n\n# Default behavior when key is found\ncurrent_tier = user_profile.get(\"membership\", \"Standard\")\nprint(\"User Tier:\", current_tier)\n\n# Method 3: Handling KeyError explicitly with try/except\ntry:\n    print(user_profile[\"address\"])\nexcept KeyError as err:\n    print(f\"Caught KeyError: Key {err} nahi mili database me!\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Notice: 'phone' key missing hai!<br>User Phone (Safe): Not Provided<br>User Tier: Gold<br>Caught KeyError: Key 'address' nahi mili database me!</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: KeyError aur Mutable Keys Trap</div>\n            <p>Do sabse dangerous galtiyan jo beginners karte hain:</p>\n            <p>1. <strong>Direct square brackets se access karna jab key optional ho:</strong><br>\n            ❌ <code>discount = cart[\"coupon_discount\"]  # Crashes with KeyError agar coupon na ho!</code><br>\n            ✅ <code>discount = cart.get(\"coupon_discount\", 0)  # Safe default 0 mil jayega!</code></p>\n            <p>2. <strong>List ko Dictionary key banane ki koshish karna:</strong><br>\n            ❌ <code>bad_dict = {[1, 2]: \"numbers\"}  # TypeError: unhashable type: 'list'</code><br>\n            ✅ <code>good_dict = {(1, 2): \"numbers\"}  # Tuple is immutable, so this is valid!</code></p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Phonebook &amp; REST APIs</div>\n            <p><strong>Real-World Use Case: Phonebook Directory &amp; JSON APIs</strong></p>\n            <p>Internally poora web internet JSON (JavaScript Object Notation) par chalta hai, jo Python me seedha Dictionary ke roop me parse hota hai. Jab aap Zomato ya Swiggy par restaurant ka menu dekhte hain ya Truecaller par number search karte hain, backend par ek dictionary lookup hota hai:</p>\n            <p><strong>Interview Question:</strong> <em>\"Agar hum ek dictionary me same key do baar assign kar dein jaise <code>d = {'a': 1, 'b': 2, 'a': 3}</code>, toh kya hoga?\"</em><br>\n            Answer: Python koi error nahi dega! Interpreter left to right read karta hai, isliye pehli key <code>'a': 1</code> banegi aur baad me aayi <code>'a': 3</code> use bina kisi warning ke overwrite kar degi. Final dictionary <code>{'a': 3, 'b': 2}</code> hogi.</p>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Inme se kaunsa data type Python Dictionary ki 'Key' ban sakta hai?",
        "options": [
          "['apple', 'banana'] (List)",
          "{'a': 1} (Dict)",
          "('lat', 'long') (Tuple)",
          "{1, 2, 3} (Set)"
        ],
        "correct": 2,
        "explanation": "Dictionary keys hashable aur immutable honi chahiye. List, Dict aur Set mutable hote hain, sirf Tuple immutable hone ki wajah se valid key ban sakta hai."
      },
      {
        "q": "d = {'age': 20}; print(d.get('height', 170)) ka output kya aayega?",
        "options": [
          "None",
          "KeyError",
          "170",
          "0"
        ],
        "correct": 2,
        "explanation": "get() method me agar pehli key exist nahi karti toh wo second argument me di gayi default value (170) return karta hai."
      },
      {
        "q": "d = {'x': 10, 'y': 20, 'x': 30}; print(d['x']) ka result kya hoga?",
        "options": [
          "10",
          "30",
          "SyntaxError: Duplicate key",
          "[10, 30]"
        ],
        "correct": 1,
        "explanation": "Duplicate keys aane par Python aakhri value se purani value ko overwrite kar deta hai, isliye result 30 hoga."
      },
      {
        "q": "Dictionary se kisi key ko delete karte waqt uski value return lene ke liye kaunsa method use hota hai?",
        "options": [
          "del",
          "d.remove()",
          "d.pop()",
          "d.discard()"
        ],
        "correct": 2,
        "explanation": "d.pop(key) key ko remove karta hai aur uski value ko return bhi karta hai, jabki del keyword value return nahi karta."
      },
      {
        "q": "Dictionary me key search karne ki average time complexity kya hoti hai?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N^2)"
        ],
        "correct": 2,
        "explanation": "Dictionary Hash Table par based hoti hai, isliye key lookup ka average time O(1) yaani constant time hota hai."
      }
    ]
  },
  {
    "day": 18,
    "week": 3,
    "phase": "Intermediate",
    "topic": "Dict methods aur loops",
    "concept": "keys, values, items",
    "demo": "get() aur update() demo",
    "mistake": "Loop mein dict change mat karo",
    "quiz": "Quiz: word count",
    "interview": "Interview: dict ordered hai?",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>🔄 Day 18: Dict Methods &amp; Loops - Iteration, Merging &amp; Word Counter</h2>\n          <p>Dictionary me data daalna aur single key nikalna humne seekh liya. Lekin asli software me hume saare customers ke records par loop chalana hota hai, unhe filter karna hota hai, aur do alag databases ki dictionaries ko aapas me merge karna hota hai. Aaj hum dictionary ke 3 vital views — <code>keys()</code>, <code>values()</code>, aur <code>items()</code> — aur loop traps ko master karenge.</p>\n\n          <h3>1. 💡 Concept: Iteration, View Objects &amp; Core Methods</h3>\n          <p>Maan lijiye aapke paas ek Class ke sabhi students aur unke marks ki dictionary hai: <code>scores = {\"Rahul\": 85, \"Priya\": 94, \"Aman\": 76}</code>. Agar principal aapse kahein ki:</p>\n          <ol>\n            <li>Sirf sabhi students ke naam print karo &rarr; Use <code>scores.keys()</code></li>\n            <li>Sirf marks ka average nikalo &rarr; Use <code>scores.values()</code></li>\n            <li>Har student ke naam ke saath uska grade display karo &rarr; Use <code>scores.items()</code></li>\n          </ol>\n\n          <p><strong>Python Dictionary ke 3 Dynamic View Objects:</strong></p>\n          <ul>\n            <li><code>dict.keys()</code>: Ye dictionary ki saari keys ka ek iterable view deta hai. Agar aap direct <code>for k in dict:</code> likhte hain, toh Python by default keys par hi loop chalata hai.</li>\n            <li><code>dict.values()</code>: Ye saari values ka view deta hai. Isse aap <code>sum()</code>, <code>max()</code>, <code>min()</code> direct nikaal sakte hain.</li>\n            <li><code>dict.items()</code>: Ye key-value pairs ko <code>(key, value)</code> tuples ke roop me return karta hai. Iska sabse khoobsurat use loop me unpacking ke saath hota hai: <code>for name, mark in scores.items():</code>.</li>\n          </ul>\n\n          <p><strong>Powerful Dictionary Methods:</strong></p>\n          <ul>\n            <li><code>update()</code>: Ek dictionary me doosri dictionary ke key-value pairs merge kar deta hai. Python 3.9+ me iska modern operator <code>|</code> (pipe) bhi aa chuka hai!</li>\n            <li><code>setdefault(key, default)</code>: Agar key exist karti hai toh uski value return karega; agar nahi karti toh use default value ke saath dictionary me insert kar dega.</li>\n            <li><code>popitem()</code>: Aakhri inserted key-value pair ko tuple ke roop me nikaal kar delete karta hai (LIFO - Last In First Out).</li>\n            <li><code>clear()</code>: Poori dictionary ke sabhi elements ko ek jhatke me delete karke use empty <code>{}</code> bana deta hai.</li>\n          </ul>\n\n          <p><strong>Word Frequency Counter Algorithm:</strong></p>\n          <p>Data science aur text analysis ka sabse pehla step hota hai ye ginna ki kisi text me kaunsa shabd kitni baar aaya hai. Iska sabse Pythonic tareeqa hota hai: <code>counts[word] = counts.get(word, 0) + 1</code>. Agar word pehli baar aaya toh <code>get()</code> 0 dega jisme 1 jud kar 1 ho jayega; agar pehle se 2 tha toh 2 + 1 = 3 ho jayega!</p>\n\n          <h3>2. 💻 Live Demo: Methods, Merging &amp; Word Frequency Counter</h3>\n          <p>Pehle demo me dekhte hain teeno views par loop chalane ka tareeqa aur Python 3.9 ka merge operator:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>dict_loops_merge.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Inventory dictionary\ninventory = {\n    \"Laptop\": 12,\n    \"Mouse\": 45,\n    \"Keyboard\": 30,\n    \"Monitor\": 8\n}\n\n# 1. Loop over keys (Default behavior)\nprint(\"--- Product Catalog ---\")\nfor item in inventory:\n    print(f\"Product: {item}\")\n\n# 2. Loop over values to calculate total stock\ntotal_stock = sum(inventory.values())\nprint(f\"\nTotal units in warehouse: {total_stock}\")\n\n# 3. Loop over items (Key + Value Unpacking)\nprint(\"\n--- Stock Alert Check ---\")\nfor product, qty in inventory.items():\n    status = \"LOW STOCK!\" if qty &lt; 10 else \"Sufficient\"\n    print(f\"{product:10} | Qty: {qty:2} | Status: {status}\")\n\n# 4. Merging Dictionaries (update method vs | operator)\nnew_shipment = {\"Headphones\": 25, \"Mouse\": 50}  # Mouse stock updated\n\n# Python 3.9+ Union Operator:\nmerged_inventory = inventory | new_shipment\nprint(\"\nMerged Inventory (Notice Mouse count updated to 50):\")\nprint(merged_inventory)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>--- Product Catalog ---<br>Product: Laptop<br>Product: Mouse<br>Product: Keyboard<br>Product: Monitor<br><br>Total units in warehouse: 95<br><br>--- Stock Alert Check ---<br>Laptop     | Qty: 12 | Status: Sufficient<br>Mouse      | Qty: 45 | Status: Sufficient<br>Keyboard   | Qty: 30 | Status: Sufficient<br>Monitor    | Qty:  8 | Status: LOW STOCK!<br><br>Merged Inventory (Notice Mouse count updated to 50):<br>{'Laptop': 12, 'Mouse': 50, 'Keyboard': 30, 'Monitor': 8, 'Headphones': 25}</div>\n          </div>\n\n          <p>Ab dekhte hain interview ka mashhoor project: <strong>Sentence Word Frequency Counter</strong>:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>word_counter.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Sentence frequency counter\ntext = \"python is fun and python is powerful and python is easy\"\nwords = text.split()\n\nfrequency = {}\n\nfor word in words:\n    # get() returns current count or 0 if seen first time\n    frequency[word] = frequency.get(word, 0) + 1\n\nprint(\"Word Frequencies:\")\nfor word, count in frequency.items():\n    print(f\"'{word}': {count} time(s)\")\n\n# Finding the most frequent word\nmost_common = max(frequency, key=frequency.get)\nprint(f\"\nSabse zyada aane wala word: '{most_common}' ({frequency[most_common]} baar)\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Word Frequencies:<br>'python': 3 time(s)<br>'is': 3 time(s)<br>'fun': 1 time(s)<br>'and': 2 time(s)<br>'powerful': 1 time(s)<br>'easy': 1 time(s)<br><br>Sabse zyada aane wala word: 'python' (3 baar)</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Loop ke dauran Dictionary size change karna!</div>\n            <p>Ye Python ka ek infamous bug hai jo bade projects me unexpected crashes deta hai: Jab aap kisi dictionary par iterate kar rahe hote hain, aap usi loop ke andar us dictionary se items delete ya add nahi kar sakte!</p>\n            <p>❌ <strong>Wrong Code (Crashes with RuntimeError):</strong><br>\n            <code>scores = {\"A\": 40, \"B\": 20, \"C\": 80}</code><br>\n            <code>for k, v in scores.items():</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;if v &lt; 35:</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;del scores[k]  # RuntimeError: dictionary changed size during iteration</code></p>\n            <p>✅ <strong>Correct Code (Iterate over a copy of keys or list):</strong><br>\n            <code>for k in list(scores.keys()):  # keys ki static snapshot list bana li!</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;if scores[k] &lt; 35:</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;del scores[k]  # Completely safe!</code></p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Kya Python Dictionary Ordered hoti hai?</div>\n            <p><strong>Hot Interview Question: \"Kya Python Dictionary elements ke insertion order ko preserve karti hai?\"</strong></p>\n            <p>Aapka answer version ke sath hona chahiye jo interviewer ko impress karega:</p>\n            <ul>\n              <li><strong>Python 3.5 aur purane versions:</strong> Dictionaries puri tarah <em>Unordered</em> thi. Aap jis order me data insert karte the, iteration par wo kisi random hash order me milta tha. Order ke liye <code>collections.OrderedDict</code> use karna padta tha.</li>\n              <li><strong>Python 3.6+:</strong> CPython implementation me dictionary ko redesign kiya gaya memory optimize karne ke liye, jisse by-product ke roop me insertion order maintain hone laga.</li>\n              <li><strong>Python 3.7+ se lekar aaj tak:</strong> Insertion order preservation ko Python language ka official language specification bana diya gaya hai! Yaani ab Python dictionary <strong>Ordered by insertion</strong> hoti hai.</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "d = {'a': 1, 'b': 2}; for x in d: print(x) chalane par screen par kya print hoga?",
        "options": [
          "1 aur 2 (Values)",
          "'a' aur 'b' (Keys)",
          "('a', 1) aur ('b', 2) (Tuples)",
          "Error aayega"
        ],
        "correct": 1,
        "explanation": "Dictionary par direct loop chalane par Python by default uski keys par iterate karta hai."
      },
      {
        "q": "Loop ke dauran dictionary se elements delete karne par kaunsa exception aata hai?",
        "options": [
          "IndexError",
          "KeyError",
          "RuntimeError: dictionary changed size during iteration",
          "ValueError"
        ],
        "correct": 2,
        "explanation": "Iteration ke dauran dictionary ka size mutate karne par Python safety check fail hota hai aur RuntimeError raise hota hai."
      },
      {
        "q": "Python 3.9 me do dictionaries d1 aur d2 ko merge karne ke liye kaunsa naya operator introduce hua?",
        "options": [
          "d1 + d2",
          "d1 & d2",
          "d1 | d2",
          "d1 << d2"
        ],
        "correct": 2,
        "explanation": "Python 3.9 me dictionary union ke liye pipe (|) operator introduce kiya gaya hai."
      },
      {
        "q": "word_count[w] = word_count.get(w, 0) + 1 me get(w, 0) ka kya purpose hai?",
        "options": [
          "Index 0 nikalna",
          "Agar word pehli baar aaya ho toh bina KeyError ke 0 return karna",
          "Count ko zero reset karna",
          "Ye sirf check karta hai ki word hai ya nahi"
        ],
        "correct": 1,
        "explanation": "get(w, 0) ensure karta hai ki agar word pehli baar aaya ho toh 0 return ho, jisse + 1 hokar count 1 ban sake."
      },
      {
        "q": "Python 3.7+ ke according Dictionary ke baare me kaunsa statement 100% sahi hai?",
        "options": [
          "Dict completely unordered hoti hai",
          "Dict insertion order ko preserve karti hai",
          "Dict alphabetical order me sort hoti hai",
          "Dict values ke hisab se sort hoti hai"
        ],
        "correct": 1,
        "explanation": "Python 3.7 ke baad official language specification me insertion order ko guarantee kiya gaya hai."
      }
    ]
  },
  {
    "day": 19,
    "week": 3,
    "phase": "Intermediate",
    "topic": "Sets",
    "concept": "Set kya hai",
    "demo": "Union, intersection demo",
    "mistake": "{} empty set nahi hai",
    "quiz": "Quiz: common elements",
    "interview": "Real life: unique visitors",
    "readTime": "14 mins",
    "contentHtml": "\n          <h2>🎯 Day 19: Sets - Unique Elements &amp; Mathematical Set Operations</h2>\n          <p>Imagine kijiye aap ek bade web portal ke analytics engineer hain. Har din lakho log site par aate hain aur ek hi user 20 baar alag alag pages click karta hai. Din ke aakhri me boss ne pucha: <em>\"Aaj kitne UNIQUE log site par aaye?\"</em> Agar aap list use karenge aur bar-bar check karenge, toh server hang ho jayega. Is problem ka sabse khubsurat aur mathematical solution hai <strong>Set</strong>!</p>\n\n          <h3>1. 💡 Concept: Unordered, Unindexed, Unique Elements</h3>\n          <p>School ki mathematics me aapne <em>Venn Diagrams</em> aur <em>Set Theory</em> padhi hogi: A &cup; B (Union) aur A &cap; B (Intersection). Python ne wahi mathematical set theory seedha programming me utaar di hai.</p>\n\n          <p><strong>Set ki 4 Fundamental Properties:</strong></p>\n          <ul>\n            <li><strong>Unique Elements Only:</strong> Set me duplicate items nahi reh sakte. Agar aap <code>{1, 2, 2, 3, 3, 3}</code> likhenge, toh Python bina kisi warning ke duplicates ko delete karke use <code>{1, 2, 3}</code> bana dega.</li>\n            <li><strong>Unordered:</strong> Elements ka koi specific order ya sequence nahi hota. Isliye Sets me indexing ya slicing nahi hoti: <code>s[0]</code> likhne par <code>TypeError</code> aayega!</li>\n            <li><strong>Mutable Container with Immutable Items:</strong> Set khud mutable hai (aap usme <code>add()</code> aur <code>remove()</code> kar sakte hain), lekin set ke andar jo elements honge wo immutable hone chahiye (numbers, strings, tuples). Set ke andar list ya dict nahi daal sakte!</li>\n            <li><strong>Lightning-Fast Membership Testing:</strong> Set internally Hash Table use karta hai. Kisi list me 10 lakh items me se ek item dhoondhne me O(N) linear time lagta hai, lekin Set me <code>item in my_set</code> check karne me O(1) constant time lagta hai!</li>\n          </ul>\n\n          <p><strong>Set ke Core Mathematical Operations:</strong></p>\n          <ol>\n            <li><strong>Union (<code>|</code> ya <code>union()</code>):</strong> Dono sets ke sabhi elements ko combine karta hai (duplicates discard karke).</li>\n            <li><strong>Intersection (<code>&amp;</code> ya <code>intersection()</code>):</strong> Sirf wo elements jo dono sets me COMMON hain.</li>\n            <li><strong>Difference (<code>-</code> ya <code>difference()</code>):</strong> Pehle set ke wo elements jo doosre set me NAHI hain (A - B).</li>\n            <li><strong>Symmetric Difference (<code>^</code> ya <code>symmetric_difference()</code>):</strong> Wo elements jo ya toh A me hain ya B me hain, lekin DONO me common nahi hain.</li>\n          </ol>\n\n          <h3>2. 💻 Live Demo: Removing Duplicates &amp; Venn Diagram Analytics</h3>\n          <p>Pehle demo me dekhte hain ki kisi bhi duplicate-loaded List ko 1 second me clean kaise karte hain aur membership check kitna fast hota hai:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>unique_cleaning.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># List with duplicate customer IDs from server logs\nraw_logs = [\"USR101\", \"USR105\", \"USR101\", \"USR109\", \"USR105\", \"USR101\", \"USR112\"]\nprint(\"Total raw log entries:\", len(raw_logs))\n\n# Converting List to Set drops all duplicates instantly!\nunique_visitors = set(raw_logs)\nprint(\"Unique Visitors Count:\", len(unique_visitors))\nprint(\"Unique IDs Set:\", unique_visitors)\n\n# Adding &amp; Removing Elements\nunique_visitors.add(\"USR120\")       # Add single item\nunique_visitors.discard(\"USR101\")   # Safe remove (won't crash if missing)\n\nprint(\"\nAfter updates:\", unique_visitors)\n\n# Fast O(1) Membership Check\ntarget_user = \"USR109\"\nif target_user in unique_visitors:\n    print(f\"User {target_user} is active on website!\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Total raw log entries: 7<br>Unique Visitors Count: 4<br>Unique IDs Set: {'USR101', 'USR105', 'USR109', 'USR112'}<br><br>After updates: {'USR105', 'USR109', 'USR112', 'USR120'}<br>User USR109 is active on website!</div>\n          </div>\n\n          <p>Ab dekhte hain EdTech platform ka practical analytics demo jahan Python aur Data Science courses ke students ka comparison ho raha hai:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>set_operations_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Student batches\npython_students = {\"Aman\", \"Priya\", \"Kaif\", \"Rohit\", \"Sneha\"}\ndatascience_students = {\"Kaif\", \"Sneha\", \"Vikram\", \"Anjali\", \"Pooja\"}\n\n# 1. Union (|): Sabhi unique students\nall_students = python_students | datascience_students\nprint(\"1. All Enrolled Students (Union):\")\nprint(all_students)\n\n# 2. Intersection (&amp;): Students enrolled in BOTH courses\ndual_enrolled = python_students &amp; datascience_students\nprint(\"\n2. Dual Enrolled in Both (Intersection):\")\nprint(dual_enrolled)\n\n# 3. Difference (-): Sirf Python padhne wale (No Data Science)\nonly_python = python_students - datascience_students\nprint(\"\n3. Only Python Students (Difference):\")\nprint(only_python)\n\n# 4. Symmetric Difference (^): Sirf ek course padhne wale (Common excluded)\nsingle_course_only = python_students ^ datascience_students\nprint(\"\n4. Only 1 Course Enrolled (Symmetric Difference):\")\nprint(single_course_only)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>1. All Enrolled Students (Union):<br>{'Aman', 'Priya', 'Kaif', 'Rohit', 'Sneha', 'Vikram', 'Anjali', 'Pooja'}<br><br>2. Dual Enrolled in Both (Intersection):<br>{'Kaif', 'Sneha'}<br><br>3. Only Python Students (Difference):<br>{'Aman', 'Priya', 'Rohit'}<br><br>4. Only 1 Course Enrolled (Symmetric Difference):<br>{'Aman', 'Priya', 'Rohit', 'Vikram', 'Anjali', 'Pooja'}</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: {} Empty Set nahi hota!</div>\n            <p>Beginners ki sabse badi galatfehmi: Wo sochte hain ki jaise list ke liye <code>[]</code> aur tuple ke liye <code>()</code> hota hai, waise hi empty set ke liye <code>{}</code> hota hoga!</p>\n            <p>❌ <strong>Wrong Code:</strong><br>\n            <code>empty_item = {}</code><br>\n            <code>print(type(empty_item))  # &lt;class 'dict'&gt; (Ye empty dictionary hai, set nahi!)</code></p>\n            <p>✅ <strong>Correct Code:</strong><br>\n            <code>empty_item = set()  # set() constructor function use karein</code><br>\n            <code>print(type(empty_item))  # &lt;class 'set'&gt;</code></p>\n            <p><strong>Bonus Mistake (remove vs discard):</strong><br>\n            <code>s.remove(\"missing_item\")</code> crash karega (<code>KeyError</code>). Lekin <code>s.discard(\"missing_item\")</code> bina crash kiye silently ignore kar dega. Hamesha production code me <strong>discard()</strong> use karein!</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Unique Visitors &amp; Frozenset</div>\n            <p><strong>Interview Deep Dive: frozenset kya hota hai?</strong></p>\n            <p>Normal Set mutable hota hai, isliye aap set ko kisi dictionary ki key ya kisi doosre set ka element nahi bana sakte. Is problem ko solve karne ke liye Python me hota hai <strong>frozenset</strong>.</p>\n            <p><code>fs = frozenset([1, 2, 3])</code> ek immutable set banata hai. Isme <code>add()</code> ya <code>remove()</code> nahi hota, aur is wajah se ye <em>hashable</em> hota hai aur dictionary key ban sakta hai!</p>\n            <p><strong>Real-World Use Cases:</strong></p>\n            <ul>\n              <li><strong>Social Media Mutual Friends:</strong> <code>user1_friends &amp; user2_friends</code> do dosto ke common friends 1 line me nikaal deta hai.</li>\n              <li><strong>Tagging System:</strong> E-commerce me products par filter lagana: <code>product_tags &amp; selected_filters</code>.</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "x = {} likhne par variable 'x' ka data type kya hoga?",
        "options": [
          "<class 'set'>",
          "<class 'dict'>",
          "<class 'tuple'>",
          "SyntaxError"
        ],
        "correct": 1,
        "explanation": "Khali curly braces {} Python me empty dictionary banate hain, empty set banane ke liye set() use hota hai."
      },
      {
        "q": "Set se kisi item ko delete karte waqt, agar item exist na kare toh bina error throw kiye kaunsa method safe rehta hai?",
        "options": [
          "s.remove()",
          "s.pop()",
          "s.discard()",
          "del s[item]"
        ],
        "correct": 2,
        "explanation": "discard() method missing item par koi error throw nahi karta, jabki remove() missing item par KeyError throw karta hai."
      },
      {
        "q": "s = {1, 2, 3}; print(s[0]) run karne par kya output aayega?",
        "options": [
          "1",
          "3",
          "TypeError: 'set' object is not subscriptable",
          "IndexError"
        ],
        "correct": 2,
        "explanation": "Sets unordered hote hain aur unme indexing support nahi hoti, isliye s[0] par TypeError aata hai."
      },
      {
        "q": "Do sets ke common elements nikaalne ke liye kaunsa operator use hota hai?",
        "options": [
          "| (Union)",
          "& (Intersection)",
          "- (Difference)",
          "^ (Symmetric Difference)"
        ],
        "correct": 1,
        "explanation": "Ampersand (&) operator do sets ka intersection (common elements) calculate karta hai."
      },
      {
        "q": "Set me kisi element ki presence check karne (x in s) ki average time complexity kya hoti hai?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N^2)"
        ],
        "correct": 2,
        "explanation": "Sets hash table par based hote hain, isliye membership test constant time O(1) me execute hota hai."
      }
    ]
  },
  {
    "day": 20,
    "week": 3,
    "phase": "Intermediate",
    "topic": "List comprehension",
    "concept": "One line mein list",
    "demo": "Condition ke saath comprehension",
    "mistake": "Zyada complex mat banao",
    "quiz": "Quiz: squares list",
    "interview": "Interview: comprehension vs loop",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>⚡ Day 20: List Comprehension - Elegant &amp; Fast One-Liners</h2>\n          <p>Python programmers ko puri duniya me unke clean aur readable code ke liye pasand kiya jata hai. Aur Pythonic code ka sabse chamakta hua sitara hai: <strong>List Comprehension</strong>. Jo kaam traditional programming languages me 5-6 lines ka loop likh kar, empty array initialize karke, aur bar-bar <code>append()</code> karke kiya jata hai, use Python me ek single elegant line me convert kiya ja sakta hai.</p>\n\n          <h3>1. 💡 Concept: Traditional Loops vs One-Line Comprehension</h3>\n          <p>Real-life analogy: Sochiyie ek factory assembly line. Traditional approach me: Pehle aap ek khali crate late hain (<code>result = []</code>), phir 100 items ke dher me se ek-ek item uthate hain (<code>for item in items:</code>), check karte hain ki kya ye defect-free hai (<code>if item.is_good:</code>), aur phir use crate me daalte hain (<code>result.append(item)</code>). Kitna tedious process hai!</p>\n\n          <p>List comprehension ek modern automated conveyor belt hai jo filtering aur packaging ek single pass me kar deta hai. Iska syntax itna natural hai ki ye bilkul English sentence jaisa padha jata hai:</p>\n          <p><code>[expression for item in iterable if condition]</code></p>\n\n          <p><strong>Comprehension ke 3 Core Patterns:</strong></p>\n          <ol>\n            <li><strong>Simple Transformation (Har item ko badlo):</strong><br>\n            Har number ka square nikalna: <code>[x**2 for x in numbers]</code></li>\n            <li><strong>Filtering with 'if' (Sirf pasandida items rakho):</strong><br>\n            Sirf even numbers filter karna: <code>[x for x in numbers if x % 2 == 0]</code></li>\n            <li><strong>Transformation + If-Else (Ternary Expression):</strong><br>\n            Jab aapko True par kuch aur aur False par kuch aur chahiye ho: <code>[\"Even\" if x % 2 == 0 else \"Odd\" for x in numbers]</code>. <em>Dhyan dein:</em> Jab 'else' lagta hai, toh if-else loop ke pehle aata hai!</li>\n          </ol>\n\n          <p><strong>Performance Secret:</strong> List comprehension sirf dikhne me sundar nahi hoti, ye traditional <code>for</code> loop aur <code>append()</code> se lagbhag <strong>25% se 35% fast</strong> hoti hai! Kyunki iska loop Python interpreter ke C-level code me run hota hai aur bar-bar function attribute lookup (<code>.append</code>) nahi karna padta.</p>\n\n          <h3>2. 💻 Live Demo: Transformations, Filtering &amp; Data Cleaning</h3>\n          <p>Pehle demo me dekhte hain traditional loop vs list comprehension ka direct comparison aur squares generation:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>comprehension_intro.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# --- Purana Tareeqa (Traditional Loop) ---\neven_squares_old = []\nfor n in numbers:\n    if n % 2 == 0:\n        even_squares_old.append(n ** 2)\n\nprint(\"Traditional loop result:\", even_squares_old)\n\n# --- Naya Pythonic Tareeqa (List Comprehension) ---\n# Syntax: [action for item in list if condition]\neven_squares_new = [n ** 2 for n in numbers if n % 2 == 0]\n\nprint(\"Comprehension result:   \", even_squares_new)\n\n# Speed &amp; Equality verification\nassert even_squares_old == even_squares_new\nprint(\"Dono results 100% identical hain!\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Traditional loop result: [4, 16, 36, 64, 100]<br>Comprehension result:    [4, 16, 36, 64, 100]<br>Dono results 100% identical hain!</div>\n          </div>\n\n          <p>Ab dekhte hain practical real-world data cleaning: Messy user input strings ko clean karna aur pass/fail status tag karna:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>data_cleaning_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Raw user emails entered in a web form (messy with spaces and irregular casing)\nraw_users = [\"  kaif@GMAIL.com \", \"   \", \"PRIYA@Yahoo.COM\", \"invalid-email\", \" Aman@Outlook.Com  \"]\n\n# Clean &amp; filter valid emails in 1 line:\n# Step: strip spaces, lowercase text, and only keep if '@' is present\nclean_emails = [\n    email.strip().lower() \n    for email in raw_users \n    if \"@\" in email and len(email.strip()) &gt; 5\n]\n\nprint(\"Cleaned Email List:\")\nprint(clean_emails)\n\n# Demo with If-Else (Ternary mapping):\nexam_scores = [75, 32, 88, 41, 95, 28]\n# Pass if score &gt;= 40, else Fail\ngrade_tags = [\"PASS\" if score &gt;= 40 else \"FAIL\" for score in exam_scores]\n\nprint(\"\nExam Results Mapping:\")\nfor score, status in zip(exam_scores, grade_tags):\n    print(f\"Score: {score:2} -&gt; Result: {status}\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Cleaned Email List:<br>['kaif@gmail.com', 'priya@yahoo.com', 'aman@outlook.com']<br><br>Exam Results Mapping:<br>Score: 75 -&gt; Result: PASS<br>Score: 32 -&gt; Result: FAIL<br>Score: 88 -&gt; Result: PASS<br>Score: 41 -&gt; Result: PASS<br>Score: 95 -&gt; Result: PASS<br>Score: 28 -&gt; Result: FAIL</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Over-Engineering &amp; Complex Comprehensions</div>\n            <p>Zen of Python ka pehla usool hai: <em>\"Readability counts\"</em> (Code samajh aana chahiye). Kuch programmers show off karne ke chakkar me 3 nested loops aur 4 conditions ko ek hi list comprehension me ghusa dete hain!</p>\n            <p>❌ <strong>Unreadable Monster (Mat likho aisa!):</strong><br>\n            <code>result = [f(x, y) for x in list1 if x &gt; 5 for y in list2 if y &lt; 10 and x != y]</code><br>\n            Aisa code 2 hafte baad khud aapko bhi samajh nahi aayega!</p>\n            <p>✅ <strong>Clean Rule of Thumb:</strong><br>\n            Agar aapki comprehension 2 lines se lambi ho rahi hai ya usme 2 se zyada <code>for</code> loops lag rahe hain, toh chupchap traditional <code>for</code> loop use karein. Code readability hamesha 1 line ke shortcut se badi hoti hai.</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Comprehension vs Generator Expression</div>\n            <p><strong>Top Interview Question: List Comprehension aur Generator Expression me kya farak hai?</strong></p>\n            <ul>\n              <li><strong>Syntax:</strong> List comprehension me square brackets <code>[x for x in data]</code> hote hain, jabki Generator expression me normal parentheses <code>(x for x in data)</code> hote hain.</li>\n              <li><strong>Memory Allocation (Sabse bada difference):</strong> Agar aapke paas 1 Crore (10 Million) numbers hain, toh List Comprehension turant 1 Crore elements RAM me bana degi (jisse system freeze ya <code>MemoryError</code> ho sakta hai).<br>\n              Lekin Generator Expression ek <em>Lazy Iterator</em> banata hai jo ek baar me sirf ek number memory me rakhta hai (Zero memory waste!).</li>\n              <li><strong>Verdict:</strong> Jab poori list ko index se baar-baar access karna ho toh List Comprehension use karein; jab sirf ek baar stream karke sum ya iterate karna ho toh Generator use karein.</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "numbers = [1, 2, 3, 4]; [x * 2 for x in numbers if x > 2] ka output kya aayega?",
        "options": [
          "[2, 4, 6, 8]",
          "[6, 8]",
          "[3, 4]",
          "[4, 6]"
        ],
        "correct": 1,
        "explanation": "Condition x > 2 sirf 3 aur 4 ke liye true hai. Unka double hone par [6, 8] list banegi."
      },
      {
        "q": "List comprehension me if-else (ternary expression) kahan likha jata hai?",
        "options": [
          "Hamesha loop ke baad me",
          "for loop se pehle (expression ke roop me)",
          "Hamesha brackets ke bahar",
          "List comprehension me else support nahi hota"
        ],
        "correct": 1,
        "explanation": "Jab transform ke liye if-else dono chahiye hon, toh syntax [true_val if condition else false_val for item in iterable] hota hai."
      },
      {
        "q": "List comprehension standard for-loop with append() se fast kyun hoti hai?",
        "options": [
          "Wo multi-threading use karti hai",
          "Interpreter ke C-level par optimized hoti hai aur method lookup overhead nahi hota",
          "Wo memory use nahi karti",
          "Wo background me run hoti hai"
        ],
        "correct": 1,
        "explanation": "List comprehension CPython me C-level bytecode optimization use karti hai jisse append() method ka lookup overhead bach jata hai."
      },
      {
        "q": "gen = (x * 2 for x in range(1000000)) likhne par RAM me kitne elements bante hain?",
        "options": [
          "10 lakh elements instantly allocate ho jate hain",
          "Sirf ek generator object banta hai, values on-demand banti hain (Lazy evaluation)",
          "Error aayega",
          "0 elements banenge"
        ],
        "correct": 1,
        "explanation": "Parentheses () lagane se generator expression banta hai jo memory efficient lazy evaluation use karta hai."
      },
      {
        "q": "Matrix flatten karne ke liye: matrix = [[1, 2], [3, 4]]; [num for row in matrix for num in row] ka output kya hoga?",
        "options": [
          "[[1, 2], [3, 4]]",
          "[1, 2, 3, 4]",
          "[4, 3, 2, 1]",
          "TypeError"
        ],
        "correct": 1,
        "explanation": "Pehla loop har sub-row leta hai, doosra loop row ke har number par chal kar 1D list [1, 2, 3, 4] bana deta hai."
      }
    ]
  },
  {
    "day": 21,
    "week": 3,
    "phase": "Intermediate",
    "topic": "Function arguments",
    "concept": "Default arguments",
    "demo": "*args aur **kwargs demo",
    "mistake": "Mutable default ki galti",
    "quiz": "Quiz: sum of any numbers",
    "interview": "Interview: *args kya hai",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>🧩 Day 21: Function Arguments - Default, *args &amp; **kwargs</h2>\n          <p>Day 14 par humne Python functions ke basic parameters dekhe the. Lekin jaise hi aap real-world libraries ya open-source frameworks (jaise Django, Flask, Pandas, FastAPI) me kaam karenge, aapko har jagah do ajeeb symbols dikhenge: <code>*args</code> aur <code>**kwargs</code>. Aaj hum inke parde ke peeche ka poora magic samjhenge aur ye bhi dekhenge ki Python ka sabse badnaam beginner trap — <em>Mutable Default Argument</em> — kaise kaam karta hai.</p>\n\n          <h3>1. 💡 Concept: Positional, Keyword, Default, *args &amp; **kwargs</h3>\n          <p>Real-life analogy se shuru karte hain: Sochiyie aap ek restaurant me khana order karne gaye hain. Kuch cheezein standard hoti hain jaise \"Thali\" (Positional parameter). Phir waiter aapse puchta hai ki \"Roti butter wali ya plain?\" (Default argument - agar aap kuch na bole toh wo standard plain roti hi layega). Lekin agar aap achanak kahein: <em>\"Saath me extra 10 alag-alag toppings aur spices le aao\"</em>, toh menu card me pehle se 10 alag columns nahi honge. Waiter ek note pad par sabhi extra items likh leta hai. Yahi hai <strong>*args</strong> aur <strong>**kwargs</strong>!</p>\n\n          <p><strong>Python Function Arguments ki 4 Categories:</strong></p>\n          <ol>\n            <li><strong>Positional Arguments:</strong> Wo values jo order ke hisab se match hoti hain. <code>def greet(first, last):</code> me pehla word <code>first</code> banega aur doosra <code>last</code>.</li>\n            <li><strong>Default Arguments:</strong> Wo parameters jinki ek pehle se tay value hoti hai: <code>def power(num, exp=2):</code>. Agar caller <code>exp</code> pass nahi karega, toh automatically 2 use hoga. <em>Rule:</em> Default arguments hamesha non-default arguments ke baad aane chahiye!</li>\n            <li><strong>*args (Arbitrary Positional Arguments):</strong> Asterisk <code>*</code> lagane se function kisi bhi sankhya (count) ke positional arguments accept kar sakta hai. Function ke andar ye saari values ek <strong>Tuple</strong> ke roop me pack ho jaati hain.</li>\n            <li><strong>**kwargs (Arbitrary Keyword Arguments):</strong> Double asterisk <code>**</code> lagane se function kisi bhi sankhya ke named arguments (<code>key=value</code>) accept kar sakta hai. Function ke andar ye saare pairs ek <strong>Dictionary</strong> ke roop me pack ho jaate hain.</li>\n          </ol>\n\n          <p><strong>Golden Order in Function Signature:</strong></p>\n          <p>Jab aap ek hi function me sabhi types ke arguments mix karte hain, toh unka sequence strictly ye hona chahiye:</p>\n          <p><code>def function(positional, default=value, *args, **kwargs):</code></p>\n\n          <h3>2. 💻 Live Demo: Flexible Calculator &amp; Dynamic Profile Builder</h3>\n          <p>Pehle demo me dekhte hain ki <code>*args</code> se ek aisi utility kaise banate hain jo 2 numbers ka bhi sum kare aur 200 numbers ka bhi, aur <code>**kwargs</code> se dynamic user details kaise capture hoti hain:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>args_kwargs_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># 1. *args Demo: Universal Adder Function\ndef calculate_sum(initial_bonus=0, *numbers):\n    print(f\"Bonus: {initial_bonus} | Numbers tuple: {numbers}\")\n    total = initial_bonus + sum(numbers)\n    return total\n\nprint(\"Sum of 3 numbers:\", calculate_sum(10, 5, 15, 20))\nprint(\"Sum of no numbers:\", calculate_sum(50))\n\n# 2. **kwargs Demo: Dynamic User Profile Builder\ndef build_profile(username, role=\"Developer\", **additional_info):\n    print(f\"\n--- User Profile: {username} ({role}) ---\")\n    print(f\"Raw kwargs dict: {additional_info}\")\n    \n    for key, value in additional_info.items():\n        print(f\"&bull; {key.replace('_', ' ').title()}: {value}\")\n\nbuild_profile(\n    \"kaif_coder\", \n    \"Lead Architect\", \n    experience_years=5, \n    city=\"Noida\", \n    primary_skill=\"Python\", \n    remote=True\n)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Bonus: 10 | Numbers tuple: (5, 15, 20)<br>Sum of 3 numbers: 50<br>Bonus: 50 | Numbers tuple: ()<br>Sum of no numbers: 50<br><br>--- User Profile: kaif_coder (Lead Architect) ---<br>Raw kwargs dict: {'experience_years': 5, 'city': 'Noida', 'primary_skill': 'Python', 'remote': True}<br>&bull; Experience Years: 5<br>&bull; City: Noida<br>&bull; Primary Skill: Python<br>&bull; Remote: True</div>\n          </div>\n\n          <p>Ab dekhte hain <strong>Argument Unpacking</strong>: Jab aapke paas pehle se ek list ya dictionary ho, toh use function me alag-alag arguments ke roop me kaise pass karte hain:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>argument_unpacking.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>def create_invoice(client, amount, tax_percent=18, discount=0):\n    tax_amount = amount * (tax_percent / 100)\n    final_bill = amount + tax_amount - discount\n    return f\"Client: {client} | Total: Rs.{final_bill:.2f}\"\n\n# Unpacking a Dictionary using **\ninvoice_data = {\n    \"client\": \"Apex Tech Solutions\",\n    \"amount\": 50000,\n    \"discount\": 2500\n}\n\n# Instead of: create_invoice(invoice_data['client'], invoice_data['amount'], ...)\n# Pythonic Unpacking:\nresult = create_invoice(**invoice_data)\nprint(result)\n\n# Unpacking a List using *\nbill_numbers = [1000, 2000, 3000]\nprint(\"Sum with unpacked list:\", calculate_sum(0, *bill_numbers))</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Client: Apex Tech Solutions | Total: Rs.56500.00<br>Bonus: 0 | Numbers tuple: (1000, 2000, 3000)<br>Sum with unpacked list: 6000</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Mutable Default Argument Trap (The Most Famous Bug!)</div>\n            <p>Python ka sabse shocking behavior: Default argument tab evaluate nahi hota jab function call hota hai, balki tab evaluate hota hai jab Python file ko compile/load karta hai! Isliye agar aap default value me <strong>Mutable object</strong> (jaise list <code>[]</code> ya dict <code>{}</code>) de dete hain, toh saari calls ek hi memory object share karti hain!</p>\n            <p>❌ <strong>Dangerous Code (List retains old data across independent calls):</strong><br>\n            <code>def add_student(name, student_list=[]):</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;student_list.append(name)</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;return student_list</code><br>\n            <code>print(add_student(\"Aman\"))   # ['Aman']</code><br>\n            <code>print(add_student(\"Priya\"))  # ['Aman', 'Priya'] &lt;-- Priya ke list me Aman kahan se aaya?!</code></p>\n            <p>✅ <strong>The Standard Pythonic Solution (Use None as sentinel):</strong><br>\n            <code>def add_student(name, student_list=None):</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;if student_list is None:</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;student_list = []  # Har call par fresh list banegi!</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;student_list.append(name)</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;return student_list</code></p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Decorators &amp; *args/**kwargs</div>\n            <p><strong>Top Interview Question: Kya *args aur **kwargs ka naam yahi hona zaroori hai?</strong></p>\n            <p>Answer: Bilkul nahi! Python ke liye sirf single asterisk <code>*</code> aur double asterisk <code>**</code> matter karta hai. Aap <code>*numbers</code> ya <code>**options</code> bhi likh sakte hain. Lekin <code>*args</code> aur <code>**kwargs</code> Python community (PEP 8) ka universal standard hai.</p>\n            <p><strong>Real-World Usage (Decorators &amp; Wrappers):</strong><br>\n            Jab hum functions ke upar logs, authentication ya performance timer lagate hain (Decorators), toh hume nahi pata hota ki target function 2 arguments lega ya 10 arguments. Yahan wrapper function hamesha <code>def wrapper(*args, **kwargs):</code> accept karta hai aur bina kuch tode aage pass kar deta hai.</p>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Function me *args arguments ko kis data type ke roop me pack karta hai?",
        "options": [
          "List",
          "Tuple",
          "Set",
          "Dictionary"
        ],
        "correct": 1,
        "explanation": "*args sabhi extra positional arguments ko ek immutable Tuple me pack karta hai."
      },
      {
        "q": "Function me **kwargs keyword arguments ko kis data structure ke roop me collect karta hai?",
        "options": [
          "List of Tuples",
          "Set",
          "Dictionary",
          "String"
        ],
        "correct": 2,
        "explanation": "**kwargs key-value format ke arguments ko Python Dictionary me pack karta hai."
      },
      {
        "q": "def func(a=1, b): pass likhne par Python kya error dega?",
        "options": [
          "Chal jayega koi error nahi aayega",
          "SyntaxError: non-default argument follows default argument",
          "TypeError",
          "ValueError"
        ],
        "correct": 1,
        "explanation": "Python me non-default arguments hamesha default arguments se pehle aane chahiye, isliye ye SyntaxError deta hai."
      },
      {
        "q": "def add(x, lst=[]): lst.append(x); return lst; print(add(1)); print(add(2)) ka output kya hoga?",
        "options": [
          "[1] aur [2]",
          "[1] aur [1, 2]",
          "[1, 2] aur [1, 2]",
          "Error aayega"
        ],
        "correct": 1,
        "explanation": "Default argument function definition ke time sirf ek baar banta hai, isliye second call me wahi list reuse hokar [1, 2] deti hai."
      },
      {
        "q": "Agar kisi dictionary d = {'x': 10, 'y': 20} ko function func(x, y) me pass karna ho toh unpacking ka sahi syntax kya hai?",
        "options": [
          "func(*d)",
          "func(**d)",
          "func(d)",
          "func(&d)"
        ],
        "correct": 1,
        "explanation": "Dictionary ke key-value pairs ko keyword arguments ke roop me unpack karne ke liye double asterisk (**d) use hota hai."
      }
    ]
  },
  {
    "day": 22,
    "week": 4,
    "phase": "Intermediate",
    "topic": "lambda, map, filter",
    "concept": "lambda function",
    "demo": "map aur filter demo",
    "mistake": "lambda ko overuse mat karo",
    "quiz": "Quiz: even numbers filter",
    "interview": "Real life: prices pe discount",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>⚡ Day 22: Functional Programming - lambda, map &amp; filter</h2>\n          <p>Python ek multi-paradigm language hai: yaani aap isme Object-Oriented code bhi likh sakte hain aur <strong>Functional Programming</strong> bhi. Functional programming ka maksad hota hai code ko chhota, mathematical aur state-free banana. Aaj hum Python ke 3 iconic functional tools — <code>lambda</code> (anonymus functions), <code>map()</code> (data transform), aur <code>filter()</code> (data filtering) — ko real-world e-commerce scenarios ke sath seekhenge.</p>\n\n          <h3>1. 💡 Concept: Anonymous Functions &amp; Higher-Order Processing</h3>\n          <p>Real-life analogy: Sochiyie aapko kisi document par ek chhota sa stamp lagana hai jisme likha ho \"APPROVED\". Ab kya is ek stamp ke liye aap factory me jakar poora 4-panno ka formal contract sign karenge? Nahi, aap ek quick rubber stamp uthayenge aur maar denge! Normal function (<code>def</code>) ek poora formal document hai jisme naam, docstrings aur indentation hoti hai. Wahin <strong>Lambda Function</strong> ek quick rubber stamp hai: ek single line ka fek-kar-use-karne-wala (throwaway) function!</p>\n\n          <p><strong>Lambda Function Syntax:</strong></p>\n          <p><code>lambda arguments: expression</code></p>\n          <ul>\n            <li>Iska koi naam nahi hota (isliye ise <em>Anonymous Function</em> kehte hain).</li>\n            <li>Isme <code>return</code> keyword nahi likha jata; jo bhi expression calculate hota hai wo automatically return ho jata hai.</li>\n            <li>Isme loops ya multiple statements nahi ho sakte — sirf ek single mathematical expression.</li>\n          </ul>\n\n          <p><strong>Higher-Order Functions: map() aur filter()</strong></p>\n          <p>Higher-order function wo function hota hai jo doosre function ko apne argument ke roop me accept karta hai:</p>\n          <ol>\n            <li><strong>map(function, iterable):</strong> Ye iterable ke har ek item par function ko apply karta hai aur transform kiya hua result deta hai. E.g., Sabhi prices par 18% GST jodna.</li>\n            <li><strong>filter(function, iterable):</strong> Ye iterable ke har item ko ek boolean check se guzarta hai. Jiske liye function <code>True</code> dega sirf wahi items aage aayenge, baaki discard ho jayenge! E.g., Sirf out-of-stock items ko filter karna.</li>\n          </ol>\n\n          <p><strong>Python 3 Lazy Evaluation:</strong></p>\n          <p>Dhyan rahe ki Python 3 me <code>map()</code> aur <code>filter()</code> turant list return nahi karte, balki ek <em>Lazy Iterator</em> return karte hain. Result dekhne ke liye hume use <code>list()</code> me convert karna padta hai: <code>list(map(...))</code>.</p>\n\n          <h3>2. 💻 Live Demo: E-Commerce Pricing, Filtering &amp; Custom Sorting</h3>\n          <p>Pehle demo me dekhte hain lambda function ka basic use aur dictionaries ko custom key ke basis par sort karna (Interview favorite):</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>lambda_sorting.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># 1. Normal function vs Lambda function\n# Normal:\ndef square_def(x):\n    return x ** 2\n\n# Lambda one-liner:\nsquare_lambda = lambda x: x ** 2\n\nprint(\"Square via def:   \", square_def(6))\nprint(\"Square via lambda:\", square_lambda(6))\n\n# 2. Custom Sorting with Lambda (Super Powerful!)\nproducts = [\n    {\"name\": \"Wireless Mouse\", \"price\": 499, \"rating\": 4.5},\n    {\"name\": \"Mechanical Keyboard\", \"price\": 2499, \"rating\": 4.8},\n    {\"name\": \"Gaming Monitor\", \"price\": 14999, \"rating\": 4.2},\n    {\"name\": \"USB-C Cable\", \"price\": 199, \"rating\": 4.6}\n]\n\n# Sort by price (Lowest to Highest)\nsorted_by_price = sorted(products, key=lambda p: p[\"price\"])\nprint(\"\n--- Products Sorted by Price (Ascending) ---\")\nfor item in sorted_by_price:\n    print(f\"Rs.{item['price']:5} | {item['name']}\")\n\n# Sort by rating (Highest to Lowest)\nsorted_by_rating = sorted(products, key=lambda p: p[\"rating\"], reverse=True)\nprint(\"\n--- Products Sorted by Rating (Top Rated) ---\")\nfor item in sorted_by_rating:\n    print(f\"Rating: {item['rating']} | {item['name']}\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Square via def:    36<br>Square via lambda: 36<br><br>--- Products Sorted by Price (Ascending) ---<br>Rs.  199 | USB-C Cable<br>Rs.  499 | Wireless Mouse<br>Rs. 2499 | Mechanical Keyboard<br>Rs.14999 | Gaming Monitor<br><br>--- Products Sorted by Rating (Top Rated) ---<br>Rating: 4.8 | Mechanical Keyboard<br>Rating: 4.6 | USB-C Cable<br>Rating: 4.5 | Wireless Mouse<br>Rating: 4.2 | Gaming Monitor</div>\n          </div>\n\n          <p>Ab dekhte hain e-commerce store me <code>map()</code> aur <code>filter()</code> ka live real-world implementation:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>map_filter_ecommerce.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>base_prices = [100, 250, 400, 1200, 3500]\n\n# 1. map() Demo: Apply 18% GST to all prices\n# formula: price * 1.18\ngst_prices = list(map(lambda price: round(price * 1.18, 2), base_prices))\n\nprint(\"Original Prices: \", base_prices)\nprint(\"Prices with GST: \", gst_prices)\n\n# 2. filter() Demo: Filter only budget-friendly items under Rs.500\nbudget_items = list(filter(lambda p: p &lt;= 500, gst_prices))\nprint(\"Budget Items (&lt;= Rs.500):\", budget_items)\n\n# 3. Combining filter and map in pipeline:\n# Problem: Take base_prices, filter those &gt;= 300, then give 10% festive discount\nfestive_deals = list(\n    map(lambda p: p * 0.90, filter(lambda p: p &gt;= 300, base_prices))\n)\nprint(\"Festive Discounted Deals:\", festive_deals)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Original Prices:  [100, 250, 400, 1200, 3500]<br>Prices with GST:  [118.0, 295.0, 472.0, 1416.0, 4130.0]<br>Budget Items (&lt;= Rs.500): [118.0, 295.0, 472.0]<br>Festive Discounted Deals: [360.0, 1080.0, 3150.0]</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Lambda ko Overuse Mat Karo!</div>\n            <p>Beginners jab naya-naya lambda seekhte hain, toh wo har jagah <code>def</code> chhod kar lambda thopne lagte hain. Aisa code banana jise koi insaan na samajh sake ek bohot buri aadat hai!</p>\n            <p>❌ <strong>Ugly &amp; Unreadable Code (Over-complicated lambda):</strong><br>\n            <code>check_grade = lambda s: 'A' if s &gt; 90 else ('B' if s &gt; 80 else ('C' if s &gt; 60 else 'F'))</code><br>\n            Isme na error tracing asaan hai, na testing, aur na docstrings likhi ja sakti hain!</p>\n            <p>✅ <strong>Clean Code (Use a proper def function):</strong><br>\n            <code>def get_student_grade(score):</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;\"\"\"Returns letter grade based on percentage score.\"\"\"</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;if score &gt; 90: return 'A'</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;elif score &gt; 80: return 'B'</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;return 'F'</code><br>\n            <em>Rule:</em> Lambda sirf tabhi use karein jab function chhota ho aur <code>sorted()</code> ya <code>map()</code> me ek baar pass karna ho.</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: List Comprehension vs map/filter</div>\n            <p><strong>Top Interview Question: Modern Python me map() aur filter() ke bajaye List Comprehension ko prefer kyun kiya jata hai?</strong></p>\n            <ul>\n              <li><strong>Readability:</strong> Guido van Rossum (Python ke creator) ne kaha tha ki <code>[p * 1.18 for p in prices if p &gt; 100]</code> padhne me <code>list(map(lambda ..., filter(lambda ...)))</code> se 10 guna zyada saaf aur intuitive hai.</li>\n              <li><strong>No Lambda Overhead:</strong> Comprehension me aapko extra lambda keyword likhne ki zaroorat nahi padti.</li>\n              <li><strong>Speed:</strong> Modern CPython me List Comprehension map + lambda se thodi fast hoti hai kyunki lambda call ka function invocation overhead avoid ho jata hai.</li>\n              <li><strong>Tab map() kab use karein?</strong> Jab aapke paas pehle se koi built-in C-function ho jaise <code>list(map(int, input().split()))</code>. Yahan koi naya lambda nahi banana pada, isliye ye behad fast aur clean hai!</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Lambda function ke baare me kaunsa statement 100% sahi hai?",
        "options": [
          "Isme return keyword likhna anivarya hai",
          "Iska koi naam nahi hota aur ye single expression return karta hai",
          "Isme while loop use ho sakta hai",
          "Ye sirf strings par kaam karta hai"
        ],
        "correct": 1,
        "explanation": "Lambda function anonymous (bina naam ka) hota hai aur single expression ka result automatically return karta hai."
      },
      {
        "q": "list(filter(lambda x: x % 2 != 0, [1, 2, 3, 4, 5])) ka output kya aayega?",
        "options": [
          "[2, 4]",
          "[1, 3, 5]",
          "[1, 2, 3, 4, 5]",
          "[True, False, True, False, True]"
        ],
        "correct": 1,
        "explanation": "Condition x % 2 != 0 odd numbers ke liye True hoti hai, isliye filter sirf [1, 3, 5] ko retain karega."
      },
      {
        "q": "Python 3 me map(lambda x: x*2, [1, 2, 3]) direct print karne par kya output dikhata hai?",
        "options": [
          "[2, 4, 6]",
          "<map object at 0x...>",
          "(2, 4, 6)",
          "TypeError"
        ],
        "correct": 1,
        "explanation": "Python 3 me map ek lazy iterator object return karta hai, use list me convert kiye bina direct print karne par object address dikhta hai."
      },
      {
        "q": "User input se multiple integers ek sath lene ke liye: list(map(int, input().split())) me map ka kya role hai?",
        "options": [
          "Strings ko numbers me convert karna",
          "Input ko split karna",
          "List ko sort karna",
          "Input validate karna"
        ],
        "correct": 0,
        "explanation": "input().split() se aayi string list ke har item par int function apply karke unhe integers me convert karta hai."
      },
      {
        "q": "sorted([('A', 50), ('B', 20), ('C', 90)], key=lambda x: x[1]) kis order me sort karega?",
        "options": [
          "Alphabetical ('A', 'B', 'C')",
          "Number values ke according ascending order (20, 50, 90)",
          "Descending order me",
          "Error aayega"
        ],
        "correct": 1,
        "explanation": "key=lambda x: x[1] tuple ke second element (number) ko comparison key banata hai, isliye [('B', 20), ('A', 50), ('C', 90)] banega."
      }
    ]
  },
  {
    "day": 23,
    "week": 4,
    "phase": "Intermediate",
    "topic": "Scope aur recursion",
    "concept": "Local vs global",
    "demo": "Recursion se factorial",
    "mistake": "Base case bhoolna",
    "quiz": "Quiz: fibonacci",
    "interview": "Interview: recursion vs loop",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>🔄 Day 23: Variable Scope (LEGB) &amp; Recursion Demystified</h2>\n          <p>Programming me do aisi concepts hain jo naye developers ke dimag me sabse zyada confusion paida karti hain: Pehla hai <strong>Variable Scope</strong> (kya function ke andar ka variable bahar dikhega?) aur doosra hai <strong>Recursion</strong> (jab ek function khud ko hi call karne lag jaye!). Aaj hum LEGB rule aur recursive thinking ko crystal clear karenge.</p>\n\n          <h3>1. 💡 Concept: LEGB Rule &amp; Recursive Thinking</h3>\n          <p>Real-life analogy for Scope: Sochiyie aapke ghar me ek TV hai (Global Scope - poora parivaar dekh sakta hai). Lekin aapke kamre me aapka personal smartphone hai jisme aapka private lock laga hai (Local Scope - sirf aap use kar sakte hain). Aapka bhai aapke kamre ke bahar se aapka phone nahi chala sakta. Python me bhi variables ke saath bilkul yahi hota hai!</p>\n\n          <p><strong>Python ka LEGB Lookup Rule:</strong></p>\n          <p>Jab bhi aap kisi variable ka naam likhte hain, Python interpreter use 4 levels par search karta hai (LEGB):</p>\n          <ol>\n            <li><strong>L - Local:</strong> Jo variable kisi function ke andar create hua hai. Function khatam hote hi ye memory se mita diya jata hai.</li>\n            <li><strong>E - Enclosing:</strong> Agar function ke andar doosra nested function ho, toh outer function ka scope inner function ke liye Enclosing hota hai (jise change karne ke liye <code>nonlocal</code> keyword use hota hai).</li>\n            <li><strong>G - Global:</strong> Jo variable poori <code>.py</code> file ke main body level par banta hai. Isse koi bhi function read kar sakta hai. Lekin agar function ke andar se use modify karna ho, toh <code>global</code> keyword lagana padta hai.</li>\n            <li><strong>B - Built-in:</strong> Python ke inbuilt functions aur constants jo hamesha available rehte hain, jaise <code>len</code>, <code>range</code>, <code>print</code>, <code>int</code>.</li>\n          </ol>\n\n          <p><strong>Recursion kya hai aur ye kaise kaam karta hai?</strong></p>\n          <p>Recursion ek aisi programming technique hai jisme ek function badi problem ko solve karne ke liye khud ko hi smaller input ke saath call karta hai. Jaise Russian Matryoshka Doll: Ek badi doll ke andar thodi chhoti doll, uske andar aur chhoti doll, aur aakhri me sabse nanhi doll jiske andar aur kuch nahi hota!</p>\n          <p>Har recursive function ke <strong>2 Essential Parts</strong> hone zaroori hain:</p>\n          <ul>\n            <li><strong>1. Base Case (Stopping Condition):</strong> Wo aakhri condition jahan function ko rukna hai aur bina khud ko call kiye seedha answer return karna hai (e.g. 0! = 1 ya 1! = 1). Agar base case na ho toh infinite recursion hoga aur program crash ho jayega!</li>\n            <li><strong>2. Recursive Step:</strong> Problem ko todkar <code>func(n - 1)</code> ke roop me khud ko call karna.</li>\n          </ul>\n\n          <p><strong>The Call Stack &amp; Python Recursion Limit:</strong></p>\n          <p>Har baar jab function khud ko call karta hai, computer ki RAM me ek naya <em>Stack Frame</em> banta hai. Python memory crash se bachane ke liye default roop se sirf <strong>1000 recursive calls</strong> allow karta hai (<code>sys.getrecursionlimit()</code>). Agar aap bina base case ke loop chalayenge toh <code>RecursionError: maximum recursion depth exceeded</code> aayega.</p>\n\n          <h3>2. 💻 Live Demo: Scope Resolution, Factorial &amp; Fibonacci Series</h3>\n          <p>Pehle demo me dekhte hain Local vs Global scope aur <code>global</code> keyword ka practical use:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>scope_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Global variable\nwallet_balance = 1000\n\ndef check_balance():\n    # Reading global variable is totally allowed\n    print(\"Current wallet balance (Read):\", wallet_balance)\n\ndef make_purchase(cost):\n    # To modify global variable inside function, use 'global' keyword\n    global wallet_balance\n    if wallet_balance &gt;= cost:\n        wallet_balance -= cost\n        print(f\"Spent: Rs.{cost} | Remaining: Rs.{wallet_balance}\")\n    else:\n        print(\"Insufficient balance!\")\n\ncheck_balance()\nmake_purchase(350)\nmake_purchase(200)\nprint(\"Final balance in main program:\", wallet_balance)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Current wallet balance (Read): 1000<br>Spent: Rs.350 | Remaining: Rs.650<br>Spent: Rs.200 | Remaining: Rs.450<br>Final balance in main program: 450</div>\n          </div>\n\n          <p>Ab dekhte hain recursion se Factorial aur Fibonacci Series calculate karna with step-by-step visual logic:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>recursion_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># 1. Factorial Calculation using Recursion: n! = n * (n-1)!\ndef factorial(n):\n    # Base Case: 0! aur 1! = 1\n    if n &lt;= 1:\n        return 1\n    # Recursive Case:\n    return n * factorial(n - 1)\n\nprint(\"5! (Factorial of 5):\", factorial(5))  # 5 * 4 * 3 * 2 * 1 = 120\n\n# 2. Fibonacci Number: fib(n) = fib(n-1) + fib(n-2)\n# Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...\ndef fibonacci(n):\n    # Base Case:\n    if n &lt;= 0:\n        return 0\n    elif n == 1:\n        return 1\n    # Recursive Step:\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(\"First 8 Fibonacci numbers:\")\nfib_sequence = [fibonacci(i) for i in range(8)]\nprint(fib_sequence)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>5! (Factorial of 5): 120<br>First 8 Fibonacci numbers:<br>[0, 1, 1, 2, 3, 5, 8, 13]</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Base Case Bhoolna aur UnboundLocalError</div>\n            <p>Do sabse common galtiyan jo har developer karta hai:</p>\n            <p>1. <strong>UnboundLocalError Trap:</strong><br>\n            <code>count = 10</code><br>\n            <code>def increment():</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;count += 1  # UnboundLocalError: local variable 'count' referenced before assignment</code><br>\n            Kyunki aapne <code>count = count + 1</code> likha, Python ne <code>count</code> ko local maan liya lekin uski value define nahi thi. Isse theek karne ke liye function me pehli line <code>global count</code> likhein!</p>\n            <p>2. <strong>Recursion me Base Case bhool jana:</strong><br>\n            ❌ <code>def count_down(n): print(n); count_down(n - 1)  # Never stops!</code><br>\n            Isse interpreter 1000 calls ke baad crash ho jayega: <code>RecursionError: maximum recursion depth exceeded</code>.<br>\n            ✅ Hamesha pehle rukne ki shart (<code>if n &lt;= 0: return</code>) likhein!</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Recursion vs Iteration (Loops)</div>\n            <p><strong>Top Interview Question: \"Recursion aur Loops me se kab kaunsa chunna chahiye?\"</strong></p>\n            <ul>\n              <li><strong>Memory &amp; Performance:</strong> Loops (Iteration) memory me O(1) space lete hain aur C-level par super fast hote hain. Recursion me har call Call Stack me naya frame leti hai, isliye deep recursion me memory overhead hota hai.</li>\n              <li><strong>Tab Recursion kyun use karein?</strong> Linear data (jaise list par iterate karna) ke liye loops best hain. Lekin <em>Hierarchical ya Tree structures</em> ke liye Recursion 100 guna aasan hota hai:\n                <ul>\n                  <li>Computer ke folders aur sub-folders ke andar files scan karna.</li>\n                  <li>HTML Web page ka DOM tree parse karna.</li>\n                  <li>JSON nested structures ya Binary Search Trees traverse karna.</li>\n                </ul>\n              </li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Python me variable lookup ka sahi order (LEGB rule) kya hai?",
        "options": [
          "Local -> Global -> Enclosing -> Built-in",
          "Local -> Enclosing -> Global -> Built-in",
          "Global -> Local -> Built-in -> Enclosing",
          "Built-in -> Global -> Enclosing -> Local"
        ],
        "correct": 1,
        "explanation": "Python pehle Local, phir Enclosing, phir Global, aur aakhri me Built-in scope check karta hai (LEGB)."
      },
      {
        "q": "Function ke andar se bahar bane global variable ko modify karne ke liye kaunsa keyword use hota hai?",
        "options": [
          "nonlocal",
          "global",
          "extern",
          "static"
        ],
        "correct": 1,
        "explanation": "global keyword interpreter ko batata hai ki function ke andar ka variable global scope se belong karta hai."
      },
      {
        "q": "Recursive function me Base Case ka hona kyun compulsory hai?",
        "options": [
          "Code fast chalane ke liye",
          "Infinite recursion aur call stack overflow crash rokne ke liye",
          "Output print karne ke liye",
          "Variables declare karne ke liye"
        ],
        "correct": 1,
        "explanation": "Base case function ko rukne ka signal deta hai; bina iske function tab tak call hota rahega jab tak RecursionError na aa jaye."
      },
      {
        "q": "Python interpreter me default recursion depth limit lagbhag kitni hoti hai?",
        "options": [
          "100",
          "500",
          "1000",
          "Unlimited"
        ],
        "correct": 2,
        "explanation": "Python me sys.getrecursionlimit() by default lagbhag 1000 calls ki safety limit set karta hai."
      },
      {
        "q": "Nested function me outer enclosing function ke variable ko modify karne ke liye kaunsa keyword use hota hai?",
        "options": [
          "global",
          "nonlocal",
          "super",
          "parent"
        ],
        "correct": 1,
        "explanation": "Enclosing (outer nested) function ke variables ko modify karne ke liye Python 3 me nonlocal keyword use hota hai."
      }
    ]
  },
  {
    "day": 24,
    "week": 4,
    "phase": "Intermediate",
    "topic": "try/except",
    "concept": "Errors kya hote",
    "demo": "try/except demo",
    "mistake": "Bare except mat likho",
    "quiz": "Quiz: zero division handle",
    "interview": "Real life: safe input",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>🛡️ Day 24: Exception Handling - try/except &amp; Defensive Coding</h2>\n          <p>Imagine kijiye aapne ek amazing Banking App ya E-Commerce website banayi. User ne \"Amount\" wale box me galti se <code>1000</code> ke badle <code>ek hazaar</code> likh diya. Agar aapne exception handling nahi ki hai, toh aapka poora server red error screen dikha kar turant crash ho jayega! Real-world software me galtiyan hona natural hai. Ek acche software engineer ki pehchan ye hoti hai ki uska software unexpected input aane par bhi crash nahi hota, balki gracefully sambhal leta hai.</p>\n\n          <h3>1. 💡 Concept: Errors vs Exceptions &amp; Defensive Architecture</h3>\n          <p>Real-life analogy: Car me airbags aur seatbelt kyun hoti hain? Ye sochkar nahi ki hum roz gaadi ladayenge, balki isliye ki <em>agar achanak samne koi gadbad ho jaye, toh gaadi me baithe log safe rahein</em>. Python me <code>try/except</code> wahi airbag aur seatbelt hai!</p>\n\n          <p><strong>Syntax Errors vs Runtime Exceptions me farak:</strong></p>\n          <ul>\n            <li><strong>Syntax Errors (Compile-time):</strong> Ye tab aate hain jab aapne Python ke grammar ke niyam tode hon (jaise colon <code>:</code> bhool jana ya spelling galat likhna). Ye program chalne se pehle hi code ko rok dete hain. Inhe <code>try/except</code> se pakda nahi ja sakta.</li>\n            <li><strong>Exceptions (Runtime):</strong> Code grammar-wise bilkul theek hai, lekin execution ke dauran achanak koi aisi ghatna ghat gayi jise computer process nahi kar sakta. Jaise kisi number ko zero se divide karna (<code>ZeroDivisionError</code>), missing dictionary key access karna (<code>KeyError</code>), ya letter ko number me convert karna (<code>ValueError</code>). Inhe hum <code>try/except</code> se 100% handle kar sakte hain!</li>\n          </ul>\n\n          <p><strong>Anatomy of try/except:</strong></p>\n          <pre><code>try:\n    # Wo risky kaam jisme error aane ka khatra hai\n    risky_code()\nexcept SpecificException as err:\n    # Airbag! Agar error aaya toh ye code chalega aur app crash nahi hoga\n    print(\"Safely handled:\", err)</code></pre>\n\n          <p><strong>Python Philosophy: EAFP vs LBYL</strong></p>\n          <p>Programming me do ideologies hoti hain:</p>\n          <ol>\n            <li><strong>LBYL (Look Before You Leap):</strong> Har step par 10 <code>if-else</code> laga kar check karo ki kya ye safe hai? E.g., <code>if b != 0: return a / b</code>.</li>\n            <li><strong>EAFP (Easier to Ask for Forgiveness than Permission):</strong> Python ka official favorite mantra! Sidhe <code>try</code> karo, aur agar koi exception aaye toh <code>except</code> me use gracefully sambhal lo. Ye fast hota hai aur race-conditions se bachata hai.</li>\n          </ol>\n\n          <h3>2. 💻 Live Demo: Safe Division &amp; Crash-Proof User Input Loop</h3>\n          <p>Pehle demo me dekhte hain multiple specific exceptions ko alag-alag handle karne ka standard industry practice:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>safe_calculator.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>def safe_divide(numerator, denominator):\n    try:\n        # Converting inputs to float (risky for invalid text)\n        num = float(numerator)\n        den = float(denominator)\n        \n        # Division (risky for zero)\n        result = num / den\n        return f\"Result: {num} / {den} = {result:.2f}\"\n        \n    except ZeroDivisionError:\n        return \"Error 400: Kisi bhi number ko Zero se divide nahi kiya ja sakta!\"\n        \n    except ValueError as val_err:\n        return f\"Invalid Input: Kripya valid number enter karein! (Details: {val_err})\"\n        \n    except TypeError:\n        return \"Type Mismatch: Arguments numbers ya numeric strings hone chahiye!\"\n\n# Test Cases:\nprint(\"Test 1 (Valid):     \", safe_divide(100, 4))\nprint(\"Test 2 (Zero Div):  \", safe_divide(50, 0))\nprint(\"Test 3 (Bad String):\", safe_divide(\"fifty\", 2))\nprint(\"Test 4 (None value):\", safe_divide(None, 5))</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Test 1 (Valid):      Result: 100.0 / 4.0 = 25.00<br>Test 2 (Zero Div):   Error 400: Kisi bhi number ko Zero se divide nahi kiya ja sakta!<br>Test 3 (Bad String): Invalid Input: Kripya valid number enter karein! (Details: could not convert string to float: 'fifty')<br>Test 4 (None value): Type Mismatch: Arguments numbers ya numeric strings hone chahiye!</div>\n          </div>\n\n          <p>Ab dekhte hain <strong>Crash-Proof Input Loop</strong>: Ek aisi utility jo user se valid age leti hai bina crash huye:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>crash_proof_input.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Simulating interactive user input sequence\nsimulated_user_inputs = [\"twenty\", \"25.5\", \"-5\", \"22\"]\ninput_index = 0\n\ndef get_valid_age():\n    global input_index\n    while True:\n        try:\n            raw = simulated_user_inputs[input_index]\n            input_index += 1\n            print(f\"User ne enter kiya: '{raw}'\")\n            \n            age = int(raw)\n            if age &lt;= 0 or age &gt; 120:\n                print(\"Age 1 se 120 ke beech honi chahiye! Dobara koshish karein.\")\n                continue\n                \n            print(f\"Success! Valid age registered: {age} saal.\")\n            break\n            \n        except ValueError:\n            print(\"Galti: Poora integer number enter karein (letters ya decimals nahi)!\")\n\nget_valid_age()</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>User ne enter kiya: 'twenty'<br>Galti: Poora integer number enter karein (letters ya decimals nahi)!<br>User ne enter kiya: '25.5'<br>Galti: Poora integer number enter karein (letters ya decimals nahi)!<br>User ne enter kiya: '-5'<br>Age 1 se 120 ke beech honi chahiye! Dobara koshish karein.<br>User ne enter kiya: '22'<br>Success! Valid age registered: 22 saal.</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Bare 'except:' ya Error Masking ka Paap!</div>\n            <p>Production engineering ka sabse bada paap hai bina kisi exception type ke sirf <code>except:</code> likh dena ya error ko <code>pass</code> karke dabana!</p>\n            <p>❌ <strong>Dangerous Anti-Pattern (Don't ever do this!):</strong><br>\n            <code>try:</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;process_payment()</code><br>\n            <code>except:</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;pass  # Swallows KeyboardInterrupt, SystemExit and bugs!</code></p>\n            <p><strong>Ye itna dangerous kyun hai?</strong><br>\n            1. Agar aap terminal me <code>Ctrl + C</code> dabayenge toh program rukega hi nahi kyunki <code>KeyboardInterrupt</code> bhi ek exception hai jise ye bare <code>except</code> nigal lega!<br>\n            2. Agar aapke code me koi chhota typo ya spelling mistake ho (jaise <code>prnt(x)</code>), toh interpreter use chupchap daba dega aur aap ghanto sir pakad kar baithenge ki code chal kyun nahi raha!</p>\n            <p>✅ <strong>Correct Best Practice:</strong><br>\n            Hamesha specific exception pakdein: <code>except (ValueError, KeyError) as e:</code> aur use log karein.</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Production Error Logging &amp; EAFP</div>\n            <p><strong>Top Interview Question: \"Python me EAFP vs LBYL me se kaunsa approach better maana jata hai aur kyun?\"</strong></p>\n            <ul>\n              <li><strong>LBYL Flaw (Race Conditions):</strong> Maan lijiye aap file open karne se pehle check karte hain <code>if os.path.exists(\"data.txt\"): open(\"data.txt\")</code>. Multi-threaded ya server environment me, check karne aur open karne ke beech ke 1 millisecond me kisi doosre process ne file delete kar di toh program tab bhi crash ho jayega (TOCTOU - Time Of Check To Time Of Use bug)!</li>\n              <li><strong>EAFP Advantage:</strong> Python me sidhe <code>try: with open(\"data.txt\")... except FileNotFoundError:...</code> likhte hain. Ye atomic hota hai aur performance me fast hota hai kyunki positive case me koi extra if-check execute nahi hota.</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "SyntaxError aur Runtime Exception me sabse bada farak kya hai?",
        "options": [
          "SyntaxError try/except se handle ho jata hai",
          "SyntaxError code chalne se pehle parsing ke time aata hai jabki Exception execution ke dauran aata hai",
          "Exceptions Python me exist nahi karte",
          "Dono 100% same hote hain"
        ],
        "correct": 1,
        "explanation": "SyntaxError Python ke grammar rules violate hone par parsing time par aata hai, jabki runtime exceptions program run hote waqt aate hain."
      },
      {
        "q": "int('abc') likhne par Python interpreter kaunsa exception raise karta hai?",
        "options": [
          "TypeError",
          "ValueError",
          "IndexError",
          "ZeroDivisionError"
        ],
        "correct": 1,
        "explanation": "Jab kisi function ko sahi type ka argument mile lekin invalid value ho (string jisme digits na hon), toh ValueError raise hota hai."
      },
      {
        "q": "Production code me bare 'except:' likhna buri aadat kyun maana jata hai?",
        "options": [
          "Ye memory crash kar deta hai",
          "Ye KeyboardInterrupt aur programming typos ko bhi silently nigal leta hai jisse debugging namumkin ho jaati hai",
          "Python 3 me bare except illegal hai",
          "Isse loop slow ho jata hai"
        ],
        "correct": 1,
        "explanation": "Bare except saare exceptions ko mask kar deta hai, jisme Ctrl+C (KeyboardInterrupt) aur NameError jaise critical bugs bhi chup jaate hain."
      },
      {
        "q": "Python me EAFP ka full form kya hai?",
        "options": [
          "Errors Are Fatal Problems",
          "Easier to Ask for Forgiveness than Permission",
          "Execute All Functions Properly",
          "Exception And Finally Protocol"
        ],
        "correct": 1,
        "explanation": "EAFP stands for 'Easier to Ask for Forgiveness than Permission' jo Python ka core architectural principle hai."
      },
      {
        "q": "Ek single except block me multiple exceptions ko catch karne ka sahi syntax kya hai?",
        "options": [
          "except ValueError, TypeError:",
          "except (ValueError, TypeError) as err:",
          "except ValueError and TypeError:",
          "except [ValueError, TypeError]:"
        ],
        "correct": 1,
        "explanation": "Multiple exceptions ko catch karne ke liye unhe parentheses me tuple ke roop me likha jata hai: except (ValueError, TypeError) as err:."
      }
    ]
  },
  {
    "day": 25,
    "week": 4,
    "phase": "Intermediate",
    "topic": "finally, raise, custom errors",
    "concept": "else aur finally",
    "demo": "raise se apna error",
    "mistake": "Error chhupana galat",
    "quiz": "Quiz: age validator",
    "interview": "Interview: custom exception",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>🚨 Day 25: Advanced Exceptions - else, finally, raise &amp; Custom Errors</h2>\n          <p>Pichle din humne dekha ki errors aane par app ko crash hone se kaise bachayein. Lekin professional backend engineering me sirf crash bachana kaafi nahi hota. Do bohot zaroori baatein aur hoti hain: 1) System resources (jaise Database connection ya open files) ko hamesha safely band karna chahe crash aaye ya na aaye, aur 2) Apne business rules todne par jaanbujhkar naye errors <strong>raise</strong> karna. Aaj hum Exception handling ke complete cycle ko master karenge.</p>\n\n          <h3>1. 💡 Concept: Complete try-except-else-finally Block &amp; Custom Exceptions</h3>\n          <p>Real-life analogy: Imagine kijiye aap Bank ke locker room me gaye (<code>try</code>). Aapne safe khol kar paise nikale. Agar achanak siren baj jaye ya koi issue ho jaye (<code>except</code>), security guard aayega. Agar sab kuch smoothly bina kisi issue ke ho gaya (<code>else</code>), aap receipt par sign karenge. Lekin chahe siren baje ya na baje, locker ka main door lock karke chaabi counter par return karna (<code>finally</code>) <strong>100% compulsory</strong> hai! Chahe kuch bhi ho jaye, wo step skip nahi ho sakta.</p>\n\n          <p><strong>The Complete 4-Part Exception Quartet:</strong></p>\n          <ul>\n            <li><code>try</code>: Risky code jisme error aane ki sambhavna ho.</li>\n            <li><code>except</code>: Sirf tab run hota hai jab <code>try</code> me koi specific error raise ho.</li>\n            <li><code>else</code>: Sirf tab run hota hai jab <code>try</code> me <strong>KOI error NAHI</strong> aaya! Risky code aur uske baad ke normal flow ko alag rakhne ke liye ye best practice hai.</li>\n            <li><code>finally</code>: <strong>Guaranteed Execution!</strong> Chahe koi error aaye ya na aaye, chahe function beech me hi <code>return</code> kar de, <code>finally</code> block hamesha execute hota hai. Iska use Database connections, Network sockets aur File handles close karne ke liye hota hai.</li>\n          </ul>\n\n          <p><strong>Errors ko Raise karna (The 'raise' Keyword):</strong></p>\n          <p>Python sirf technical errors (jaise divide by zero) samajhta hai. Agar user ne bank account me negative amount <code>-5000</code> transfer karne ki koshish ki, toh Python ke liye wo ek valid number hai. Lekin business logic ke hisab se ye illegal hai! Yahan hum khud error trigger karte hain: <code>raise ValueError(\"Amount cannot be negative!\")</code>.</p>\n\n          <p><strong>Custom Exceptions (Apna khud ka Error banana):</strong></p>\n          <p>Badi software companies me code ko readable aur standard rakhne ke liye custom domain-specific exceptions banaye jaate hain. Custom exception banana behad asaan hai — bas Python ki base <code>Exception</code> class ko inherit kar lijiye:</p>\n          <pre><code>class InsufficientFundsError(Exception):\n    \"\"\"Raised when account balance is less than withdrawal amount.\"\"\"\n    pass</code></pre>\n\n          <h3>2. 💻 Live Demo: ATM Banking System &amp; Custom Age Validator</h3>\n          <p>Pehle demo me dekhte hain <code>try-except-else-finally</code> ke sabhi chaaron hisso ka exact execution flow:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>try_else_finally_flow.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>def process_transaction(amount, balance):\n    print(f\"\n--- Initiating Transaction of Rs.{amount} (Balance: Rs.{balance}) ---\")\n    try:\n        if amount &lt;= 0:\n            raise ValueError(\"Transaction amount must be strictly greater than 0!\")\n        if amount &gt; balance:\n            raise RuntimeError(\"Transaction declined: Insufficient account funds!\")\n        new_balance = balance - amount\n\n    except (ValueError, RuntimeError) as err:\n        print(f\"[EXCEPT BLOCK] Failed: {err}\")\n        return False\n\n    else:\n        # Runs ONLY when no exception occurred in try block\n        print(f\"[ELSE BLOCK] Success! New balance updated to Rs.{new_balance}\")\n        return True\n\n    finally:\n        # Runs ALWAYS (Cleanup, Audit logging, Session closing)\n        print(\"[FINALLY BLOCK] Audit log: Transaction attempt recorded. DB connection closed.\")\n\n# Scenario A: Successful Transaction\nprocess_transaction(400, 1000)\n\n# Scenario B: Failed Transaction (Insufficient funds)\nprocess_transaction(1500, 1000)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>--- Initiating Transaction of Rs.400 (Balance: Rs.1000) ---<br>[ELSE BLOCK] Success! New balance updated to Rs.600<br>[FINALLY BLOCK] Audit log: Transaction attempt recorded. DB connection closed.<br><br>--- Initiating Transaction of Rs.1500 (Balance: Rs.1000) ---<br>[EXCEPT BLOCK] Failed: Transaction declined: Insufficient account funds!<br>[FINALLY BLOCK] Audit log: Transaction attempt recorded. DB connection closed.</div>\n          </div>\n\n          <p>Ab dekhte hain enterprise-grade <strong>Custom Exception Classes</strong> ka live implementation ek Smart Banking Vault me:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>custom_exceptions_bank.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># 1. Defining Custom Domain Exceptions\nclass BankingAppException(Exception):\n    # Base exception for all banking errors\n    pass\n\nclass InsufficientFundsError(BankingAppException):\n    # Raised when withdrawal exceeds available balance\n    def __init__(self, required, available):\n        self.required = required\n        self.available = available\n        super().__init__(f\"Need Rs.{required}, but available balance is only Rs.{available}!\")\n\nclass AccountFrozenError(BankingAppException):\n    # Raised when account is locked by admin\n    pass\n\n# 2. Banking Service Class\nclass BankAccount:\n    def __init__(self, owner, balance, is_frozen=False):\n        self.owner = owner\n        self.balance = balance\n        self.is_frozen = is_frozen\n        \n    def withdraw(self, amount):\n        if self.is_frozen:\n            raise AccountFrozenError(f\"Account of '{self.owner}' is currently frozen by compliance!\")\n        if amount &gt; self.balance:\n            raise InsufficientFundsError(amount, self.balance)\n            \n        self.balance -= amount\n        print(f\"Withdrawal of Rs.{amount} approved! Remaining: Rs.{self.balance}\")\n\n# 3. Testing Custom Exceptions\nmy_acc = BankAccount(\"Mohd Kaif\", 5000, is_frozen=False)\n\ntry:\n    my_acc.withdraw(8000)  # Exceeds balance!\nexcept InsufficientFundsError as e:\n    print(\"Caught Custom Exception:\", e)\n    print(f\"Shortage amount: Rs.{e.required - e.available}\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Caught Custom Exception: Need Rs.8000, but available balance is only Rs.5000!<br>Shortage amount: Rs.3000</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: BaseException Inherit Karna</div>\n            <p>Custom exception banate waqt beginners ki sabse aam galti hoti hai ki wo <code>BaseException</code> class ko inherit kar lete hain:</p>\n            <p>❌ <strong>Wrong Code:</strong><br>\n            <code>class MyCustomError(BaseException): pass  # DON'T DO THIS!</code></p>\n            <p><strong>Kyun galat hai?</strong><br>\n            Python me <code>BaseException</code> ek top-level root class hai jisme <code>SystemExit</code> aur <code>KeyboardInterrupt</code> aate hain. Standard application level code me hamesha <code>Exception</code> class se inherit karna chahiye. Agar aap <code>BaseException</code> inherit karenge toh standard <code>except Exception:</code> blocks aapke custom error ko catch nahi kar payenge!</p>\n            <p>✅ <strong>Correct Code:</strong><br>\n            <code>class MyCustomError(Exception): pass  # Safe &amp; standard</code></p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Finally Block with Return Statement</div>\n            <p><strong>Toughest Interview Question: \"Agar try block me 'return' statement ho, toh kya finally block chalega ya skip ho jayega?\"</strong></p>\n            <p>Answer: <strong>FINALLY HAMESHA CHALEGA!</strong><br>\n            Python interpreter ka contract hai ki jab tak computer switch off na ho ya <code>os._exit()</code> call na ho, <code>finally</code> block execution se pehle run hoga hi hoga. Chahe <code>try</code> me <code>return 100</code> likha ho, Python pehle <code>finally</code> ke saare statements execute karega aur uske baad caller ko value return karega.</p>\n            <p><strong>Tricky Trap:</strong> Agar aapne galti se <code>finally</code> block ke andar bhi ek doosra <code>return 200</code> likh diya, toh <code>finally</code> ka return purane saare returns ko overwrite kar dega! Isliye best practice hai ki <code>finally</code> ke andar kabhi <code>return</code> statement na likhein, sirf cleanup code likhein.</p>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "try-except-else-finally me 'else' block kab execute hota hai?",
        "options": [
          "Hamesha execute hota hai",
          "Sirf tab execute hota hai jab try block me koi exception NAHI aaya ho",
          "Sirf tab jab except block fail ho jaye",
          "Sirf jab finally block execute na ho"
        ],
        "correct": 1,
        "explanation": "else block tabhi chalta hai jab try block bina kisi exception ke safaltapoorvak complete ho jata hai."
      },
      {
        "q": "try block me 'return 10' hone par kya finally block execute hoga?",
        "options": [
          "Nahi, return hote hi function turant exit ho jata hai",
          "Haan, finally return se pehle hamesha execute hota hai",
          "Sirf tab jab return None ho",
          "SyntaxError aayega"
        ],
        "correct": 1,
        "explanation": "Python me finally block ka execution guaranteed hota hai, chahe try block ke andar return statement hi kyun na ho."
      },
      {
        "q": "Apne program me manually ek naya exception trigger karne ke liye kaunsa keyword use hota hai?",
        "options": [
          "throw",
          "trigger",
          "raise",
          "catch"
        ],
        "correct": 2,
        "explanation": "Python me exceptions ko manually raise karne ke liye 'raise' keyword use hota hai (doosri languages jaise Java/JS me 'throw' hota hai)."
      },
      {
        "q": "Custom Exception class banate waqt use standard roop se kis class se inherit karna chahiye?",
        "options": [
          "BaseException",
          "Exception",
          "object",
          "StandardError"
        ],
        "correct": 1,
        "explanation": "User-defined custom exceptions ko hamesha standard Exception class se inherit karna chahiye."
      },
      {
        "q": "finally block ka primary real-world use case kya hota hai?",
        "options": [
          "Calculations perform karna",
          "Database connections, files aur network sockets jaise resources ko cleanup/close karna",
          "Output format karna",
          "Variables initialize karna"
        ],
        "correct": 1,
        "explanation": "finally block ka mukhya purpose resource cleanup hota hai taaki koi file ya DB connection leak na ho."
      }
    ]
  },
  {
    "day": 26,
    "week": 4,
    "phase": "Intermediate",
    "topic": "File handling",
    "concept": "open, read, write",
    "demo": "Notes app file mein save",
    "mistake": "Mode w file mita deta",
    "quiz": "Quiz: lines count karo",
    "interview": "Real life: logs likhna",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>📁 Day 26: File Handling - Persistent Storage, Reading &amp; Writing Files</h2>\n          <p>Ab tak hamare dwara banaye gaye sabhi programs me ek bohot badi limitation thi: Jaise hi program ka execution khatam hota tha ya terminal band hota tha, saara data (variables, lists, dictionaries) RAM se hamesha ke liye gayab ho jata tha! Asli duniya ke software me hume data ko Hard Disk/SSD par permanently save karna padta hai taaki kal computer restart hone par bhi data safe rahe. Yahan entry hoti hai <strong>File Handling</strong> ki.</p>\n\n          <h3>1. 💡 Concept: Files, Streams &amp; File Modes ('r', 'w', 'a')</h3>\n          <p>Real-life analogy: File handling ko ek physical diary ki tarah sochiye. Agar aap diary padhna chahte hain, toh aap use open karte hain (Read mode). Agar aap naye panno par likhna chahte hain, toh aap diary ke aakhri page par jakar naye notes likhte hain (Append mode). Lekin agar aap ek aisi ink use karein jo pichle saare panno ko mita kar safed kar de aur pehle panne se shuru kare, toh wo hai Write mode!</p>\n\n          <p>Python me files ke sath kaam karne ke liye built-in <code>open()</code> function use hota hai: <code>file_object = open(filename, mode, encoding)</code>.</p>\n\n          <p><strong>Core File Modes in Python:</strong></p>\n          <ul>\n            <li><code>'r'</code> (Read Mode - Default): File ko sirf padhne ke liye open karta hai. Agar file hard disk par exist nahi karti, toh Python crash ho jayega aur <code>FileNotFoundError</code> raise karega.</li>\n            <li><code>'w'</code> (Write Mode - Destructive): File me naya content likhne ke liye. Agar file pehle se exist karti hai, toh ye <strong>PURANA SAARA DATA MITA (OVERWRITE)</strong> kar deta hai! Agar file nahi hai, toh nayi file create kar deta hai.</li>\n            <li><code>'a'</code> (Append Mode - Safe Writing): File ke end me naya text add karta hai. Purana data bilkul safe rehta hai. Agar file nahi hai toh nayi create kar deta hai.</li>\n            <li><code>'r+'</code> (Read &amp; Write): File ko simultaneously read aur update karne ke liye.</li>\n            <li><code>'b'</code> (Binary Mode): Text ke alawa images, audio, video ya PDF files handle karne ke liye (e.g., <code>'rb'</code> ya <code>'wb'</code>).</li>\n          </ul>\n\n          <p><strong>File Reading ke 3 Tareeqe:</strong></p>\n          <ol>\n            <li><code>file.read()</code>: Poori file ko ek single string me memory me load karta hai. Chhoti files ke liye badhiya hai, lekin badi files me RAM full kar sakta hai.</li>\n            <li><code>file.readline()</code>: Ek waqt me sirf ek single line read karta hai (pointer agli line par move ho jata hai).</li>\n            <li><code>for line in file:</code>: <strong>Industry Standard!</strong> File par direct loop chalana. Ye memory-efficient streaming karta hai jisme ek waqt me sirf ek line RAM me aati hai. Chahe 50 GB ki file ho, ye kabhi crash nahi hota!</li>\n          </ol>\n\n          <p><strong>File Close karne ka Niyam:</strong> Hamesha file ke kaam ke baad <code>file.close()</code> call karna compulsory hota hai taaki operating system file lock release kare aur memory buffer hard drive me flush ho sake.</p>\n\n          <h3>2. 💻 Live Demo: Notes App &amp; Server Log Analyzer</h3>\n          <p>Pehle demo me dekhte hain ek Simple Notes App: File me pehli baar note likhna, naye thoughts append karna aur phir saved notes read karna:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>notes_app.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>filename = \"my_quick_notes.txt\"\n\n# 1. Writing to a file (Mode 'w')\nfile_write = open(filename, \"w\", encoding=\"utf-8\")\nfile_write.write(\"=== My Personal Study Log ===\\n\")\nfile_write.write(\"Day 26: Started learning Python File Handling!\\n\")\nfile_write.close()\nprint(\"Initial notes written successfully.\")\n\n# 2. Appending new entries (Mode 'a' - does not delete old data)\nfile_append = open(filename, \"a\", encoding=\"utf-8\")\nfile_append.write(\"Update: File modes 'r', 'w', 'a' are super clear now.\\n\")\nfile_append.write(\"Next Goal: Master CSV and with statement tomorrow.\\n\")\nfile_append.close()\nprint(\"Appended 2 new entries.\")\n\n# 3. Reading the file back (Mode 'r')\nfile_read = open(filename, \"r\", encoding=\"utf-8\")\ncontent = file_read.read()\nfile_read.close()\n\nprint(\"\\n--- File Content from Disk ---\")\nprint(content)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Initial notes written successfully.<br>Appended 2 new entries.<br><br>--- File Content from Disk ---<br>=== My Personal Study Log ===<br>Day 26: Started learning Python File Handling!<br>Update: File modes 'r', 'w', 'a' are super clear now.<br>Next Goal: Master CSV and with statement tomorrow.</div>\n          </div>\n\n          <p>Ab dekhte hain practical backend task: Ek server log file ko line-by-line read karke error counts aur statistics analyze karna:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>log_analyzer.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Creating a sample server log file\nlog_filename = \"server_activity.log\"\nsample_logs = (\n    \"2026-11-01 10:00:01 INFO User kaif logged in\\n\"\n    \"2026-11-01 10:02:15 ERROR Database connection timeout\\n\"\n    \"2026-11-01 10:05:00 INFO Payment processed Rs.1500\\n\"\n    \"2026-11-01 10:07:44 ERROR 404 Endpoint /api/v2/orders not found\\n\"\n    \"2026-11-01 10:10:12 WARNING High memory usage detected 85%\\n\"\n    \"2026-11-01 10:12:00 ERROR 500 Internal server crash on checkout\\n\"\n)\n\nwith open(log_filename, \"w\", encoding=\"utf-8\") as f:\n    f.write(sample_logs)\n\n# Analyzing log line-by-line (Streaming approach)\ntotal_lines = 0\nerror_count = 0\nerror_messages = []\n\nf = open(log_filename, \"r\", encoding=\"utf-8\")\nfor line in f:\n    total_lines += 1\n    if \"ERROR\" in line:\n        error_count += 1\n        error_messages.append(line.strip())\nf.close()\n\nprint(f\"--- Log Analysis Summary ---\")\nprint(f\"Total log lines scanned: {total_lines}\")\nprint(f\"Total ERROR alerts found: {error_count}\")\nprint(\"\\nCaptured Errors:\")\nfor err in error_messages:\n    print(f\"&bull; {err}\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>--- Log Analysis Summary ---<br>Total log lines scanned: 6<br>Total ERROR alerts found: 3<br><br>Captured Errors:<br>&bull; 2026-11-01 10:02:15 ERROR Database connection timeout<br>&bull; 2026-11-01 10:07:44 ERROR 404 Endpoint /api/v2/orders not found<br>&bull; 2026-11-01 10:12:00 ERROR 500 Internal server crash on checkout</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Mode 'w' File Mita Deta Hai!</div>\n            <p>File handling ka sabse bada disaster: Agar kisi file me pehle se 10,000 users ka data save hai, aur aapne naya user add karne ke liye galti se mode <code>'w'</code> use kar liya:</p>\n            <p>❌ <strong>Fatal Mistake:</strong><br>\n            <code>f = open(\"customers.txt\", \"w\")  # Instant Disaster! Purana sab kuch delete ho gaya!</code><br>\n            <code>f.write(\"New User: Aman\")</code><br>\n            Ab file me sirf Aman bachega, baaki 10,000 users hamesha ke liye wipe out ho gaye!</p>\n            <p>✅ <strong>Safe Practice:</strong><br>\n            Jab bhi naya data add karna ho, hamesha mode <code>'a'</code> (Append) use karein:<br>\n            <code>f = open(\"customers.txt\", \"a\")  # Safe! Puraani history intact rahegi.</code></p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Huge File Streaming (20 GB File Problem)</div>\n            <p><strong>Top Interview Question: \"Agar aapke server par 20 GB ki file ho aur server me sirf 4 GB RAM ho, toh aap use Python me bina crash kiye kaise read karenge?\"</strong></p>\n            <ul>\n              <li><strong>Wrong Answer:</strong> <code>data = f.read()</code> ya <code>lines = f.readlines()</code>. Ye dono poori 20 GB file ko ek sath memory me uthane ki koshish karenge jisse turant <code>MemoryError</code> aayega aur server crash ho jayega!</li>\n              <li><strong>Right Answer:</strong> Direct line-by-line streaming:\n                <pre><code>with open(\"large_file.log\", \"r\") as f:\n    for line in f:\n        process(line)</code></pre>\n                Python ka file object ek <em>Generator / Iterator</em> implement karta hai jo OS buffer se ek waqt me sirf ek line chunk read karta hai aur pichli line ko garbage collect kar deta hai. Isse RAM usage 10-20 MB se upar nahi jata!\n              </li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Pehle se bani hui file me bina purana data delete kiye naya text jodne ke liye kaunsa mode use hota hai?",
        "options": [
          "'r'",
          "'w'",
          "'a' (Append)",
          "'r+'"
        ],
        "correct": 2,
        "explanation": "'a' (Append) mode file ke end me pointer set karta hai aur purana data retain karte hue naya content jodta hai."
      },
      {
        "q": "open('missing_file.txt', 'r') chalane par agar file exist na karti ho toh kya hoga?",
        "options": [
          "Nayi khali file ban jayegi",
          "None return hoga",
          "FileNotFoundError raise hoga",
          "Program hang ho jayega"
        ],
        "correct": 2,
        "explanation": "Read mode ('r') me agar file exist nahi karti toh Python FileNotFoundError raise karta hai."
      },
      {
        "q": "open('existing_data.txt', 'w') execute karte hi file ke purane contents ka kya hota hai?",
        "options": [
          "Purane contents safe rehte hain",
          "Purana data turant delete (truncate to 0 bytes) ho jata hai",
          "Data reverse ho jata hai",
          "Error throw hota hai"
        ],
        "correct": 1,
        "explanation": "Write mode ('w') file open hote hi purana saara content truncate (mita) kar deta hai."
      },
      {
        "q": "Badi files (e.g. 5 GB) ko memory-efficient tareeqe se read karne ka best tareeqa kaunsa hai?",
        "options": [
          "f.read() call karna",
          "f.readlines() se list banana",
          "for line in f: loop chalana (Streaming)",
          "File ko string me typecast karna"
        ],
        "correct": 2,
        "explanation": "File object par direct loop chalana line-by-line generator streaming karta hai jisse RAM overflow nahi hoti."
      },
      {
        "q": "File me f.write('Hello') likhne par kya newline (\\n) automatically add hota hai?",
        "options": [
          "Haan, print() ki tarah newline lagta hai",
          "Nahi, f.write me manually '\\n' lagana padta hai",
          "Sirf Windows par lagta hai",
          "Sirf Linux par lagta hai"
        ],
        "correct": 1,
        "explanation": "print() ke ulat, file.write() automatically newline add nahi karta; new line ke liye '\\n' explicitly likhna padta hai."
      }
    ]
  },
  {
    "day": 27,
    "week": 4,
    "phase": "Intermediate",
    "topic": "with statement aur CSV",
    "concept": "with open kyun",
    "demo": "CSV read/write demo",
    "mistake": "File close bhoolna",
    "quiz": "Quiz: CSV se total",
    "interview": "Interview: context manager",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>📊 Day 27: The 'with' Statement &amp; CSV Data Handling</h2>\n          <p>Pichle din humne dekha ki file open karne ke baad use <code>close()</code> karna mandatory hota hai. Lekin sochiye agar file open hui aur padhte waqt beech me achanak power cut ho gaya ya koi unexpected Exception aa gayi, toh <code>close()</code> line kabhi execute hi nahi hogi! Operating system ka file handle locked reh jayega. Is critical problem ko solve karne ke liye Python ne diya <strong>with</strong> statement. Saath hi aaj hum duniya ke sabse popular data format — <strong>CSV (Comma Separated Values)</strong> — ko master karenge.</p>\n\n          <h3>1. 💡 Concept: Context Managers &amp; Tabular CSV Magic</h3>\n          <p>Real-life analogy: Sochiyie ek automatic sensor wala glass door. Jaise hi aap enter karte hain, darwaza khulta hai. Aap andar kaam karte hain. Aur jaise hi aap bahar nikalte hain, darwaza automatically peeche lock ho jata hai — chahe aap jaldi me hon ya bhool gaye hon! Python ka <code>with</code> statement wahi automatic sensor door hai jise computer science me <strong>Context Manager</strong> kehte hain.</p>\n\n          <p><strong>'with open()' kyu Industry Standard hai?</strong></p>\n          <pre><code>with open(\"data.txt\", \"r\") as file:\n    content = file.read()\n# Jaise hi ye indented block khatam hoga, file automatically close ho jayegi!</code></pre>\n          <ul>\n            <li>Aapko manually <code>file.close()</code> likhne ki koi zaroorat nahi hoti.</li>\n            <li>Agar block ke andar koi crash ya error bhi aa jaye, tab bhi Python 100% guarantee deta hai ki file safely close ho chuki hogi!</li>\n          </ul>\n\n          <p><strong>CSV Files kya hain aur ye itni popular kyun hain?</strong></p>\n          <p>CSV ka matlab hai <em>Comma Separated Values</em>. Ye plain text files hoti hain jisme data rows aur columns (tabular) ke format me store hota hai, jahan har column value comma <code>,</code> se alag hoti hai. Microsoft Excel, Google Sheets, SQL databases aur Data Science pipelines (Pandas) ka default interchange format CSV hi hota hai.</p>\n\n          <p><strong>Python Built-in 'csv' Module ke 2 Powerful Approaches:</strong></p>\n          <ol>\n            <li><strong>List-based Approach (<code>csv.reader</code> / <code>csv.writer</code>):</strong> Har row ek Python List ke roop me treat hoti hai (e.g. <code>row[0]</code>, <code>row[1]</code>).</li>\n            <li><strong>Dictionary-based Approach (<code>csv.DictReader</code> / <code>csv.DictWriter</code>):</strong> <em>Industry Favorite!</em> Har row ek Python Dictionary ban jaati hai jahan CSV ke column headers keys ban jaate hain (e.g. <code>row['Salary']</code>, <code>row['Name']</code>). Isse index number yaad rakhne ka jhanjhat khatam ho jata hai!</li>\n          </ol>\n\n          <h3>2. 💻 Live Demo: Payroll CSV Generator &amp; Financial Summary</h3>\n          <p>Pehle demo me dekhte hain employee records ko CSV file me structure karke write karna using <code>csv.writer</code> aur <code>csv.DictWriter</code>:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>create_payroll_csv.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>import csv\n\ncsv_file = \"company_payroll.csv\"\n\n# Employee records data\nemployees = [\n    {\"EmpID\": \"E101\", \"Name\": \"Mohd Kaif\", \"Dept\": \"Engineering\", \"Salary\": 85000},\n    {\"EmpID\": \"E102\", \"Name\": \"Priya Sharma\", \"Dept\": \"Design\", \"Salary\": 62000},\n    {\"EmpID\": \"E103\", \"Name\": \"Aman Verma\", \"Dept\": \"Engineering\", \"Salary\": 78000},\n    {\"EmpID\": \"E104\", \"Name\": \"Sneha Patel\", \"Dept\": \"Marketing\", \"Salary\": 55000},\n    {\"EmpID\": \"E105\", \"Name\": \"Rohit Kumar\", \"Dept\": \"Engineering\", \"Salary\": 92000}\n]\n\nheaders = [\"EmpID\", \"Name\", \"Dept\", \"Salary\"]\n\n# Writing using csv.DictWriter with 'newline=\"\"'\nwith open(csv_file, mode=\"w\", newline=\"\", encoding=\"utf-8\") as f:\n    writer = csv.DictWriter(f, fieldnames=headers)\n    \n    # 1. Write the top header row\n    writer.writeheader()\n    \n    # 2. Write all employee rows\n    writer.writerows(employees)\n\nprint(f\"Successfully generated '{csv_file}' with {len(employees)} records!\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Successfully generated 'company_payroll.csv' with 5 records!</div>\n          </div>\n\n          <p>Ab dekhte hain <code>csv.DictReader</code> se CSV file ko read karke total payout, department expense aur top earner calculate karna:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>analyze_payroll_csv.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>import csv\n\ncsv_file = \"company_payroll.csv\"\n\ntotal_payroll = 0\nemployee_count = 0\nhighest_salary = 0\nhighest_earner = \"\"\n\nprint(f\"Reading &amp; Analyzing '{csv_file}'...\\n\")\n\nwith open(csv_file, mode=\"r\", encoding=\"utf-8\") as f:\n    reader = csv.DictReader(f)\n    \n    for row in reader:\n        employee_count += 1\n        name = row[\"Name\"]\n        dept = row[\"Dept\"]\n        salary = int(row[\"Salary\"])  # CSV values are strings by default!\n        \n        total_payroll += salary\n        \n        if salary &gt; highest_salary:\n            highest_salary = salary\n            highest_earner = name\n            \n        print(f\"[{row['EmpID']}] {name:14} | {dept:12} | Rs.{salary}\")\n\naverage_salary = total_payroll / employee_count\n\nprint(\"\\n--- Financial Payroll Summary ---\")\nprint(f\"Total Employees:     {employee_count}\")\nprint(f\"Total Monthly Payout: Rs.{total_payroll}\")\nprint(f\"Average Salary:       Rs.{average_salary:.2f}\")\nprint(f\"Top Earner:          {highest_earner} (Rs.{highest_salary})\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Reading &amp; Analyzing 'company_payroll.csv'...<br><br>[E101] Mohd Kaif      | Engineering  | Rs.85000<br>[E102] Priya Sharma   | Design       | Rs.62000<br>[E103] Aman Verma     | Engineering  | Rs.78000<br>[E104] Sneha Patel    | Marketing    | Rs.55000<br>[E105] Rohit Kumar    | Engineering  | Rs.92000<br><br>--- Financial Payroll Summary ---<br>Total Employees:     5<br>Total Monthly Payout: Rs.372000<br>Average Salary:       Rs.74400.00<br>Top Earner:          Rohit Kumar (Rs.92000)</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Windows par newline='' bhoolna!</div>\n            <p>Windows OS par CSV files banate waqt har doosra developer is bug me phasta hai: Jab aap CSV open karte hain Excel me, toh har do rows ke beech ek ajeeb si blank empty line aa jaati hai!</p>\n            <p><strong>Aisa kyun hota hai?</strong><br>\n            Windows me newline <code>\\r\\n</code> hoti hai jabki Unix/Linux me sirf <code>\\n</code> hoti hai. Python ka CSV writer by default <code>\\r\\n</code> likhta hai, aur agar aapne <code>newline=''</code> nahi diya toh Python ka regular file write mode usme ek aur <code>\\r</code> jod deta hai!</p>\n            <p>❌ <strong>Wrong Code (Creates blank rows in Windows Excel):</strong><br>\n            <code>with open(\"data.csv\", \"w\") as f:</code></p>\n            <p>✅ <strong>Correct Code (Always specify newline=''):</strong><br>\n            <code>with open(\"data.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as f:</code></p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Context Manager Under The Hood</div>\n            <p><strong>Top Interview Question: \"with statement ke parde ke peeche Python kya karta hai?\"</strong></p>\n            <p>Answer: <code>with</code> statement Python ke <strong>Context Management Protocol</strong> par kaam karta hai jisme do special dunder methods hote hain:</p>\n            <ol>\n              <li><code>__enter__()</code>: Jab code <code>with</code> block me enter karta hai, ye method execute hota hai aur resource (jaise file handle) return karta hai.</li>\n              <li><code>__exit__(exc_type, exc_val, exc_tb)</code>: Jab code <code>with</code> block se bahar nikalta hai (chahe normally nikle ya kisi Exception crash ke sath), Python automatically <code>__exit__</code> call karke resource close kar deta hai!</li>\n            </ol>\n            <p><strong>Real-World Use Cases:</strong> Database transactions (Agar saari queries pass hui toh Commit, error aaya toh Rollback), Multithreading me thread lock acquire/release karna.</p>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Python me file handling ke liye 'with open(...)' use karne ka sabse bada fayda kya hai?",
        "options": [
          "File fast open hoti hai",
          "Block khatam hone par file automatically safely close ho jaati hai chahe error aaye ya na aaye",
          "File read-only ban jaati hai",
          "File encrypt ho jaati hai"
        ],
        "correct": 1,
        "explanation": "Context manager (with statement) guarantee karta hai ki block exit hote hi file automatically close ho jaye."
      },
      {
        "q": "Windows par CSV file write karte waqt open() function me 'newline=\"\"' pass karna kyun zaroori hai?",
        "options": [
          "Encoding theek karne ke liye",
          "Extra blank lines aane se rokne ke liye",
          "File compression ke liye",
          "Permissions set karne ke liye"
        ],
        "correct": 1,
        "explanation": "Windows par line-ending translation ki wajah se har row ke baad aane wali extra blank line ko newline='' parameter rokta hai."
      },
      {
        "q": "csv.DictReader CSV ki rows ko kis format me return karta hai?",
        "options": [
          "List of strings",
          "Tuples",
          "Python Dictionary jahan header keys hoti hain",
          "Raw JSON string"
        ],
        "correct": 2,
        "explanation": "csv.DictReader har row ko ek Dictionary me map karta hai jisme column headers keys ban jaate hain."
      },
      {
        "q": "Custom Context Manager banane ke liye class ke andar kaunse do methods define karne padte hain?",
        "options": [
          "__init__ aur __del__",
          "__open__ aur __close__",
          "__enter__ aur __exit__",
          "__start__ aur __stop__"
        ],
        "correct": 2,
        "explanation": "Python context manager protocol __enter__() aur __exit__() methods par based hota hai."
      },
      {
        "q": "CSV se read kiye gaye numbers ka default Python data type kya hota hai?",
        "options": [
          "int",
          "float",
          "str (String)",
          "number"
        ],
        "correct": 2,
        "explanation": "CSV text file hoti hai, isliye csv reader sabhi values ko str (String) format me read karta hai; calculations ke liye typecast karna padta hai."
      }
    ]
  },
  {
    "day": 28,
    "week": 4,
    "phase": "Intermediate",
    "topic": "Modules",
    "concept": "import kaise kaam karta",
    "demo": "random aur math demo",
    "mistake": "File ka naam random.py mat rakho",
    "quiz": "Quiz: dice roller",
    "interview": "Real life: OTP generator",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>📦 Day 28: Python Modules - Reusability, Standard Library &amp; OTP Generator</h2>\n          <p>Programming me ek mashhoor kahawat hai: <em>\"Don't reinvent the wheel\"</em> (Jo pahiya pehle se bana hua hai, use dobara aavishkar karne me apna samay barbaad mat karo). Python ki sabse badi taakat hai iski <strong>\"Batteries Included\"</strong> philosophy. Yaani jab aap Python install karte hain, toh hazaron super-smart mathematical, cryptographic aur system utilities aapko pehle se bani-banayi milti hain. Aaj hum Modules ki working, import mechanisms aur security practices ko explore karenge.</p>\n\n          <h3>1. 💡 Concept: Modules, Namespaces &amp; The Import Mechanism</h3>\n          <p>Real-life analogy: Imagine kijiye ek bada Tool-Kit box. Ek box me saare Screw-drivers hain, ek box me Wrench hain, ek me Measuring Tape hai. Jab aapko deewar par frame lagana ho, toh aap poora factory godown nahi uthate — aap sirf Measuring Tape aur Drill machine nikaalte hain. Python me har ek <code>.py</code> file ek <strong>Module</strong> hoti hai, aur use import karke hum uske functions reuse karte hain.</p>\n\n          <p><strong>Import karne ke 4 Alag Tareeqe:</strong></p>\n          <ol>\n            <li><code>import math</code>: Poore module ko uske namespace ke saath lata hai. Functions use karne ke liye <code>math.sqrt(25)</code> likhna padta hai. Ye sabse safe aur clean tareeqa hai.</li>\n            <li><code>from math import sqrt, pi</code>: Sirf specific functions lata hai. Ab aap bina <code>math.</code> prefix ke direct <code>sqrt(25)</code> call kar sakte hain.</li>\n            <li><code>import math as m</code>: Module ka chhota alias (nickname) bana deta hai: <code>m.sqrt(25)</code>.</li>\n            <li><code>from math import *</code>: <strong>DANGEROUS ANTI-PATTERN!</strong> Saare functions bina namespace ke global scope me dump kar deta hai. Isse variable name collisions hote hain aur pata nahi chalta kaunsa function kahan se aaya.</li>\n          </ol>\n\n          <p><strong>Python Standard Library ke 2 Superstar Modules:</strong></p>\n          <ul>\n            <li><strong>math:</strong> Advanced mathematical operations jaise <code>math.ceil()</code> (round up), <code>math.floor()</code> (round down), <code>math.sqrt()</code>, <code>math.pi</code>, <code>math.pow()</code>.</li>\n            <li><strong>random:</strong> Pseudo-random generation ke liye:\n              <ul>\n                <li><code>random.randint(a, b)</code>: 'a' aur 'b' ke beech ka random integer (inclusive).</li>\n                <li><code>random.choice(sequence)</code>: List ya string me se ek random element chunta hai.</li>\n                <li><code>random.shuffle(list)</code>: List ke elements ko random order me mix kar deta hai (in-place).</li>\n              </ul>\n            </li>\n          </ul>\n\n          <p><strong>The Magic of <code>if __name__ == '__main__':</code></strong></p>\n          <p>Har Python file ke paas ek hidden variable hota hai: <code>__name__</code>. Jab aap kisi file ko terminal se directly run karte hain, Python uske <code>__name__</code> ko <code>'__main__'</code> set karta hai. Lekin jab wahi file kisi doosri script me <code>import</code> hoti hai, toh <code>__name__</code> module ka actual filename ban jata hai! Is condition se hum testing code ko export hone se bacha sakte hain.</p>\n\n          <h3>2. 💻 Live Demo: Secure OTP Generator, Dice Roller &amp; Custom Module</h3>\n          <p>Pehle demo me dekhte hain <code>random</code> aur <code>math</code> modules se Dice Game, Lottery Winner Selector aur Discount calculations:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>game_and_math.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>import random\nimport math\n\n# 1. Dice Roller Simulation (1 to 6)\ndef roll_dice():\n    return random.randint(1, 6)\n\nprint(\"--- Virtual Dice Rolling Game ---\")\nplayer1_roll = roll_dice()\nplayer2_roll = roll_dice()\nprint(f\"Player 1 rolled: {player1_roll}\")\nprint(f\"Player 2 rolled: {player2_roll}\")\nif player1_roll &gt; player2_roll:\n    print(\"Player 1 WINS!\")\nelif player2_roll &gt; player1_roll:\n    print(\"Player 2 WINS!\")\nelse:\n    print(\"It's a TIE!\")\n\n# 2. Random Lucky Draw Winner\nparticipants = [\"Aman\", \"Priya\", \"Mohd Kaif\", \"Sneha\", \"Vikram\", \"Zoya\"]\nwinner = random.choice(participants)\nprint(f\"\\nLucky Draw Winner: {winner} 🎉\")\n\n# 3. Math Module Geometry &amp; Rounding\nradius = 7.5\ncircle_area = math.pi * math.pow(radius, 2)\nprint(f\"\\nCircle Area (Radius {radius}): {circle_area:.2f}\")\nprint(f\"Floor value: {math.floor(circle_area)} | Ceil value: {math.ceil(circle_area)}\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>--- Virtual Dice Rolling Game ---<br>Player 1 rolled: 5<br>Player 2 rolled: 3<br>Player 1 WINS!<br><br>Lucky Draw Winner: Mohd Kaif 🎉<br><br>Circle Area (Radius 7.5): 176.71<br>Floor value: 176 | Ceil value: 177</div>\n          </div>\n\n          <p>Ab dekhte hain production standard: <strong>6-Digit Secure OTP Generator</strong> aur <code>if __name__ == '__main__':</code> testing pattern:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>otp_service.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>import secrets\nimport string\n\ndef generate_secure_otp(length=6):\n    # Generates cryptographically strong numeric OTP\n    digits = string.digits  # '0123456789'\n    otp = ''.join(secrets.choice(digits) for _ in range(length))\n    return otp\n\ndef generate_temp_password(length=10):\n    # Generates secure random alphanumeric password\n    alphabet = string.ascii_letters + string.digits + \"@#$%\"\n    password = ''.join(secrets.choice(alphabet) for _ in range(length))\n    return password\n\n# This block executes ONLY when run directly, NOT when imported!\nif __name__ == \"__main__\":\n    print(\"=== Testing OTP &amp; Auth Service Locally ===\")\n    test_otp = generate_secure_otp(6)\n    print(\"Generated 6-Digit SMS OTP: \", test_otp)\n    print(\"Generated Temporary Password:\", generate_temp_password(12))</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>=== Testing OTP &amp; Auth Service Locally ===<br>Generated 6-Digit SMS OTP:  849201<br>Generated Temporary Password: k9#mP2$xR8wQ</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Apni file ka naam 'random.py' ya 'math.py' mat rakho!</div>\n            <p>Ye Python beginners ka sabse common heartbreak bug hai: Aap practice karne ke liye ek nayi file banate hain aur uska naam rakh dete hain <code>random.py</code> ya <code>math.py</code>.</p>\n            <p><strong>Aisa karne par kya hota hai?</strong><br>\n            Jab aap file me likhte hain <code>import random</code>, Python sabse pehle current directory me search karta hai. Python official library ke badle aapki hi file ko import kar leta hai (Circular Shadowing)! Aur agli hi line par error aayega:<br>\n            <code>AttributeError: module 'random' has no attribute 'randint'</code></p>\n            <p>✅ <strong>Golden Rule:</strong> Kabhi bhi apni scripts ka naam Python ki built-in libraries ke naam par mat rakhiye. Hamesha descriptive naam rakhein jaise <code>my_random_demo.py</code> ya <code>dice_simulator.py</code>.</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: OTP Generation me 'random' vs 'secrets'</div>\n            <p><strong>Top Security Interview Question: \"Banking apps me OTP ya password reset token banane ke liye random module kyu USE NAHI karna chahiye?\"</strong></p>\n            <ul>\n              <li><strong>The Vulnerability:</strong> Python ka <code>random</code> module ek algorithm use karta hai jise <em>Mersenne Twister</em> kehte hain. Ye <strong>Pseudo-Random</strong> hota hai. Agar koi hacker aapke system ke pichle 624 outputs dekh le, toh wo agle saare OTPs mathematically predict kar sakta hai!</li>\n              <li><strong>The Secure Solution:</strong> Security, Passwords aur Cryptography ke liye Python 3.6 me <strong>secrets</strong> module launch kiya gaya tha. Ye operating system ke hardware-level entropy source (CSPRNG - Cryptographically Secure Pseudo-Random Number Generator) se random bytes leta hai jise predict karna mathematically impossible hota hai.</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "random.randint(1, 6) function kaunse numbers return kar sakta hai?",
        "options": [
          "1 se 5 tak (6 exclude hota hai)",
          "1 se 6 tak dono inclusive (1 aur 6 dono aa sakte hain)",
          "0 se 6 tak",
          "Sirf float numbers"
        ],
        "correct": 1,
        "explanation": "random.randint(a, b) dono boundaries a aur b ko include karta hai, isliye 1 se 6 tak koi bhi integer aa sakta hai."
      },
      {
        "q": "Script me 'if __name__ == \"__main__\":' check karne ka mukhya maksad kya hai?",
        "options": [
          "Code fast chalane ke liye",
          "Ye ensure karna ki block sirf tab chale jab script directly execute hui ho, import hone par nahi",
          "Syntax errors check karna",
          "Global variables declare karna"
        ],
        "correct": 1,
        "explanation": "Ye construct ensure karta hai ki file import hone par testing code bina matlab execute na ho."
      },
      {
        "q": "Apni file ka naam 'math.py' rakhne par 'import math; print(math.sqrt(9))' kya error dega?",
        "options": [
          "Chal jayega koi issue nahi",
          "AttributeError: module 'math' has no attribute 'sqrt'",
          "SyntaxError",
          "MemoryError"
        ],
        "correct": 1,
        "explanation": "Python current directory ki math.py ko pehle import kar leta hai jisme sqrt exist nahi karta, jisse AttributeError aata hai."
      },
      {
        "q": "Production security aur OTP generate karne ke liye standard library ka kaunsa module recommend kiya jata hai?",
        "options": [
          "random",
          "math",
          "secrets",
          "os"
        ],
        "correct": 2,
        "explanation": "Cryptographically secure random numbers aur OTP generate karne ke liye 'secrets' module recommend kiya jata hai."
      },
      {
        "q": "'from module import *' likhna production code me buri aadat kyun maana jata hai?",
        "options": [
          "Ye memory leak karta hai",
          "Ye namespace pollute karta hai aur name conflicts paida karta hai",
          "Python 3 me ye banned hai",
          "Isse execution slow ho jati hai"
        ],
        "correct": 1,
        "explanation": "Wildcard import (*) se namespace clutter ho jata hai aur alag modules ke same-named functions aapas me takra jaate hain."
      }
    ]
  },
  {
    "day": 29,
    "week": 5,
    "phase": "Intermediate",
    "topic": "pip aur virtual env",
    "concept": "pip kya hai",
    "demo": "venv banao demo",
    "mistake": "Global install ki galti",
    "quiz": "Quiz: requirements.txt",
    "interview": "Interview: venv kyun",
    "readTime": "15 mins",
    "contentHtml": "\n          <h2>🌐 Day 29: Package Management - pip, PyPI &amp; Virtual Environments</h2>\n          <p>Python ki popularity ka sabse bada raaz sirf iska syntax nahi hai, balki iska vishal open-source ecosystem hai. Duniya bhar ke engineers ne AI, Data Science, Web Development aur Automation ke liye hazaron ready-made packages bana kar internet par dale huye hain. Aaj hum seekhenge ki <strong>pip</strong> se packages kaise install kiye jaate hain aur <strong>Virtual Environments</strong> ke zariye \"Dependency Hell\" se apne computer ko kaise bachaya jata hai.</p>\n\n          <h3>1. 💡 Concept: PyPI, pip &amp; The Virtual Environment Sandbox</h3>\n          <p>Real-life analogy: Imagine kijiye aapke computer me do alag projects hain. Project A ek purani banking app hai jo <em>Django 3.2</em> par chalti hai. Project B ek modern AI startup hai jo <em>Django 5.0</em> use karta hai. Agar aap apne poore computer me globally ek single Django install karenge, toh kya hoga? Jaise hi aap Django 5.0 install karenge, purani banking app toot kar crash ho jayegi! Yahi kehlata hai <strong>Dependency Hell</strong>.</p>\n\n          <p>Iska solution hai <strong>Virtual Environment (venv)</strong>: Har project ke liye ek alag, isolated kamra (sandbox)! Project A ke kamre me Django 3.2 rahega, aur Project B ke kamre me Django 5.0. Dono aapas me kabhi nahi takrayenge.</p>\n\n          <p><strong>PyPI aur pip kya hain?</strong></p>\n          <ul>\n            <li><strong>PyPI (Python Package Index):</strong> Python ka official open-source store (Play Store jaisa) jahan 5,00,000+ packages freely available hain (jaise <code>requests</code>, <code>numpy</code>, <code>pandas</code>, <code>fastapi</code>).</li>\n            <li><strong>pip (Package Installer for Python):</strong> Wo command-line tool jo PyPI se packages ko download, build aur install karta hai.</li>\n          </ul>\n\n          <p><strong>Essential pip Commands:</strong></p>\n          <pre><code>pip install requests       # Install a package\npip install requests==2.31.0 # Install exact version\npip list                   # List all installed packages\npip uninstall requests     # Remove a package\npip freeze &gt; requirements.txt # Export project dependencies</code></pre>\n\n          <p><strong>Complete 5-Step Virtual Environment Lifecycle:</strong></p>\n          <ol>\n            <li><strong>Create Environment:</strong> <code>python -m venv myenv</code> (Project folder me 'myenv' naam ka isolated folder ban jata hai).</li>\n            <li><strong>Activate Environment:</strong>\n              <ul>\n                <li>Windows (PowerShell/CMD): <code>myenv\\Scripts\\activate</code></li>\n                <li>Mac / Linux: <code>source myenv/bin/activate</code></li>\n                <li>(Terminal prompt ke aage <code>(myenv)</code> likha aa jayega, indicating active state).</li>\n              </ul>\n            </li>\n            <li><strong>Install Packages:</strong> <code>pip install requests</code> (Ye package sirf is isolated env me install hoga).</li>\n            <li><strong>Save Blueprint:</strong> <code>pip freeze &gt; requirements.txt</code></li>\n            <li><strong>Deactivate:</strong> <code>deactivate</code> (Wapas global system me aane ke liye).</li>\n          </ol>\n\n          <h3>2. 💻 Live Demo: Environment Setup, requirements.txt &amp; Third-Party API Request</h3>\n          <p>Pehle demo me dekhte hain terminal workflow simulation aur <code>requirements.txt</code> file ka structure:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>venv_workflow_simulation.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Simulating the generation of requirements.txt\n# In real terminal: pip freeze &gt; requirements.txt\n\ninstalled_packages = {\n    \"requests\": \"2.31.0\",\n    \"fastapi\": \"0.104.1\",\n    \"uvicorn\": \"0.24.0\",\n    \"pydantic\": \"2.5.1\"\n}\n\nrequirements_file = \"requirements.txt\"\n\nwith open(requirements_file, \"w\", encoding=\"utf-8\") as f:\n    for pkg, version in installed_packages.items():\n        f.write(f\"{pkg}=={version}\\n\")\n\nprint(f\"Generated '{requirements_file}' blueprint successfully!\")\n\n# Reading and verifying requirements.txt\nprint(\"\\n--- Project Dependencies Blueprint ---\")\nwith open(requirements_file, \"r\", encoding=\"utf-8\") as f:\n    print(f.read())\n\nprint(\"To replicate this environment on any server in the world:\")\nprint(\"Run command: &gt;&gt; pip install -r requirements.txt\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Generated 'requirements.txt' blueprint successfully!<br><br>--- Project Dependencies Blueprint ---<br>requests==2.31.0<br>fastapi==0.104.1<br>uvicorn==0.24.0<br>pydantic==2.5.1<br><br>To replicate this environment on any server in the world:<br>Run command: &gt;&gt; pip install -r requirements.txt</div>\n          </div>\n\n          <p>Ab dekhte hain Python ke sabse famous third-party package — <strong>requests</strong> — se live HTTP API call kaise karte hain:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>api_fetch_demo.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre># Note: 'requests' is installed via: pip install requests\nimport urllib.request\nimport json\n\n# Safe standard library simulation of fetching REST API data\napi_url = \"https://jsonplaceholder.typicode.com/todos/1\"\n\nprint(f\"Connecting to REST API: {api_url} ...\")\n\ntry:\n    with urllib.request.urlopen(api_url, timeout=5) as response:\n        status_code = response.getcode()\n        raw_data = response.read().decode(\"utf-8\")\n        data = json.loads(raw_data)\n        \n        print(f\"Response Status: {status_code} OK\")\n        print(\"\\nParsed API Response Data:\")\n        print(f\"&bull; User ID:   {data.get('userId')}\")\n        print(f\"&bull; Task ID:   {data.get('id')}\")\n        print(f\"&bull; Title:     {data.get('title')}\")\n        print(f\"&bull; Completed: {data.get('completed')}\")\n\nexcept Exception as err:\n    print(\"Network request failed (Check internet connection):\", err)</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Connecting to REST API: https://jsonplaceholder.typicode.com/todos/1 ...<br>Response Status: 200 OK<br><br>Parsed API Response Data:<br>&bull; User ID:   1<br>&bull; Task ID:   1<br>&bull; Title:     delectus aut autem<br>&bull; Completed: False</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: venv Folder ko GitHub par push karna!</div>\n            <p>Git aur GitHub me beginners ki sabse sharmnaak galti: Wo <code>myenv/</code> ya <code>venv/</code> folder ko bhi Git repository me commit karke GitHub par upload kar dete hain!</p>\n            <p><strong>Ye bohot badi galti kyu hai?</strong><br>\n            1. <code>venv</code> folder ke andar 10,000 se zyada alag-alag binaries aur C-compiled files hoti hain (100 MB se 500 MB size). Isse repository bekar me heavy ho jaati hai.<br>\n            2. Aapke Windows computer par compile hui C-binaries kisi doosre developer ke Mac ya Linux server par <strong>CHALENGI HI NAHI</strong>!</p>\n            <p>✅ <strong>The Professional Rule:</strong><br>\n            Hamesha apne <code>.gitignore</code> file me <code>venv/</code> aur <code>myenv/</code> likhein, aur GitHub par sirf aur sirf <strong>requirements.txt</strong> push karein. Doosra developer naye machine par jakar 5 second me <code>pip install -r requirements.txt</code> run kar lega!</p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Virtual Environments in Docker &amp; CI/CD</div>\n            <p><strong>Top Interview Question: \"Production deployments me pip freeze &gt; requirements.txt me exact versions (==) kyun pin kiye jaate hain?\"</strong></p>\n            <ul>\n              <li><strong>Reproducibility (Sabse critical concept):</strong> Agar aapne <code>requests&gt;=2.0</code> likha aur 6 mahine baad <code>requests 3.0</code> aa gayi jisme koi breaking change hua, toh Friday raat ko production deployment crash ho jayegi!</li>\n              <li><strong>Exact Pinning:</strong> <code>requests==2.31.0</code> likhne se guarantee hoti hai ki jo code developer ke laptop par chala tha, bilkul 100% wahi code production server aur Docker container me bina surprise ke chalega.</li>\n            </ul>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Python me naya virtual environment banane ke liye standard command kaunsi hai?",
        "options": [
          "pip create venv myenv",
          "python -m venv myenv",
          "pip install virtualenv",
          "python venv --start"
        ],
        "correct": 1,
        "explanation": "Python 3 me built-in venv module se environment banane ke liye 'python -m venv <env_name>' use hota hai."
      },
      {
        "q": "Windows PowerShell me virtual environment activate karne ke liye kaunsi script run ki jaati hai?",
        "options": [
          "source myenv/bin/activate",
          "myenv\\Scripts\\activate",
          "python activate myenv",
          "start myenv"
        ],
        "correct": 1,
        "explanation": "Windows par activation script 'myenv\\Scripts\\activate' hoti hai (jabki Mac/Linux par source myenv/bin/activate)."
      },
      {
        "q": "Project ki sabhi installed libraries aur unke exact versions ko file me save karne ki command kya hai?",
        "options": [
          "pip list > requirements.txt",
          "pip export dependencies.txt",
          "pip freeze > requirements.txt",
          "python -m pip save"
        ],
        "correct": 2,
        "explanation": "pip freeze installed packages aur versions ko requirements format me output karta hai."
      },
      {
        "q": "Ek naye computer par requirements.txt file se saari libraries ek sath install karne ki command kya hai?",
        "options": [
          "pip install requirements.txt",
          "pip install -r requirements.txt",
          "pip load requirements.txt",
          "python install -f requirements.txt"
        ],
        "correct": 1,
        "explanation": "pip install ke sath -r flag (requirement specifier) use kiya jata hai: pip install -r requirements.txt."
      },
      {
        "q": "Virtual environment folder (venv) ko Git repository me commit kyu nahi karna chahiye?",
        "options": [
          "Ye illegal hota hai",
          "Ye heavy hota hai (100MB+) aur iski compiled binaries OS-specific hoti hain jo doosre OS par fail ho sakti hain",
          "Git ise support nahi karta",
          "Python crash ho jata hai"
        ],
        "correct": 1,
        "explanation": "venv folder machine-specific binaries contain karta hai; iske badle sirf lightweight requirements.txt commit ki jaati hai."
      }
    ]
  },
  {
    "day": 30,
    "week": 5,
    "phase": "Intermediate",
    "topic": "OOP: class aur object",
    "concept": "Class = blueprint",
    "demo": "Pehli class banao",
    "mistake": "self bhoolna",
    "quiz": "Quiz: Car class",
    "interview": "Real life: OOP kahan use hota",
    "readTime": "16 mins",
    "contentHtml": "\n          <h2>👑 Day 30: Object-Oriented Programming (OOP) - Classes, Objects &amp; self</h2>\n          <p><strong>Lakh-Lakh Badhaai! 🎉</strong> Aapne 30-Day Python Zero-to-Hero Challenge ke aakhri aur sabse pratishthit (prestigious) milestone par kadam rakh diya hai! Ab tak humne jo code likha use <em>Procedural Programming</em> kehte hain — functions aur variables alag-alag bikhre huye the. Lekin jab aap bade software systems (jaise Games, Instagram ka backend, ya Banking systems) banate hain, toh hum data aur uske logic ko ek single entity me baandh dete hain. Is powerful architecture ko kehte hain <strong>Object-Oriented Programming (OOP)</strong>.</p>\n\n          <h3>1. 💡 Concept: Blueprint vs House, Class vs Object &amp; The Role of 'self'</h3>\n          <p>Real-life analogy se shuru karte hain: Sochiyie ek Architect jo ek Luxury Villa ka <strong>Naksha (Blueprint)</strong> banata hai. Naksha sirf ek kagaz par bani drawing hai — kya aap nakshe ke andar reh sakte hain? Nahi! Nakshe me na deewarein hain, na pankhe. Lekin us ek nakshe ko dekh kar builder zameen par 50 alag-alag asli <strong>Makan (Houses)</strong> bana sakta hai. Ek makan me aap rehte hain, ek me Sharma ji rehte hain. Dono makano ka design same hai, lekin andar ke log aur unka saman alag hai!</p>\n\n          <p>Python me bilkul yahi relation hai:</p>\n          <ul>\n            <li><strong>Class (Naksha / Blueprint):</strong> Ek template jo define karti hai ki data kaisa dikhega aur uske paas kya-kya capabilities hongi.</li>\n            <li><strong>Object ya Instance (Asli Makan):</strong> Us class se create kiya gaya real memory object jiske paas apna actual data hota hai.</li>\n          </ul>\n\n          <p><strong>The Anatomy of a Python Class:</strong></p>\n          <pre><code>class Car:\n    # Constructor: Naya object bante hi automatically call hota hai\n    def __init__(self, brand, model, price):\n        self.brand = brand      # Instance Attribute (State)\n        self.model = model\n        self.price = price\n        self.speed = 0\n\n    # Instance Method (Behavior / Action)\n    def accelerate(self, increment):\n        self.speed += increment\n        print(f\"{self.brand} {self.model} accelerated to {self.speed} km/h!\")</code></pre>\n\n          <p><strong>The Mystery of 'self' Demystified:</strong></p>\n          <p>Naye developers ko sabse zyada dar <code>self</code> se lagta hai. Lekin iska concept behad seedha hai: Maan lijiye aapke paas do cars hain: <code>car1 = Car(\"Tata\", \"Safari\", 2000000)</code> aur <code>car2 = Car(\"Maruti\", \"Swift\", 800000)</code>. Jab aap likhte hain <code>car1.accelerate(20)</code>, toh Python ko kaise pata chalega ki kis car ki speed badhani hai? Tata ki ya Maruti ki?</p>\n          <p>Behind the scenes, Python <code>car1.accelerate(20)</code> ko translate karta hai: <code>Car.accelerate(car1, 20)</code> me! Yahan <strong>self</strong> wahi <code>car1</code> ka actual instance hai. Isliye har method ke pehle parameter me <code>self</code> likhna anivarya hota hai.</p>\n\n          <p><strong>Attributes vs Methods:</strong></p>\n          <ul>\n            <li><strong>Attributes (Nouns / State):</strong> Jo data object store karta hai (e.g. <code>self.name</code>, <code>self.balance</code>).</li>\n            <li><strong>Methods (Verbs / Actions):</strong> Jo functions class ke andar define hote hain aur object ke data par kaam karte hain (e.g. <code>deposit()</code>, <code>withdraw()</code>).</li>\n          </ul>\n\n          <h3>2. 💻 Live Demo: Smart Car Simulation &amp; Bank Account Manager</h3>\n          <p>Pehle demo me dekhte hain Car Class: Object instantiation, state changes aur dashboard printing:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>car_simulation.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>class SmartCar:\n    def __init__(self, brand, model, color):\n        # Initializing instance attributes\n        self.brand = brand\n        self.model = model\n        self.color = color\n        self.odometer_km = 0\n        self.is_engine_on = False\n\n    def start_engine(self):\n        if not self.is_engine_on:\n            self.is_engine_on = True\n            print(f\"[{self.brand} {self.model}] Engine started: Vroom Vroom! 🚗💨\")\n        else:\n            print(f\"[{self.brand} {self.model}] Engine is already running.\")\n\n    def drive(self, distance_km):\n        if self.is_engine_on:\n            self.odometer_km += distance_km\n            print(f\"Drove {distance_km} km. Total Odometer: {self.odometer_km} km.\")\n        else:\n            print(\"Cannot drive! Pehle engine start kijiye.\")\n\n# Creating 2 Independent Objects (Instances)\ncar1 = SmartCar(\"Tata\", \"Nexon EV\", \"Teal Blue\")\ncar2 = SmartCar(\"Mahindra\", \"Thar\", \"Deep Black\")\n\nprint(f\"Created Car 1: {car1.color} {car1.brand} {car1.model}\")\nprint(f\"Created Car 2: {car2.color} {car2.brand} {car2.model}\\n\")\n\ncar1.start_engine()\ncar1.drive(45)\ncar1.drive(30)\n\n# Car 2 state is completely independent!\nprint(f\"\\nCar 2 Odometer check: {car2.odometer_km} km (Untouched)\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Created Car 1: Teal Blue Tata Nexon EV<br>Created Car 2: Deep Black Mahindra Thar<br><br>[Tata Nexon EV] Engine started: Vroom Vroom! 🚗💨<br>Drove 45 km. Total Odometer: 45 km.<br>Drove 30 km. Total Odometer: 75 km.<br><br>Car 2 Odometer check: 0 km (Untouched)</div>\n          </div>\n\n          <p>Ab dekhte hain production banking OOP class jisme encapsulation, input validation aur transactions maintain hote hain:</p>\n\n          <div class=\"py-code-block\">\n            <div class=\"py-code-header\"><span>bank_account_oop.py</span><button class=\"py-copy-btn\" onclick=\"copyCode(this)\">Copy</button></div>\n            <div class=\"py-code-content\">\n<pre>class CustomerAccount:\n    # Class attribute (Shared by all accounts)\n    bank_name = \"State Tech Bank of India\"\n\n    def __init__(self, acc_number, account_holder, opening_balance=0):\n        self.acc_number = acc_number\n        self.holder = account_holder\n        self.balance = opening_balance\n        self.transaction_history = []\n        self._record_tx(\"Opening Balance\", opening_balance)\n\n    def _record_tx(self, tx_type, amount):\n        self.transaction_history.append(f\"{tx_type}: Rs.{amount} | Balance: Rs.{self.balance}\")\n\n    def deposit(self, amount):\n        if amount &gt; 0:\n            self.balance += amount\n            self._record_tx(\"DEPOSIT\", amount)\n            print(f\"Successfully deposited Rs.{amount}. Current balance: Rs.{self.balance}\")\n        else:\n            print(\"Invalid deposit amount!\")\n\n    def withdraw(self, amount):\n        if amount &gt; self.balance:\n            print(f\"Declined: Insufficient funds! Available: Rs.{self.balance}\")\n        elif amount &lt;= 0:\n            print(\"Withdrawal amount must be greater than 0.\")\n        else:\n            self.balance -= amount\n            self._record_tx(\"WITHDRAWAL\", amount)\n            print(f\"Successfully withdrawn Rs.{amount}. Current balance: Rs.{self.balance}\")\n\n# Using CustomerAccount\nacc = CustomerAccount(\"SB-90812\", \"Mohd Kaif\", 10000)\nacc.deposit(5000)\nacc.withdraw(3000)\nacc.withdraw(20000)  # Should decline\n\nprint(f\"\\n--- {CustomerAccount.bank_name} Statement ---\")\nfor tx in acc.transaction_history:\n    print(f\"&bull; {tx}\")</pre>\n            </div>\n            <div class=\"py-terminal-output\"><div class=\"py-terminal-label\">Output</div>Successfully deposited Rs.5000. Current balance: Rs.15000<br>Successfully withdrawn Rs.3000. Current balance: Rs.12000<br>Declined: Insufficient funds! Available: Rs.12000<br><br>--- State Tech Bank of India Statement ---<br>&bull; Opening Balance: Rs.10000 | Balance: Rs.10000<br>&bull; DEPOSIT: Rs.5000 | Balance: Rs.15000<br>&bull; WITHDRAWAL: Rs.3000 | Balance: Rs.12000</div>\n          </div>\n\n          <div class=\"py-callout py-callout-warning\">\n            <div class=\"py-callout-title\">⚠️ 3. Common Mistake: Method Definition me 'self' Bhool Jana!</div>\n            <p>Duniya ke har Python beginner ka pehla OOP crash yahi hota hai: Wo class method define karte waqt pehla parameter <code>self</code> likhna bhool jaate hain!</p>\n            <p>❌ <strong>Wrong Code:</strong><br>\n            <code>class Dog:</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;def bark():  # Notice: 'self' missing hai!</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(\"Bho-Bho!\")</code><br>\n            <code>d = Dog()</code><br>\n            <code>d.bark()  # TypeError: bark() takes 0 positional arguments but 1 was given!</code></p>\n            <p><strong>Aisa error kyu aaya jab humne 0 arguments pass kiye the?</strong><br>\n            Kyunki Python ne <code>d.bark()</code> ko silently <code>Dog.bark(d)</code> me convert karke instance <code>d</code> pass kar diya tha! Method me koi parameter receive karne wala nahi tha, isliye TypeError aa gaya.</p>\n            <p>✅ <strong>Correct Code:</strong><br>\n            <code>class Dog:</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;def bark(self):  # Hamesha 'self' pehla argument rakhein!</code><br>\n            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(\"Bho-Bho!\")</code></p>\n          </div>\n\n          <div class=\"py-callout\">\n            <div class=\"py-callout-title\">💼 4. Real Life &amp; Interview: Procedural vs OOP &amp; Industry Use Cases</div>\n            <p><strong>Top Interview Question: \"Industry me OOP kahan aur kyun use ki jaati hai?\"</strong></p>\n            <ul>\n              <li><strong>Modularity &amp; Maintenance:</strong> Procedural code me agar aap data structure badal dete hain, toh poore project ke 50 functions toot jaate hain. OOP me data aur methods ek sath <em>Encapsulate</em> hote hain, isliye andar ka change bahar kisi cheez ko nahi todta.</li>\n              <li><strong>Real-World Examples:</strong>\n                <ul>\n                  <li><strong>Web Frameworks (Django / Flask):</strong> Database tables ko classes ke roop me define kiya jata hai: <code>class User(models.Model):</code> (ORM - Object Relational Mapping).</li>\n                  <li><strong>GUI Applications (Tkinter / PyQt):</strong> Har Button, Window, Slider ek object hota hai jiske paas apna color, dimension aur <code>on_click()</code> method hota hai.</li>\n                  <li><strong>Game Development:</strong> <code>Player</code>, <code>Enemy</code>, <code>Bullet</code> classes jinki apni health, coordinates aur <code>fire()</code> methods hote hain.</li>\n                </ul>\n              </li>\n            </ul>\n            <p style=\"margin-top:12px; font-weight:600; color:#10b981;\">🎓 CONGRATULATIONS! Aapne 30-Day Python Zero-to-Hero Foundation safaltapoorvak poori kar li hai! Ab aap kisi bhi Advanced Python Framework, Data Science ya Automation project me confidence ke saath aage badh sakte hain!</p>\n          </div>\n        ",
    "mcqs": [
      {
        "q": "Class aur Object ke beech kya relation hota hai?",
        "options": [
          "Class ek instance hai aur Object ek blueprint hai",
          "Class ek blueprint/template hai jabki Object uska real memory instance hai",
          "Dono me koi farak nahi hota",
          "Class sirf numbers ke liye hoti hai"
        ],
        "correct": 1,
        "explanation": "Class ek blueprint ya template hoti hai aur Object us class ka actual concrete instance hota hai."
      },
      {
        "q": "Class me __init__ method ka primary role kya hota hai?",
        "options": [
          "Class ko delete karna",
          "Naya object bante waqt uske initial attributes initialize karna (Constructor)",
          "Output print karna",
          "Loop chalana"
        ],
        "correct": 1,
        "explanation": "__init__ constructor method hota hai jo object create hote hi uske instance attributes ko initialize karta hai."
      },
      {
        "q": "Class methods me pehla parameter 'self' kis cheez ko represent karta hai?",
        "options": [
          "Poori Python language ko",
          "Current object instance ko jis par method call hua hai",
          "Parent class ko",
          "Operating system ko"
        ],
        "correct": 1,
        "explanation": "self current object instance ka reference hota hai, jo Python method call karte waqt implicitly pass karta hai."
      },
      {
        "q": "obj.method() call karne par 'TypeError: method() takes 0 positional arguments but 1 was given' aane ka kya kaaran hai?",
        "options": [
          "Method definition me 'self' parameter likhna bhool gaye",
          "Object define nahi tha",
          "Memory full ho gayi",
          "Python version galat hai"
        ],
        "correct": 0,
        "explanation": "Python implicitly instance argument bhejta hai; agar method me self defined na ho toh 1 argument received ka TypeError aata hai."
      },
      {
        "q": "Class Attribute aur Instance Attribute me kya farak hai?",
        "options": [
          "Class attribute sabhi instances dwara share hota hai jabki instance attribute har object ka apna personal data hota hai",
          "Instance attribute fast hota hai",
          "Class attribute modify nahi ho sakta",
          "Dono identical hote hain"
        ],
        "correct": 0,
        "explanation": "Class attribute poori class aur uske sabhi objects dwara share hota hai, jabki self.var instance attribute har object ke liye unique hota hai."
      }
    ]
  }
];
