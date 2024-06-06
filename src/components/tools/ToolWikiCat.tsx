import { Dispatch, HTMLProps, SetStateAction, useState } from "react";
import { linkWiki } from "../../Const";
import { possessive } from "../../utils/catUtils";
import { WikiImageWithCaption, WikiSighting, wikiCatPageTemplate } from "../../utils/wikiUtils";
import "./ToolWikiCat.css"
import moment from "moment";

const fileUploadLink = `${linkWiki}/Special:Upload`

const m = moment();
const dateNow = m.format("MMMM DD, YYYY")

export function ToolWikiCat() {
    const catName = useState("")
    const catPfpFilename = useState("")
    const catPfpCaption = useState("")
    const catBreed = useState("")
    const catCoat = useState("")
    const catGender = useState("")
    const catRarity = useState("")
    const catAppearance = useState("")
    const catFirst = useState(dateNow)
    const intro = useState("")
    const behaviour = useState("")
    const appearance = useState("")
    const appearanceFilename = useState("")
    const appearanceCaption = useState("")
    const [sightings, setSightings] = useState<WikiSighting[]>([])
    const [gallery, setGallery] = useState<WikiImageWithCaption[]>([{ caption: "", filename: "" }])

    const catNameStr = catName[0] || "your cat"

    const linkCatNameWiki = `${linkWiki}/${catNameStr}`;
    const completedSourceText = wikiCatPageTemplate(
        catNameStr, { caption: catPfpCaption[0], filename: catPfpFilename[0] }, catBreed[0], catCoat[0], catGender[0], catRarity[0], catAppearance[0], catFirst[0],
        intro[0], behaviour[0], appearance[0], { caption: appearanceCaption[0], filename: appearanceFilename[0] }, sightings, gallery,
    )

    return <>
        <div>
            <h3>1. Name your cat</h3>
            <label htmlFor="catname">Cat name: </label>
            <WikiCatTextBox id="catname" placeholder="eg. Mrs. Kirby" state={catName} />
            <br />
            <label htmlFor="catwiki">Check your cat name has not been taken! <br /> The link below should be an empty page:</label>
            <br />
            <a id="catwiki" href={linkCatNameWiki}>{linkCatNameWiki}</a>
        </div>
        <div>
            <h3>2. Enter {possessive(catNameStr)} information</h3>
            <label htmlFor="catbreed">breed: </label>
            <WikiCatTextBox id="catbreed" placeholder="eg. Domestic Shorthair" state={catBreed} />
            <br />
            <label htmlFor="catcoat">coat: </label>
            <WikiCatTextBox id="catcoat" placeholder="eg. Calico" state={catCoat} />
            <br />
            <label htmlFor="catgender">sex: </label>
            <WikiCatTextBox id="catgender" placeholder="eg. Female" state={catGender} />
            <br />
            <label htmlFor="catrarity">rarity: </label>
            <WikiCatTextBox id="catrarity" placeholder="eg. Common" state={catRarity} />
            <br />
            <label htmlFor="catappearance">appearance: </label>
            <WikiCatTextBox id="catappearance" placeholder="eg. Brown and orange calico with a very soft face and a kirby-shaped collection of blobs on her back." state={catAppearance} />
            <br />
            <label htmlFor="catfirst">first sighting: </label>
            <WikiCatTextBox id="catfirst" placeholder="eg. February 04, 2024." state={catFirst} />
            <br />
            <br />
            <div>Upload an image for {possessive(catNameStr)} profile photo: <WikiUpload /></div>
            <label htmlFor="catpfp">Profile Picture Filename: </label>
            <WikiCatTextBox id="catpfp" placeholder="eg. KirbyPfp.png" state={catPfpFilename} />
            <br />
            <label htmlFor="catpfpc">Profile Picture Caption: </label>
            <WikiCatTextBox id="catpfpc" placeholder="eg. Mrs. Kirby herself" state={catPfpCaption} />
        </div>
        <div>
            <h3>3. Write the main text</h3>
            <h4>3.1 Introduction</h4>
            <ul>
                <li>Who is {catNameStr}?</li>
                <li>Why are they called {catNameStr}?</li>
                <li>What feeder do they appear at?</li>
            </ul>
            <WikiCatTextArea id="intro" type="textarea" placeholder={`Write an introduction to ${catNameStr}`} state={intro} />
            <h4>3.2 Behaviour</h4>
            <ul>
                <li>How does {catNameStr} act when eating or around other cats?</li>
                <li>Do they like/not like any other cats at the feeder?</li>
            </ul>
            <WikiCatTextArea id="Behaviour" type="textarea" placeholder={`Write about ${possessive(catNameStr)} behaviour`} state={behaviour} />
            <h4>3.3 Appearance</h4>
            <ul>
                <li>What are {possessive(catNameStr)} distinguishing features?</li>
                <li>Any similar looking cats they could be confused with? How do you tell the difference?</li>
            </ul>
            <WikiCatTextArea id="Appearance" type="textarea" placeholder={`Write about ${possessive(catNameStr)} appearance`} state={appearance} />
            <br />
            <div>Upload an image which shows {possessive(catNameStr)} appearance: <WikiUpload /></div>
            <label htmlFor="catfirst">Appearance Image Filename: </label>
            <WikiCatTextBox id="catfirst" placeholder="eg. KirbyFromAbove.png" state={appearanceFilename} />
            <br />
            <label htmlFor="catfirst">Appearance Image Caption: </label>
            <WikiCatTextBox id="catfirst" placeholder="eg. Mrs. Kirby seen from above. " state={appearanceCaption} />
        </div>
        <div>
            <h3>3. Add {possessive(catNameStr)} sightings</h3>
            <table className="tableWikiCat">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Text</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="inputLongWikiCat" type="text" readOnly disabled value={catFirst[0]} />
                        </td>
                        <td>
                            <input className="inputLongWikiCat" size={35} type="text" placeholder="eg. At 02:50 AM (LFT) ..." />
                        </td>
                    </tr>
                    {sightings.map((sighting, i) => <tr key={i}>
                        <td>
                            <input className="inputLongWikiCat" type="text" value={sighting.date} onChange={(ev) => {
                                sightings[i].date = ev.target.value;
                                setSightings([...sightings])
                            }} />
                        </td>
                        <td>
                            <input className="inputLongWikiCat" size={35} type="text" value={sighting.text} onChange={(ev) => {
                                sightings[i].text = ev.target.value;
                                setSightings([...sightings])
                            }} />
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick={(ev) => setSightings([...sightings, { date: dateNow, text: "" }])}>Add another sighting</button>
            <button onClick={(ev) => { sightings.pop(); setSightings([...sightings]) }}>Remove last sighting</button>
        </div>
        <div>
            <h3>4. Add gallery images</h3>
            <WikiUpload />
            <table className="tableWikiCat">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Caption</th>
                    </tr>
                </thead>
                <tbody>
                    {gallery.map((img, i) => <tr key={i}>
                        <td>
                            <input type="text" className="inputLongWikiCat" value={img.filename} placeholder="eg. Kirby.png" onChange={(ev) => {
                                gallery[i].filename = ev.target.value;
                                setGallery([...gallery])
                            }} />
                        </td>
                        <td>
                            <input type="text" className="inputLongWikiCat" size={35} value={img.caption} placeholder="eg. Mrs. Kirby hears the voices." onChange={(ev) => {
                                gallery[i].caption = ev.target.value;
                                setGallery([...gallery])
                            }} />
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick={(ev) => setGallery([...gallery, { filename: "", caption: "" }])}>Add another image</button>
            <button onClick={(ev) => { gallery.pop(); setGallery([...gallery]) }}>Remove last image</button>

        </div>
        <div>
            <h3>5. Completed Source Text</h3>
            <div>Copy source text onto the empty page, make sure to check everything looks good before publishing</div>
            <button onClick={() => navigator.clipboard.writeText(completedSourceText)}>Copy Source Text</button><br />
            <textarea className="textareaWikiCat" rows={15} value={completedSourceText} readOnly disabled />
        </div>
        <br />
        <br />
        <br />
    </>
}

function WikiCatTextBox<T extends string>(props: HTMLProps<HTMLInputElement> & { state: [string, Dispatch<SetStateAction<string>>] }) {
    const { state, ...rest } = props;
    return <input {...rest} value={state[0]} onInput={(ev) => state[1](ev.currentTarget.value as T)} />
}
function WikiCatTextArea<T extends string>(props: HTMLProps<HTMLTextAreaElement> & { state: [string, Dispatch<SetStateAction<string>>] }) {
    const { state, ...rest } = props;
    return <textarea className="textareaWikiCat" rows={3}  {...rest} value={state[0]} onInput={(ev) => state[1](ev.currentTarget.value as T)} />
}
function WikiUpload() {
    return <button onClick={() => window.open(fileUploadLink)}>Upload Files to Wiki</button>
}