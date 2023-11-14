import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import Pagination from '../components/Pagination.jsx'
import filterImg from '../../../../src/assets/filter.svg'
import { GrSort } from 'react-icons/gr'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../../../components/Loader.jsx'



const list = [
  'Membership Active',
  'Membership Pending',
  'Attendance Inactive',
  'Attendance Active',
  'Current Month Payments',
  'Clear Filter'
]
const sortList = [
  'Newest Transaction',
  'Oldest Transaction',
  'Nearest Due Date',
  'Farthest Due Date',
  'Member ID (Low to High)',
  'Member ID (High to Low)'
]

function TrainerOverview() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [search, setSearch] = React.useState('')
  const [showfilter, setShowFilter] = React.useState(false)
  const [showSort, setShowSort] = React.useState(false)
  const [selected, setSelected] = React.useState('')
  const [selectedSortValue, setSelectedSortValue] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState('')
  const [data,setData] = React.useState([])
  const [trainers,setTrainers] = React.useState([])
  const totalPages = 5 // Replace with the actual total number of pages.
  const [loading, setLoading] = React.useState(true);

  const getAllTrainers = () => {
    const token = Cookies.get('token');
    const config = { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`} }

    axios.get(`http://192.168.244.79:3001/api/v1/trainer/getAllTrainers`, config).then((response) => {
      setData(response.data.trainers);
      setTrainers(response.data.trainers)
      setLoading(false);
    }
    ).catch((err) => {
      console.log(err);
    })

  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // You can also fetch data for the selected page here.
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    const filter = [...trainers].filter((item)=>item.joiningdate.split("T")[0]===e.target.value)
    setData(filter)
  }
  const handleOptionClick = (label) => {
    setSelected(label)
    setShowFilter(!showfilter)
    switch(label){
      case "Membership Active":
        setData([...trainers].filter((item)=>item.status==="active"))
        break;
      case "Membership Pending":
        setData([...trainers].filter((item)=>item.status==="pending"))
        break;
      case "Attendance Inactive":
        setData([...trainers].filter((item)=>item.status==="inactive"))
        break;
      case "Attendance Active":
        setData([...trainers].filter((item)=>item.status==="active"))
        break;
      case "Current Month Payments":
        setData([...trainers].filter((item)=>item.status==="active"))
        break;
      case "Clear Filter":
        setData([...trainers])
        break;
      default:
        break;

    }
  }
  const handleSortOptionClick = (label) => {
    setSelectedSortValue(label)
    setShowSort(!showSort);
    switch(label){
      case "Newest Transaction":
        setData([...trainers].sort((a,b)=>new Date(b.createdat)-new Date(a.createdat)))
        break;
      case "Oldest Transaction":
        setData([...trainers].sort((a,b)=>new Date(a.createdat)-new Date(b.createdat)))
        break;
      case "Nearest Due Date":
        setData([...trainers].sort((a,b)=>new Date(b.createdat)-new Date(a.createdat)))
        break;
      case "Farthest Due Date":
        setData([...trainers].sort((a,b)=>new Date(a.createdat)-new Date(b.createdat)))
        break;
      case "Member ID (Low to High)":
        setData([...trainers].sort((a,b)=>a.id-b.id))
        break;
      case "Member ID (High to Low)":
        setData([...trainers].sort((a,b)=>b.id-a.id))
        break;
      default:
        break;
    }
  }
  const handleSearch = ()=>{
    const filterData = trainers.filter((item)=>item.firstname.toLowerCase().includes(search.toLowerCase()))
    setData(filterData)
  }

  React.useEffect(() => {
    getAllTrainers();
  }, [])
  return loading?(<Loader loading={loading}/>):(
    <div className="membership">
      <div className="filter-membership">
        <div className="filter-membership-container">
          <div className="header-table">
            <h1>All Trainers</h1>
            <div className='add-btn'>
              <AiOutlinePlus size={25} style={{cursor:"pointer"}}/>
              <h1>Add Trainer</h1>
            </div>
          </div>
          <div className="filter-membership-item">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div className="filter-container">
                <img
                  src={filterImg}
                  alt="filter"
                  onClick={() => setShowFilter(!showfilter)}
                  style={{ cursor: 'pointer' }}
                />
                {showfilter === true && (
                  <div className="filter-dropdown">
                    <div>
                      {list &&
                        list.map((item, index) => (
                          <div
                            className={
                              selected === item ? 'dropdown-item selected' : 'dropdown-item'
                            }
                            key={index}
                            onClick={() => handleOptionClick(item)}>
                            {item}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="date-container">
                <h4>Select Joining Date</h4>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="filter-container">
                <GrSort
                  size={25}
                  onClick={() => setShowSort(!showSort)}
                  style={{ cursor: 'pointer' }}
                />
                {showSort === true && (
                  <div className="filter-dropdown">
                    <div>
                      {sortList &&
                        sortList.map((item, index) => (
                          <div
                            className={
                              selectedSortValue === item
                                ? 'dropdown-item selected'
                                : 'dropdown-item'
                            }
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
          <div className="item4">
            <h1>Address</h1>
          </div>
          <div className="item3">
            <h1>Joining Date</h1>
          </div>
          <div className="item5">
            <h1>Status</h1>
          </div>
          <div className="item6">
            <h1>Action</h1>
          </div>
        </div>
        <div className="table-body">
          {data?.length > 0 && data.map((item, index) => (
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
                  <h1>{item.firstname + ' '+ item.lastname}</h1>
                  <p>{item.phonenumber}</p>
                </div>
              </div>
              <div className="item4 item">
                <div className="plan">
                  <p>{item.address}</p>
                </div>
              </div>
              <div className="item3 item">
                <div className="date">
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}>
                    <h3>{item.joiningdate.split('T')[0]}</h3>
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

export default TrainerOverview
