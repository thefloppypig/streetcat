import { useEffect, useState } from "react"
import { MeowApiCatHouse } from "../Types"
import { fetchFeederMeowCameraApi } from "../utils/fetchUtils"

export type FeederLiveMeowApiProps = {
    id: string
}

export default function FeederLiveMeowApi(props: FeederLiveMeowApiProps) {
    const [load, setLoad] = useState<boolean>(false)
    const [apiData, setApiData] = useState<MeowApiCatHouse | undefined>()

    useEffect(() => {
        if (load) {
            fetchFeederMeowCameraApi(props.id).then((data) => setApiData(data))
        }
    }, [load])

    return <>
        <div>
            <br />
            {apiData ? <>
                <div>
                    <table className="dataTable">
                        <tbody>
                            <tr>
                                <td>Temperature</td>
                                <td>{apiData.deviceTemperatureCelsius}°C</td>
                            </tr>
                            <tr>
                                <td>Subscriber Count</td>
                                <td>{apiData.subscribeCount}</td>
                            </tr>
                            <tr>
                                <td rowSpan={3}>Viewer count</td>
                                <td>{apiData.viewers.local} on Meow.camera</td>
                            </tr>
                            <tr>
                                <td>{apiData.viewers.jiemao} on Jiemao</td>
                            </tr>
                            <tr>
                                <td>{apiData.viewers.purrrr} on Purrrr</td>
                            </tr>
                            <tr>
                                <td>Is cat present now</td>
                                <td>{apiData.catPresent ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Is light on</td>
                                <td>{apiData.lightTurnedOn ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Food Stock</h3>
                    <table className="dataTable">
                        <tbody>
                            <tr>
                                <td>
                                    Kibble
                                </td>
                                <td>
                                    {apiData.stock.kibble}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Snacks
                                </td>
                                <td>
                                    {apiData.stock.snack ?? "None"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </> :
                <button onClick={() => setLoad(true)}>Load data</button>
            }
        </div>
    </>
}