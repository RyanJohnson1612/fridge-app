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
INSERT INTO grocery_lists (user_id, name) VALUES (1, 'BBQ');

-- sample fridge items
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('bananas', 1, NULL, 'fruit', 'https://spoonacular.com/cdn/ingredients_500x500/bananas.jpg', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('red pepper', 1, CURRENT_DATE + 1, 'vegetable', 'https://spoonacular.com/cdn/ingredients_500x500/red-pepper.jpg', 'i am allergic but i like it');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 1, '2022-02-18', 'dairy', 'https://spoonacular.com/cdn/ingredients_500x500/milk.png', 'milk makes me moo');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('pork chop', 1, CURRENT_DATE + 1, 'meat', 'https://spoonacular.com/cdn/ingredients_500x500/pork-chops.jpg', 'chop chop');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('broccoli', 1, CURRENT_DATE, 'vegetable', 'https://spoonacular.com/cdn/ingredients_500x500/broccoli.jpg', 'eating this raw kills ppl');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('cake', 1, '2022-03-31', 'dessert', 'https://spoonacular.com/cdn/ingredients_500x500/pound-cake.jpg', 'cake bake shake rake make sake lake take');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('ketchup', 1, '2022-07-17', 'condiment', 'https://spoonacular.com/cdn/ingredients_500x500/ketchup.png', 'my brother used to eat bananas with ketchup');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('tomatoes', 2, NULL, 'fruit', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'potatoes');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('cheese', 2, '2022-04-01', 'dairy', 'https://images.unsplash.com/photo-1511264827770-095d5f6db91e', 'fear the deer');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('salmon', 2, '2022-02-27', 'seafood', 'https://spoonacular.com/cdn/ingredients_500x500/salmon.jpg', NULL);
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('mayonaise', 2, '2022-06-22', 'condiment', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'mayo man');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('coriander', 2, '2022-01-01', 'vegetable', 'https://images.unsplash.com/photo-1556997685-309989c1aa82', 'if you like this you got problems');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, '2022-02-20', 'dairy', 'https://spoonacular.com/cdn/ingredients_500x500/milk.png', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, CURRENT_DATE, 'dairy', 'https://spoonacular.com/cdn/ingredients_500x500/milk.png', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, CURRENT_DATE + 2, 'dairy', 'https://spoonacular.com/cdn/ingredients_500x500/milk.png', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, CURRENT_DATE + 4, 'dairy', 'https://spoonacular.com/cdn/ingredients_500x500/milk.png', 'me love milk');
INSERT INTO fridge_items (name, fridge_id, expiry, category, image_URL, notes) VALUES ('milk', 4, CURRENT_DATE + 100, 'dairy', 'https://spoonacular.com/cdn/ingredients_500x500/milk.png', 'me love milk');

-- sample grocery items
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Tomatoes', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Potatoes', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Cookies', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Shrimp', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Avocado', 1);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Sausages', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Ham', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Bacon', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Olives', 2);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Blueberry', 3);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Seaweed', 3);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Zucchini', 3);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Milk', 4);
INSERT INTO grocery_items (name, grocery_list_id) VALUES ('Milk', 4);
