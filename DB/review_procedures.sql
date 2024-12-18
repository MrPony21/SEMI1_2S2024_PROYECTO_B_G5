DELIMITER //

CREATE PROCEDURE review_insert(
    IN p_review_description TEXT,
    IN p_review_score INT,
    IN p_review_user_id BIGINT UNSIGNED,
    IN p_review_travel_id BIGINT UNSIGNED
)
BEGIN
    
    INSERT INTO Review (
        review_description,
        review_score,
        review_user_id,
        review_travel_id
    )

    VALUES (
        p_review_description,
        p_review_score,
        p_review_user_id,
        p_review_travel_id
    );

    SELECT 1;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE review_get_review_by_travel_id_descontinuada(
    IN p_review_travel_id BIGINT UNSIGNED
)

BEGIN 
    SELECT * FROM Review WHERE review_travel_id = p_review_travel_id;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE review_get_review_by_travel_id(
    IN p_review_travel_id BIGINT UNSIGNED
)
BEGIN
    SELECT 
        R.*, 
        U.user_name 
    FROM 
        Review R
    JOIN 
        User U 
    ON 
        R.review_user_id = U.user_id  -- Corregir la columna usada para el JOIN
    WHERE 
        R.review_travel_id = p_review_travel_id;
END //

DELIMITER ;



