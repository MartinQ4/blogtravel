# Dokumentace k projektu

## Osnova
-	Úvod 
-	Popis aplikace a funkcí
-	UI a UX
-	Technický popis řešení
-	Návod ke spuštění
-	Závěr

 
## Úvod
TravelBlog je webová aplikace navržená jako příjemný a jednoduchý prostor pro všechny, kdo rádi cestují, píší o svých zážitcích a sdílejí své příběhy s ostatními. Tento projekt je vytvořen nejen pro autory příspěvků, ale i pro čtenáře, kteří hledají inspiraci na další dobrodružství nebo užitečné tipy a rady pro své vlastní cesty.
Aplikace slouží dvěma hlavním cílovým skupinám:
1.	Cestovatelé a blogeři, kteří chtějí sdílet své zážitky z cest, psát články a komunikovat s ostatními členy cestovatelské komunity.
2.	Čtenáři a nadšenci, kteří hledají inspiraci, plánují dovolenou nebo si prostě chtějí užít čtení o zajímavých místech a zkušenostech.

Mezi hlavní funkce aplikace patří:
- Pro editory (autory): Možnost přidávat, upravovat a mazat články o svých cestách.
- Pro uživatele (čtenáře): Vyhledávání článků, jejich filtrování a řazení podle různých kritérií. Dále čtení, lajkování a komentování příspěvků.
TravelBlog tak propojuje komunitu cestovatelů a nabízí intuitivní platformu, kde se mohou sdílet zkušenosti, objevovat nová místa a inspirovat ostatní.

 
## Popis aplikace a jejích funkcí

### Hlavní funkcionality
Aplikace TravelBlog nabízí širokou škálu funkcí přizpůsobených potřebám různých typů uživatelů. Mezi nejdůležitější patří:
- Čtení a vyhledávání příspěvků: Uživatelé mohou procházet a číst blogové příspěvky, filtrovat je podle autora.
- Správa příspěvků: Editoři mohou vytvářet, upravovat a mazat své vlastní příspěvky.
- Správa uživatelů: Admini mají možnost řídit přístup ostatních uživatelů, upravovat jejich údaje nebo mazat jejich účty.
- Interakce s obsahem: Lajkování, komentování a ukládání příspěvků pro pozdější přečtení.

### Uživatelské role a interakce
Aplikace definuje tři hlavní role uživatelů, každá s vlastními právy a funkcemi:
1.	Uživatel (čtenář):
     - Vyhledávání a filtrování příspěvků (například podle autora).
     - Zobrazení detailu příspěvku.
     - Přidávání komentářů a lajkování příspěvků.
2. Editor (autor):
     - Vytváření nových příspěvků.
     - Editace vlastních příspěvků.
     - Mazání vlastních příspěvků.
3. Admin (správce):
     - Správa uživatelů (vytváření nových, reset hesla, úprava údajů a oprávnění, mazání uživatelů).
     - Přehled a správa všech uživatelů a editorů.
     - Možnost zobrazit, upravit nebo smazat jakýkoli příspěvek v aplikaci.
 
## UI a UX

### UI
Cílem návrhu uživatelského rozhraní bylo vytvořit jednoduché a přehledné prostředí, které zohledňuje vysoký podíl fotografického obsahu. 
Barevná paleta a rozvržení byly voleny s ohledem na snadnou čitelnost a intuitivní navigaci.

#### Prvky
Navigace:
- Hlavní navigace má bílý podklad, aby byla neutrální a nerušila fotografie ani obsah.
- Pro privátní stránky (složitější funkce, správa) byla zvolena tmavě šedá aside navigace (rgba(22, 22, 22, 95%)), což vytváří jemný kontrast a vizuálně odlišuje veřejné a privátní sekce aplikace.
  
Objekty (karty, příspěvky):
- Zobrazené ve světlých „bublinách“ (div elementy) s světle šedým rámečkem (rgb(190, 190, 190)), což zvyšuje přehlednost.
  
Barvy
Důležitá tlačítka a akce jsou zvýrazněna barevnými odstíny:
- Světle modrá (#BCCEF8): pro úpravy nebo informativní akce.
- Zelená (#D8EFD3): pro potvrzení nebo přidání.
- Žlutá (#F7F8BC): pro upozornění nebo zvýraznění informací.
- Červená (#F8C4B4): pouze pro mazání nebo varování.
Tento omezený výběr barev pomáhá zachovat vizuální jednoduchost, protože většinu barevnosti dodávají použité fotografie.

Tvary a layouty
Karty, sekce a tlačítka mají zakulacené rohy, což vytváří jemný a moderní vzhled:
- Border radius u divů (karet): 12px.
- Tlačítka jsou více zaoblená: 50px.
Layout je uspořádaný s ohledem na čitelnost: důležité akce a tlačítka jsou snadno dostupné.

Typografie
- Hlavní font: Clash Display Variable, Arial, sans-serif – použitý pro nadpisy a zvýrazněný text.
- Vedlejší font: Work Sans, Arial, sans-serif – použitý pro běžný text a popisy.

### UX
#### Klíčové obrazovky 
1. Veřejně přístupné stránky:
- Hlavní stránka: Úvodní stránka s navigací a odkazem na stránku obsahující blogové příspěvky.
- Stránka s příspěvky: Umožňuje vyhledávání, filtrování a prohlížení příspěvků. Na desktopu je rozložení 3 příspěvky vedle sebe ve dvou řádcích. Další příspěvky lze zobrazit prostřednictvím stránkování (pagination).
  
2. Stránky dostupné po přihlášení:
- Nástěnka: Různě přizpůsobená pro každou roli:
-- Admin: Přehled nejaktivnějších editorů, nejlépe hodnocených příspěvků, trendy v aplikaci, kalendář.
-- Editor: Souhrn jeho nejlepších příspěvků a jejich hodnocení.
-- Uživatel: Sekce přečíst později, návrhy příspěvků podle preferencí a upozornění na nový obsah od oblíbených autorů. (Poznámka: Nástěnka má spíše estetický charakter a neobsahuje plně funkční prvky.)
- Přidávání příspěvků: Rozhraní pro editory k vytváření obsahu.
- Správa vlastních příspěvků: Editace a mazání příspěvků (editor).
- Správa uživatelů: Rozhraní pro adminy k přidávání, úpravě a mazání uživatelů.
- Správa příspěvků: Admin může upravovat nebo mazat libovolné příspěvky.
- Profil uživatele: Sekce pro správu osobních údajů každého uživatele.

#### Navigac mezi stránkamii 
Veřejné stránky:
- Navigace umístěná nahoře na stránce.
- Vlevo: Logo aplikace a odkazy na veřejně dostupné stránky.
- Vpravo: Ikona uživatele s dropdown menu obsahujícím přihlášení a registraci.
  
Privátní stránky:
- Navigace ve formě bočního panelu (aside navigation), která se přizpůsobuje roli přihlášeného uživatele.
- Horní část: Logo aplikace a hlavní odkazy na stránky.
- Dolní část: Odkaz pro odhlášení nebo změnu role (pokud má uživatel oprávnění měnit role).
 
## Technický popis řešení

### Použité technologie 
-	Frontend
    - React (verze 18.3.1) – pro vývoj uživatelského rozhraní.
    - Vanilla JavaScript – pro základní funkcionality bez závislosti na knihovnách.
    - React Router (verze 7.0.1) – pro navigaci mezi stránkami.
    - Axios (verze 1.7.7) – pro komunikaci s API.
-	Backend
    -	Simulovaný pomocí JSON Serveru – slouží jako jednoduchý mock backend pro správu dat.
-	Styly
    -	CSS – pro přizpůsobení vzhledu aplikace
    -	Bootstrap – pro základní designové komponenty
-	Správa stavu
    -	Redux (verze 9.1.2) – pro centralizovanou správu stavu aplikace.
-	Vývojové prostředí
    -	Visual Studio Code – používané jako hlavní IDE pro vývoj


### Struktura kódu
-	/blog
-	/data/ -> „databáze“ ze které JSON server bere data (a zas je tam vrací)
-	/ public/ images /„obrázky“, které používá JSON server
-	/src / 
    - assets/ ikony a obrázky / fotky používané v aplikaci
    - Components / komponenty, které se velmi často opakují – aside a navbar
    - Config / konfigurace aplikace – například řešení logiky přihlašování
    - Hooks / práce s daty
    - Pages / stránky aplikace rozdělené na private a public
    - App.js – Router vracející stránky podle path
    - Index.css – styly platící napříč celou aplikací
    - Index.js – konfigurace a přidání závislostí platící napříč aplikací



### API Dokumentace 
Aplikace používá následující endpointy:

1.	/users – pro správu uživatelů.
    - Uchovává informace jako: ID, uživatelské jméno, email, role, heslo, bio, oblíbená místa, cestovní preference, apod.

2. 	/posts – pro správu příspěvků.
    - Uchovává informace jako: ID, nadpis, obsah, kategorie, obrázky, datum vytvoření, ID autora, počet lajků, komentáře, apod.

3. 	/comments – pro správu komentářů.
    - Uchovává informace jako: ID, ID příspěvku, ID autora, obsah komentáře, datum, apod.

### Formát dat 
-	Všechna data jsou uložena v jednom souboru db.json, jehož struktura vypadá takto: { "users": [], "posts": [], "comments": [] }


 
## Návod ke spuštění

### Předpoklady
-	Instalace Node.js a npm/yarn.
-	Další nástroje (pokud je třeba, např. Git).
  
### Kroky k lokálnímu spuštění 
-	Klonování repozitáře.
-	Instalace závislostí (npm install).
-	Spuštění JSON Serveru (json-server --watch data/db.json --port 8000).
-	Spuštění aplikace (npm start).

 
## Závěr

### Shrnutí projektu a jeho přínosů
TravelBlog je jednoduchá aplikace, která simuluje prostředí pro sdílení cestovatelských příběhů. 
Díky třem rolím uživatelů (uživatel, editor a admin) nabízí aplikace širokou škálu funkcionalit od vyhledávání příspěvků až po správu uživatelských účtů a příspěvků. 
Přestože backend je simulovaný pomocí JSON Serveru, aplikace dokazuje svou použitelnost a připravenost na případnou integraci s reálným backendovým řešením.

Hlavní přínosy projektu zahrnují:
- Praktické osvojení základních a pokročilých konceptů Reactu, jako je správa stavu pomocí Reduxu a navigace pomocí React Routeru.
- Schopnost navrhnout uživatelské rozhraní s ohledem na různé role a přizpůsobení UI potřebám uživatele.
- Získání zkušeností s organizací kódu a použitím simulovaného backendu pro účely testování frontendu.

### Zkušenosti z vývoje
Tento projekt byl mým prvním setkáním s Reactem a stal se příležitostí k osvojování nových technologií. 

Naučila jsem se:
- Pracovat s Reactem, což zahrnovalo pochopení základních principů komponentového modelu, práce se stavy a reaktivitou.
- Ovládat React Router pro implementaci navigace mezi stránkami a správu různých cest aplikace.




