import { Dispatch, HTMLProps, SetStateAction, useState } from "react";
import { linkWiki } from "../../Const";
import { possessive } from "../../utils/catUtils";
import { WikiImageWithCaption, WikiSighting, wikiCatPageTemplate } from "../../utils/wikiUtils";
import "./ToolWikiCat.css"
import moment from "moment";
import { Divider } from "../Divider";

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
    const catOccupation = useState("")
    const catAppearance = useState("")
    const catFirst = useState(dateNow)
    const catFirstText = useState("")
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
        catNameStr, { caption: catPfpCaption[0], filename: catPfpFilename[0] }, catBreed[0], catCoat[0], catGender[0], catRarity[0], catOccupation[0], catAppearance[0], catFirst[0],
        intro[0], behaviour[0], appearance[0], { caption: appearanceCaption[0], filename: appearanceFilename[0] }, [{ date: catFirst[0], text: catFirstText[0] }, ...sightings], gallery,
    )

    return <>
        <div>
            <h2>1. Name your cat</h2>
            <label htmlFor="catname">Enter your cat name: </label>
            <WikiCatTextBox id="catname" placeholder="eg. Mrs. Kirby" state={catName} />
            <ul>
                <li>Mr Mrs and Ms should have a "." for example use Mrs. Kirby and not Mrs Kirby</li>
                <li>
                    <label htmlFor="catwiki">Check your cat name has not been taken! <br /> The link below should be an empty page:</label>
                    <ul>
                        <li><a id="catwiki" href={linkCatNameWiki} target="_blank" rel="noopener noreferrer">{linkCatNameWiki}</a></li>
                    </ul>
                </li>

            </ul>
        </div>
        <Divider />
        <div>
            <h2>2. Enter {possessive(catNameStr)} information</h2>
            <ul>
                <li>
                    <label htmlFor="catbreed">Breed: </label>
                    <WikiCatTextBox id="catbreed" placeholder="eg. Domestic Shorthair" state={catBreed} />
                </li>
                <li>
                    <label htmlFor="catcoat">Coat: </label>
                    <WikiCatTextBox id="catcoat" placeholder="eg. Calico" state={catCoat} />
                </li>
                <li>
                    <label htmlFor="catgender">Sex: </label>
                    <WikiCatTextBox id="catgender" placeholder="eg. Female" state={catGender} />
                </li>
                <li>
                    <label htmlFor="catrarity">Rarity: </label>
                    <WikiCatTextBox id="catrarity" placeholder="eg. Common" state={catRarity} />
                </li>
                <li>
                    <label htmlFor="catoccupation">Occupation: </label>
                    <WikiCatTextBox id="catoccupation" placeholder="eg. Professional boxer" state={catOccupation} />
                </li>
                <li>
                    <label htmlFor="catappearance">Appearance: </label>
                    <WikiCatTextBox id="catappearance" placeholder="eg. Brown and orange calico with a very soft face and a kirby-shaped collection of blobs on her back." state={catAppearance} />
                </li>
                <li>
                    <label htmlFor="catfirst">First sighting: </label>
                    <WikiCatTextBox id="catfirst" placeholder="eg. February 04, 2024." state={catFirst} />
                </li>
                <li>
                    <div>Upload an image for {possessive(catNameStr)} profile photo: <WikiUpload /></div>
                    <ul>
                        <li>
                            <label htmlFor="catpfp">Profile Picture Filename: </label>
                            <WikiCatTextBox id="catpfp" placeholder="eg. KirbyPfp.png" state={catPfpFilename} />
                        </li>
                        <li>
                            <label htmlFor="catpfpc">Profile Picture Caption: </label>
                            <WikiCatTextBox id="catpfpc" placeholder="eg. Mrs. Kirby herself" state={catPfpCaption} />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <Divider />
        <div>
            <h2>3. Write the main text</h2>
            <sub>
                <ul>
                    <li>Tip: You can use [[Link]] to link to other wiki pages. eg. [[Mrs. Kirby]] will make a link to Mrs. Kirby's page</li>
                </ul>
            </sub>
            <h4>3.1 Introduction</h4>
            <ul>
                <li>Who is {catNameStr}?</li>
                <li>Why are they named {catNameStr}?</li>
                <li>What feeder do they appear at?</li>
                <li>Any notable events where {catNameStr} was involved?</li>
            </ul>
            <WikiCatTextArea id="intro" type="textarea" placeholder={`Write an introduction to ${catNameStr}`} state={intro} />
            <h4>3.2 Behaviour</h4>
            <ul>
                <li>How does {catNameStr} act when eating?</li>
                <li>How does {catNameStr} act around other cats?</li>
                <li>Do they like/not like any specific cats at the feeder?</li>
            </ul>
            <WikiCatTextArea id="Behaviour" type="textarea" placeholder={`Write about ${possessive(catNameStr)} behaviour`} state={behaviour} />
            <h4>3.3 Appearance</h4>
            <ul>
                <li>Upload an image which shows {possessive(catNameStr)} appearance: <WikiUpload />
                    <ul>
                        <li>
                            <label htmlFor="catfirst">Appearance Image Filename: </label>
                            <WikiCatTextBox id="catfirst" placeholder="eg. KirbyFromAbove.png" state={appearanceFilename} />
                        </li>
                        <li>
                            <label htmlFor="catfirst">Appearance Image Caption: </label>
                            <WikiCatTextBox id="catfirst" placeholder="eg. Mrs. Kirby seen from above. " state={appearanceCaption} />
                        </li>
                    </ul>
                </li>
            </ul>
            <ul>
                <li>What are {possessive(catNameStr)} distinguishing features?</li>
                <li>Best way to identify {catNameStr}?</li>
                <li>Any similar looking cats they could be confused with? and how do you tell the difference?</li>
            </ul>
            <WikiCatTextArea id="Appearance" type="textarea" placeholder={`Write about ${possessive(catNameStr)} appearance`} state={appearance} />
        </div>
        <Divider />
        <div>
            <h2>3. Add {possessive(catNameStr)} sightings</h2>
            <sub>
                <ul>
                    <li>Ideally, a cat should have 3 sightings before making a page</li>
                    <li>You can use <a href="/tools/checker" target="_blank" rel="noopener noreferrer">Meow.camera checker</a> to check the date and time of your screenshots</li>
                </ul>
            </sub>
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
                            <WikiCatTextArea className="textareaWikiCat" rows={1} type="text" placeholder="eg. First sighting at 02:50 AM (LFT) ..." state={catFirstText} />
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
                            <textarea className="textareaWikiCat" rows={1} placeholder="eg. At 02:50 AM (LFT)..." value={sighting.text} onInput={(ev) => {
                                sightings[i].text = ev.currentTarget.value;
                                setSightings([...sightings])
                            }} />
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick={(_ev) => setSightings([...sightings, { date: dateNow, text: "" }])}>Add another sighting</button>
            <button onClick={(_ev) => { sightings.pop(); setSightings([...sightings]) }}>Remove last sighting</button>
        </div>
        <Divider />
        <div>
            <h2>4. Add gallery images</h2>
            <sub>Add many different angles of the cat to make it easy to identify!</sub>
            <br />
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
            <button onClick={(_ev) => setGallery([...gallery, { filename: "", caption: "" }])}>Add another image</button>
            <button onClick={(_ev) => { gallery.pop(); setGallery([...gallery]) }}>Remove last image</button>
        </div>
        <Divider />
        <div>
            <h2>5. Completed Source Text</h2>
            <div>Copy the source text onto the empty page:</div>
            <ul>
                <li>Go to your empty page on the Wiki at <a href={linkCatNameWiki} target="_blank" rel="noopener noreferrer">{linkCatNameWiki}</a></li>
                <li>Click on "Create Source"</li>
                <li>Copy and paste the source text below into the wiki page</li>
                <li>Click "Show preview" and make sure everything looks good</li>
                <li>Make any adjustments needed, and then save!</li>
            </ul>
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
    return <textarea className="textareaWikiCat" rows={3} {...rest} value={state[0]} onInput={(ev) => state[1](ev.currentTarget.value as T)} />
}
function WikiUpload() {
    return <button onClick={() => window.open(fileUploadLink)}>Upload Files to Wiki</button>
}