-- sample users
INSERT INTO users (first_name, last_name, email, password) VALUES ('Hippo', 'Oppih', 'hippo@cat.com', 'password');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Flamingo', 'Ognimalf', 'flamingo@cat.com', 'password');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Ostrich', 'Hcirtso', 'ostrich@cat.com', 'password');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Bread', 'Daerb', 'bread@cat.com', 'password');

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
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Bananas', 1, NULL, 'Fruit', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Apples', 1, NULL, 'Fruit', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'i am allergic but i like it');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Milk', 1, '2022-03-13', 'Dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'milk makes me moo');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Chicken breast', 1, '2022-02-01', 'Meat', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'bawk bawk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Broccoli', 1, NULL, 'Vegetable', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'eating this raw kills ppl');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Cake', 1, '2022-03-31', 'Dessert', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Ketchup', 1, '2022-07-17', 'Condiment', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'my brother used to eat bananas with ketchup');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Tomatoes', 2, NULL, 'Fruit', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'potatoes');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Salmon', 2, '2022-02-27', 'Seafood', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Cheese', 2, '2022-04-01', 'Dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'fear the deer');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Mayonaise', 2, '2022-06-22', 'Condiment', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'mayo man');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Coriander', 2, NULL, 'Vegetable', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'if you like this you got problems');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Milk', 4, '2022-04-20', 'Dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Milk', 4, '2022-04-21', 'Dairy', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Milk', 4, '2022-04-22', 'Dairy', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Milk', 4, '2022-04-23', 'Dairy', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('Milk', 4, '2022-04-24', 'Dairy', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'me love milk');

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
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Milk', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Milk', 1);
