import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import AddClassButton from "./addClassButtton";
import "primeicons/primeicons.css";

export default function ClassList() {
  const [lopHoc, setLopHoc] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ma_hoc_phan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ten_hoc_phan: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    thu: { value: null, matchMode: FilterMatchMode.EQUALS },
    time: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phong_hoc: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    giang_vien: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const getClasses = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/getClasses");

      if (response.ok) {
        console.log("get classes success");
      }

      const result = await response.json();
      setLopHoc(result);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
    }
  };

  useEffect(() => {
    getClasses();
    setLoading(false);
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div
        className="flex justify-content-end"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
        <AddClassButton />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={lopHoc}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          "ID",
          "ma_hoc_phan",
          "ten_hoc_phan",
          "thu",
          "time",
          "phong_hoc",
        ]}
        header={header}
        emptyMessage="No found."
      >
        <Column
          field="ID"
          header="Mã lớp"
          filter
          filterPlaceholder="Search"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="ma_hoc_phan"
          header="Mã học phần"
          style={{ minWidth: "12rem" }}
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="ten_hoc_phan"
          header="Tên học phần"
          filter
          filterPlaceholder="Search"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="thu"
          header="Thứ"
          filter
          filterPlaceholder="Search"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="time"
          header="Thời gian"
          filter
          filterPlaceholder="Search"
          body={(data, options) => data.gio_bat_dau + " - " + data.gio_ket_thuc}
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="phong_hoc"
          header="Phòng"
          filter
          filterPlaceholder="Search"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="ten"
          header="Giảng viên phụ trách"
          // filter
          // filterPlaceholder="Search"
          style={{ minWidth: "12rem" }}
        />
      </DataTable>
    </div>
  );
}
