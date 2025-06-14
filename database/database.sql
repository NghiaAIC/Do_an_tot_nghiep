drop database if exists diem_danh_giang_vien;
create database diem_danh_giang_vien;
use diem_danh_giang_vien;

create table giang_vien (
	ma_can_bo varchar(20) primary key,
	ten nvarchar(100),
    ID_the varchar(20) unique,
	email varchar(100),
    khoa_vien nvarchar(200),
    anh varchar(200)
);

create table hoc_phan (
	ma_hoc_phan varchar(10) primary key,
    ten_hoc_phan nvarchar(100)
);

create table lop_hoc (
	ID int auto_increment primary key,
    phong_hoc varchar(10),
	thu tinyint unsigned,
    gio_bat_dau time,
    gio_ket_thuc time,
    GiangVienID varchar(20),
    HocPhanID varchar(10),
	foreign key (GiangVienID) references giang_vien(ma_can_bo) ON DELETE SET NULL,
    foreign key (HocPhanID) references hoc_phan(ma_hoc_phan)
);

create table diem_danh (
	ID int auto_increment primary key,
    GiangVienID varchar(20),
    LopHocID int,
    thoi_gian DATETIME DEFAULT CURRENT_TIMESTAMP,
    hinh_anh varchar(200),
    phong_hoc varchar(10),
    ket_qua boolean,
    foreign key (GiangVienID) references giang_vien(ma_can_bo) ON DELETE CASCADE,
    foreign key (LopHocID) references lop_hoc(ID)
);
