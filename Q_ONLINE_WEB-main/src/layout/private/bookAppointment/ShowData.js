import React from 'react';
import { TextSelect } from '../../../components/TextSelect';
import PageSize from '../../../data/pageSize.json';
import Pagination from 'react-js-pagination';
import DateTh from '../../../components/DateTh';
import StatusBook from '../../../components/StatusBook';

function ShowData({ data, pagin, setDataBook, changePage, changePageSize }) {
  return (
    <div className="w-full">
      <div className="d-flex justify-content-between mb-2">
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
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col" style={{ width: '5%' }}>
                ลำดับ
              </th>
              <th scope="col" style={{ width: '10%' }}>
                รหัสคิว
              </th>
              <th scope="col" style={{ width: '20%' }}>
                ชื่อผู้ป่วย/ชื่อแพทย์
              </th>
              <th scope="col" style={{ width: '15%' }}>
                ประเภทการรักษา
              </th>
              <th scope="col" style={{ width: '10%' }}>
                วันที่จองคิว
              </th>
              <th scope="col" style={{ width: '10%' }}>
                วันที่เข้ารับการรักษา
              </th>
              <th scope="col" style={{ width: '5%' }}>
                คิวที่
              </th>
              <th scope="col" style={{ width: '10%' }}>
                สถานะ
              </th>
              <th scope="col" style={{ width: '5%' }}>
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="text-center text-danger">-- ไม่พบข้อมูล --</div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}</td>
                  <td>{item.code}</td>
                  <td>
                    <div>{item.fullname}</div>
                    <div>
                      <small className="fw-light">({item.fullname_doctor})</small>
                    </div>
                  </td>
                  <td>{item.treatment_type_name}</td>
                  <td>
                    <DateTh date={item.created_date} />
                  </td>
                  <td>
                    <DateTh date={item.open_date} />
                  </td>
                  <td>{item.number}</td>
                  <td>
                    <StatusBook status={item.status} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning text-white mx-1 mt-1"
                      onClick={() => {
                        setDataBook(item);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
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
  );
}

export default ShowData;
