import React, {useEffect} from 'react'
import {ReportHeader, Table} from '../../components'

const supplierItems = [
  {
    Name: 'Chicken',
    Supplier: 'National Khadya Udhyog',
    Quantity: '800',
    Price: '10000',
  },
  {
    Name: 'Maida',
    Supplier: 'National Khadya Udhyog',
    Quantity: '500',
    Price: '10000',
  },
  {
    Name: 'Sugar',
    Supplier: 'National Khadya Udhyog',
    Quantity: '900',
    Price: '10000',
  },
  {
    Name: 'Masala',
    Supplier: 'National Khadya Udhyog',
    Quantity: '500',
    Price: '10000',
  },
]
const outletItems = [
  {
    Name: 'Chicken',
    Supplier: 'Kalanki Outlet',
    Quantity: '500',
    Price: '10000',
  },
  {
    Name: 'Maida',
    Supplier: 'Kalanki Outlet',
    Quantity: '100',
    Price: '10000',
  },
  {
    Name: 'Sugar',
    Supplier: 'Kalanki Outlet',
    Quantity: '500',
    Price: '10000',
  },
  {
    Name: 'Masala',
    Supplier: 'Kalanki Outlet',
    Quantity: '890',
    Price: '10000',
  },
]

const OutletReport = () => {
  useEffect(() => {
    document.title = 'Syanko Katti Roll - Monthly Report'
  }, [])

  return (
    <>
      <section className="print-content">
        <ReportHeader reportName="Monthly Report" />
        <div className="row justify-content-between mx-auto align-items-center">
          <h6 className="font-weight-bold">From Suppliers</h6>
          <button
            className="btn btn-outline-primary no-print float-right"
            onClick={window.print}>
            Print
          </button>
        </div>
        <Table items={supplierItems} />

        <h6 className="font-weight-bold">To Outlets</h6>
        <Table items={outletItems} />
      </section>
    </>
  )
}

export default OutletReport
