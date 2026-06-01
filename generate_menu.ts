import fs from 'fs';

const rawData = {
    "Bowls & Salads": [
      {
        "name": "Asian Rice Bowl",
        "description": "A super combo of black sesame chicken, soft boiled eggs, broccoli & Jasmine rice for a soul satisfying meal.",
        "price": "₹450.00"
      },
      {
        "name": "Banhmi Rice Bowl",
        "description": "A modern twist on the classic Vietnamese Banh Mi, featuring fragrant jasmine rice, pickled vegetables, fresh herbs, and your choice of protein.",
        "price": "₹395.00"
      },
      {
        "name": "Charamoula Chicken Rice Bowl",
        "description": "Fragrant cheramoula chicken over herbed rice with sweet corn, tender broccoli & sharp pickled onions.",
        "price": "₹425.00"
      },
      {
        "name": "Chicken Shawarma Rice Bowl",
        "description": "A wholesome rice bowl with shawarma chicken, pickled cabbage, fresh veggies and sumac kissed chickpea.",
        "price": "₹450.00"
      },
      {
        "name": "Harissa Chicken Rice Bowl",
        "description": "A spicy bowl of harissa chicken on herbed rice paired with sweet peppers & Pickled onions and garlic aioli.",
        "price": "₹425.00"
      },
      {
        "name": "South West Chicken Rice Bowl",
        "description": "Loaded rice bowl with crispy chicken popcorn, creamy refried beans, tangy salsa & sauteed bell peppers.",
        "price": "₹450.00"
      },
      {
        "name": "Coconut Chilli Sambal Rice Bowl",
        "description": "A bold and flavorful rice bowl combining fragrant Chilli Basil rice with spicy Coconut sambal. Served with Sauteed Cherry tomato fresh avocado, Pickled Carrot and your choice of protein.",
        "price": "₹395.00"
      },
      {
        "name": "Couscous Chimicuri Chicken Rice Bowl",
        "description": "A vibrant cous cous bowl featuring fluffy couscous, tender grilled chicken tossed in zesty chimichurri, herb Tossed Chickpeas, and aromatic herbs for a flavorful, wholesome, and satisfying meal.",
        "price": "₹425.00"
      },
      {
        "name": "Moroccan Chicken Rice Bowl",
        "description": "A flavorful rice bowl featuring tender, spiced Moroccan chicken, fragrant rice, chickpeas, Pickled Carrots and Cucumber, delivering a warm, savory, and satisfying meal.",
        "price": "₹425.00"
      },
      {
        "name": "Avocado & Quinoa Salad",
        "description": "A wholesome and refreshing salad featuring creamy avocado, protein-rich quinoa, crisp greens, and a zesty dressing for a light, nutritious, and flavorful meal.",
        "price": "₹350.00"
      },
      {
        "name": "Bircher Muesli Bowl",
        "description": "A wholesome breakfast bowl of soaked oats, fresh fruits, nuts, and yogurt, lightly sweetened for a creamy, nutritious, and energizing start to your day.",
        "price": "₹350.00"
      },
      {
        "name": "Couscous & Chickpea Salad",
        "description": "A light and refreshing salad combining fluffy couscous, protein-rich chickpeas, fresh vegetables, and a zesty dressing for a nutritious, flavorful, and satisfying meal.",
        "price": "₹350.00"
      },
      {
        "name": "Crispy Chickpeas With Burrata & Harra",
        "description": "A delightful Combo Of crispy Sumac tossed Fried chickpeas, Tahina, creamy burrata, and a zesty harra sauce, served with Green Peas Shoots for a flavorful, crunchy, and indulgent experience.",
        "price": "₹395.00"
      },
      {
        "name": "Seasonal Fruits Burrata Salad",
        "description": "A fresh and elegant platter of juicy seasonal fruits paired with creamy, luscious burrata, drizzled with a touch of togarashi powder and balsamic reduction, refreshing, and indulgent treat.",
        "price": "₹400.00"
      },
      {
        "name": "Vegan Buddha Bowl",
        "description": "A wholesome, plant-based bowl featuring a colorful array of sauteed Zuccini, broccoli, cherry tomatoes, Refried Beans & Pepper tossed quinova.",
        "price": "₹400.00"
      },
      {
        "name": "Mixed Berry Smoothie Bowl",
        "description": "A vibrant smoothie bowl blended with a mix of fresh berries, topped with granola, seeds, and seasonal fruits for a refreshing, nutrient-packed, and indulgently fruity treat.",
        "price": "₹350.00"
      }
    ],
    "Bakes And Desserts": [
      {
        "name": "Butter Croissant",
        "description": "A classic French pastry, perfectly flaky and golden, with a light, airy interior and rich buttery flavor in every layer.",
        "price": "₹175.00"
      },
      {
        "name": "Mango Croissant",
        "description": "A Soft, buttery and flaky pastry with mango custard, housemade mango jam and fresh mangoes.",
        "price": "₹295.00"
      },
      {
        "name": "Pain-Au-Chocolate",
        "description": "A buttery, flaky pastry wrapped around rich dark chocolate, offering a perfect balance of crisp layers and smooth, indulgent sweetness.",
        "price": "₹200.00"
      },
      {
        "name": "Almond Croissant",
        "description": "A golden, buttery croissant filled with rich almond cream and topped with toasted almonds for a nutty crunch and irresistible sweetness.",
        "price": "₹225.00"
      },
      {
        "name": "Cranberry Cookie",
        "description": "A soft, buttery and loaded with tangy cranberry bits for a perfect sweet-tart bite.",
        "price": "₹99.00"
      },
      {
        "name": "Cream Cheese Cookie",
        "description": "A soft and buttery cookie with a subtle tang from cream cheese, offering a tender, melt-in-your-mouth texture and rich, comforting flavor.",
        "price": "₹100.00"
      },
      {
        "name": "Gooey Choco Chip Cookie",
        "description": "Soft, chewy, and packed with melting chocolate chips, this cookie offers a warm, indulgent treat with every bite.",
        "price": "₹100.00"
      },
      {
        "name": "Banana Choco Chip Tea Cake",
        "description": "A moist, tender cake infused with ripe bananas and studded with chocolate chips, perfect for a comforting tea-time treat.",
        "price": "₹200.00"
      },
      {
        "name": "Honey Toasted Almond Cake",
        "description": "A soft, buttery cake enriched with toasted almonds and a touch of honey, offering a nutty, sweet, and aromatic delight in every bite.",
        "price": "₹200.00"
      },
      {
        "name": "Moist Chocolate Cake",
        "description": "A rich, tender cake with deep chocolate flavor, perfectly soft and fudgy, offering a decadent indulgence in every bite.",
        "price": "₹250.00"
      },
      {
        "name": "Mango Cheesecake",
        "description": "A creamy baked cheesecake often topped with fresh mango.",
        "price": "₹275.00"
      },
      {
        "name": "Vegan Mango Cake",
        "description": "Deliciously crafted plant-based cake with tropical mango infusion.",
        "price": "₹275.00"
      },
      {
        "name": "Sticky Toffee Cake",
        "description": "A rich, moist cake drenched in luscious toffee sauce, offering a decadent, caramelized sweetness with every indulgent bite.",
        "price": "₹250.00"
      },
      {
        "name": "Pecan Nut Brownie",
        "description": "A rich, fudgy chocolate brownie studded with crunchy pecans, delivering a perfect combination of deep cocoa flavor and nutty texture in every bite.",
        "price": "₹250.00"
      },
      {
        "name": "Lotus Cheesecake",
        "description": "A creamy cheesecake layered with the rich, caramelized flavor of Lotus Biscoff, set on a crunchy biscuit base, creating a decadent and irresistible treat.",
        "price": "₹275.00"
      },
      {
        "name": "Mango Tres Leches",
        "description": "A light, airy sponge cake soaked in a mixture of three milks -evaporated milk, condensed milk, and heavy cream- resulting in a super-moist, pudding-like, and creamy dessert.",
        "price": "₹325.00"
      },
      {
        "name": "Cinnamon Roll",
        "description": "A soft, fluffy pastry swirled with cinnamon sugar, baked to golden perfection, and topped with a sweet, creamy glaze for a warm, comforting treat.",
        "price": "₹200.00"
      },
      {
        "name": "Classic Tiramisu",
        "description": "A timeless Italian dessert featuring layers of coffee-soaked ladyfingers, creamy mascarpone, and a dusting of cocoa, offering a perfect balance of rich, smooth, and slightly bitter-sweet flavors.",
        "price": "₹300.00"
      },
      {
        "name": "Three Cheese Savoury Danish",
        "description": "Buttery, Flaky danish filled with a rich blend of three cheese for a perfectly indulgent savoury treat.",
        "price": "₹200.00"
      },
      {
        "name": "Mango Mascarapone Danish",
        "description": "A Soft, creamy, buttery, flaky danish with mascarpone cream and fresh mangoes.",
        "price": "₹325.00"
      },
      {
        "name": "Tomato Feta Savoury Danish",
        "description": "Flaky, buttery danish layered with tangy tomato, creamy feta, and herbs for a perfectly balanced savoury bite.",
        "price": "₹225.00"
      },
      {
        "name": "Cheesy Mushroom Puff",
        "description": "Savoury bite-sized treats featuring a rich blend of creamy cheese and sautéed mushrooms.",
        "price": "₹275.00"
      },
      {
        "name": "Korean Bun",
        "description": "A soft, pillowy bun with a slightly sweet exterior, often filled with flavorful fillings like red bean, custard, or savory ingredients, offering a delightful bite with every mouthful.",
        "price": "₹295.00"
      }
    ],
    "Food & Pasta": [
      {
        "name": "Alfredo Penne Pasta",
        "description": "A creamy and indulgent penne pasta tossed in a rich Alfredo sauce, with your choice of vegetables, tender chicken, succulent prawns, or crispy bacon, finished with a sprinkle of Parmesan and herbs for a comforting, flavorful dish.",
        "price": "₹300.00"
      },
      {
        "name": "Arrabbiata Penne Pasta",
        "description": "Al dente penne pasta tossed in a fiery, garlicky tomato Arrabbiata sauce, with your choice of vegetables, tender chicken, succulent prawns, or crispy bacon, finished with fresh herbs for a bold and flavorful dish.",
        "price": "₹300.00"
      },
      {
        "name": "Pink Sauce Penne Pasta",
        "description": "Al dente penne pasta tossed in a creamy, tangy pink sauce, with your choice of vegetables, tender chicken, succulent prawns, or crispy bacon, garnished with fresh herbs for a rich and flavorful experience.",
        "price": "₹295.00"
      },
      {
        "name": "Spaghetti Aop With Fresh Mozzarella",
        "description": "Al dente spaghetti tossed in a rich AOP (Garlic, Olive oil, Chilli Flakes) sauce with Spinach, French Beans & topped with fresh mozzarella.",
        "price": "₹295.00"
      },
      {
        "name": "Signature French Toast",
        "description": "Thick, golden slices of brioche soaked in a rich custard, pan-fried to perfection, and served with fresh fruits, syrup, and a dusting of powdered sugar for a sweet, indulgent breakfast treat.",
        "price": "₹350.00"
      },
      {
        "name": "English Breakfast",
        "description": "A hearty classic English breakfast featuring your choice of chicken or pork sausage, or crispy bacon, served with eggs, sautéed elements, and toast.",
        "price": "₹500.00"
      },
      {
        "name": "Exotic Vegetables Quesadillas",
        "description": "Tortilla filled with a colorful medley of exotic vegetables and melted cheese, served with a side of fresh salsa for a flavorful, satisfying bite.",
        "price": "₹350.00"
      },
      {
        "name": "Hummus & Pita Platter",
        "description": "A classic Mediterranean platter featuring creamy, seasoned hummus served with warm, soft pita bread, perfect for dipping and sharing.",
        "price": "₹350.00"
      },
      {
        "name": "Mediterranean Dips Platter",
        "description": "A vibrant assortment of Mediterranean dips, including creamy hummus, smoky baba ganoush, and tangy tzatziki, served with fresh pita bread for a flavorful and shareable experience.",
        "price": "₹400.00"
      },
      {
        "name": "Chicken Quesadillas",
        "description": "Tortilla filled with tender, spiced chicken and melted cheese, served with fresh salsa and a side of creamy dip for a flavorful, satisfying treat.",
        "price": "₹375.00"
      }
    ],
    "Toast & Sandwiches": [
      {
        "name": "Italian Pesto Ciabatta Sandwich",
        "description": "A flavorful ciabatta sandwich layered with fresh Italian pesto, crisp vegetables, and your choice of tender smoked chicken, for a savory, aromatic, and satisfying meal.",
        "price": "₹350.00"
      },
      {
        "name": "Saucy Beans On Toast",
        "description": "Hearty, flavorful beans in a rich tomato sauce served on toasted sourdough, with an optional topping of tender smoked chicken for a savory, satisfying breakfast or brunch.",
        "price": "₹325.00"
      },
      {
        "name": "Avocado & Feta On Sourdough Toast",
        "description": "Creamy avocado and crumbly feta served on toasted sourdough, drizzled with olive oil and garnished with fresh herbs for a fresh, flavorful, and wholesome breakfast or brunch.",
        "price": "₹325.00"
      },
      {
        "name": "Peanut Butter And Banana On Sourdough Toast",
        "description": "Toasted sourdough generously spread with creamy peanut butter and layered with fresh banana slices, offering a sweet, nutty, and satisfying breakfast or snack.",
        "price": "₹325.00"
      },
      {
        "name": "Spinach, Mushroom, Cheese Omelet & Toast",
        "description": "Fluffy omelet filled with sautéed spinach, savory mushrooms, and gooey cheese, served with toasted bread.",
        "price": "₹325.00"
      },
      {
        "name": "Seasonal Fruit Brioche Toast",
        "description": "Buttery brioche toast topped with Cream Cheese Frosting & a colorful assortment of fresh seasonal fruits.",
        "price": "₹375.00"
      },
      {
        "name": "4 Cheese Sourdough Sandwich",
        "description": "A decadent sandwich made with sour dough featuring a blend of Mozzarella, Red Cheddar, Processed Cheese and Parmesan. gooey, savory, and indulgent treat.",
        "price": "₹425.00"
      },
      {
        "name": "Akuri Eggs On Herbs Pao",
        "description": "Spicy and flavorful Parsi-style scrambled eggs (Akuri) served on soft, fragrant herb-infused pao, offering a bold, aromatic, and satisfying breakfast experience.",
        "price": "₹295.00"
      },
      {
        "name": "Scrambled Eggs On Sourdough Toast",
        "description": "Creamy, soft scrambled eggs served on toasted sourdough bread, offering a simple yet flavorful breakfast with a perfect balance of texture and comfort.",
        "price": "₹300.00"
      },
      {
        "name": "Mediterranean Poached Eggs With Chicken Sausage",
        "description": "Perfectly poached eggs served atop a bed of Mediterranean vegetables, drizzled with olive oil and herbs for a fresh, flavorful, and wholesome breakfast or brunch delight.",
        "price": "₹325.00"
      },
      {
        "name": "Smoked Chicken Baguette",
        "description": "A crisp baguette filled with tender, smoky chicken, fresh greens, and flavorful condiments, creating a savory, hearty, and satisfying sandwich experience.",
        "price": "₹375.00"
      },
      {
        "name": "Balsamic Chicken Sourdough Sandwich",
        "description": "Grilled chicken Sandwich made with Sour Dough. Tangy balsamic glazed Chicken & layered with fresh Tomatoes, flavorful, and satisfying sandwich.",
        "price": "₹400.00"
      },
      {
        "name": "Harissa Grilled Cheese & Chicken Sourdough Sandwich",
        "description": "A bold and flavorful Sour Dough sandwich with Harissa Spiced chicken, melted cheese, and Buttery Grilled finish.",
        "price": "₹400.00"
      },
      {
        "name": "Avocado Poached Egg Herb Oil Toast With Mustard Cress",
        "description": "A perfectly poached egg and creamy avocado on toasted bread, drizzled with aromatic herb oil and topped with peppery mustard cress for a fresh, flavorful, and elegant breakfast or brunch.",
        "price": "₹350.00"
      }
    ],
    "Coffee Specialties": [
      {
        "name": "Iced Americano",
        "description": "A simple yet bold coffee made by diluting espresso with hot water or ice. Smooth, full-bodied, and refreshingly straightforward.",
        "price": "₹175.00"
      },
      {
        "name": "Mocha Cold",
        "description": "A delicious blend of rich espresso, steamed or chilled milk, and velvety chocolate. Sweet, creamy, and indulgent.",
        "price": "₹245.00"
      },
      {
        "name": "Affogato",
        "description": "A decadent Italian treat where a hot shot of espresso is poured over creamy vanilla ice cream. A perfect harmony of bitter and sweet, warm and cold, in every indulgent bite.",
        "price": "₹195.00"
      },
      {
        "name": "Freddo Espresso",
        "description": "A chilled double shot of espresso, shaken over ice to create a smooth, frothy, and intensely bold coffee. Perfectly balanced, refreshing, and full of rich espresso flavor.",
        "price": "₹195.00"
      },
      {
        "name": "Iced Classic Latte",
        "description": "A refreshing mix of rich espresso and chilled milk served over ice. Smooth, creamy, and perfectly balanced for a cool, invigorating coffee experience.",
        "price": "₹195.00"
      },
      {
        "name": "Freddo Cappuccino",
        "description": "A Greek-style iced coffee made with a shot of espresso shaken to a frothy perfection and topped with chilled, velvety milk foam. Bold, smooth, and refreshingly creamy.",
        "price": "₹225.00"
      },
      {
        "name": "Classic Cold Coffee",
        "description": "A smooth and refreshing mix of chilled coffee, milk, and a hint of sweetness, served over ice. Creamy, invigorating, and perfect for a cool coffee fix.",
        "price": "₹245.00"
      },
      {
        "name": "Espresso Tonic",
        "description": "A refreshing and invigorating mix of bold espresso and sparkling tonic water over ice. Bright, slightly bitter, and effervescent.",
        "price": "₹245.00"
      },
      {
        "name": "Americano (Hot)",
        "description": "A simple yet bold coffee made by diluting espresso with hot water. Smooth, full-bodied, and refreshingly straightforward.",
        "price": "₹175.00"
      },
      {
        "name": "Caffe Latte",
        "description": "A smooth and comforting blend of rich espresso and steamed milk, topped with a light layer of foam. Creamy, mellow, and perfect for a gentle coffee experience.",
        "price": "₹175.00"
      },
      {
        "name": "Cappuccino",
        "description": "A classic Italian coffee combining equal parts espresso, steamed milk, and frothy milk foam. Balanced, creamy, and aromatic.",
        "price": "₹175.00"
      },
      {
        "name": "Cortado",
        "description": "A perfectly balanced coffee with equal parts espresso and steamed milk. Smooth, strong, and velvety.",
        "price": "₹175.00"
      },
      {
        "name": "Espresso",
        "description": "A concentrated shot of rich, bold coffee with a velvety crema on top. Intense, aromatic, and pure.",
        "price": "₹175.00"
      },
      {
        "name": "Flat White",
        "description": "A smooth and velvety coffee made with a double shot of espresso and steamed milk, topped with a thin layer of microfoam. Rich, balanced, and perfectly creamy in every sip.",
        "price": "₹175.00"
      },
      {
        "name": "Macchiato",
        "description": "Concentrated espresso-based drink consisting of a bold shot of espresso with a small amount of foamed milk.",
        "price": "₹175.00"
      },
      {
        "name": "Lore Kappi",
        "description": "Reimagines the Cortado with earthy jaggery sweetness capturing the timeless comfort of filter coffee in every sip.",
        "price": "₹175.00"
      },
      {
        "name": "Banana Latte (Hot/Cold)",
        "description": "A unique blend of bold espresso and creamy milk infused with the natural sweetness of banana. Smooth, mellow, and perfectly balanced with a hint of tropical warmth.",
        "price": "₹245.00"
      },
      {
        "name": "Hazelnut Latte (Hot/Cold)",
        "description": "A smooth, nutty indulgence- rich espresso blended with creamy milk and the warm sweetness of roasted hazelnut.",
        "price": "₹245.00"
      },
      {
        "name": "Irish Latte (Hot/Cold)",
        "description": "A rich and aromatic blend of espresso, milk, and smooth Irish cream flavour. Silky, slightly boozy in taste, and perfectly balanced with notes of vanilla and caramel.",
        "price": "₹245.00"
      },
      {
        "name": "Lotus Latte (Hot/Cold)",
        "description": "A delightful fusion of espresso, milk, and the caramelized cookie sweetness of Lotus Biscoff. Creamy, spiced, and indulgently smooth.",
        "price": "₹245.00"
      },
      {
        "name": "Popcorn Latte (Hot/Cold)",
        "description": "A playful and indulgent twist on a classic latte, combining rich espresso, creamy milk, and the sweet, buttery flavor of caramelized popcorn. Warm, comforting, and delightfully nostalgic.",
        "price": "₹245.00"
      },
      {
        "name": "Pumpkin Spiced Latte (Hot/Cold)",
        "description": "A cozy blend of espresso, milk, and warm pumpkin spice, topped with velvety foam. Comforting, aromatic, and perfect for the season.",
        "price": "₹245.00"
      },
      {
        "name": "Rose Latte (Hot/Cold)",
        "description": "A fragrant blend of espresso and milk infused with delicate rose essence. Smooth, floral, and lightly sweet.",
        "price": "₹245.00"
      },
      {
        "name": "Saffron Latte (Hot/Cold)",
        "description": "A luxurious blend of espresso and milk, infused with the delicate aroma and subtle warmth of saffron strands. Smooth, aromatic, and subtly sweet.",
        "price": "₹245.00"
      },
      {
        "name": "Salted Caramel Latte (Hot/Cold)",
        "description": "A luscious mix of espresso and velvety milk, swirled with golden caramel and a touch of sea salt. Sweet, buttery, and perfectly balanced with a subtle salty finish.",
        "price": "₹245.00"
      },
      {
        "name": "Spanish Latte (Hot/Cold)",
        "description": "A creamy and indulgent blend of rich espresso and milk, sweetened with a touch of condensed milk for a smooth, velvety finish. Perfectly balanced between bold and sweet.",
        "price": "₹245.00"
      },
      {
        "name": "Vanilla Mint Latte (Hot/Cold)",
        "description": "A refreshing twist on a classic latte, blending smooth espresso with creamy milk, sweet vanilla, and a cool hint of mint. Light, aromatic, and perfectly balanced for a soothing yet invigorating sip.",
        "price": "₹245.00"
      }
    ],
    "Manual Brews & Retail Beans": [
      {
        "name": "Aeropress",
        "description": "A clean and flavorful coffee brewed using the Aeropress method, producing a smooth, rich, and aromatic cup. Bright, balanced, and crafted for coffee enthusiasts who appreciate precision and clarity in every sip.",
        "price": "₹175.00"
      },
      {
        "name": "Pourover - Kalita",
        "description": "A vibrant and aromatic coffee brewed using the pour-over method, highlighting natural fruity notes of blueberry or green apple. Crisp, bright, and refreshing.",
        "price": "₹175.00"
      },
      {
        "name": "Classic Cold Brew",
        "description": "Carefully slow-brewed for hours, this classic cold brew delivers a smooth, rich, and clean coffee experience, with bright, balanced flavors and a naturally refreshing finish that awakens the senses in every sip.",
        "price": "₹195.00"
      },
      {
        "name": "Clever Dripper",
        "description": "A smooth and flavorful coffee brewed with the Clever Dripper, combining immersion and drip methods for a balanced cup. Rich, aromatic, and full-bodied, highlighting the coffee properties beautifully.",
        "price": "₹245.00"
      },
      {
        "name": "Cold Brew Coconut",
        "description": "A tropical twist on classic cold brew, slowly steeped for a smooth, rich coffee base, layered with creamy coconut notes and a naturally refreshing finish.",
        "price": "₹245.00"
      },
      {
        "name": "Cold Brew Cranberry",
        "description": "A vibrant twist on classic cold brew, slow-brewed for smooth, rich coffee, brightened with tart cranberry notes for a refreshing, fruity finish.",
        "price": "₹245.00"
      },
      {
        "name": "Cold Brew Orange",
        "description": "A zesty twist on classic cold brew, slow-steeped for smooth, rich coffee, infused with bright, citrusy orange notes for a refreshing, lively finish.",
        "price": "₹245.00"
      },
      {
        "name": "Cold Brew Rose",
        "description": "Elegantly slow-brewed for a smooth, rich coffee base, delicately infused with fragrant rose notes, offering a floral, refreshing, and sophisticated finish.",
        "price": "₹245.00"
      },
      {
        "name": "Pourover - Blueberry",
        "description": "A vibrant and aromatic coffee brewed using the pour-over method, highlighting natural fruity notes of blueberry or green apple. Crisp, bright, and refreshing.",
        "price": "₹245.00"
      },
      {
        "name": "Pourover - Green Apple",
        "description": "A vibrant and aromatic coffee brewed using the pour-over method, highlighting natural fruity notes of green apple. Crisp, bright, and refreshing.",
        "price": "₹245.00"
      },
      {
        "name": "Ratnagiri Arabica Natural (Retail Beans)",
        "description": "Premium whole bean specialty single-origin coffee selection sourced directly from Ratnagiri estates.",
        "price": "₹800.00"
      },
      {
        "name": "Blended Roasted Espresso Beans (Retail)",
        "description": "A harmonious balanced 70:30 Arabica-Robusta blend delivering bright citrus and cocoa notes, a rich chocolatey body, and a smooth, long-lasting finish- perfect for both straight shots and milk-based drinks.",
        "price": "₹600.00"
      },
      {
        "name": "Salawara Arabica Washed (Retail Beans)",
        "description": "A vibrant single-origin Arabica from 3,800 ft, with lively citrus notes, black tea depth, and a smooth palm sugar finish- balanced, bright, and beautifully complex.",
        "price": "₹600.00"
      }
    ],
    "Tea & Matcha": [
      {
        "name": "Apple Mint Tea",
        "description": "A refreshing blend of crisp apple and cool mint, perfectly brewed into a light, chilled iced tea.",
        "price": "₹195.00"
      },
      {
        "name": "Hibiscus Iced Tea",
        "description": "Treat yourself to the invigorating taste of our Hibiscus Iced Tea. Brewed with vibrant hibiscus petals and served over ice, it's a wonderfully fruity and floral drink that's sure to enliven your senses with every sip.",
        "price": "₹195.00"
      },
      {
        "name": "Hibiscus Mint Tea",
        "description": "A refreshing blend of tangy hibiscus and cool mint, served chilled for a naturally vibrant and revitalizing iced tea experience.",
        "price": "₹195.00"
      },
      {
        "name": "Lemon Grass Iced Tea",
        "description": "Quench your thirst with our refreshing Lemongrass Iced Tea. A harmonious blend of zesty lemongrass and cool tea, infused with hints of citrus and sweetness, it's a revitalising drink that invigorates the senses with every sip.",
        "price": "₹195.00"
      },
      {
        "name": "Lemon Iced Tea",
        "description": "Refresh and hydrate with our invigorating Lemon Iced Tea. Overflowing with vibrant citrus notes and expertly brewed, it's the perfect beverage to lift your spirits and rejuvenate your senses sip by sip.",
        "price": "₹195.00"
      },
      {
        "name": "Assam Black Tea",
        "description": "A robust and malty black tea from India, full-bodied and brisk, perfect for a strong, invigorating cup that pairs well with milk or enjoyed plain.",
        "price": "₹175.00"
      },
      {
        "name": "Green Tea",
        "description": "A soothing and revitalizing hot beverage, carefully brewed from premium green tea leaves, offering a delicate aroma, subtle flavor, and natural wellness benefits in every cup.",
        "price": "₹175.00"
      },
      {
        "name": "Jasmine Green Tea",
        "description": "Delicately scented green tea infused with fragrant jasmine blossoms, offering a light, floral, and refreshing cup that soothes and uplifts.",
        "price": "₹175.00"
      },
      {
        "name": "Masala Chai",
        "description": "A warming blend of spiced tea and steamed milk, infused with aromatic masala spices for a comforting, flavorful, and soothing hot beverage.",
        "price": "₹175.00"
      },
      {
        "name": "Banana Matcha",
        "description": "Ceremonial Matcha, Oat milk & Banana.",
        "price": "₹345.00"
      },
      {
        "name": "Classic Iced Matcha",
        "description": "Ceremonial matcha, Oat milk, Coconut milk & Vanilla.",
        "price": "₹345.00"
      },
      {
        "name": "Kiwi Matcha",
        "description": "Ceremonial Matcha, Oat milk & Kiwi.",
        "price": "₹345.00"
      },
      {
        "name": "Mango Matcha",
        "description": "Ceremonial Matcha, Oat milk & Mango.",
        "price": "₹345.00"
      },
      {
        "name": "Matcha Creme Frappe",
        "description": "Ceremonial Matcha, Dairy Milk & Vanilla ice cream.",
        "price": "₹345.00"
      },
      {
        "name": "Salted Pistachio Matcha",
        "description": "Ceremonial Matcha, Oat milk, Pistachio & Salted Caramel.",
        "price": "₹345.00"
      },
      {
        "name": "Strawberry Matcha",
        "description": "Ceremonial Matcha, Oat milk & Strawberry.",
        "price": "₹345.00"
      }
    ],
    "Frappes, Shakes & Non-Coffee Beverages": [
      {
        "name": "Choco Chip Frappe",
        "description": "A creamy, chilled frappe loaded with chocolate chips, blending rich chocolate flavors with smooth coffee for a sweet, indulgent, and delightfully textured treat.",
        "price": "₹245.00"
      },
      {
        "name": "Liquid Tiramisu",
        "description": "A decadent frappe inspired by classic tiramisu, blending rich coffee, creamy mascarpone, and a hint of cocoa for a smooth, indulgent dessert in every sip.",
        "price": "₹245.00"
      },
      {
        "name": "Salted Caramel Frappe",
        "description": "Savor the irresistible allure of our Salted Caramel Frappe. Velvety smooth and indulgently creamy, it's a perfect harmony of rich caramel flavors balanced with a hint of sea salt.",
        "price": "₹245.00"
      },
      {
        "name": "Vanilla Mint Frappe",
        "description": "A creamy, icy frappe blending classic vanilla with a refreshing hint of mint, perfectly balanced for a cool, indulgent, and invigorating treat.",
        "price": "₹245.00"
      },
      {
        "name": "Apple Pie Milkshake",
        "description": "A creamy, spiced inspired by classic apple pie- blended with apples, cinnamon and a touch of sweetness.",
        "price": "₹245.00"
      },
      {
        "name": "Peanut Butter Milkshake",
        "description": "A rich and creamy frappe blending smooth peanut butter with chilled coffee, delivering a nutty, indulgent, and satisfyingly sweet treat with every sip.",
        "price": "₹245.00"
      },
      {
        "name": "Salted Pistachio Milkshake",
        "description": "A creamy blend of roasted pistachios with a hint of sea salt- perfectly nutty and indulgent.",
        "price": "₹245.00"
      },
      {
        "name": "Strawberry Vanilla Milkshake",
        "description": "A creamy blend of fresh strawberries and smooth vanilla ice cream, perfectly chilled for a classic, indulgent milkshake delight.",
        "price": "₹245.00"
      },
      {
        "name": "Ginger Lemon & Tender Coconut",
        "description": "A refreshing, non-coffee cooler blending zesty ginger, tangy lemon, and smooth tender coconut for a naturally invigorating and revitalizing drink.",
        "price": "₹195.00"
      },
      {
        "name": "Guava Chilli",
        "description": "A bold and refreshing non-coffee drink combining sweet, tropical guava with a hint of spicy chilli, delivering a tangy, zesty, and invigorating flavor experience.",
        "price": "₹250.00"
      },
      {
        "name": "Jamun Kalakhatta",
        "description": "A tangy and refreshing non-coffee cooler blending the bold flavors of ripe jamun with classic kala khatta, delivering a sweet, tart, and invigorating treat.",
        "price": "₹195.00"
      },
      {
        "name": "Spice Toddy",
        "description": "A warm, spiced blend of citrus, honey and aromatic herbs- the perfect cozy toddy to lift your spirits.",
        "price": "₹175.00"
      },
      {
        "name": "Lychee Rose",
        "description": "A delicate and refreshing non-coffee drink blending sweet, juicy lychee with fragrant rose, creating a floral, subtly fruity, and elegantly soothing refreshment.",
        "price": "₹250.00"
      },
      {
        "name": "Pineapple Bird's Eye Chilli",
        "description": "A bold and tropical non-coffee cooler combining sweet, juicy pineapple with a fiery hint of bird's eye chilli.",
        "price": "₹250.00"
      },
      {
        "name": "Tamarind Shikanji",
        "description": "A tangy and refreshing non-coffee beverage blending zesty tamarind with classic Shikanji spices, delivering a sweet, sour, and invigorating drink that awakens the senses.",
        "price": "₹250.00"
      },
      {
        "name": "Ginger Ale - Kaffir Lime",
        "description": "A fizzy classic infused with smooth ginger notes and bright aromatic kaffir lime for a cool, thirst-quenching sip.",
        "price": "₹250.00"
      },
      {
        "name": "Kombuchas",
        "description": "A refreshing, lightly effervescent fermented tea, naturally tangy with subtle sweetness, known for its probiotics and invigorating, crisp flavor.",
        "price": "₹250.00"
      },
      {
        "name": "Hot Chocolate",
        "description": "Indulge in the decadence of our Hot Chocolate. This luxurious blend features creamy cocoa and velvety milk, topped with a cloud of whipped cream, a sprinkle of cocoa powder, and marshmallows.",
        "price": "₹200.00"
      },
      {
        "name": "Peppermint Hot Chocolate",
        "description": "A cozy blend of rich, velvety chocolate infused with a refreshing hint of peppermint- warm, indulgent and perfectly festive.",
        "price": "₹255.00"
      }
    ],
    "Smoothie Bowls": [
      {
        "name": "Alphonso Mango & Soaked Chia Smoothie Bowl",
        "description": "Alphonso mango smoothie bowl topped with soaked chia seeds and fresh blueberries.",
        "price": "₹349.00"
      },
      {
        "name": "Banana, Honey & Peanut Brittle Smoothie Bowl",
        "description": "Banana smoothie with honey topped with fresh banana, peanut brittle, and chocolate ganache.",
        "price": "₹349.00"
      },
      {
        "name": "Chocolate, Banana & Dates Smoothie Bowl",
        "description": "Chocolate, Coconut, banana, and dates smoothie bowl topped with fresh banana, fruit loops, and chocolate chips.",
        "price": "₹389.00"
      },
      {
        "name": "Avocado & Coconut Granola Smoothie Bowl",
        "description": "Coconut and avocado smoothie bowl topped with mixed berries and granola.",
        "price": "₹399.00"
      },
      {
        "name": "Strawberry & Banana Smoothie Bowl",
        "description": "Strawberry and banana smoothie bowl topped with fresh banana, kiwi, and granola.",
        "price": "₹349.00"
      }
    ]
};

function formatKey(key: string) {
    return key.toLowerCase().replace(/[&\s]+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

const menuCategories = Object.keys(rawData).map(categoryName => {
    return {
        id: formatKey(categoryName),
        title: categoryName,
        items: rawData[categoryName as keyof typeof rawData].map((item: any) => ({
            name: item.name,
            price: Number(item.price.replace(/[^0-9.]/g, '')),
            description: item.description,
            tags: []
        }))
    };
});

const content = fs.readFileSync('src/data.ts', 'utf-8');
const searchString = 'export const DIGITAL_MENU: MenuCategory[] = ';
const idx = content.indexOf(searchString);

if (idx !== -1) {
    const startStr = content.substring(0, idx + searchString.length);
    const newContent = startStr + JSON.stringify(menuCategories, null, 2) + ';\n';
    fs.writeFileSync('src/data.ts', newContent);
    console.log("Successfully updated DIGITAL_MENU");
} else {
    console.error("Could not find DIGITAL_MENU export");
}
