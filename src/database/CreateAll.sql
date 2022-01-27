-- SQLite
INSERT INTO users (id, name, latitude,longitude,deviceName,token)
VALUES ('d4d469be-4781-4858-93ec-3e59a57b7039','Joazinho', -78.19934,-45.278223, 'jao device','0158'),
('c2168c25-9149-4518-b1dd-b097ab6fe022','Micaella', -22.19934,-45.278223, 'micaella device','123456'),
('253ea8d4-5dcd-4ddf-9ef9-18b60ecdaf83', 'Mirelly',-20.19934,-40.278223,  'mirelly devic','488454');

INSERT INTO groups (id, name, ownerId)
VALUES ('e26ddb9b-88a5-45fe-9802-28ffd0b4076d','Grupo 1','d4d469be-4781-4858-93ec-3e59a57b7039'),
('678f937c-3db0-47d2-a146-22b2285ee5b','Grupo 2','d4d469be-4781-4858-93ec-3e59a57b7039');

INSERT INTO userGroup (id, userId, groupId)
VALUES ('47ef74f3-3964-4ff6-b953-e30c1a46afcf','c2168c25-9149-4518-b1dd-b097ab6fe022','678f937c-3db0-47d2-a146-22b2285ee5b'),
('27fa31b4-6d99-4640-a2f9-2c318a4d76f4','253ea8d4-5dcd-4ddf-9ef9-18b60ecdaf83','678f937c-3db0-47d2-a146-22b2285ee5b'),
('7f68829b-04ae-4335-90bd-002f3256823f','d4d469be-4781-4858-93ec-3e59a57b7039','e26ddb9b-88a5-45fe-9802-28ffd0b4076d');

 --DELETE FROM userGroup;

-- select * from userGroup;
-- select * from users;

-- INSERT INTO users (id, name, latitude,longitude,deviceName,token)
-- values
-- ('c2168c25-9149-4518-b1dd-b097ab6fe022','Micaella',
-- -22.19934,-45.278223, 'micaella device','123456');

--Listar grupos que um usuário está
--select groupId from userGroup 
--where userId = 'd4d469be-4781-4858-93ec-3e59a57b7039';

--Listar grupos que um usuário é dono
--select name from groups 
--where ownerId = 'd4d469be-4781-4858-93ec-3e59a57b7039';

--Listar membros de um grupo
-- select userId from userGroup 
-- where groupId = '678f937c-3db0-47d2-a146-22b2285ee5b';

--Listar membros por nome de um grupo
-- select users.name from users, userGroup where 
--  userGroup.groupId = '678f937c-3db0-47d2-a146-22b2285ee5b'
--  and userGroup.userId = users.id;