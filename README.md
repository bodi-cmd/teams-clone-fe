**CLONĂ MICROSOFT TEAMS**

**Proiect realizat de:**

BOGDAN BARBU

RĂZVAN-VASILE BUMBU

**Grupa:** 30233

**An universitar:** 2022-2023

**Profesor îndrumător:**

CĂTĂLIN-EMANUEL FIRTE

**CUPRINS**

1.  Specificația proiectului

2.  Modele use-case

3.  Arhitectura

    a.  Descrierea arhitecturii

    b.  Diagrama arhitecturii

    c.  Diagrama bazei de date

4.  Specificații non-funționale

5.  Validare și testare

    a.  Validare

    b.  Testare

6.  Dezvoltări ulterioare

7.  Bibliografie

**1. Specificațiile proiectului**

Microsoft Teams este unul dintre produsele oferite de Microsoft in
cadrul pachetului Microsoft 365. Platforma oferă servicii de comunicare,
dar și de stocare a fișierelor. Platforma a devenit foarte cunoscută pe
durata pandemiei de COVID-19, când multe companii și scoli au fost
nevoite să se mute în domeniul online. În anul 2022, aproximativ 270 de
milioane de persoane foloseau lunar platforma.

Scopul acestui proiect a fost acela de a crea o clonă a acestei
aplicații care să reușească sa implementeze cât mai multe din operațiile
disponibile în cadrul acesteia.

Astfel, am reușit să identificăm și să creăm 3 roluri importante,
fiecare având următoarele operații disponibile:

-   Administratorul

    -   Vede toți utilizatorii și informațiile lor

    -   Activează și dezactivează conturile utilizatorilor

    -   Există un unic cont de administrator

-   Profesorul

    -   Își poate crea un cont

    -   Poate intra în cont cu ajutorul datelor sale

    -   Poate să își editeze datele contului

    -   Poate să creeze grupuri de materie

    -   Are acces la cheia de înrolare a grupului pe care l-a creat

    -   Poate să se înroleze în grupuri

    -   Poate să creeze teme

    -   Poate să posteze pe grup

    -   Poate să încarce fișiere pe grup

    -   Poate să trimită mesaje

    -   Primește notificări

    -   Poate să vadă soluțiile temelor create de el

    -   Poate să acorde note soluțiilor

-   Studentul

    -   Își poate crea un cont

    -   Poate intra în cont cu ajutorul datelor sale

    -   Poate să își editeze datele contului

    -   Poate să se înroleze în grupuri

    -   Poate să posteze pe grup

    -   Poate să încarce fișiere pe grup

    -   Poate să trimită mesaje

    -   Primește notificări

    -   Primește teme

    -   Poate să încarce soluții la teme

    -   Primește note

![Graphical user interface Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image1.png){width="6.5in"
height="3.685416666666667in"}

**2. Modele use-case**

![Diagram Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image2.jpg){width="6.569444444444445in"
height="8.501010498687664in"}

![Diagram Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image3.png){width="6.5in"
height="8.785416666666666in"}

**3. Arhitectura**

***3.1. Descrierea arhitecturii***

Ca si stack de tehnologii am ales sa folosim Springboot împreuna cu
mySQL pentru partea de backend a aplicației iar pentru frontend am
folosit React. Aplicația de frontend comunica cu serverul de prin
intermediul requesturilor HTTP de tip GET, POST si PUT.

***Arhitectura backend:***

Fiecare request este mapat direct unei metode de către *Controllerele*
aplicației. Din controller, sunt apelate metodele din clasele de
*Service*. Aici, datele introduse de utilizator sunt validate si
verificate. Daca sunt in regula, se interoghează baza de date prin
intermediul claselor *Repository*, iar datele sunt mapate in DTO-uri
(Data Transfer Objects) si returnate ca si răspuns HTTP împreuna cu un
status. In cazul in care ceva nu a decurs bine, este aruncata o excepție
care conține un mesaj. Aceste excepții sunt prinse de clasa
*ExceptionHandlers*, care tratează fiecare excepție si o mapeaza la un
DTO care este sigur de trimis înapoi la client. Toate modelele din
aplicatie sunt stocate in modulul *Entity.* Acestea asigura generarea
corecta a bazei de date.

Pentru autentificare am folosit JWT (JSON Wen Token). Acesta reprezintă
un string in format BASE64 care conține date esențiale despre user
criptate. Tokenul trebuie sa fie prezent in header la fiecare request
pentru a putea valida autorul requestului.

Pentru maparea datelor am folosit Model Mapper.

Pentru a simplifica generarea bazei de date am folosit Hibernate.

***Arhitectura frontend:***

Pe partea de frontend, proiectul este structurat in cinci module
principale: assets, components, config, layouts si pages.

Fiecare din aceste module conține submodule din categoria respectiva
după cum este prezentat mai jos:

-   *Assets* -- aici sunt stocate toate fișierele media precum imagini,
    iconițe, svg-uri si videoclipuri.

-   *Components* -- aici se afla toate componentele din interfața
    grafica. Avantajul React-ului este acela ca toate componentele pot
    fi reutilizate (asemenea claselor OOP).

-   *Config --* aici se afla fișiere care conțin constante esențiale
    configurării aplicatiei (de exemplu adresa serverului backend)

-   *Layouts --* conține componente care ajuta la așezarea in pagina a
    altor componente (de exemplu TwoCollumnLayout primeste doua
    componente si le așază sub forma de coloana una lângă alta)

-   *Pages --* toate paginile pe care le poate accesa utilizatorul se
    afla in acest director

***Arhitectura devops:***

Atât backend-ul cat si frontend-ul se afla pe repository-uri diferite de
git, astfel am reușit sa facem deploy la ambele aplicații independent pe
o platforma de tip SaaP. Singurele probleme întâmpinate au fost pe
partea de frontend. Aici, serverul nu avea suficienta memorie pentru a
duce operația de build la bun sfârșit. Am rezolvat aceasta memorie
atașând fișierele rezultate build-ului pe calculatorul personal in
repository-ul de pe git, astfel am scutind serverul de acest efort.
Ambele aplicații sunt configurate cu CI/CD, astfel la fiecare push pe
git, serverele vor lua ultima versiune de cod si o vor rula.

***3.2. Diagrama arhitecturii***

![](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image4.png){width="6.393576115485565in"
height="4.9375in"}

***\
***

***3.3. Diagrama bazei de date***

![Diagram Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image5.png){width="6.28125in"
height="5.48871062992126in"}

**4. Specificații non-funcționale**

Ca specificații non-funcționale, avem următoarele:

-   Eficiența memoriei

    -   Nu pot fi salvate fișiere cu dimensiuni mai mari de 2MB (am
        creat un validator pentru fișiere)

    -   După ce sunt încărcate, pozele de profil vor fi redimensionate
        la o dimensiune care să ocupe mai puțină memorie (am creat o
        metodă care reduce dimensiunea imaginilor la 256 x 256 pixeli)

-   Eficiența timpului

    -   Pentru ca răspunsurile la request-urile create de front-end să
        fie cât mai rapide, am creat DTO-uri care să conțină doar
        informațiile cheie

    -   De asemenea, în cadrul request-urilor de generare a mesajelor,
        utilizatorii vor fi trimiși o singură dată, întrucât
        informațiile acestora (în special pozele de profil) vor încetini
        răspunsul

-   Păstrarea datelor

    -   Datele sunt salvate într-o bază de date

-   Securitate

    -   Utilizatorii primesc un token unic pentru fiecare logare

    -   Parolele sunt criptate în baza de date

-   Mentenabilitate

    -   Codul este lizibil

    -   Clasele sunt structurate în pachete

    -   Numele claselor și ale metodelor sunt sugestive

-   Portabilitate

    -   Aplicația fiind una web, poate fi folosită de pe orice tip de
        device

**5. Validare și testare**

***5.1. Validare***

Pentru validare există o serie întreagă de validatoare care se ocupă ca
datele introduse de utilizator să fie corecte. Printre aceste validări
se enumeră:

-   **Validarea numelui**

    -   numele să nu conțină caractere speciale

-   **Validarea numelui de utilizator**

    -   Numele de utilizator să nu conțină caractere speciale

-   **Validarea parolei**

    -   parola să conțină litere mari, litere mici, numere și caractere
        speciale

-   **Validarea operațiilor pe cont**

    -   Fiecare utilizator să poată opera doar operații specifice
        tipului de utilizator din care face parte

-   **Validarea mesajelor**

    -   Mesajele să nu conțină mai mult de 1000 de caractere

-   **Validarea fișierelor și imaginilor**

    -   Fișierele și imaginilor să nu ocupe mai mult de 2MB

-   **Validarea notelor**

    -   Notele să fie în intervalul 1-100

***5.2. Testare***

Teste IntelliJ:

![Text Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image6.png){width="2.950255905511811in"
height="1.3334492563429572in"}

Teste Postman:

Există multiple testări posibile, câteva dintre acestea fiind
următoarele:

-   Parola invalidă creare cont

![Graphical user interface, text Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image7.png){width="6.5in"
height="3.1951388888888888in"}

-   Creare cont valid

![Text Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image8.png){width="6.5in"
height="3.3652777777777776in"}

-   Cont duplicat

![A screenshot of a computer Description automatically generated with
medium
confidence](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image9.png){width="3.2086111111111113in"
height="3.475300743657043in"}

-   Logare parola invalidă

![A screenshot of a computer Description automatically generated with
medium
confidence](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image10.png){width="3.0502646544181977in"
height="3.400294181977253in"}

-   Logare validă

![Text Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image11.png){width="6.5in"
height="3.3826388888888888in"}

-   Logare cont inactiv

![A screenshot of a computer Description automatically generated with
medium
confidence](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image12.png){width="3.2252799650043746in"
height="3.3752919947506563in"}

-   Creare grup

![Text Description automatically
generated](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image13.png){width="3.3919608486439197in"
height="4.43371719160105in"}

-   Creare grup de către student

![](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image14.png){width="4.000346675415573in"
height="3.3752919947506563in"}

-   Intrare multiplă în cont

![A screenshot of a computer Description automatically generated with
medium
confidence](https://raw.githubusercontent.com/bodi-cmd/teams-clone-fe/media_for_readme/image15.png){width="5.400468066491689in"
height="3.4669674103237096in"}

**6. Dezvoltări ulterioare**

Există o mulțime de funcționalități pe care aplicația nu le are si care
ar putea duce la îmbunătățirea acesteia. Câteva dintre acestea sunt:

-   Posibilitatea efectuării de apeluri vocale și video

-   Posibilitatea trimiterii de fișiere și imagini ca și mesaje

-   Crearea unei table interactive pe care profesorul să scrie, iar
    studenții să vadă în timp real

-   Posibilitatea de a crea teste grilă pe care elevii să le rezolve în
    timp real

> **7.Bibliografie**

-   <https://www.baeldung.com/spring-boot>

-   <https://www.baeldung.com/spring-boot-react-crud>

-   <https://www.baeldung.com/learn-jpa-hibernate>

-   <https://www.baeldung.com/spring-boot-testing>

-   <https://spring.io/guides/gs/accessing-data-mysql/>

-   <https://developer.okta.com/blog/2022/06/17/simple-crud-react-and-spring-boot>

-   <https://spring.io/guides/tutorials/react-and-spring-data-rest/>
