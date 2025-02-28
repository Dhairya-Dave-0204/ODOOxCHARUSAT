import React from 'react'
import { ImageAdmin, MainStatsAdmin, SubStatsAdmin, AppointList } from "../../components/component_index"

function Admin() {
  return (
    <>
        <div className='mt-5 ml-5 text-lg'>
            <ImageAdmin />
            <MainStatsAdmin />
            <SubStatsAdmin />
            <AppointList />
        </div>
    </>
  )
}

export default Admin