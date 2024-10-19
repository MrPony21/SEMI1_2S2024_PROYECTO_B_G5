    DELIMITER // 

    CREATE PROCEDURE user_login (
        IN p_username_or_email VARCHAR(255),
        IN p_password VARCHAR(255)
    ) 
    BEGIN 
    DECLARE p_result INT DEFAULT 0;


    SELECT
        User.user_id INTO p_result
    FROM
        User
    WHERE
        (p_username_or_email = User.user_name
        OR p_username_or_email = User.user_email) 
        AND User.user_password = p_password;
        
        SELECT p_result;
        
	

    END // 

    DELIMITER;
    
    

    DELIMITER //

    CREATE PROCEDURE user_insert(
        IN p_new_user_name VARCHAR(255),
        IN p_new_user_email VARCHAR(255),
        IN p_new_user_password VARCHAR (255)
        -- IN p_new_user_image_link VARCHAR(255)
        )
        BEGIN
        DECLARE p_result INT DEFAULT 0;
        
        INSERT INTO User(
        user_name,
        user_email,
        user_password
        -- user_image_link
        )
        
        VALUES (p_new_user_name, 
        p_new_user_email, 
        p_new_user_password
        -- p_new_user_image_link
        );
        
        SELECT user_id FROM User WHERE user_name = p_new_user_name;
        END //

    DELIMITER;
    


    DELIMITER //

    CREATE PROCEDURE user_update(
        IN p_user_id INT,
        IN p_user_name VARCHAR(255),
        IN p_user_email VARCHAR(255),
        IN p_user_password VARCHAR (255),
        IN p_user_credit INT,
        IN p_user_image_link VARCHAR(255)
    )
    BEGIN
	
    UPDATE User
    SET 
    user_name = IF(p_user_name IS NOT NULL, p_user_name, user_name),
    user_email = IF(p_user_email IS NOT NULL, p_user_email, user_email),
    user_password = IF(p_user_password IS NOT NULL, p_user_password, user_password),
    user_credit = IF(p_user_credit IS NOT NULL, p_user_credit, user_credit),
    user_image_link = IF(p_user_image_link IS NOT NULL , p_user_image_link, user_image_link)
    WHERE user_id = p_user_id;
    
	
    SELECT 1;
    
    END //
    DELIMITER;



    DELIMITER //

    CREATE PROCEDURE user_delete(
        IN p_user_id INT
    )

    BEGIN 
    DELETE FROM User WHERE p_user_id = User.user_id;
    SELECT 1;
    END //



    

