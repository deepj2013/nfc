import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItemsByRestaurant } from '../../services/menuServices'; // You already have
import { getMemberDetails } from '../../services/memberService'; // Should return user info from token

const MenuPage = () => {
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [member, setMember] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [barMenu, setBarMenu] = useState([]);

  useEffect(() => {
    const validateAndFetch = async () => {
      try {
        // ✅ Step 1: Validate member via token
        const loggedInMember = await getMemberDetails(); // token should be in headers
        if (!loggedInMember) throw new Error('Unauthorized');

        setMember(loggedInMember);

        // ✅ Step 2: Fetch Menu Items by Restaurant
        const data = await getMenuItemsByRestaurant(restaurantId);

        setMenuItems(data);

        // ✅ Step 3: Separate Bar and Restaurant menus
        const restaurantMenuItems = data.filter(
          (item) =>
            item.category.toLowerCase().includes('food') ||
            item.category.toLowerCase().includes('restaurant')
        );

        const barMenuItems = data.filter(
          (item) =>
            item.category.toLowerCase().includes('bar') ||
            item.category.toLowerCase().includes('alcohol') ||
            item.category.toLowerCase().includes('drinks')
        );

        setRestaurantMenu(restaurantMenuItems);
        setBarMenu(barMenuItems);
      } catch (error) {
        console.error(error.message);
        navigate('/login'); // Redirect if not logged in
      }
    };

    validateAndFetch();
  }, [restaurantId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🍽 Restaurant Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {restaurantMenu.map((item) => (
          <div key={item._id} className="border p-4 shadow rounded">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p>₹ {item.price_info?.[0]?.offer_price || item.price_info?.[0]?.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">🍸 Bar Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {barMenu.map((item) => (
          <div key={item._id} className="border p-4 shadow rounded">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p>₹ {item.price_info?.[0]?.offer_price || item.price_info?.[0]?.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;