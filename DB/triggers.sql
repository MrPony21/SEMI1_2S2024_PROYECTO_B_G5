DELIMITER //

CREATE TRIGGER review_update_trigger
AFTER INSERT ON Review
FOR EACH ROW
BEGIN

    UPDATE Travel
    SET travel_review = (
        SELECT AVG(review_score)
        FROM Review
        WHERE review_travel_id = NEW.review_travel_id
    )
    WHERE travel_id = NEW.review_travel_id;

END //
