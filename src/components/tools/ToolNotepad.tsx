import { useEffect, useRef, useState } from "react"
import { getLocalStorage, setLocalStorage } from "../../utils/dataUtils"
import { fetchFeederList } from "../../utils/fetchUtils"
import { FeederData, FeederList } from "../../Types"
import { Divider } from "../Divider"
import { linkMeowCamera } from "../../Const"
import { MdDelete, MdDragIndicator } from "react-icons/md"
import "./ToolNotepad.css"
import React from "react"

type StoredFeeder = {
    name: string
    id: string
    desc?: string
}

function getSaved(): StoredFeeder[] {
    const stored = getLocalStorage("notepad");
    if (stored) {
        return JSON.parse(stored) as StoredFeeder[];
    }
    else return [];
}

export default function ToolNotepad() {
    const [list, setList] = useState(getSaved())
    const [feederList, setFeederList] = useState<FeederList>()

    const draggingPos = useRef<number | null>(null);
    const dragOverPos = useRef<number | null>(null);

    const handleDragStart = (position: number) => {
        draggingPos.current = position;
    };

    const handleDragEnter = (position: number) => {
        dragOverPos.current = position;
        const newItems = [...list];
        if (draggingPos.current === null) return;
        const draggingItem = newItems[draggingPos.current];
        if (!draggingItem) return;

        newItems.splice(draggingPos.current, 1);
        newItems.splice(dragOverPos.current, 0, draggingItem);

        const reorderedItems = newItems.map((item, index) => ({
            ...item,
            order: index
        }));

        draggingPos.current = position;
        dragOverPos.current = null;

        setSaveList(reorderedItems);
    };

    useEffect(() => {
        fetchFeederList().then((res) => setFeederList(res));
    }, []);

    function setSaveList(list: StoredFeeder[]) {
        setLocalStorage("notepad", JSON.stringify(list))
        setList(list);
    }

    return (
        <>
            <Divider />
            {list.length > 0 ? list.map((stored, index) => {
                return <ToolNotepadItem
                    index={index} key={stored.id} item={stored} feederList={feederList}
                    onDelete={function (): void {
                        setSaveList(list.filter((item) => item.id !== stored.id))
                    }}
                    handleDragStart={handleDragStart}
                    handleDragEnter={handleDragEnter}
                />
            }) : <div className="notepadEmpty">Notepad is empty, add a feeder below</div>}
            <Divider />
            <ToolNotepadAddNew list={list} onAdd={(newItem) => setSaveList([...list, newItem])} />
        </>
    )
}

type ToolNotepadItemProps = {
    index: number,
    item: StoredFeeder
    feederList: FeederList | undefined
    onDelete: () => void
    handleDragStart: (i: number) => void
    handleDragEnter: (i: number) => void
}

function ToolNotepadItem(props: ToolNotepadItemProps) {
    const { index, item, feederList, onDelete, handleDragStart, handleDragEnter } = props;
    const [identifier, setIdentifier] = useState("")

    useEffect(() => {
        if (feederList) {
            const feeder = feederList.find((feeder: FeederData) => feeder.id === item.id);
            if (feeder) {
                setIdentifier(feeder.__feeder);
            }
        }
    }, [feederList, item])

    return <div className="notepadItem"
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragEnter={() => handleDragEnter(index)}
        onDragOver={(e) => e.preventDefault()}
    >
        <MdDragIndicator size={30} />
        <span className="notepadName">{item.name}</span>
        <span className="notepadDesc">{item.desc}</span>
        {identifier && <a className="linkButton" href={`/${identifier}`}>Identifier</a>}
        <a className="linkButton" href={`${linkMeowCamera}${item.id}`}>Camera</a>
        <button className="notepadX" onClick={onDelete}><MdDelete size={18} /></button>
    </div>
}

type ToolNotepadAddNewProps = {
    onAdd: (newItem: StoredFeeder) => void
    list: StoredFeeder[] | undefined
}


function ToolNotepadAddNew(props: ToolNotepadAddNewProps) {
    const { onAdd, list } = props;

    const [error, setError] = useState("");

    const newName = useRef<HTMLInputElement>(null)
    const newId = useRef<HTMLInputElement>(null)
    const newDesc = useRef<HTMLInputElement>(null)

    return (
        <div>

            <label htmlFor="notepadNewName">Feeder Name</label>
            <br />
            <input id="notepadNewName" type="text" ref={newName} placeholder="eg. Happy Canteen" onChange={() => setError("")} />
            <br />
            <label htmlFor="notepadNewId">Feeder ID<i className="notepadEmpty">(or paste meow.camera link)</i></label>
            <br />
            <input id="notepadNewId" type="text" ref={newId} placeholder={"eg. 4258783365322591678"} onChange={() => setError("")} />
            <br />
            <label htmlFor="notepadNewDesc">Description (optional)</label>
            <br />
            <input id="notepadNewDesc" type="text" ref={newDesc} placeholder={"Write a short description"} />
            <br />
            <button onClick={() => {
                const name = newName.current!.value;
                let id = newId.current!.value;
                const desc = newDesc.current!.value;
                if (!name) {
                    setError("Feeder name is empty!");
                    return;
                }
                if (id) {
                    const matches = id.match(/\d+/);
                    if (matches && matches.length === 1) {
                        id = matches[0];
                        if (list) {
                            const existsAlready = list.find((feeder: StoredFeeder) => feeder.id === id);
                            if (existsAlready) {
                                setError(`You have already added this feeder: ${existsAlready.name}`);
                                return;
                            }
                        }
                        onAdd({ name, id, desc })
                        newName.current!.value = ""
                        newId.current!.value = ""
                        newDesc.current!.value = ""
                        setError("");
                    }
                    else {
                        setError("Invalid Feeder ID!");
                        return;
                    }
                }
                else {
                    setError("Feeder ID is empty!");
                }
            }}>Add</button>
            {error && <div className="warningBox">{error}</div>}
        </div>
    )
}