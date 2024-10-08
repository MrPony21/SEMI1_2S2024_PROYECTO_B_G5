    CREATE TABLE IF NOT EXISTS User(
        user_id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) UNIQUE NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        user_credit INT  DEFAULT 0,
        user_image_link VARCHAR(500)

    );

    CREATE TABLE IF NOT EXISTS Travel(

        travel_id SERIAL PRIMARY KEY,
        travel_name VARCHAR(255) NOT NULL,
        travel_description TEXT NOT NULL,
        travel_cost INT NOT NULL,
        travel_image_link VARCHAR(500)
    );

    CREATE TABLE IF NOT EXISTS Label(

        label_id SERIAL PRIMARY KEY,
        label_description TEXT NOT NULL,
        label_travel_id BIGINT UNSIGNED,
        CONSTRAINT fk_travel_id FOREIGN KEY (label_travel_id) REFERENCES Travel(travel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Travel_log(
        travel_log_id SERIAL PRIMARY KEY,
        travel_log_travel_id BIGINT UNSIGNED,
        travel_log_user_id BIGINT UNSIGNED,
        CONSTRAINT fk_travels_id FOREIGN KEY (travel_log_travel_id) REFERENCES Travel(travel_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        CONSTRAINT fk_user_id FOREIGN KEY (travel_log_user_id) REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
