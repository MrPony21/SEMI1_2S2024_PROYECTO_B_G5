
DELIMITER //
CREATE PROCEDURE label_insert(
    IN p_label_description TEXT,
    IN p_label_travel_id BIGINT UNSIGNED
)

BEGIN 
    INSERT INTO Label (
        label_description,
        label_travel_id
    )

    VALUES (
        p_label_description,
        p_label_travel_id
    );

    SELECT 1;

END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE label_get_label_by_id(
    IN p_label_id BIGINT UNSIGNED
)
BEGIN
    SELECT * FROM Label WHERE label_id = p_label_id;
END //
DELIMITER ;