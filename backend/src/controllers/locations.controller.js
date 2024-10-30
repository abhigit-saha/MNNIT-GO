import Location from "../models/location.model.js";

export const getlocation=async(req,res)=>{
    console.log("getlocation route hit");
    try{
       const location=await Location.find()
       res.status(200).json(location)
    } catch(error){
        console.log("Error:",error)
        res.status(500).json(error)
    }
};


export const getlocationById = async (req, res) => {
    try {
        
        console.log('Fetching location with ID:', req.params.id);
        
        const location = await Location.findById(req.params.id);
        if (location) {
            res.status(200).json(location);
        } else {
          console.log('location not found in the database.');
            res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        res.status(500).json({ error: 'Server error' });
    }
};


