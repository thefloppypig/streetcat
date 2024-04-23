import { useState } from 'react'

import './App.css'
import { CatData, FeederData, FolderMetaData } from './Types';

async function getFeederData(feeder: string) {
  const response = await fetch(`${feeder}/index.json`);
  const json = await response.json() as FeederData;
  json.__feeder = feeder;
  return json;
}

async function getCatList(feeder: string) {
  const response = await fetch(`${feeder}/meta.json`);
  const json = await response.json() as FolderMetaData;
  return json.dir;
}

async function getCatData(feeder: string, cat: string) {
  const response = await fetch(`${feeder}/${cat}/index.json`);
  const json = await response.json() as CatData;
  json.__cat = cat;
  json.__feeder = feeder;
  return json;
}

function getCatUrl(catData: CatData, img: string) {
  return `${catData.__feeder}/${catData.__cat}/${img}`
}

function processCatDataToTableImages(catData: CatData, which: keyof CatData["img"]) {
  {
    const src = catData.img[which];
    if (src) {
      return <img loading="lazy" className='identifierImg' src={getCatUrl(catData, src)} />
    }
    else {
      return <div className='centered'>/</div>
    }
  }
}

const feeder = "happycanteen"
const feederData = await getFeederData(feeder);
const catList = await getCatList(feeder);
const catDataList: CatData[] = [];
for await (const cat of catList) {
  catDataList.push(await getCatData(feeder, cat))
}


function App() {


  return (
    <>
      <h1>{feederData.name} Catdentifier</h1>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Front</td>
            <td>Back</td>
            <td>Eating</td>
          </tr>
        </thead>
        <tbody>
          {catDataList.map((d) => <tr key={d.__cat}>
            <td>{d.name}</td>
            <td>{processCatDataToTableImages(d, "front")}</td>
            <td>{processCatDataToTableImages(d, "back")}</td>
            <td>{processCatDataToTableImages(d, "eating")}</td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default App
