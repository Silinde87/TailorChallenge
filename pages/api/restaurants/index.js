import { restaurantsRepo } from "../../../utils/restaurants-helper";

export default function handler(req, res) {
    
    switch (req.method) {
        case 'GET':
            return getRestaurants();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getRestaurants(){
        const restaurants = restaurantsRepo.getAll();
        return res.status(200).json(restaurants);
    }
}
