import React from 'react';
import { TextSelect } from '../../../../components/TextSelect';
import PageSize from '../../../../data/pageSize.json';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router-dom';

function ShowData({ data, pagin, changePage, changePageSize, updateStatus, deleteData }) {
  const navigate = useNavigate();
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
              navigate('/admin/user/form');
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
              <th scope="col" style={{ width: '10%' }}>
                เลขบัตรประชาชน
              </th>
              <th scope="col" style={{ width: '20%' }}>
                ชื่อ-นามสกุล
              </th>
              <th scope="col" style={{ width: '30%' }}>
                ที่อยู่
              </th>
              <th scope="col" style={{ width: '10%' }}>
                เบอร์โทร
              </th>
              <th scope="col" style={{ width: '10%' }}>
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
                <td colSpan={7}>
                  <div className="text-center text-danger">-- ไม่พบข้อมูล --</div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}</td>
                  <td>{item.id_card}</td>
                  <td>{item.fullname}</td>
                  <td>
                    {item.address} ต.{item.subdistrict} อ.{item.district} จ.{item.province} {item.postcode}
                  </td>
                  <td>{item.phone_number}</td>
                  <td>{item.is_used === 1 ? 'ใช้งาน' : 'ไม่ใช้งาน'}</td>
                  <td>
                    {/* ปุ่มแก้ไข */}
                    <button
                      type="button"
                      className="btn btn-warning text-white mx-1 mt-1"
                      onClick={() => {
                        navigate('/admin/user/form', { state: item.id });
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    {/* ปุ่มอัพเดทสถานะการใช้งาน */}
                    <button
                      type="button"
                      className={`btn text-white mx-1 mt-1 ${item.is_used === 1 ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => {
                        updateStatus(item.id, { status: item.is_used === 1 ? 0 : 1 });
                      }}
                    >
                      {item.is_used === 1 ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-lock-open"></i>}
                    </button>
                    {/* ปุ่มลบข้อมูล */}
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
