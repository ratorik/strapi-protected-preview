import * as React from 'react'
import {unstable_useContentManagerContext as useContentManagerContext, useFetchClient} from '@strapi/strapi/admin'
import {RightPanel} from './rightPanel'
import { useEffect, useState } from 'react'
import {PLUGIN_ID} from "../../../../../shared/utils/pluginId"

export const PreviewBuilder = () => {
   const { get } = useFetchClient()
   const { form: { values }, slug } = useContentManagerContext()
   const [config, setConfig] = useState<any>(null)
   const [draftKeys, setDraftKeys] = useState<any>(null)

   const getPluginConfig = async () => {
     try {
        const { data } =  await get(`/${PLUGIN_ID}/config`)

       if (data) {
         setConfig(data)
       } else {
         console.error('Failed to fetch config')
       }
     } catch (error) {
       console.error('Error fetching plugin config:', error)
     }
   }

   const getActiveDraftKeys = async () => {
     try {
       const { data } =  await get(`/${PLUGIN_ID}/draft-keys/${slug}`)

       if (data) {
         setDraftKeys(data)
       } else {
         console.error('Failed to fetch config')
       }
     } catch (error) {
       console.error('Error fetching plugin config:', error)
     }
   }

   useEffect(() => {
     getPluginConfig()
     getActiveDraftKeys()
   }, [])

   if (config === null) {
     return <div>Loading...</div>
   }

    if(config[slug]){
      return <RightPanel config={config[slug]} slug={slug} entry={values} draftKeys={draftKeys}/>
    }

   return <React.Fragment />
}
