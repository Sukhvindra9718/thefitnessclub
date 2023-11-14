import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import Pagination from '../components/Pagination.jsx'
import filterImg from '../../../../src/assets/filter.svg'
import {GrSort} from "react-icons/gr"

const list = ['Membership Active', 'Membership Pending','Attendance Inactive',"Attendance Active",'Current Month Payments','Clear Filter']
const sortList = ['Newest Transaction', 'Oldest Transaction','Nearest Due Date',"Farthest Due Date",'Member ID (Low to High)','Member ID (High to Low)']
function Membership_Overview({gymOwners}) {
  // eslint-disable-next-line
  const [allMembers, setAllMembers] = React.useState([1, 2, 3, 4, 5])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [search, setSearch] = React.useState('')
  const [showfilter, setShowFilter] = React.useState(false)
  const [showSort, setShowSort] = React.useState(false)
  const [selected, setSelected] = React.useState('')
  const [selectedSortValue, setSelectedSortValue] = React.useState('');
  const [selectedDate,setSelectedDate] = React.useState('')
  const totalPages = 5 // Replace with the actual total number of pages.

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // You can also fetch data for the selected page here.
  }

  const handleOptionClick = (label) => {
    setSelected(label)
    setShowFilter(!showfilter)
  }
  const handleSortOptionClick = (label) => {
    setSelectedSortValue(label)
    setShowSort(!showSort)
  }
  return (
    <div className="membership">
      <div className="filter-membership">
        <div className="filter-membership-container">
          <div className="header-table">
            <h1>All Members</h1>
          </div>
          <div className="filter-membership-item">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Search</button>
            </div>
            <div style={{display:"flex",gap:"2rem",alignItems:"center"}}>
            <div className="filter-container">
              <img src={filterImg} alt="filter" onClick={() => setShowFilter(!showfilter)} style={{cursor:"pointer"}}/>
              {showfilter === true && (
                <div className="filter-dropdown">
                  <div
                    >
                    {list &&
                      list.map((item, index) => (
                        <div
                          className={selected === item ? "dropdown-item selected" : 'dropdown-item'}
                          key={index}
                          onClick={() => handleOptionClick(item)}>
                          {item}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className='date-container'>
              <h4>Select Date</h4>
              <input type='date' value={selectedDate} onChange={(e)=> setSelectedDate(e.target.value)}/>
            </div>
            <div className="filter-container">
              <GrSort size={25} onClick={() => setShowSort(!showSort)} style={{cursor:"pointer"}}/>
              {showSort === true && (
                <div className="filter-dropdown">
                  <div
                    >
                    {sortList &&
                      sortList.map((item, index) => (
                        <div
                          className={selectedSortValue === item ? "dropdown-item selected" : 'dropdown-item'}
                          key={index}
                          onClick={() => handleSortOptionClick(item)}>
                          {item}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            </div>

          </div>
        </div>
      </div>
      <div className="table-container">
        <div className="header">
          <div className="item2">
            <h1>MemberId</h1>
          </div>
          <div className="item1">
            <h1>Name</h1>
          </div>
          <div className="item3">
            <h1>Plan</h1>
          </div>
          <div className="item4">
            <h1>Date</h1>
          </div>
          <div className="item5">
            <h1>Status</h1>
          </div>
          <div className="item6">
            <h1>Action</h1>
          </div>
        </div>
        <div className="table-body">
          {gymOwners.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="item2 item">
                <h1>{item.id}</h1>
              </div>
              <div className="item1 item">
                <div>
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar"
                    className="avatar"
                  />
                </div>
                <div>
                  <h1>{item.name}</h1>
                  <p>{item.phonenumber}</p>
                </div>
              </div>
              <div className="item3 item">
                <div className="plan">
                  <p>{item.membership_duration/30}</p>
                  <Link to="/dashboard/membership/plan">Change Plan</Link>
                </div>
              </div>
              <div className="item4 item">
                <div className="date">
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}>
                    <p>Next Due Date</p>
                    <h3>{item.prebookeddate}</h3>
                  </div>
                  <div className="divider"></div>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}>
                    <p>Pre Booked Due Date</p>
                    <h3>{item.prebookeddate}</h3>
                  </div>
                </div>
              </div>
              <div className="item5 item">
                <div className="status-badge">
                  <div className="circle"></div>
                  <h1>{item.status}</h1>
                </div>
              </div>
              <div className="item6 item">
                <div className="actions">
                  <Link to="/dashboard/membership/view">
                    <AiFillEye size={25} />
                  </Link>
                  <Link to="/dashboard/membership/edit">
                    <AiFillEdit size={25} />
                  </Link>
                  <Link to="/dashboard/membership/delete">
                    <MdDelete size={25} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Membership_Overview
