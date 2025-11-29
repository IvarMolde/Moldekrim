export const story = [
    {
        id: "cover",
        type: "cover",
        title: "Mysteriet i Molde",
        text: "Regnet vasker aldri denne byen ren. En kvinne er død. En morder går fri. Har du magen til å grave i sannheten?",
        image: "cover_molde.png",
        audio: "rain",
        learning: {
            question: "Hva betyr ordet 'mysterium'?",
            options: ["En fest", "En gåte", "En by"],
            correct: 1,
            feedback: "Riktig! Et mysterium er noe uforklarlig eller en gåte."
        },
        next: "intro"
    },
    {
        id: "intro",
        title: "Kapittel 1: Romsdalsmørket",
        text: "Klokken er 23:00. Hodet ditt hamrer i takt med regnet mot vinduet på kontoret i Storgata. Kaffen er kald, og whiskyflasken er tom. Telefonen ringer. Det er politimester Olsen. Stemmen hans er stram. 'Vi har et lik på Hurtigrutekaia, Varg. Tina Pettersen. Det... det ser ut som en slakting.' Du reiser deg. Jobben kaller.",
        image: "detective_office.png",
        audio: "office",
        timelineEvent: { id: "body_found", time: "22:45", description: "Liket av Tina blir funnet på kaia." },
        learning: {
            question: "Hva er klokken når telefonen ringer?",
            options: ["22:00", "23:00", "Midnatt"],
            correct: 1, // Index of correct answer
            feedback: "Riktig! Det er sent på kvelden."
        },
        next: "scene_choice"
    },
    {
        id: "scene_choice",
        title: "Byen sover ikke",
        text: "Du står på gaten. Luften smaker salt og eksos. Hvor begynner du? Morderen har allerede et forsprang.",
        image: "cover_molde.png",
        audio: "rain",
        choices: [
            { text: "Dra til åstedet (Kaia)", target: "scene_harbor" },
            { text: "Oppsøk Tinas leilighet", target: "scene_apartment" },
            { text: "Sjekk Café Molde (Jobben)", target: "scene_cafe" },
            { text: "Oppsøk Bakgården (Underverdenen)", target: "scene_alley" },
            { text: "Konkluder saken (Jeg vet hvem det er)", target: "deduction_intro" }
        ]
    },
    // --- HARBOR SCENES ---
    {
        id: "scene_harbor",
        title: "Åstedet: Hurtigrutekaia",
        text: "Blålysene kaster lange skygger over asfalten. Tina ligger bak en rusten container. Huden hennes er blek mot den mørke bakken. Det lukter tang, diesel og ferskt blod. Ingen vitner. Bare lyden av bølgene som slår mot pilarene.",
        image: "crime_scene_harbor.png",
        video: true,
        audio: "harbor",
        learning: {
            question: "Hvor ble liket funnet?",
            options: ["I en bil", "Bak en container", "På en båt"],
            correct: 1,
            feedback: "Korrekt. Hun ble funnet skjult bak en container."
        },
        choices: [
            { text: "Ransak lommene hennes", target: "harbor_pockets" },
            { text: "Søk i området rundt liket", target: "harbor_ground" },
            { text: "Forlat åstedet", target: "scene_choice" }
        ]
    },
    {
        id: "harbor_pockets",
        title: "En gjennomvåt billett",
        text: "Du fisker opp en papirlapp fra jakkelommen hennes. En fergebillett fra Vestnes. Stemplet i kveld klokken 19:45. Hun kom altså til byen for bare noen timer siden. Hvem visste at hun kom? Var det noen som ventet på henne?",
        image: "crime_scene_harbor.png",
        audio: "harbor",
        clue: { id: "ticket", name: "Fergebillett", description: "Bevis på at hun ankom 19:45." },
        timelineEvent: { id: "ferry_arrival", time: "19:45", description: "Tina ankommer Molde med ferge." },
        learning: {
            question: "Hvor kom Tina fra?",
            options: ["Ålesund", "Vestnes", "Kristiansund"],
            correct: 1,
            feedback: "Riktig. Billetten var fra Vestnes."
        },
        next: "scene_harbor"
    },
    {
        id: "harbor_ground",
        title: "Messingknappen",
        text: "Noe glimter i en vanndam ved siden av hånden hennes. Du plukker det opp. En tung knapp i messing, av typen som sitter på gamle militærjakker eller dyre frakker. Den er revet av med makt. Morderen må ha mistet den i kampens hete.",
        image: "crime_scene_harbor.png",
        audio: "harbor",
        clue: { id: "button", name: "Messingknapp", description: "Revet av morderens jakke." },
        learning: {
            question: "Hva slags materiale er knappen laget av?",
            options: ["Gull", "Sølv", "Messing"],
            correct: 2,
            feedback: "Stemmer. Det er en messingknapp."
        },
        next: "scene_harbor"
    },

    // --- APARTMENT SCENES ---
    {
        id: "scene_apartment",
        title: "Tinas Leilighet",
        text: "Døren er ulåst. Inne lukter det innestengt og billig parfyme. Leiligheten er endevendt. Skuffer er dratt ut, klær ligger strødd. Noen lette etter noe, eller så var de bare rasende.",
        image: "tina_apartment.png",
        audio: "rain",
        learning: {
            question: "Hvordan ser leiligheten ut?",
            options: ["Ryddig og ren", "Endevendt og rotete", "Tom"],
            correct: 1,
            feedback: "Ja, noen har romstert voldsomt her."
        },
        choices: [
            { text: "Undersøk soverommet", target: "apt_bedroom" },
            { text: "Sjekk kjøkkenbordet", target: "apt_kitchen" },
            { text: "Gå ut igjen", target: "scene_choice" }
        ]
    },
    {
        id: "apt_bedroom",
        title: "En låst hemmelighet",
        text: "Under sengen finner du en liten safe. På nattbordet står et bilde av en eldre kvinne med sørgebånd. 'Mamma, 1950-2005'. Ved siden av ligger en lapp: 'Koden er året alt raknet'.",
        image: "tina_apartment.png",
        audio: "rain",
        challenge: {
            question: "Hva er koden til safen? (Årstallet moren døde)",
            answer: "2005",
            correctTarget: "apt_safe_open"
        }
    },
    {
        id: "apt_safe_open",
        title: "Dagboken",
        text: "Safen klikker opp. Inni ligger en dagbok med eselører. Du blar til siste side. Skriften er hard og ujevn: 'Lars var her igjen. Han er gal. Han sa at hvis jeg ikke ble sammen med ham igjen, skulle ingen andre få meg heller. Jeg er livredd.'",
        image: "tina_apartment.png",
        audio: "rain",
        clue: { id: "diary", name: "Dagbok", description: "Beskriver trusler fra Lars." },
        note: "Motiv: Lars truet henne. 'Ingen andre skal få deg'.",
        learning: {
            question: "Hvem er Tina redd for?",
            options: ["Frank", "Lars", "Olav"],
            correct: 1,
            feedback: "Riktig. Hun skriver om Lars i dagboken."
        },
        next: "scene_apartment"
    },
    {
        id: "apt_kitchen",
        title: "Den siste meldingen",
        text: "På kjøkkenbordet ligger mobilen hennes. Skjermen er knust, men den virker fortsatt. Du tørker vekk litt tørket blod og åpner innboksen. Der ligger den siste meldingen hun leste.",
        image: "tina_apartment.png",
        audio: "rain",
        timelineEvent: { id: "sms_received", time: "20:10", description: "Tina mottar trusselmelding." },
        note: "SMS fra Lars (20:10): 'Jeg vet du kommer med ferga. Jeg venter på kaia.'",
        next: "scene_phone_read"
    },
    {
        id: "scene_phone_read",
        title: "Trusselen",
        text: "Meldingen er fra 'Lars' og kom klokken 20:10: 'Jeg vet du kommer med 19:45-ferga. Jeg står på kaia og venter. Vi er ikke ferdige.' Det går kaldt nedover ryggen din. Han visste nøyaktig hvor hun var.",
        image: "tina_apartment.png",
        audio: "rain",
        learning: {
            question: "Hva visste Lars?",
            options: ["Hvor hun bodde", "Hvilken ferge hun tok", "Hvor hun jobbet"],
            correct: 1,
            feedback: "Korrekt. Han visste om 19:45-fergen."
        },
        next: "scene_apartment"
    },

    // --- CAFE SCENES ---
    {
        id: "scene_cafe",
        title: "Café Molde",
        text: "Kafeen er stengt for kvelden. Gjennom vinduet ser du Olav og Berit som vasker gulvene. Du banker på. Olav låser opp, irritert.",
        image: "restaurant_interior.png",
        video: true,
        audio: "cafe",
        choices: [
            { text: "Avhør Berit (Kollega)", target: "cafe_berit" },
            { text: "Snakk med Olav (Sjefen)", target: "cafe_olav" },
            { text: "Gå ut i regnet igjen", target: "scene_choice" }
        ]
    },
    {
        id: "cafe_berit",
        title: "Berits løgn",
        text: "Berit skjelver på hendene når hun tenner en sigarett. 'Jeg? Jeg har ikke sett Tina i dag. Jeg jobbet til stengetid, klokken 21:00. Du kan sjekke timelisten.'",
        image: "restaurant_interior.png",
        audio: "cafe",
        learning: {
            question: "Hva gjør Berit mens hun snakker?",
            options: ["Ler", "Gråter", "Skjelver på hendene"],
            correct: 2,
            feedback: "Riktig. Hun er nervøs og skjelver."
        },
        choices: [
            { text: "Sjekk timelisten på veggen", target: "cafe_log_check" },
            { text: "La det ligge", target: "scene_cafe" }
        ]
    },
    {
        id: "cafe_log_check",
        title: "Timelisten",
        text: "Du går bort til vaktlisten som henger ved kassen. Det står svart på hvitt: 'Berit: 16:00 - 20:30'. Hun løy. Hvorfor?",
        image: "restaurant_interior.png",
        audio: "cafe",
        challenge: {
            question: "Stemmer Berits alibi? (Ja/Nei)",
            answer: ["nei", "n"],
            correctTarget: "berit_lie"
        }
    },
    {
        id: "berit_lie",
        title: "Tilståelsen",
        text: "Berit bryter sammen. 'Ok! Jeg stakk tidlig. Jeg... jeg stjal noen hundrelapper fra kassen og ville ikke bli tatt. Men jeg rørte ikke Tina! Jeg lover!' Hun virker som en småtyv, ikke en morder.",
        image: "restaurant_interior.png",
        audio: "cafe",
        timelineEvent: { id: "berit_leaves", time: "20:30", description: "Berit drar fra kafeen (Alibi-hull)." },
        note: "Berit: Løy om tiden, men kun for å skjule tyveri.",
        next: "scene_cafe"
    },
    {
        id: "cafe_olav",
        title: "Mannen i frakken",
        text: "Olav lener seg over disken. 'Det var en fyr her og lette etter henne tidligere. Høy, mørk, så ut som han hadde sovet i klærne sine. Han hadde en sånn gammel militærjakke med messingknapper. Han virket... ustabil.'",
        image: "restaurant_interior.png",
        audio: "cafe",
        note: "Vitne: Mann med militærjakke og messingknapper lette etter Tina.",
        learning: {
            question: "Hvordan beskriver Olav mannen?",
            options: ["Velkledd og rolig", "Ustabil med militærjakke", "Liten og redd"],
            correct: 1,
            feedback: "Stemmer. Beskrivelsen passer på Lars."
        },
        next: "scene_cafe"
    },

    // --- ALLEY SCENES (Frank & Lars) ---
    {
        id: "scene_alley",
        title: "Bakgården",
        text: "Bakgatene i Molde er mørke og trange. Her holder byens løse fugler til. Frank, en lokal fikser, står under et takoverbygg og røyker.",
        image: "cover_molde.png",
        audio: "rain",
        choices: [
            { text: "Press Frank for info", target: "alley_frank" },
            { text: "Sjekk skyggene lenger inn", target: "alley_clues" },
            { text: "Dra herfra", target: "scene_choice" }
        ]
    },
    {
        id: "alley_frank",
        title: "Frank snakker",
        text: "'Tina? Ja, hun skyldte meg penger. Mye penger. Hun ringte meg 20:15, helt hysterisk. Sa hun var på kaia og at 'han' hadde funnet henne. Jeg sa hun skulle løpe, men så ble linjen brutt.'",
        image: "cover_molde.png",
        audio: "rain",
        timelineEvent: { id: "frank_call", time: "20:15", description: "Tina ringer Frank i panikk." },
        note: "Frank: Hørte Tina var redd på kaia kl 20:15.",
        next: "scene_alley"
    },
    {
        id: "alley_clues",
        title: "Konfrontasjonen",
        text: "Du hører tunge pust i mørket. En skikkelse prøver å smyge seg unna. Du trekker våpenet. 'Stå stille!' Det er Lars. Han ser herjet ut. Og han har på seg en gammel militærjakke.",
        image: "cover_molde.png",
        audio: "rain",
        choices: [
            { text: "Sjekk jakken hans", target: "lars_jacket" }
        ]
    },
    {
        id: "lars_jacket",
        title: "Det manglende beviset",
        text: "Du lyser på ham med lommelykten. Jakken er skitten. Og nederst, på høyre side, mangler det en knapp. En messingknapp. Trådene henger løse.",
        image: "cover_molde.png",
        audio: "rain",
        note: "Bevis: Lars mangler en knapp som matcher den på åstedet.",
        learning: {
            question: "Hva mangler på jakken til Lars?",
            options: ["En hette", "En glidelås", "En knapp"],
            correct: 2,
            feedback: "Riktig! En fellende bevis."
        },
        next: "lars_interrogation"
    },
    {
        id: "lars_interrogation",
        title: "Lars lyver",
        text: "'Jeg har ikke gjort noe! Jeg var på kino! Jeg så den nye actionfilmen. Den startet klokken 20:00!' Han svetter, og blikket flakker.",
        image: "cover_molde.png",
        audio: "rain",
        choices: [
            { text: "Sjekk kinoprogrammet på mobilen", target: "lars_alibi_check" }
        ]
    },
    {
        id: "lars_alibi_check",
        title: "Kinoprogrammet",
        text: "Du sjekker raskt nettet. Kinoprogrammet viser at forestillingen kl 20:00 ble avlyst på grunn av en vannlekkasje i salen.",
        image: "cover_molde.png",
        audio: "rain",
        challenge: {
            question: "Snakker Lars sant om kinoen? (Ja/Nei)",
            answer: ["nei", "n"],
            correctTarget: "lars_exposed"
        }
    },
    {
        id: "lars_exposed",
        title: "Fanget i løgn",
        text: "Du viser ham skjermen. 'Filmen gikk aldri, Lars.' Han synker sammen. Alt håp forlater øynene hans. Du har ham.",
        image: "cover_molde.png",
        audio: "rain",
        setFlag: "lars_suspect",
        next: "scene_choice"
    },

    // --- DEDUCTION & ENDING ---
    {
        id: "deduction_intro",
        title: "Tid for sannheten",
        text: "Brikkene faller på plass. Du har tidslinjen. Du har motivet. Du har beviset. Det er på tide å peke ut svinet som gjorde dette.",
        image: "detective_office.png",
        audio: "office",
        type: "deduction"
    },
    {
        id: "solved",
        title: "Rettferdighet",
        text: "Du setter håndjernene på Lars. Han gjør ikke motstand. 'Jeg elsket henne,' hvisker han. 'Men hun ville dra. Hun skulle møte Frank og betale gjelden for å reise vekk. Jeg kunne ikke la henne dra.'\n\nSaken er løst. Men regnet i Molde stopper aldri.",
        image: "cover_molde.png",
        audio: "rain",
        choices: [
            { text: "Start en ny sak (Spill igjen)", target: "cover" }
        ]
    }
];
