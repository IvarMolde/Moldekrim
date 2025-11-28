import './styles/index.css'
import heroImage from './assets/hero.png'
import businessImage from './assets/business.png'

document.querySelector('#app').innerHTML = `
  <header class="header">
    <div class="container header-content">
      <div class="logo">LingX</div>
      <nav class="nav">
        <a href="#tjenester">Tjenester</a>
        <a href="#om-oss">Om oss</a>
        <a href="#kontakt" class="btn btn-primary">Kontakt oss</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero section">
      <div class="container grid grid-cols-2">
        <div class="hero-content">
          <h1 class="mb-md">Mestre språket.<br>Mestre hverdagen.</h1>
          <p class="mb-lg">Vi hjelper voksne innvandrere med norskopplæring, jobbsøking og digital kompetanse. Skreddersydd opplæring for både privatpersoner og bedrifter.</p>
          <div class="hero-actions">
            <a href="#privat" class="btn btn-primary">For Privatpersoner</a>
            <a href="#bedrift" class="btn btn-outline">For Bedrifter</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="${heroImage}" alt="Undervisningssituasjon" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-xl);">
        </div>
      </div>
    </section>

    <section id="tjenester" class="section" style="background-color: white;">
      <div class="container">
        <div class="text-center mb-xl">
          <h2 class="mb-sm">Våre Tjenester</h2>
          <p>Vi tilbyr helhetlig bistand for å lykkes i det norske samfunnet.</p>
        </div>
        
        <div class="grid grid-cols-3">
          <div class="card">
            <h3 class="mb-sm">Norskopplæring</h3>
            <p class="mb-md">Digital undervisning tilpasset ditt nivå. Vi fokuserer på praktisk bruk av språket i hverdagen og arbeidslivet.</p>
            <a href="#" class="btn-link">Les mer &rarr;</a>
          </div>
          <div class="card">
            <h3 class="mb-sm">Jobb & Karriere</h3>
            <p class="mb-md">Vi hjelper deg med å skrive CV, søknader og forberede deg til jobbintervju. Øk sjansene dine for å få jobb.</p>
            <a href="#" class="btn-link">Les mer &rarr;</a>
          </div>
          <div class="card">
            <h3 class="mb-sm">Digital Kompetanse</h3>
            <p class="mb-md">Lær å bruke e-post, sosiale medier, nettbank og offentlige tjenester som NAV og Altinn.</p>
            <a href="#" class="btn-link">Les mer &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <section id="bedrift" class="section">
      <div class="container grid grid-cols-2">
         <div class="bedrift-image">
          <img src="${businessImage}" alt="Bedriftsmøte" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-xl);">
        </div>
        <div class="bedrift-content">
          <h2 class="mb-md">For Bedrifter</h2>
          <p class="mb-md">Har dere ansatte som trenger å styrke sine norskferdigheter? Vi tilbyr skreddersydd språkopplæring direkte på arbeidsplassen eller digitalt, tilpasset bransjen og arbeidsoppgavene.</p>
          <ul class="mb-lg" style="list-style: none; padding-left: 0;">
            <li class="mb-xs">✓ Yrkesrettet norsk</li>
            <li class="mb-xs">✓ Kommunikasjon på arbeidsplassen</li>
            <li class="mb-xs">✓ Sikkerhetskultur og HMS</li>
          </ul>
          <a href="#kontakt" class="btn btn-secondary">Få et tilbud</a>
        </div>
      </div>
    </section>

    <section id="om-oss" class="section" style="background-color: var(--color-primary); color: white;">
      <div class="container text-center">
        <h2 class="mb-md" style="color: white;">Om LingX</h2>
        <p class="mb-lg" style="max-width: 700px; margin-left: auto; margin-right: auto;">
          LingX ble startet med et mål om å bygge broer. Vi tror at språk og digital forståelse er nøkkelen til inkludering og suksess i det norske samfunnet. Vårt team består av erfarne pedagoger og veiledere.
        </p>
      </div>
    </section>

    <section id="kontakt" class="section">
      <div class="container">
        <div class="text-center mb-xl">
          <h2>Kontakt Oss</h2>
          <p>Lurer du på noe? Ta kontakt for en uforpliktende prat.</p>
        </div>
        <div style="max-width: 600px; margin: 0 auto;">
          <form class="card">
            <div class="mb-md">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Navn</label>
              <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" placeholder="Ditt navn">
            </div>
            <div class="mb-md">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">E-post</label>
              <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" placeholder="din@epost.no">
            </div>
            <div class="mb-md">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Melding</label>
              <textarea rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" placeholder="Hva kan vi hjelpe deg med?"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Send melding</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer section" style="background-color: var(--color-primary-light); color: white; padding: var(--spacing-lg) 0;">
    <div class="container text-center">
      <p>&copy; 2024 LingX. Alle rettigheter reservert.</p>
    </div>
  </footer>
`
