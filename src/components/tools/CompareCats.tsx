import { useEffect, useState } from "react"
import "./CompareCats.css"
import { CatData, CatDataMap, FeederList } from "../../Types"
import { fetchFeederCatList, fetchFeederCatMap, getCatUrl, getCatUrlImg } from "../../utils/fetchUtils";
import { CatImage } from "../CatImage";

type CompareCatsProps = {
    feederList: FeederList;
}

export default function CompareCats(props: CompareCatsProps) {
    const { feederList } = props;

    const [feeder1, setFeeder1] = useState("");
    const [catList1, setCatList1] = useState<CatDataMap>({});
    const [cat1, setCat1] = useState("");
    const [feeder2, setFeeder2] = useState("");
    const [catList2, setCatList2] = useState<CatDataMap>({});
    const [cat2, setCat2] = useState("");

    useEffect(() => {
        async function fetchData() {
            setCat1("")
            setCatList1({})
            if (feeder1) {
                const catList = await fetchFeederCatMap(feeder1);
                setCatList1(catList)
            }
        }
        fetchData();
    }, [feeder1]);

    useEffect(() => {
        async function fetchData() {
            setCat2("")
            setCatList2({})
            if (feeder2) {
                const catList = await fetchFeederCatMap(feeder2);
                setCatList2(catList)
            }
        }
        fetchData();
    }, [feeder2]);

    return <>
        <div>
            <table className="compareTable idTable">
                <colgroup>
                    <col span={2} className="identifierCol" />
                </colgroup>
                <thead>
                    <th>
                        Cat 1
                    </th>
                    <th>
                        Cat 2
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Feeder
                            <select className="compareTable" id="" value={feeder1} onChange={(ev) => setFeeder1(ev.target.value)}>
                                <option value="">Select a feeder...</option>
                                {feederList.map(feeder => <option key={feeder.__feeder} value={feeder.__feeder}>{feeder.name}</option>)}
                            </select>
                        </td>
                        <td>
                            Feeder
                            <select className="compareTable" id="" value={feeder2} onChange={(ev) => setFeeder2(ev.target.value)}>
                                <option value="">Select a feeder...</option>
                                {feederList.map(feeder => <option key={feeder.__feeder} value={feeder.__feeder}>{feeder.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {feeder1 && <select className="compareTable" id="" value={cat1} onChange={(ev) => setCat1(ev.target.value)}>
                                <option value="">Select a cat...</option>
                                {Object.values(catList1).map(cat => <option key={cat.__cat} value={cat.__cat}>{cat.name}</option>)}
                            </select>}
                        </td>
                        <td>

                            {feeder2 && <select className="compareTable" id="" value={cat2} onChange={(ev) => setCat2(ev.target.value)}>
                                <option value="">Select a cat...</option>
                                {Object.values(catList2).map(cat => <option key={cat.__cat} value={cat.__cat}>{cat.name}</option>)}
                            </select>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {cat1 && <CatImage className='identifierImg' src={getCatUrlImg(catList1[cat1], "front") ?? "/"} />}
                        </td>
                        <td>
                            {cat2 && <CatImage className='identifierImg' src={getCatUrlImg(catList2[cat2], "front") ?? "/"} />}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {cat1 && <CatImage className='identifierImg' src={getCatUrlImg(catList1[cat1], "back") ?? "/"} />}
                        </td>
                        <td>
                            {cat2 && <CatImage className='identifierImg' src={getCatUrlImg(catList2[cat2], "back") ?? "/"} />}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {cat1 && <CatImage className='identifierImg' src={getCatUrlImg(catList1[cat1], "eating") ?? "/"} />}
                        </td>
                        <td>
                            {cat2 && <CatImage className='identifierImg' src={getCatUrlImg(catList2[cat2], "eating") ?? "/"} />}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}