import fs from 'fs';

const newReviews = [
  {
    "content": "We loved that this place is dog friendly. The breakfast - both the English breakfast and the French toast was delicious. Great ambience, has valet parking (a relief) and has good coffee. Although the service is slow and takes time to be seated, the overall experience was good. The matcha could be better.",
    "stars": 4,
    "name": "Punitha Ankaraju"
  },
  {
    "content": "Its a nice fun place to chill and work. They have all the requisites to make that happen. Parking might be an issue on busy days and the service needs a serious upgrade. Everything needs to be asked for which makes things clumsy.\nFood is great and so is the coffee.",
    "stars": 4,
    "name": "Shreejon Biyani"
  },
  {
    "content": "A beautiful cafe at the city center ~ Jayanagar with both open and closed sitting area. Great place to work remotely, meet friends, a 1:1 business meeting, go on a date, group or solo.\nThey have meeting rooms inside.Vibe of the place is really good. Only one thing - they should improve on service speed. Wait is too long.",
    "stars": 4,
    "name": "Richa Agrawal"
  },
  {
    "content": "Great variety of coffee and the way I like it.... Nice and calm ambiance. Good place to have nice and long conversations.",
    "stars": 5,
    "name": "Eshwar Makam"
  },
  {
    "content": "Excellent food quality and very good service. The ambience is nice and comfortable, perfect for a relaxed meal. The coffee tastes excellent—rich and well balanced.\nThe Moroccan Chicken Rice Bowl was absolutely delicious, and the Harissa Chicken Sourdough Sandwich had an amazing taste as well. Overall, a great dining experience. Highly recommended.",
    "stars": 5,
    "name": "praveen kumar"
  },
  {
    "content": "Had a lovely experience at Beanlore. I tried the hazelnut cappuccino and a regular cappuccino—both were excellent. The almond croissant 🥐 was especially good, fresh and perfectly balanced.\n\nI visited at night, and the ambiance really stood out—calm, soothing, and a great place to relax and unwind. The staff was welcoming, and I really appreciated that the manager personally came to our table to check if everything was good.\n\nOverall, great coffee, good food, and a very pleasant vibe. Definitely worth a visit!",
    "stars": 5,
    "name": "Sanjay Nayak"
  },
  {
    "content": "This café feels like a soft pause in time. It carries the old-Bangalore charm—the unhurried kind, where evenings are meant for sitting around with coffee, conversations that wander, and nature quietly keeping you company.\n\nFrom the food to the ambience to the people, everything felt thoughtfully aligned. Every bite delighted, and every moment felt easy and warm.\n\nIt’s rare to find a place that feeds both your senses and your soul. This one does both—and has easily become my new adda, filled with nostalgia and comfort.\n\nNo recommendations. You just got to try everything!",
    "stars": 5,
    "name": "bhoomika chakravarthi"
  },
  {
    "content": "The ambiance is really why you should visit this place. peaceful place to get your work done. Listen to music.\n\nAs this is a new place some work needs to be done on quality of coffee and service. But I still heading back soon.",
    "stars": 4,
    "name": "Manjunath Vishwanath"
  },
  {
    "content": "OMG ! Such an amazing place . Felt like discovering a hidden gem . The almond croissant was really good and the rose litchee was thirst quenching",
    "stars": 5,
    "name": "Shreya Hegde"
  },
  {
    "content": "Really airy and open spot, its close enough to the metro station that you can easily justify the walk and even the ambience/atmosphere was honestly much calmer and more relaxing than I expected. Great place to come and hang out with your friends!\nI tried the Spanish latte and the Korean Bun which was super soft and creamy, it tasted wonderful. Definitely gonna be back to try other menu items as well",
    "stars": 5,
    "name": "Yash Arakeri"
  }
];

const formattedReviews = newReviews.map(r => ({
    name: r.name,
    rating: r.stars,
    text: r.content,
    context: "Local Guide"
}));

const content = fs.readFileSync('src/data.ts', 'utf-8');

const regex = /export const CAFE_REVIEWS = \[[\s\S]*?\];/;
const newContent = content.replace(regex, 'export const CAFE_REVIEWS = ' + JSON.stringify(formattedReviews, null, 2) + ';');

fs.writeFileSync('src/data.ts', newContent);
console.log("Updated CAFE_REVIEWS in src/data.ts");
