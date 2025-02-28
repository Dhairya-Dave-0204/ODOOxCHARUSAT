import React from 'react'
import { ImageAdmin, MainStatsAdmin, SubStatsAdmin } from "../../components/component_index"

function Admin() {
  return (
    <>
        <div className='mt-5 ml-5 text-lg'>
            <ImageAdmin />
            <MainStatsAdmin />
            <SubStatsAdmin />
        </div>
    </>
  )
}

export default Admin