import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ImageAdmin, MainStatsAdmin, SubStatsAdmin, AppointList } from "../../components/component_index"

function Admin() {
  const navigate = useNavigate();
  return (
    <>
        <div className='mt-5 ml-5 text-lg'>
            <ImageAdmin />
            <MainStatsAdmin />
            <SubStatsAdmin />
            <AppointList />
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded"
              onClick={() => navigate('/admin/add-pdf')}
            >
              Add PDF for User
            </button>
        </div>
    </>
  )
}

export default Admin