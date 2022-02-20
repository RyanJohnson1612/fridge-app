-- sample users
INSERT INTO users (first_name, last_name, email, password) VALUES ('Hippo', 'Oppih', 'hippo@cat.com', '$2b$10$jyw1m/0ldv.g/QUYBd8ow.BkBzUVNLTEn0nO.MJDF8/Srm8Q6H1YK'); /*password is = password*/
INSERT INTO users (first_name, last_name, email, password) VALUES ('Flamingo', 'Ognimalf', 'flamingo@cat.com', '$2b$10$jyw1m/0ldv.g/QUYBd8ow.BkBzUVNLTEn0nO.MJDF8/Srm8Q6H1YK');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Ostrich', 'Hcirtso', 'ostrich@cat.com', '$2b$10$jyw1m/0ldv.g/QUYBd8ow.BkBzUVNLTEn0nO.MJDF8/Srm8Q6H1YK');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Bread', 'Daerb', 'bread@cat.com', '$2b$10$jyw1m/0ldv.g/QUYBd8ow.BkBzUVNLTEn0nO.MJDF8/Srm8Q6H1YK');

-- sample fridges
INSERT INTO fridges (name, user_id) VALUES ('Joe', 1);
INSERT INTO fridges (name, user_id) VALUES ('Bob', 2);
INSERT INTO fridges (name, user_id) VALUES ('Juice', 3);
INSERT INTO fridges (name, user_id) VALUES ('Bita', 4);

-- sample grocery lists
INSERT INTO grocery_lists (user_id, name) VALUES (1, 'Party');
INSERT INTO grocery_lists (user_id, name) VALUES (2, 'Pizza');
INSERT INTO grocery_lists (user_id, name) VALUES (3, 'Nice');
INSERT INTO grocery_lists (user_id, name) VALUES (1, 'Birthday');

-- sample fridge items
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('bananas', 1, NULL, 'fruit', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('apples', 1, NULL, 'fruit', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'i am allergic but i like it');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 1, '2022-02-18', 'dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'milk makes me moo');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('chicken breast', 1, '2022-02-01', 'meat', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'bawk bawk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('broccoli', 1, NULL, 'vegetable', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'eating this raw kills ppl');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('cake', 1, '2022-03-31', 'dessert', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('ketchup', 1, '2022-07-17', 'condiment', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'my brother used to eat bananas with ketchup');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('tomatoes', 2, NULL, 'Fruit', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'potatoes');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('salmon', 2, '2022-02-27', 'seafood', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('cheese', 2, '2022-04-01', 'dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'fear the deer');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('mayonaise', 2, '2022-06-22', 'condiment', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'mayo man');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('coriander', 2, NULL, 'vegetable', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'if you like this you got problems');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, '2022-04-20', 'dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, '2022-04-21', 'dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, '2022-04-22', 'dairy', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, '2022-04-23', 'dairy', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, '2022-04-24', 'dairy', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'me love milk');

-- sample grocery items
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Tomatoes', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Potatoes', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Doritos', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Burritos', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Cheetos', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Sausages', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Ham', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Bacon', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Olives', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Shrimp', 3);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Avocado', 3);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Zucchini', 3);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Milk', 4);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Milk', 4);
