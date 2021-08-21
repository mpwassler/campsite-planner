import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import ConfigForm from '../components/ConfigForm'
import ActivityWidget from '../components/ActivityWidget'
import LodgingWidget from '../components/LodgingWidget'
import ActivityForm from '../components/ActivityForm'
import Modal from '../components/ui/Modal'
import {Graph, matchLodging} from '../graph/graph'
import {makePolyline} from '../services/polyline'

export default function Home(props) {

  const [graph, setGraph]         = useState(new Graph())
  const [modelOpen, setModalOpen] = useState(false)
  
  const toggleModal = (evt) => { setModalOpen(!modelOpen) }

  const handleNewActivity = async (res) => {    
    const newGraph = Graph.fromJson(await res.json())
    setGraph(graph.merge(newGraph))
    setModalOpen(false)    
  }

  const onDelete = (data) => {  
    setGraph( graph.delete(data.name) )
  }

  const activities = graph.filterNodes(n => n.type == 'activity')
  const lodgings   = matchLodging(graph)
  const lodgingEdges = lodgings.flatMap((l) => l.edges(graph))
  
  let routes = Promise.all(lodgingEdges.map(async (e) => makePolyline(e, graph)))
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <main className="container pt-5">
        {/*<ConfigForm onConfigUpdate={setConfig} />*/}
        <ActivityWidget graph={graph} 
                        lodgings={lodgings} 
                        activities={activities} 
                        handleAddTrail={toggleModal}
                        routes={routes}
                        onDelete={onDelete}
                         />          
                        
        <LodgingWidget lodgings={lodgings} 
                       graph={graph}/>

      </main>
      <Modal onCloseRequest={toggleModal} title={"New Activity"} isOpen={modelOpen} >
        <ActivityForm handleCreate={handleNewActivity} />
      </Modal>
    </div>
  )
}
