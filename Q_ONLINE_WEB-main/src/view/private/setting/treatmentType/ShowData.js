import React from 'react';
import Pagination from 'react-js-pagination';
import { TextSelect } from '../../../../components/TextSelect';
import PageSize from '../../../../data/pageSize.json';
import DateTh from '../../../../components/DateTh';

function ShowData({ data, pagin, setShow, setId, updateStatus, deleteData, changePage, changePageSize }) {
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
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              setId(0);
              setShow(true);
            }}
          >
            <i className="fa-solid fa-plus mx-1"></i>
            เพิ่ม
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col" style={{ width: '5%' }}>
                ลำดับ
              </th>
              <th scope="col" style={{ width: '40%' }}>
                ประเภทการรักษา
              </th>
              <th scope="col" style={{ width: '20%' }}>
                วันที่สร้าง
              </th>
              <th scope="col" style={{ width: '20%' }}>
                สถานะการใช้งาน
              </th>
              <th scope="col" style={{ width: '15%' }}>
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="text-center text-danger">-- ไม่พบข้อมูล --</div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}</td>
                  <td>{item.treatment_type_name}</td>
                  <td>
                    <DateTh date={item.created_date} />
                  </td>
                  <td>{item.is_used === 1 ? 'ใช้งาน' : 'ไม่ใช้งาน'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning text-white mx-1 mt-1"
                      onClick={() => {
                        setId(item.id);
                        setShow(true);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      type="button"
                      className={`btn text-white mx-1 mt-1 ${item.is_used === 1 ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => {
                        updateStatus(item.id, { status: item.is_used === 1 ? 0 : 1 });
                      }}
                    >
                      {item.is_used === 1 ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-lock-open"></i>}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger text-white mx-1 mt-1"
                      onClick={() => {
                        deleteData(item.id);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
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
