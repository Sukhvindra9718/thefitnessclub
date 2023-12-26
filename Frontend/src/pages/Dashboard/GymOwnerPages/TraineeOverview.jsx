import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import Pagination from '../components/Pagination.jsx'
import filterImg from '../../../../src/assets/filter.svg'
import { GrSort } from "react-icons/gr"
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from "../../../components/Loader.jsx"
import PreviewTrainee from '../AddTrainee/PreviewTrainee.jsx'
import UpdateTrainee from '../AddTrainee/UpdateTrainee.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const list = ['Membership Active', 'Membership Pending', 'Attendance Inactive', "Attendance Active", 'Current Month Payments', 'Clear Filter']
const sortList = ['Newest Transaction', 'Oldest Transaction', 'Nearest Due Date', "Farthest Due Date", 'Member ID (Low to High)', 'Member ID (High to Low)']





function TraineeOverview() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [search, setSearch] = React.useState('')
  const [showfilter, setShowFilter] = React.useState(false)
  const [showSort, setShowSort] = React.useState(false)
  const [selected, setSelected] = React.useState('')
  const [selectedSortValue, setSelectedSortValue] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState('')
  const [data, setData] = React.useState([])
  const [trainees, setTrainees] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [updateVisible, setUpdateVisible] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [toastType, setToastType] = React.useState('')
  const [toastVisible, setToastVisible] = React.useState(false)
  const [deleted,setDeleted] = React.useState(false)
  const totalPages = trainees?.length>0 ? trainees.length/5 +2 : 5
  const navigate = useNavigate()

  const getAllTrainees = () => {
    const token = Cookies.get('token');
    const config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }

    axios.get(`http://192.168.1.12:3001/api/v1/trainee/getAllTrainee`, config).then((response) => {
      setData(response.data.trainees);
      setTrainees(response.data.trainees);
      setLoading(false);
    }).catch((err) => {
      console.log(err)
    })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // You can also fetch data for the selected page here.
  }
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    const filter = [...trainees].filter((item) => item.createdat.split("T")[0] === e.target.value)
    setData(filter)
  }
  const handleOptionClick = (label) => {
    setSelected(label)
    setShowFilter(!showfilter)
    switch (label) {
      case "Membership Active":
        setData([...trainees].filter((item) => item.status === "active"))
        break;
      case "Membership Pending":
        setData([...trainees].filter((item) => item.status === "pending"))
        break;
      case "Attendance Inactive":
        setData([...trainees].filter((item) => item.status === "inactive"))
        break;
      case "Attendance Active":
        setData([...trainees].filter((item) => item.status === "active"))
        break;
      case "Current Month Payments":
        setData([...trainees].filter((item) => item.status === "active"))
        break;
      case "Clear Filter":
        setData([...trainees])
        break;
      default:
        break;

    }
  }
  const handleSortOptionClick = (label) => {
    setSelectedSortValue(label)
    setShowSort(!showSort);
    switch (label) {
      case "Newest Transaction":
        setData([...trainees].sort((a, b) => new Date(b.createdat) - new Date(a.createdat)))
        break;
      case "Oldest Transaction":
        setData([...trainees].sort((a, b) => new Date(a.createdat) - new Date(b.createdat)))
        break;
      case "Nearest Due Date":
        setData([...trainees].sort((a, b) => new Date(b.createdat) - new Date(a.createdat)))
        break;
      case "Farthest Due Date":
        setData([...trainees].sort((a, b) => new Date(a.createdat) - new Date(b.createdat)))
        break;
      case "Member ID (Low to High)":
        setData([...trainees].sort((a, b) => a.id - b.id))
        break;
      case "Member ID (High to Low)":
        setData([...trainees].sort((a, b) => b.id - a.id))
        break;
      default:
        break;
    }
  }
  const handleSearch = () => {
    const filterData = trainees.filter((item) => item.firstname.toLowerCase().includes(search.toLowerCase()))
    setData(filterData)
  }
  const handleDelete = (id) => {
    setLoading(true)
    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    }
    axios
      .delete(`http://localhost:3001/api/v1/trainee/deleteTrainee/${id}`, config)
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false)
          setDeleted(!deleted)
        }else{  
          alert(response.data.message)
          setLoading(false)
        }
      })
      .catch((error) => {
        if (error.isAxiosError && error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          alert(`Error: ${errorMessage}`);
          setLoading(false)
        } else {
          alert('An unexpected error occurred. Please try again.');
          setLoading(false)
        }
      })
  }
  React.useEffect(() => {
    return () => {
      getAllTrainees();
    }
  }, [deleted])


  React.useEffect(() => {
    if(toastVisible){
      if(toastType === "success"){
        toast.success(toastMessage, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
       
      }else if(toastType === "error"){
        toast.error(toastMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }else{
        toast.info(toastMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    return () => {
      getAllTrainees();
    }
  }, [toastVisible,toastMessage,toastType])
  return loading ? (<Loader loading={loading} />) : (
    <div className="membership">
      <div className="filter-membership">
        <div className="filter-membership-container">
          <div className="header-table">
            <h1>All Trainers</h1>
            <div className='add-btn' onClick={() => navigate('/addtrainee')}>
              <AiOutlinePlus size={25} style={{ cursor: "pointer" }} />
              <h1>Add Trainee</h1>
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
                <h4>Select Next Due Date</h4>
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
          {data?.length > 0 && data.map((item, index) => (
            (index >= (currentPage - 1)*4  && index <=  (currentPage-1) * 4 + 4 &&<div key={index}>
              <div className="table-row" >
                <div className="item2 item">
                  <h1>{item.id}</h1>
                </div>
                <div className="item1 item">
                  <div>
                    <img
                      src={'data:image/jpeg;base64,' + item.profile_image}
                      alt="Avatar"
                      className="avatar"
                    />
                  </div>
                  <div>
                    <h1>{item.firstname + ' ' + item.lastname}</h1>
                    <p>{item.phonenumber}</p>
                  </div>
                </div>
                <div className="item3 item">
                  <div className="plan">
                    <p>{item.plan}</p>
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
                      <p>Plan End Date</p>
                      <h3>{new Date(item.planenddate).toLocaleString().split(',')[0]}</h3>
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
                      <p>Plan Start Date</p>
                      <h3>{new Date(item.planstartdate).toLocaleString().split(',')[0]}</h3>
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
                    <Link onClick={() => setPreviewVisible(!previewVisible)}>
                      <AiFillEye size={25} />
                    </Link>
                    <Link onClick={() => setUpdateVisible(!updateVisible)}>
                      <AiFillEdit size={25} />
                    </Link>
                    <Link onClick={()=> handleDelete(item.id)}>
                      <MdDelete size={25} />
                    </Link>
                  </div>
                </div>
              </div>
              {previewVisible && (<PreviewTrainee setPreviewVisible={setPreviewVisible} user={item} />)}
              {updateVisible && (<UpdateTrainee setUpdateVisible={setUpdateVisible} user={item} setToastMessage={setToastMessage} setToastType={setToastType} setToastVisible={setToastVisible}/>)}
            </div>)
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default TraineeOverview
