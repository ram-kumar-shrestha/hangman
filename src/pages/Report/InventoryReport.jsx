import React, {useEffect} from 'react'
import {ReportHeader, Table} from '../../components'

const items = [
  {
    Name: 'Chicken',
    Quantity: 500,
    Price: '10000',
  },
  {
    Name: 'Maida',
    Quantity: 300,
    Price: '10000',
  },
  {
    Name: 'Sugar',
    Quantity: 900,
    Price: '10000',
  },
  {
    Name: 'Masala',
    Quantity: 500,
    Price: '10000',
  },
]

const InventoryReport = () => {
  useEffect(() => {
    document.title = 'Syanko Katti Roll - Inventory Report'
  }, [])

  return (
    <>
      <section className="print-content">
        <ReportHeader reportName="Inventory Report" />

        <div className="row justify-content-between mx-auto align-items-center">
          <h6 className="font-weight-bold">Current Inventory</h6>
          <button
            className="btn btn-outline-primary no-print float-right"
            onClick={window.print}>
            Print
          </button>
        </div>
        <Table items={items} />
      </section>
    </>
  )
}

export default InventoryReport
