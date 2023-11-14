import React from 'react'
import '../../../Style/Dashboard.css'
import { BiCaretLeftCircle, BiCaretRightCircle } from 'react-icons/bi'



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Create an array of page numbers based on the total pages.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="pagination">
      <div
        onClick={() => onPageChange(currentPage === 1 ? currentPage : currentPage - 1)}
        style={{ display: 'flex', alignItems: 'center' }}>
        <BiCaretLeftCircle size={32} style={{cursor:"pointer"}}/>
      </div>

      {pages.map((page,index) => (
        <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
          {page < 4 && <button
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}>
            {page}
          </button>}
        </div>
      ))}

      <div
        onClick={() => onPageChange(currentPage === totalPages ? currentPage :currentPage + 1)}
        style={{ display: 'flex', alignItems: 'center' }}>
        <BiCaretRightCircle size={32} style={{cursor:"pointer"}}/>
      </div>
    </div>
  )
}

export default Pagination
