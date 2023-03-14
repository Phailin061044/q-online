import React from 'react'
import Image from '../../../assets/image/Image.png'
import Pagination from 'react-js-pagination';
import { baseURL } from '../../../helper/Axios';
import DateTh from '../../../components/DateTh';
import PageSize from '../../../data/pageSize.json';
import { TextSelect } from '../../../components/TextSelect';
import Swal from 'sweetalert2';

function ShowData({ data, pagin, setDataBook, changePage, changePageSize }) {
  return (
    <div className="w-full">
      <div className="row d-flex justify-content-center">
        <div className="col-8">
          <div className="w-pagesize">
            <TextSelect
              id="pagesize"
              name="pagesize"
              options={PageSize}
              value={PageSize.filter((a) => a.id === pagin.pageSize)}
              onChange={(item) => {
                changePageSize(item.id);
              }}
              getOptionLabel={(z) => z.label}
              getOptionValue={(x) => x.id}
            />
          </div>
          <div className="row">

            {data.map((item, index) => (
              <div className="col-12 my-2" key={item.id}>
                <div className="card p-3">
                  <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-4 col-lg-3 cp;-xxl-2">
                      <div className="d-flex justify-content-center justify-content-md-start">
                        <img src={item.path_image ? `${baseURL}${item.path_image}` : Image}
                          alt={`${baseURL}${item.path_image}`} className="mx-auto" height={150} width={150} />
                      </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 col-xxl-100 mt-md-0 mt-2">
                      <div className="d-flex justify-content-between">

                        <div>
                          <h2>{item.treatment_type_name}</h2>
                        </div>
                        <div>
                          <p>
                            วันที่ทำการรักษา <DateTh date={item.open_date} />
                          </p>
                        </div>
                      </div>
                      <p>ชื่อแพทย์ {item.fullname}</p>
                      <div className="d-flex justify-content-between mt-5">

                        <div>
                          <h3>จำนวน  {`${item.book_amount}/${item.amount}`}</h3>
                        </div>
                        <div>
                          <button type="button" className="btn btn-success"
                          onClick={() => {
                            if (localStorage.getItem('id')) {
                              setDataBook(item);
                            } else {
                              Swal.fire({
                                icon: 'warning',
                                title: 'ไม่สามารถจองคิวได้',
                                text: 'กรุณาลงทะเบียน หรือทำการเข้าสู่ระบบก่อน',
                                confirmButtonText: 'ตกลง',
                                showConfirmButton: true,
                                timer: false,
                              });
                            }
                          }}>
                            จองคิว
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>จำนวน {pagin.totalRow} รายการ</div>
            <div>
              <Pagination
                activePage={pagin.currentPage}
                itemsCountPerPage={pagin.pageSize}
                totalItemsCount={pagin.totalRow}
                pageRangeDisplayed={pagin.totalPage}
                onChange={(page) => {
                  changePage(page);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowData;


