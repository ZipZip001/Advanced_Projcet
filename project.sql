drop database if exists project;
create database project;
use project;

drop table if exists project.`account`;
create table project.`account`
(
	id int auto_increment primary key,
    `username` varchar(20) not null,
    `password` varchar(20) not null,
    `email` varchar(255) not null,
    `phonenumber` varchar(10),
    `role` enum('USER','ADMIN')
);

insert into project.`account`(`username` , `password`,`email`, `phonenumber`, `role`)
values ('admin', 'admin','admin@gmail.com', '1234567890', 'ADMIN'),
		('admin1', '123','admin123@gmail.com','0123456789', 'ADMIN'),
        ('user', '123','test@gmail.com','0000000000', 'USER');
        
select*from project.`account`;

drop table if exists `brand`;
create table `brand`
(
	id int auto_increment primary key,
    `brand` varchar(50) not null
);

insert into `brand`(`brand`)
values ('Apple'),
		('Sam Sung');

select*from project.`brand`;

drop table if exists `supplier`;
create table `supplier`
(
	id int auto_increment primary key,
    `name` varchar(50) not null,
    `address` varchar(255) not null
);

select*from `supplier`;

drop table if exists `cart`;
create table `cart`
(
	id int auto_increment primary key,
    `phoneid` int not null,
    `sellprice` double not null,
    `vouchercode` varchar(20),
    `count` double not null,
    `simpletotal` double
);

drop table if exists `category`;
create table `category`
(
	id int auto_increment primary key,
    `color` varchar(20) not null,
    `ram` varchar(20) not null,
    `memorycapacity` varchar(20) not null,
    `pin` varchar(20) not null,
    `brandid` int
);

select*from `category`;

drop table if exists `phone`;
create table `phone`
(
	id int auto_increment primary key,
    `name` varchar(50) not null,
    `brand` varchar(50) not null
);

insert into `phone`(`name` , `brand`)
values ('IPhone X', 'Apple'),
		('Galaxi Note 9', 'Sam Sung');

select*from `phone`;

drop table if exists `voucher`;
create table `voucher`
(
	id int auto_increment primary key,
    `startvoucher` date,
    `endvoucher` date,
    `vouchercode` varchar(20),
    `vouchervip1` varchar(20),
    `vouchervip2` varchar(20),
    `vouchervip3` varchar(20)
);

select*from `voucher`;

drop table if exists `rank`;
create table `rank`
(
	id int auto_increment primary key,
    `start` date,
    `end` date,
    `vip` varchar(10)
);

insert into `rank` (`start`,`end`,`vip`)
values ('2023-09-03', '2023-09-13','vip2');

select*from `rank`;