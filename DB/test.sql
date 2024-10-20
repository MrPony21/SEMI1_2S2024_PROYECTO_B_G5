-- Procedimiento para crear un usuario:
-- parametros: user_name, user_email, user_password, user_image_link
-- Para los creditos se asigna por defecto 0 y se podran actualizar con el procedimiento user_update
CALL user_insert('Marianao','Luisitom201@gmail.com', '123', 'https://www.google.com');
CALL user_insert('Joshua','Joshua@gmail.com', '123', 'https://www.google.com');
CALL user_insert('Tony','Tony@gmail.com', '123', 'https://www.google.com');
CALL user_insert('Guillermo','Guille@gmail.com', '123', 'https://www.google.com');

-- Procedimiento para logear un usuario --> Retorna el id del usuario:
-- parametros: user_name_or_email, user_password
CALL user_login('Marianao', '123');
CALL user_login('Luisitom201@gmail.com', '123');
CALL user_login('Guille@gmail.com', '123');



-- Procedimiento para actualizar un usuario:
-- parametros: user_id, user_name, user_email, user_password, user_credit, user_image_link
CALL user_update(1, 'Mariano', NULL, NULL, NULL, NULL);
CALL user_update(2, NULL, 'Zuleta@gmail.com', NULL, NULL, NULL);
CALL user_update(3, NULL, NULL, '12345', NULL, NULL);
CALL user_update(4, NULL, NULL, NULL, 150, NULL);
CALL user_update(1, NULL, NULL, NULL, NULL, 'https://www.google2.com');

CALL user_delete(17);

SELECT * FROM User;

-- Procedimiento para insertar un viaje:
-- parametros: travel_name, travel_description, travel_cost, travel_image_link
-- YA ESTA
CALL travel_insert('Tecpan', 'Viaje a tecpan con amigos', 100, 'https://www.google.com');
CALL travel_insert('Antigua', 'Viaje a antigua con amigos', 200, 'https://www.google.com');
CALL travel_insert('Atitlan', 'Viaje a atitlan con amigos', 300, 'https://www.google.com');
CALL travel_insert('Peten', 'Viaje a peten con amigos', 400, 'https://www.google.com');


-- Procedimiento para obtener un viaje por su id:
-- parametros: travel_id
CALL travel_get_travel_by_id(1);
CALL travel_get_travel_by_id(3);



-- Procedimiento para obtener todos los viajes:
-- YA ESTA
CALL travel_get_all();

-- Procedimiento para insertar una review:
-- parametros: review_description, review_score, review_user_id, review_travel_id
-- El review_score debe ser un entero entre 1 y 5 y hay un trigger que actualiza el score en la tabla del viaje
CALL review_insert('Muy buen viaje', 5, 1, 1);
CALL review_insert('Regular', 3, 2, 1);
CALL review_insert('Muy malo', 1, 1, 1);

-- Procedimiento para obtener las reviews de un viaje por el id del viaje:
-- parametros: travel_id
CALL review_get_review_by_travel_id(1);

-- Procedimiento para obtener las reviews de un usuario por el id del usuario:
-- parametros: user_id
CALL review_get_review_by_user_id5(1);

-- Procedimiento para obtener el score de un viaje por su id:
-- parametros: travel_id
CALL travel_get_score_by_id(1);

-- Procedimiento para actualizar el score (AWS) No dejo correr el trigger
-- IN p_travel_id BIGINT UNSIGNED, IN p_travel_score FLOAT
CALL travel_edit_review(1, 3.3);

select * from Review;