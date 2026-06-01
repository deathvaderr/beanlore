import { CAFE_IMAGES, HSR_IMAGES, CAFE_REVIEWS, HSR_REVIEWS, INDIRANAGAR_REVIEWS, INDIRANAGAR_IMAGES, WHITEFIELD_IMAGES, WHITEFIELD_REVIEWS } from "./data";

export type BranchKey = "Jayanagar" | "HSR" | "Indiranagar" | "Whitefield";

export const BRANCH_CONFIG: Record<BranchKey, any> = {
  Jayanagar: {
    name: "Jayanagar",
    displayLabel: "JAYANAGAR",
    heroImages: CAFE_IMAGES,
    reviews: CAFE_REVIEWS,
    subtitle: "Beanlore-Jayanagar",
    about:
      "Beanlore Coffee Roasters is your neighbourhood café in the heart of Jayanagar, blending specialty coffee, artisanal bakes, and wholesome food. Our beans are roasted in-house to bring out bold, fresh flavours, best paired with croissants, cheesecakes, or hearty bowls. More than just a coffee stop, Beanlore is a warm space for conversations, work, or unwinding with friends. From signature brews and teas to global-inspired plates and desserts, every visit feels like a pause from the city’s rush. With cozy corners and a pod / meeting rooms for private sessions, Beanlore brings together the buzz of Jayanagar and the calm of a community café. Come for the coffee, stay for the stories.",
    address1: "85, 5th Main Rd, 6th Block, 5th Block,",
    address2: "Jayanagar, Bengaluru, Karnataka 560041",
    phone: "08047362636",
    swiggy:
      "https://www.swiggy.com/restaurants/beanlore-coffee-roasters-jayanagar-bangalore",
    district:
      "https://www.district.in/dining/bangalore/beanlore-jayanagar-bangalore",
    zomato: "https://www.zomato.com/bangalore/beanlore-jayanagar-bangalore",
    reserveTableUrl: "https://www.google.com/maps/reserve/v/dine/c/qSJ3ouSjca0?source=pa&opi=79508299&hl=en-IN&gei=M1EcarqPMbycseMP26mf2Ac&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Den%26gl%3Din%26pb%3D!1m20!1s0x3bae15c3cbad01b3:0x8fe7406b0a8755d5!3m12!1m3!1d14421.658609764789!2d77.55047730000001!3d12.9085832!2m3!1f0!2f0!3f0!3m2!1i1517!2i712!4f13.1!4m2!3d12.9191948!4d77.5809127!5e0!9e0!11s/g/11mrmw4v10!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m6!1sJlEcao_qL5KZseMPnbqxEA:47!2s1i:0,t:6986,p:JlEcao_qL5KZseMPnbqxEA:47!7e81!12e15!17sJlEcao_qL5KZseMPnbqxEA:53!18e3!15m110!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b0!21m28!1m6!1m2!1i0!2i0!2m2!1i530!2i712!1m6!1m2!1i1467!2i0!2m2!1i1517!2i712!1m6!1m2!1i0!2i0!2m2!1i1517!2i20!1m6!1m2!1i0!2i692!2m2!1i1517!2i712!22m1!1e81!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i780!39sBeanlore%2B-%2BJayanagar,%2B5th%2BMain%2BRoad,%2B6th%2BBlock,%2B5th%2BBlock,%2BJayanagar,%2BBengaluru,%2BKarnataka%26q%3DBeanlore%2B-%2BJayanagar,%2B5th%2BMain%2BRoad,%2B6th%2BBlock,%2B5th%2BBlock,%2BJayanagar,%2BBengaluru,%2BKarnataka",
    mapCoords: "12.9173591° N, 77.6484901° E",
    mapQuery: "Beanlore Jayanagar Bengaluru",
    hasMenu: true,
    rating: "4.1",
    reviewsCount: "425 reviews",
    starDistribution: ["70%", "18%", "6%", "2%", "4%"]
  },
  HSR: {
    name: "HSR",
    displayLabel: "HSR LAYOUT",
    heroImages: HSR_IMAGES,
    reviews: HSR_REVIEWS,
    subtitle: "Beanlore-HSR",
    about:
      "Beanlore Coffee Roasters is your neighbourhood café in HSR Layout, blending specialty coffee, artisanal bakes, and wholesome food. Experience our freshly roasted beans and vibrant community spaces. Perfect for work, conversations, and unwinding. Come for the coffee, stay for the stories.",
    address1: "450, 17th Cross Rd, Sector 4,",
    address2: "HSR Layout, Bengaluru, Karnataka 560102",
    phone: "08069451516",
    swiggy:
      "https://www.swiggy.com/city/bangalore/beanlore-gourmet-sandwiches-and-coffee-layout-hsr-rest800757?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder",
    district: "https://www.district.in/dining/bangalore/beanlore-hsr-bangalore",
    zomato: "https://www.zomato.com/bangalore/beanlore-hsr-bangalore/order",
    reserveTableUrl: "https://www.google.com/maps/reserve/v/dine/c/Vu3RGYMX2TI?source=pa&opi=79508299&hl=en-IN&gei=jFEcaumUG6GNseMPoPbx-AE&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Den%26gl%3Din%26pb%3D!1m20!1s0x3bae15fff842d533:0xb0bfac9edbb39b70!3m12!1m3!1d3604.400932945971!2d77.64117807472086!3d12.978685987337345!2m3!1f0!2f0!3f0!3m2!1i1518!2i712!4f13.1!4m2!3d12.9123126!4d77.6416021!5e0!9e0!11s/g/11ssnhdl4b!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m6!1sJlEcao_qL5KZseMPnbqxEA:178!2s1i:0,t:6986,p:JlEcao_qL5KZseMPnbqxEA:178!7e81!12e15!17sJlEcao_qL5KZseMPnbqxEA:180!18e3!15m110!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b0!21m28!1m6!1m2!1i0!2i0!2m2!1i530!2i712!1m6!1m2!1i1468!2i0!2m2!1i1518!2i712!1m6!1m2!1i0!2i0!2m2!1i1518!2i20!1m6!1m2!1i0!2i692!2m2!1i1518!2i712!22m1!1e81!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i780!39sBeanlore%2B-%2BHSR%2BLayout,%2B17th%2BCross%2BRoad,%2BSector%2B4,%2BHSR%2BLayout,%2BBengaluru,%2BKarnataka%26q%3DBeanlore%2B-%2BHSR%2BLayout,%2B17th%2BCross%2BRoad,%2BSector%2B4,%2BHSR%2BLayout,%2BBengaluru,%2BKarnataka",
    mapCoords: "12.910000° N, 77.640000° E",
    mapQuery: "Beanlore HSR Layout Bengaluru",
    hasMenu: true,
    rating: "4.2",
    reviewsCount: "1,091 reviews",
    starDistribution: ["74%", "15%", "5%", "2%", "4%"]
  },
  Indiranagar: {
    name: "Indiranagar",
    displayLabel: "INDIRANAGAR",
    heroImages: INDIRANAGAR_IMAGES,
    reviews: INDIRANAGAR_REVIEWS,
    subtitle: "Beanlore-Indiranagar",
    about:
      "Beanlore Coffee Roasters is your neighbourhood café in the heart of Indiranagar, blending specialty coffee, artisanal bakes, and wholesome food. Our beans are roasted in-house to bring out bold, fresh flavours, best paired with croissants, cheesecakes, or hearty bowls. More than just a coffee stop, Beanlore is a warm space for conversations, work, or unwinding with friends. From signature brews and teas to global-inspired plates and desserts, every visit feels like a pause from the city’s rush. With cozy corners and a pod / meeting rooms for private sessions, Beanlore brings together the buzz of Indiranagar and the calm of a community café. Come for the coffee, stay for the stories",
    address1: "503, Chinmaya Mission Hospital Rd, Indira Nagar 1st Stage,",
    address2: "Stage 1, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "08047360546",
    swiggy:
      "https://www.swiggy.com/city/bangalore/beanlore---gourmet-sandwiches-&-coffee-indiranagar-indiranagar-rest1216218?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder",
    district: "https://www.district.in/dining/bangalore/beanlore-indiranagar-bangalore",
    zomato: "https://www.zomato.com/bangalore/beanlore-indiranagar-bangalore/order",
    reserveTableUrl: "https://www.google.com/maps/reserve/v/dine/c/mzAYkptpmho?source=pa&opi=79508299&hl=en-IN&gei=b1EcatKHB6KxwcsPjKWS-AQ&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Den%26gl%3Din%26pb%3D!1m20!1s0x3bae1703a9f93541:0x4c4d67e03b6064e!3m12!1m3!1d3605.2615504942673!2d77.57833241027275!3d12.919194787338798!2m3!1f0!2f0!3f0!3m2!1i1518!2i712!4f13.1!4m2!3d12.978686!4d77.64375299999999!5e0!9e0!11s/g/11xw3x7bpy!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m6!1sJlEcao_qL5KZseMPnbqxEA:139!2s1i:0,t:6986,p:JlEcao_qL5KZseMPnbqxEA:139!7e81!12e15!17sJlEcao_qL5KZseMPnbqxEA:141!18e3!15m110!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b0!21m28!1m6!1m2!1i0!2i0!2m2!1i530!2i712!1m6!1m2!1i1468!2i0!2m2!1i1518!2i712!1m6!1m2!1i0!2i0!2m2!1i1518!2i20!1m6!1m2!1i0!2i692!2m2!1i1518!2i712!22m1!1e81!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i780!39sBeanlore%2B-%2BIndiranagar,%2BChinmaya%2BMission%2BHospital%2BRoad,%2BIndira%2BNagar%2B1st%2BStage,%2BStage%2B1,%2BIndiranagar,%2BBengaluru,%2BKarnataka%26q%3DBeanlore%2B-%2BIndiranagar,%2BChinmaya%2BMission%2BHospital%2BRoad,%2BIndira%2BNagar%2B1st%2BStage,%2BStage%2B1,%2BIndiranagar,%2BBengaluru,%2BKarnataka",
    mapCoords: "12.9784° N, 77.6408° E",
    mapQuery: "Beanlore CMH Road Indiranagar Bengaluru",
    hasMenu: true,
    rating: "4.3",
    reviewsCount: "262 reviews",
    starDistribution: ["78%", "12%", "4%", "2%", "4%"]
  },
  Whitefield: {
    name: "Whitefield",
    displayLabel: "WHITEFIELD",
    heroImages: WHITEFIELD_IMAGES,
    reviews: WHITEFIELD_REVIEWS,
    subtitle: "Beanlore-Whitefield",
    about:
      "Beanlore Coffee Roasters, a beacon of innovation in the heart of Bangalore, is thrilled to announce the launch of its newest venture, \"Work from Cafe.\" Embracing the evolving work culture, Beanlore Coffee Roasters invites professionals and freelancers to trade their office desks for a vibrant and inspiring workspace infused with the aroma of artisanal coffee.\n\nWhat sets \"Work from Cafe\" apart is the emphasis on artisanal coffee. Beanlore Coffee Roasters takes pride in sourcing the finest coffee beans from around the world and employs skilled baristas who transform these beans into exquisite, aromatic beverages. From single-origin pour-overs to velvety lattes, each cup is a masterpiece designed to fuel both creativity and concentration.",
    address1: "No. 2, behind HDFC Bank, Hoodi, Doddanakundi Industrial Area 2,",
    address2: "Seetharampalya, Mahadevapura, Bengaluru, Karnataka 560048",
    phone: "08069451516",
    swiggy: "#",
    district: "#",
    zomato: "#",
    mapCoords: "12.9918° N, 77.7161° E",
    mapQuery: "No. 2, behind HDFC Bank, Hoodi, Doddanakundi Industrial Area 2, Seetharampalya, Mahadevapura, Bengaluru, Karnataka 560048",
    hasMenu: false,
    rating: "4.3",
    reviewsCount: "58 reviews",
    starDistribution: ["90%", "35%", "3%", "3%", "13%"]
  },
};
