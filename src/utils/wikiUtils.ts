export type WikiImageWithCaption = {
    filename: string,
    caption: string,
}

export type WikiSighting = {
    date: string,
    text: string
}

export function wikiCatPageTemplate(
    name: string,
    pfp: WikiImageWithCaption,
    breed: string,
    coat: string,
    sex: string,
    rarity: string,
    appearance: string,
    firstSighting: string,
    pIntroduction: string,
    pBehavior: string,
    pAppearance: string,
    pAppearanceImg: WikiImageWithCaption,
    sightings: WikiSighting[],
    gallery: WikiImageWithCaption[],
) {
    return `{{CatInfobox|name=${name}|image=${pfp.filename}|caption=${pfp.caption}|breed=${breed}|coat=${coat}|sex=${sex}|rarity=${rarity}|appearance=${appearance}|first_sighting=${firstSighting}}
${pIntroduction}

== Behavior ==
${pBehavior}

== Appearance ==
${pAppearance}
[[File:${pAppearanceImg.filename}|none|thumb|207x207px|${pAppearanceImg.caption}]]

== Sightings ==
=== Month Year ===
${processSightings(sightings)}

{{Sighting Disclaimer}}

== Gallery ==
<gallery>
${processGallery(gallery)}
</gallery>

{{Cat Footer}}
[[Category:Cats]]
[[Category:Templates]]
`
}

function processSightings(sightings: WikiSighting[]) {
    return sightings.map((sighting) => `* '''${sighting.date}:''' ${sighting.text}`)
}

function processGallery(gallery: WikiImageWithCaption[]) {
    return gallery.map((img) => `${img.filename}|${img.caption}`).join("\n")
}