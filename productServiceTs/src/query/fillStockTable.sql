INSERT INTO
    stocks(product_id, count)
VALUES
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                title = 'Messi''s kit'
        ),
        100000
    ),
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                title = 'Neymar''s kit'
        ),
        1000
    ),
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                title = 'Suarez''s kit'
        ),
        50
    ),
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                title = 'Iniesta''s kit'
        ),
        100
    ),
    (
        (
            SELECT
                id
            FROM
                products
            WHERE
                title = 'John''s kit'
        ),
        5
    )