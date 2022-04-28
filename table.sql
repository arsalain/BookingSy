create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(50),
    password varchar(50),
    status varchar(20),
    role varchar(20)
);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

insert into user(name, password,status,role)values('Admin','sign','true','admin');