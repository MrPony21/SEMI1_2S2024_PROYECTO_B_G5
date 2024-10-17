DELIMITER //

CREATE PROCEDURE travel_insert(
    IN p_travel_name VARCHAR(255),
    IN p_travel_description TEXT,
    IN p_travel_cost INT,
    IN p_travel_image_link VARCHAR(500)
)

BEGIN 
    INSERT INTO Travel (
        travel_name,
        travel_description,
        travel_cost,
        travel_image_link
    )
    VALUES (
        p_travel_name,
        p_travel_description,
        p_travel_cost,
        p_travel_image_link
    );
    
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE travel_get_all(

)
BEGIN
    SELECT * FROM Travel;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE travel_get_score_by_id(
    IN p_travel_id BIGINT UNSIGNED
)
BEGIN
    SELECT travel_review FROM Travel WHERE travel_id = p_travel_id;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE travel_get_travel_by_id(
    IN p_travel_id BIGINT UNSIGNED
)
BEGIN
    SELECT * FROM Travel WHERE travel_id = p_travel_id;
END //